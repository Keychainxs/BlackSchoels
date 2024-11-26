from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, request
from mongoengine.connection import get_db
from .serializers import OptionPricingSerializer, CalculateOptionsSerializer, UserRegistrationSerializer, UserLoginSerializer
from .black_schoels import calculate_option_price
from datetime import datetime, timedelta
from pytz import timezone
from django.http import HttpResponse
from .models import User
from django.contrib.auth.hashers import make_password, check_password
import jwt 
from django.conf import settings

# Create your views here.




##########

#### TEST API ENDPOINTS USING CURL ####

##########
class CalculateOptionPriceView(APIView):
   
    def post(self, request):
        try:
            # Verify token
            auth_header = request.headers.get('Authorization')
            if auth_header:
                try:
                    token = auth_header.split(' ')[1]
                    payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
                    print(f"Token decoded successfully: {payload}")  # Debug print
                except jwt.ExpiredSignatureError:
                    return Response(
                        {'error': 'Token has expired'},
                        status=status.HTTP_401_UNAUTHORIZED
                    )
                except jwt.InvalidTokenError:
                    return Response(
                        {'error': 'Invalid token'},
                        status=status.HTTP_401_UNAUTHORIZED
                    )

            # Validate input data
            serializer = OptionPricingSerializer(data=request.data)
            if not serializer.is_valid():
                return Response(
                    serializer.errors,
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Calculate option prices
            result = calculate_option_price(
                spot_price=serializer.validated_data['spot_price'],
                strike_price=serializer.validated_data['strike_price'],
                maturity_date=serializer.validated_data['maturity_date'],
                risk_free_rate=serializer.validated_data['risk_free_rate'],
                volatility=serializer.validated_data['volatility']
            )

            return Response(result, status=status.HTTP_200_OK)

        except Exception as e:
            print(f"Error in calculate endpoint: {str(e)}")  # Debug print
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
class CalculateGreeksView(APIView):
    """
    API endpoint for calculating option Greeks
    """
    def post(self, request):
        serializer = OptionPricingSerializer(data=request.data)
        
        if serializer.is_valid():
            try:
                result = calculate_option_price(
                    spot_price=serializer.validated_data['spot_price'],
                    strike_price=serializer.validated_data['strike_price'],
                    maturity_date=serializer.validated_data['maturity_date'],
                    risk_free_rate=serializer.validated_data['risk_free_rate'],
                    volatility=serializer.validated_data['volatility']
                )
                
                return Response({
                    'greeks': result['greeks']
                }, status=status.HTTP_200_OK)
                
            except Exception as e:
                return Response(
                    {'error': str(e)},
                    status=status.HTTP_400_BAD_REQUEST
                )
                
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   

class RegisterView(APIView): 
    def post(self, request):
        print("Register Endpoint")
        serializer = UserRegistrationSerializer(data = request.data)
        
        if serializer.is_valid():
            
            if User.objects(email = serializer.validated_data['email']):
                return Response (
                    {'error': "Email already exists"}, status = status.HTTP_400_BAD_REQUEST
                )
                
            user = User (
                username = serializer.validated_data['username'],
                email = serializer.validated_data['email'],
                password = make_password(serializer.validated_data['password'])
            )
            user.save()
            
            return Response ({
                'message': "User registered successfully"
            }, status = status.HTTP_201_CREATED)
        return Response(serializer.error, status = status.HTTP_400_BAD_REQUEST)
    
class LoginView(APIView):
     def post(self, request):
        print("login endpoint hit")
        serializer = UserLoginSerializer(data=request.data)
        
        if serializer.is_valid(): 
            user = User.objects(email=serializer.validated_data['email']).first()
            
            # Fix the check_password syntax - remove extra parentheses
            if user and check_password(serializer.validated_data['password'], user.password): 
                
                # Fix datetime.now syntax
                token = jwt.encode({
                    'user_id': str(user.id),
                    'email': user.email,
                    'exp': datetime.utcnow() + timedelta(days=1)  # Use utcnow() instead
                }, settings.SECRET_KEY, algorithm='HS256')
                   
                return Response({
                    'token': token,
                    'user': {
                        'id': str(user.id),
                        'username': user.username,
                        'email': user.email
                    }
                })
               
            return Response(
                {'error': 'Invalid credentials'},
                status=status.HTTP_401_UNAUTHORIZED
            )
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    def post(self, request):
        
        return Response({
            'message': 'Logged out successfully'
        })
class TestMongoConnection(APIView):
    def get(self, reqeust): 
        try: 
            
            db = get_db()
            db.command('ping')
            return Response({
                'status': 'success',
                'message': 'MongoDB connection is working',
                'database': db.name
            })
        except Exception as e:
            return Response({
                'status': 'error',
                'message': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
     

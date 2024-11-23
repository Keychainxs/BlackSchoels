from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, request
from mongoengine.connection import get_db
from .serializers import OptionPricingSerializer, CalculateOptionsSerializer
from .black_schoels import calculate_option_price
from datetime import datetime
from pytz import timezone
from django.http import HttpResponse
# Create your views here.




##########

#### TEST API ENDPOINTS USING CURL ####

##########
class CalculateOptionPriceView(APIView):
   
    def post(self, request):
        serializer = OptionPricingSerializer(data=request.data)
        
        if serializer.is_valid():
            try:
                # Calculate option prices and Greeks
                result = calculate_option_price(
                    spot_price=serializer.validated_data['spot_price'],
                    strike_price=serializer.validated_data['strike_price'],
                    maturity_date=serializer.validated_data['maturity_date'],
                    risk_free_rate=serializer.validated_data['risk_free_rate'],
                    volatility=serializer.validated_data['volatility']
                )
                
                # Add calculation timestamp
                result['calculation_date'] = datetime.now()
                
                # Serialize the result
                result_serializer = CalculateOptionsSerializer(data=result)
                if result_serializer.is_valid():
                    return Response(result_serializer.data, status=status.HTTP_200_OK)
                
            except ValueError as e:
                return Response(
                    {'error': str(e)},
                    status=status.HTTP_400_BAD_REQUEST
                )
            except Exception as e:
                return Response(
                    {'error': 'Internal server error'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
                
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
     

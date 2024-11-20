from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, request
from mongoengine.connection import get_db
from .serializers import OptionPricingSerializer, CalculateOptionsSerializer
from .black_schoels import calculate_option_price
from datetime import datetime
from django.http import HttpResponse
# Create your views here.

class Calculate_option_pricer_view(APIView): 
    
    # Make a post function that takes and arugment of self and request
        def post(self,request):
            serializer = OptionPricingSerializer(data = request.data)
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
        # set the object to Option pricer then request the data passed as an arg.
        
        #check if object is valid 
            # then return the func. from black scholes, validate, and  pass in the spot, strike, volitlity, risk, and matiruty 
            
            # then serialize the result, then check if its valid, if true return a response of 200
        # other wise except a Value error and return a response with status 400
        # or return a response of 500 
        
        # or return a response at the serailizer as a bad request
     



class Caluculate_greeks_view(APIView):
    def post(self, request): 
        serializer = OptionPricingSerializer(data = request.data)
        
        if serializer.is_valid(): 
                
                try: 
                    result = calculate_option_price(
                        spot_price=serializer.validated_data['spot_price'],
                        strike_price=serializer.validated_data['strike_price'],
                        maturity_date=serializer.validated_data['maturity_date'],
                        risk_free_rate=serializer.validated_data['risk_free_rate'],
                        volatility=serializer.validated_data['volatility']
                    )
                    
                    result['calculation_date'] = datetime.now()
                    
                   
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
     

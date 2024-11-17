from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, request
from mongoengine.connection import get_db
# Create your views here.




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
     
    
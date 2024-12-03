from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import jwt
from .models import User





class JWTAuthentication:
    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return None

        try:
            # Get token from header
            token = auth_header.split(' ')[1]
            # Decode token
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            # Get user
            user = User.objects(id=payload['user_id']).first()
            if user:
                return (user, None)
            return None
        except jwt.ExpiredSignatureError:
            return Response(
                {'error': 'Token has expired'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        except (jwt.InvalidTokenError, IndexError):
            return Response(
                {'error': 'Invalid token'},
                status=status.HTTP_401_UNAUTHORIZED
            )
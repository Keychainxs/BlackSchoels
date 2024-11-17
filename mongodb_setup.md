# MongoDB and Django Setup Documentation

## Prerequisites
- Python 3.x installed
- MongoDB installed
- Basic understanding of Django and REST APIs

## 1. Initial Setup and Installation

Create project directory and virtual environment:
```bash
# Create project directory and virtual environment
mkdir BlackScholes
cd BlackScholes
python -m venv venv

# Activate virtual environment
source venv/bin/activate  # For Mac/Linux
# venv\Scripts\activate  # For Windows

# Install required packages
pip install django
pip install djangorestframework
pip install mongoengine
pip install django-cors-headers
pip install pyjwt
```

## 2. Create Django Project and App
```bash
# Create Django project
django-admin startproject option_pricer .

# Create Django app
python manage.py startapp pricing_engine
```

## 3. Django Configuration

### settings.py Configuration
Add the following to your `option_pricer/settings.py`:

```python
# Add these to INSTALLED_APPS
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'pricing_engine',
]

# Add CORS middleware
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # Add this
    'django.middleware.common.CommonMiddleware',
    # ... other middleware
]

# MongoDB Configuration
MONGODB_SETTINGS = {
    'host': 'mongodb://**yourPORT**/option_pricer_db'
}

# Initialize MongoDB Connection
from mongoengine import connect
try:
    connect(
        db='option_pricer_db',
        host='localhost',
        port= "YOUR PORT NUMBER"
    )
    print("Connected to MongoDB!")
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")
```

## 4. Create Test Connection View

Create a view to test MongoDB connection in `pricing_engine/views.py`:

```python
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from mongoengine.connection import get_db

class TestMongoConnection(APIView):
    def get(self, request):
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
```

## 5. URL Configuration

### App URLs (pricing_engine/urls.py)
```python
from django.urls import path
from .views import TestMongoConnection

urlpatterns = [
    path('test-connection/', TestMongoConnection.as_view(), name='test-connection'),
]
```

### Project URLs (option_pricer/urls.py)
```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('pricing_engine.urls')),
]
```

## 6. Testing and Verification

Start the Django development server:
```bash
python manage.py runserver
```

Test the MongoDB connection:
```bash
curl http://localhost:8000/api/test-connection/
```

Expected Response:
```json
{
    "status": "success",
    "message": "MongoDB connection is working",
    "database": "option_pricer_db"
}
```

## 7. Troubleshooting

### Check MongoDB Status
```bash
# Mac
brew services list | grep mongodb
mongosh

# Ubuntu
sudo systemctl status mongodb
```

### Check MongoDB Version
```bash
mongod --version
```

### View MongoDB Logs
```bash
# Mac
tail -f /usr/local/var/log/mongodb/mongo.log

# Ubuntu
tail -f /var/log/mongodb/mongodb.log
```

## Security Considerations

For production deployment:
1. Use environment variables for sensitive information
2. Configure proper authentication for MongoDB
3. Update CORS settings to specify allowed origins
4. Use SSL/TLS for MongoDB connections
5. Implement proper error handling and logging

## Common Issues and Solutions

1. **Connection Refused**
   - Check if MongoDB is running
   - Verify the port number (default: 27017)
   - Check firewall settings

2. **Authentication Failed**
   - Verify MongoDB user credentials
   - Check database permissions

3. **Import Errors**
   - Verify all required packages are installed
   - Check Python environment activation

## Next Steps
1. Create database models
2. Implement authentication
3. Create API endpoints
4. Add validation and error handling
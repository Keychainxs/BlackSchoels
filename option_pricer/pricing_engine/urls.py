from django.urls import path
from .views import TestMongoConnection



urlpatterns = [
    path("test-connection/", TestMongoConnection.as_view(), name="test-connection"),
]
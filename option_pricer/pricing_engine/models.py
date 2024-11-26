from django.db import models
from django.contrib.auth.models import AbstractUser
from mongoengine import Document, StringField, EmailField, BooleanField, DateTimeField
from django.utils import timezone
# Create your models here.
class User(Document):
    username = StringField(max_length=150, unique=True, required=True)
    email = EmailField(unique=True, required=True)
    password = StringField(required=True)  
    is_active = BooleanField(default=True)
    date_joined = DateTimeField(default=timezone.now)

    meta = {
        'collection': 'users'
    }













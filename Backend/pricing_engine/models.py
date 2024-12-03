from django.db import models
from django.contrib.auth.models import AbstractUser
from mongoengine import Document, StringField, EmailField, BooleanField, DateTimeField, ReferenceField
from django.utils import timezone
# Create your models here.
class User(Document):
    username = StringField(max_length=150, unique=True, required=True)
    email = EmailField(unique=True, required=True)
    password = StringField(required=True)  
    is_active = BooleanField(default=True)
    date_joined = DateTimeField(default=timezone.now)
    created_at = DateTimeField(default=timezone.now())
    user = ReferenceField('self', required = False)
    
    ## adds better usernmae and email objects to the Database
    def __str__(self):
        return f"User(username={self.username},email={self.email})" 
        

    meta = {
        'collection': 'users', 
        'indexes' : [
            'username', 'email'
        ]
    }







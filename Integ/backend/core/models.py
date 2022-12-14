from django.contrib.auth.models import AbstractBaseUser
from django.db import models

class User(AbstractBaseUser):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    username = None
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [] 
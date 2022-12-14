from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import exceptions
from core.authentication import create_refresh_token
from core.authentication import create_access_token
from .serializer import UserSerializer
from .models import User

class RegisterAPIView(APIView):
    def post(self, request):
        data = request.data
        if data['password'] != data['password_confirm']:
            raise exceptions.APIException('Password not match!')
        serializer = UserSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()    
        return Response(serializer.data)
    
class LoginAPIView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        user = User.objects.filter(email = email).first()
        if user is None:
            raise exceptions.AuthenticationFailed('Invalid Credential')
        if not user.check_password(password):
            raise exceptions.AuthenticationFailed('Invalid Credential')
        access_token = create_access_token(user.id)
        refresh_token = create_refresh_token(user.id)
        response = Response()
        response.set_cookie(key='refresh_token', value=refresh_token, httponly=True)
        response.data = {
            'token': access_token
        }
        return response
        # serializer = UserSerializer(user)
        # return Response(serializer.data)
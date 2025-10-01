from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import *
from .serializers import *

# Create your views here.

class UserRegisterView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = UserRegisterSerializer
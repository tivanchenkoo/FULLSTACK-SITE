from django.shortcuts import render
from django.http import HttpResponse
from django.urls import include
# Create your views here.

def index(request) :
  return render(request, "router.html")

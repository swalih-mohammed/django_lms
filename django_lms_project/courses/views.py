from django.shortcuts import render

from rest_framework import generics
from rest_framework.generics import RetrieveAPIView

from .models import Course
from .serializers import CourseSerializer


class CourseListView(generics.ListAPIView):
    serializer_class = CourseSerializer

    def get_queryset(self):
        qs = Course.objects.all()
        return qs


class CourseDetailView(RetrieveAPIView):
    serializer_class = CourseSerializer
    qs = Course.objects.all()

from rest_framework import serializers

from .models import Course


class CourseSerializer(serializers.ModelSerializer):
    # category = serializers.ReadOnlyField(source='shop_category.name')
    class Meta:
        model = Course
        fields = '__all__'

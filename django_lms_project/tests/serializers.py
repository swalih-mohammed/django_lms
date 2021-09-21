from rest_framework import serializers

from .models import Test


class TestSerializer(serializers.ModelSerializer):
    # category = serializers.ReadOnlyField(source='shop_category.name')
    class Meta:
        model = Test
        fields = '__all__'

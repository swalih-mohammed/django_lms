from rest_framework import serializers

from .models import Unit


class UnitSerializer(serializers.ModelSerializer):
    # category = serializers.ReadOnlyField(source='shop_category.name')
    class Meta:
        model = Unit
        fields = '__all__'

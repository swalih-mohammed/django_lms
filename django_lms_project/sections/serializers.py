from rest_framework import serializers

from .models import Section


class SectionSerializer(serializers.ModelSerializer):
    # category = serializers.ReadOnlyField(source='shop_category.name')
    class Meta:
        model = Section
        fields = '__all__'

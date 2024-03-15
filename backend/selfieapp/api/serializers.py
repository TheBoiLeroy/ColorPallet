from rest_framework import serializers
from ..models import Selfie

class SelfieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Selfie
        fields = ['image', 'uploaded_at']

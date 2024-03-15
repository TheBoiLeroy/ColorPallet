from rest_framework import serializers
from ..models import Selfie, HexColors

class SelfieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Selfie
        fields = ['image', 'uploaded_at']
class HexColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = HexColors
        fields = ['id', 'eyeColor', 'skinColor', 'hairColor','chatResponse']
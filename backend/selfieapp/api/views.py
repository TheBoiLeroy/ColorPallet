from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from ..models import Selfie
from .serializers import SelfieSerializer

class SelfieUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    
    def post(self, request, *args, **kwargs):
        print(request.data) 
        selfie_serializer = SelfieSerializer(data=request.data)
        if selfie_serializer.is_valid():
            selfie_serializer.save()
            return Response(selfie_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(selfie_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

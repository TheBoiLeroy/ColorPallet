from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status,viewsets
from ..models import Selfie,HexColors
from .serializers import SelfieSerializer,HexColorSerializer
from dotenv import load_dotenv
import os
from openai import OpenAI
import openai
import requests


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
class HexColorViewSet(viewsets.ModelViewSet):
    queryset = HexColors.objects.all()
    serializer_class = HexColorSerializer

    def perform_create(self, serializer):
        # Assuming serializer is valid and saving HexColor instance
        instance = serializer.save()
        
        # Now that the instance is saved, you have the color data in a proper format
        # Call the ChatGPT API with this instance data
        color_data = {
            'eyeColor': instance.eyeColor,  # Adjust these field names based on your actual model
            'skinColor': instance.skinColor,
            'hairColor': instance.hairColor
        }
        
        chat_response = self.call_chat_gpt_api(color_data)
        
        # Log the response or handle it as needed
        print(chat_response)
        if 'content' in chat_response:
            instance.chatResponse = chat_response['content']  # Adjust field name as necessary
            instance.save()
            # Re-serialize the instance to include the updated data
            serializer = self.get_serializer(instance)
            print("!!!!!!!!!!!!!!!!!"+chat_response['content'])
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            # Handle error case, maybe log it or return it in the response
            return Response({'error': chat_response.get('error', 'Unknown error')}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        # Optionally, you might want to save the response to the instance or handle it differently
        # instance.chat_response = chat_response
        # instance.save()
        
    def call_chat_gpt_api(self, color_data):
        load_dotenv()
        openai.api_key = os.getenv('OPENAI_API_KEY')
        print("in call chat gpt")
        prompt = self.generate_prompt_from_colors(color_data)  # Generates the prompt

        try:
            completion = openai.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }],
                model="gpt-3.5-turbo",
                )

            response_content = completion.choices[0].message.content if completion.choices else "No response"
            print(response_content)
            return {"content": response_content}
        
        except Exception as e:
            print(f"Error calling OpenAI API: {str(e)}")
            return {"error": str(e)}

    def generate_prompt_from_colors(self, color_data):
        prompt = f"hey my eye color is {color_data['eyeColor']} my skin tone is {color_data['skinColor']} and my hair is{color_data['hairColor']}. Which skin tone color palette am I? In terms of cool/warm -> sprint, winter, summer,and fall. be as descriptive as possible "
        return prompt
    # hey my skin tone is {$hexSkinColor} my eyes are {$hexEyes} and my hair is {$hexHairColor}.
    # // Which skin tone color palette am I? In terms of sprint, winter, summer, fall. "
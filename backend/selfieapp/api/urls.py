from django.urls import path
from .views import SelfieUploadView

urlpatterns = [
    path('upload/', SelfieUploadView.as_view(), name='selfie-upload'),
]

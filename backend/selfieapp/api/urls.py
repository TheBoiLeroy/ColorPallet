from django.urls import path, include
from .views import SelfieUploadView, HexColorViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'hexcolors', HexColorViewSet)

urlpatterns = [
    path('upload/', SelfieUploadView.as_view(), name='selfie-upload'),
    path('', include(router.urls)),  # This line includes all URLs for HexColorViewSet
]

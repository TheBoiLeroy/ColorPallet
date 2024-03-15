from django.db import models

# Create your models here.

class Selfie(models.Model):
    image = models.ImageField(upload_to='selfies/')
    uploaded_at = models.DateTimeField(auto_now_add=True)



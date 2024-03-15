from django.db import models

# Create your models here.

class Selfie(models.Model):
    image = models.ImageField(upload_to='selfies/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

class HexColors(models.Model):
    eyeColor = models.CharField(max_length=7)  # Includes '#' symbol
    skinColor = models.CharField(max_length=7)
    hairColor = models.CharField(max_length=7)
    chatResponse = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.eyeColor}, {self.skinColor}, {self.hairColor}"
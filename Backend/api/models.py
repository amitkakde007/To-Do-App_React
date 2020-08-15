# Django Imports
from django.db import models

# Create your models here.


class Task(models.Model):
    Title = models.CharField(max_length=200, blank=False)
    Completed = models.BooleanField(null=True, blank=True, default=False)

    def __str__(self):
        return self.Title

# Django Imports
from rest_framework import serializers

# Local Imports
from api.models import Task


class TaskSerializers(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

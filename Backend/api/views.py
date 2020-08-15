# Django Imports
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView

# Local Imports

from api.models import Task
from api.serializers import TaskSerializers

# Create your views here.


class TaskViewAPi(APIView):
    serializers_class = TaskSerializers

    def get(self, request, *args, **kwargs):
        queryset = Task.objects.all()
        serializer = self.serializers_class(queryset, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = self.serializers_class(data=request.data)
        if serializer.is_valid():
            serializer.save()

    def post(self, request, pk, *args, **kwargs):
        task=Task.objects.get(id=pk)
        serializer = self.serializers_class(instance=task, data=request.data)
        if serializer.is_valid():
            serializer.save()

    def delete(self, request, pk, *args, **kwargs):
        queryset = Task.objects.get(id=pk)
        queryset.delete()

# Django Imports
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from rest_framework import status

# Local Imports

from api.models import Task
from api.serializers import TaskSerializers

# Create your views here.


class TaskViewSet(viewsets.ViewSet):
    serializers_class = TaskSerializers

    def list(self, request, *args, **kwargs):
        queryset = Task.objects.all()
        serializer = self.serializers_class(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk, *args, **kwargs):
        queryset = get_object_or_404(Task, pk=pk)
        serializer = self.serializers_class(queryset)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.serializers_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response('Data addedd successfully')
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk, *args, **kwargs):
        task = Task.objects.get(id=pk)
        serializer = self.serializers_class(instance=task, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response('Data addedd successfully')
        else:
            return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *args, **kwargs):
        queryset = Task.objects.get(id=pk)
        queryset.delete()
        return Response('Deleted successfully')

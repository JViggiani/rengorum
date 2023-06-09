from django.conf.urls import url
from django.urls import include, path
from django.contrib import admin

from .views import (
    KnowledgeBaseAPIView,
)

urlpatterns = [
    path('get/', KnowledgeBaseAPIView.as_view(), name='knowledgebase-list'),
]

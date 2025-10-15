from django.urls import path
from . import views

urlpatterns = [
    path('activities/', views.activity_list, name='activity-list'),
    path('activities/<int:pk>/', views.activity_detail, name='activity-detail'),
]

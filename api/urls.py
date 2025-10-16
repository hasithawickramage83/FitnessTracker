from django.urls import path
from . import views

urlpatterns = [
    path('activities/', views.activity_list, name='activity-list'),
    path('activities/<int:pk>/', views.activity_detail, name='activity-detail'),
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),


]

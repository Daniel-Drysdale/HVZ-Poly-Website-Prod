"""
URL configuration for HVZ_Backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from Services import views

urlpatterns = [
    path('/admin/', admin.site.urls),
    path('test/new_player/', views.test_user),
    path('api/count/', views.player_count),
    path('api/player_list/', views.player_list),
    path('api/player_creation/', views.player_creation),
]
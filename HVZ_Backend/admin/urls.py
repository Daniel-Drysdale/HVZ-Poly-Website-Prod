from django.contrib import admin
from django.urls import path
from Services import player_services, web_services



urlpatterns = [
    path('/admin/', admin.site.urls),
    path('v2/api/PageList/', web_services.paginated_player_list),
    path('v2/api/count/', web_services.player_count),
    path('v2/api/playerlist/', web_services.player_list),
    path('v2/api/mvz/', web_services.mvz),
    path('v2/api/player_creation/', player_services.player_creation),
    path('v2/api/infection/', player_services.player_infection),
    path('v2/api/oz/', player_services.OZ),
    path('v2/api/cure/', player_services.cure),
    path('v2/api/mod/', player_services.mod),
]
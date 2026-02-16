from django.contrib import admin
from django.urls import path
from Services import player_services, web_services



urlpatterns = [
    path('/admin/', admin.site.urls),
    
    #Web Services
    path('v2/api/PageList/', web_services.paginated_player_list),
    path('v2/api/count/', web_services.player_count),
    path('v2/api/playerlist/', web_services.player_list),
    path('v2/api/mvz/', web_services.mvz),
    path('v2/api/badge_creation/', web_services.badge_creation),
    path('v2/api/get_badge_list/', web_services.get_badge_list),
    path('v2/api/give_badge/', web_services.give_badge),
    
    #Player Services (Bot Services)
    path('v2/api/player_creation/', player_services.player_creation),
    path('v2/api/infection/', player_services.player_infection),
    path('v2/api/oz/', player_services.OZ),
    path('v2/api/cure/', player_services.cure),
    path('v2/api/mod/', player_services.mod),
    path('v2/api/wipe/', player_services.wipe),
    path('v2/api/remove/', player_services.remove),
]
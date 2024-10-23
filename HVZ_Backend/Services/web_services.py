import requests
import json
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.base import ContentFile
from django.http import JsonResponse
from dataclasses import dataclass, asdict
from .env import API_KEY, API_BASE_URL


@csrf_exempt
def player_list(request):
    if request.method == "GET":
        
        database_url = API_BASE_URL + "/v2/weblite/HVZ_POLY/Player_Data"
        headers = {
                'Authorization': 'Bearer sqlitecloud://npb09elghz.sqlite.cloud:8860?apikey=' + API_KEY, 
          
            }
        
        database_response = requests.get(database_url, headers=headers)
        print("Database GET request status: ", database_response.status_code)

        player_data = database_response.json().get("data", [])
            
            
            

        return JsonResponse(player_data, safe=False)
    
    
@csrf_exempt
def paginated_player_list(request):
    if request.method == "GET":
        page = int(request.GET.get("page", 1))

        edge_function_url = f"https://coia96lgnk.sqlite.cloud:8090/v2/functions/players?page={page}"
        
    
        headers = {
                'Authorization': 'Bearer sqlitecloud://npb09elghz.sqlite.cloud:8860?apikey=' + API_KEY, 
          
          
            }
        try:
            database_response = requests.get(edge_function_url, headers=headers)
            print("Edge function GET request status: ", database_response.status_code)
            
            player_data = database_response.json()

            return JsonResponse(player_data, safe=False)

        except requests.exceptions.RequestException as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"Invalid Request": 405})


@csrf_exempt
def player_count(request): 
     if (request.method == "GET"):
         database_url = API_BASE_URL + "/v2/functions/home"
         
         headers = {
                'Authorization': 'Bearer sqlitecloud://npb09elghz.sqlite.cloud:8860?apikey=' + API_KEY, 
          
            }
         
         database_response = requests.get(database_url, headers=headers)
          
         return JsonResponse(database_response.json(), status = 200, safe = False)
         
         
         
     return JsonResponse("Invalid Request", status = 400)
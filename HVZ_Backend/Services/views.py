import requests
import json
import os
import base64
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.base import ContentFile
from django.http import JsonResponse
from dataclasses import dataclass, asdict
import sqlitecloud
from .env import API_KEY, API_BASE_URL

@dataclass
class player:
    id: int
    name: str
    status: int
    tags: int
    image: str


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
    
    
csrf_exempt
def paginated_player_list(request):
    if request.method == "GET":
        # Get pagination parameters from the request
        page = int(request.GET.get("page", 1))  # Default to page 1

        # Construct the URL for the edge function
        edge_function_url = f"https://coia96lgnk.sqlite.cloud:8090/v2/functions/Paginated_Players?page={page}"
        
    
        headers = {
                'Authorization': 'Bearer sqlitecloud://npb09elghz.sqlite.cloud:8860?apikey=' + API_KEY, 
          
          
            }
        
        page_dict= {"page":page}
        try:
            # Send the request to the edge function
            database_response = requests.get(edge_function_url, headers=headers)
            print("Edge function GET request status: ", database_response.status_code)
            
            

            # Parse the JSON response from the edge function
            player_data = database_response.json()

            return JsonResponse(player_data, safe=False)

        except requests.exceptions.RequestException as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"Invalid Request": 405})


@csrf_exempt
def player_count(request): 
     if (request.method == "GET"):
         database_url = API_BASE_URL + "/v2/functions/Home_Count"
         
         headers = {
                'Authorization': 'Bearer sqlitecloud://npb09elghz.sqlite.cloud:8860?apikey=' + API_KEY, 
          
            }
         
         database_response = requests.get(database_url, headers=headers)
          
         return JsonResponse(database_response.json(), status = 200, safe = False)
         
         
         
     return JsonResponse("Invalid Request", status = 400)
 
 
 
@csrf_exempt
def player_creation(request):
    if request.method == "POST":
        try:
            incoming_data = json.loads(request.body)
            
            print(incoming_data["id"])

            player_data = player(
                id = incoming_data['id'],
                name = incoming_data['name'],
                status = incoming_data['status'],
                tags = incoming_data['tags'],
                image = incoming_data['image']
            )
            
            post_data = asdict(player_data)
            
        except:
            return JsonResponse({"Error" : "Error trying to match data to player datatype", "status" : 400})
        try:
           
            headers = {'Authorization': 'Bearer sqlitecloud://npb09elghz.sqlite.cloud:8860?apikey=' + API_KEY}
            
            database_post = requests.post(API_BASE_URL + "/v2/weblite/HVZ_POLY/Player_Data", json = post_data , headers=headers)
            
            return JsonResponse({"status": database_post.status_code})

        except:
            return JsonResponse({database_post.status_code :'Error in sending player data to database - Debug if needed'})

    return JsonResponse({"Invalid Request" : 405})
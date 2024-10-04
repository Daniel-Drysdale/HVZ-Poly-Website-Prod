import requests
import json
import os
import base64
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.base import ContentFile
from django.http import JsonResponse
from dataclasses import dataclass
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
def test_user(request):
    if (request.method == "GET"):
        
      
        headers = {
                'Authorization': 'Bearer sqlitecloud://npb09elghz.sqlite.cloud:8860?apikey=' + API_KEY,  # Replace with your actual API key
            }
    
        data = {'id': '', "name": '', 'status': 0, 'tags': 0, 'image':""}
    
        
        post_test = requests.post(api_url, json=data, headers=headers)
        
        


        
        
        
    
        return HttpResponse(post_test)
    return HttpResponse.status_code(400)

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
def player_count(request): 
     if (request.method == "GET"):
         database_url = API_BASE_URL + "/v2/functions/Home_Count"
         
         headers = {
                'Authorization': 'Bearer sqlitecloud://npb09elghz.sqlite.cloud:8860?apikey=' + API_KEY, 
          
            }
         
         database_response = requests.get(database_url, headers=headers)
         
         return JsonResponse(database_response.json(), status = database_response.status_codes, safe = False)
         
         
         
     return JsonResponse("Invalid Request", status = 400)
 
 
 
@csrf_exempt
def player_creation(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)

            player = player(
                id = data['id'],
                name=data['name'],
                status=data['status'],
                tags=data['tags'],
                image = data['image'],
            )
            
        except:
            return JsonResponse('"Error trying to match data to player datatype")', status = 400)
        
        try:
             
            headers = {
                'Authorization': 'Bearer sqlitecloud://npb09elghz.sqlite.cloud:8860?apikey=' + API_KEY,
            }
            
            database_post = requests.post(API_BASE_URL + "/v2/weblite/HVZ_POLY/Player_Data", headers=headers)
            
            

            return JsonResponse(status = database_post.status_code)

        except:
            return JsonResponse('Error in sending player data to database - Debug if needed', status = database_post.status_code)

    return JsonResponse("Invalid Request", status = 405)
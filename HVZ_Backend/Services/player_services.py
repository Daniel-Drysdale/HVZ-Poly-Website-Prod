import requests
import json
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.base import ContentFile
from django.http import JsonResponse
from dataclasses import dataclass, asdict
from .env import API_KEY, API_BASE_URL

@dataclass
class player:
    id: int
    name: str
    status: int
    tags: int
    image: str

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


@csrf_exempt
def player_infection(request):
    if request.method == "POST":
        
        post_data = json.loads(request.body)
           
        headers = {'Authorization': 'Bearer sqlitecloud://npb09elghz.sqlite.cloud:8860?apikey=' + API_KEY}
            
        database_post = requests.post(API_BASE_URL + "/v2/functions/infection", json = post_data , headers=headers)
        return JsonResponse(database_post.status_code, safe = False)


     
    return JsonResponse({"Invalid Request" : 405})



@csrf_exempt
def OZ(request):
    if request.method == "POST":
        
        post_data = json.loads(request.body)
           
        headers = {'Authorization': 'Bearer sqlitecloud://npb09elghz.sqlite.cloud:8860?apikey=' + API_KEY}
            
        database_post = requests.post(API_BASE_URL + "/v2/functions/infection_oz", json = post_data , headers=headers)
        return JsonResponse(database_post.status_code, safe = False)


     
    return JsonResponse({"Invalid Request" : 405})


@csrf_exempt
def cure(request):
    if request.method == "POST":
        
        post_data = json.loads(request.body)
           
        headers = {'Authorization': 'Bearer sqlitecloud://npb09elghz.sqlite.cloud:8860?apikey=' + API_KEY}
            
        database_post = requests.post(API_BASE_URL + "v2/functions/cure", json = post_data , headers=headers)
        return JsonResponse(database_post.status_code, safe = False)


     
    return JsonResponse({"Invalid Request" : 405})

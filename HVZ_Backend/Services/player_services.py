import requests
import json
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from dataclasses import dataclass, asdict
from .env import API_KEY, API_BASE_URL, WIPE_PASSWORD

@dataclass
class player:
    id: int
    name: str
    status: int
    tags: int
    image: str
    named_tags: list

@csrf_exempt
def player_creation(request): #creates a player after taking in a request from a mod
    if request.method == "POST":
        try:
            incoming_data = json.loads(request.body)
            
            print(incoming_data["id"])

            player_data = player(
                id = incoming_data['id'],
                name = incoming_data['name'],
                status = incoming_data['status'],
                tags = incoming_data['tags'],
                image = incoming_data['image'],
                named_tags = incoming_data['named_tags']
            )
            
            post_data = asdict(player_data)
            print(post_data)
            
        except:
            return JsonResponse({"Error" : "Error trying to match data to player datatype", "status" : 400})
        try:
           
            headers = {'Authorization': 'Bearer '+ API_KEY}
            
            database_post = requests.post(API_BASE_URL + "/v2/weblite/HVZ_POLY/Player_Data", json = post_data , headers=headers)
            
            return JsonResponse({"status": database_post.status_code})

        except:
            return JsonResponse({database_post.status_code :'Error in sending player data to database - Debug if needed'})

    return JsonResponse({"Invalid Request" : 405})




# ////////////////// All the classes below change player statuses and the player attribute //////////////////



@csrf_exempt
def player_infection(request):
    if request.method == "POST":
        
        post_data = json.loads(request.body)
           
        headers = {'Authorization': 'Bearer '+ API_KEY}
            
        database_post = requests.post(API_BASE_URL + "/v2/functions/infection", json = post_data , headers=headers)
        return HttpResponse(database_post)


     
    return JsonResponse({"Invalid Request" : 405})



@csrf_exempt
def OZ(request): #Makes a player an OZ
    if request.method == "POST":
        
        post_data = json.loads(request.body)
        
           
        headers = {'Authorization': 'Bearer '+ API_KEY}
            
        database_post = requests.post(API_BASE_URL + "/v2/functions/inf_oz", json = post_data , headers=headers)
        return JsonResponse(database_post.status_code, safe = False)


     
    return JsonResponse({"Invalid Request" : 405})


@csrf_exempt
def cure(request): #cures a player (i.e. makes any player into a human)
    if request.method == "POST":
        
        post_data = json.loads(request.body)
           
        headers = {'Authorization': 'Bearer ' + API_KEY}
            
        database_post = requests.post(API_BASE_URL + "/v2/functions/cure", json = post_data , headers=headers)
        return JsonResponse(database_post.status_code, safe = False)


     
    return JsonResponse({"Invalid Request" : 405})

@csrf_exempt
def mod(request): #Makes a player a Mod on the frontend / database
    if request.method == "POST":
        
        
        post_data = json.loads(request.body)
        
           
        headers = {'Authorization': 'Bearer '+ API_KEY}
            
        database_post = requests.post(API_BASE_URL + "/v2/functions/mod", json = post_data , headers=headers)
        return JsonResponse(database_post.status_code, safe = False)
    
    return JsonResponse({"Invalid Request" : 405})

@csrf_exempt
def wipe(request): #wipes the data from the database - use after every hvz
    if request.method == "POST":
        
        post_data = json.loads(request.body)
        
        wipe_password = post_data["password"]
        
        if wipe_password != WIPE_PASSWORD:
              return JsonResponse({"Invalid Password" : 405})
            
        headers = {'Authorization': 'Bearer '+ API_KEY}
            
        database_post = requests.post(API_BASE_URL + "/v2/functions/wipe", json = post_data , headers=headers)
        return JsonResponse(database_post.status_code, safe = False)
    
    return JsonResponse({"Invalid Request" : 405})

@csrf_exempt
def remove(request): #Removes player from the game - will help sync the bot and website
    if request.method == "POST":
        
        post_data = json.loads(request.body)
        headers = {'Authorization': 'Bearer '+ API_KEY}
            
        database_post = requests.post(API_BASE_URL + "/v2/functions/", json = post_data , headers=headers)
        return JsonResponse(database_post.status_code, safe = False)
    
    return JsonResponse({"Invalid Request" : 405})

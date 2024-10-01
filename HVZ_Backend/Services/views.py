import requests
import json
import os
import base64
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.base import ContentFile
from django.http import JsonResponse
from dataclasses import dataclass
from django.db.models import Count, Q
import sqlitecloud
from .models import Player


@dataclass
class data:
    id: int
    name: str
    status: int
    tags: int
    image: str
    
    

@csrf_exempt
def test_user(request):
    if (request.method == "GET"):
        
        api_url = "https://coia96lgnk.sqlite.cloud:8090//v2/weblite/HVZ_POLY/Player_Data"
        headers = {
                'Authorization': 'Bearer sqlitecloud://npb09elghz.sqlite.cloud:8860?apikey=',  # Replace with your actual API key
            }
    
        data = {'id': '', "name": '', 'status': 0, 'tags': 0, 'image':""}
    
        
        post_test = requests.post(api_url, json=data, headers=headers)
        
        


        
        
        
    
        return HttpResponse(post_test)
    return HttpResponse.status_code(400)

@csrf_exempt
def player_list(request):
    if request.method == "GET":
            api_url = ""
            headers = {
                'Authorization': '',  # Replace with your actual API key
          
            }
            api_response = requests.get(api_url, headers=headers)
            api_response.raise_for_status()


            

            player_data = api_response.json().get("data", [])
            
            
            

            return HttpResponse(player_data)


@csrf_exempt
def player_count(request): 
     if (request.method == "GET"):
         humans = Player.objects.filter(status=0).count()
         zombies = Player.objects.filter(status=1).count()
         print(humans)
         print(zombies)
         
         response = {"humans":humans, "zombies":zombies}
         
         return JsonResponse(response, status=200)
         
         
         
     return JsonResponse("Invalid Request", status = 400)
 
 
 
@csrf_exempt
def player_creation(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)

            player = Player(
                id = data['id'],
                name=data['name'],
                status=data['status'],
                tags=data['tags'],
                image = data['image'],
            )

            if 'image' in data:
                image_data = data['image']
                format, imgstr = image_data.split(';base64,') 
                ext = format.split('/')[-1]  

                #Decode image and save it to DB
                image_file = ContentFile(base64.b64decode(imgstr), name=f'{player.id}.{ext}')
                player.image.save(image_file.name, image_file)  # Save the image file
                
            player.save() 
            return JsonResponse("Player Successfully Created - Data Stored", status = 201)

        except:
            return JsonResponse('Error in Player Creation - Debug if needed', status = 400)

    return JsonResponse("Invalid Request", status = 405)
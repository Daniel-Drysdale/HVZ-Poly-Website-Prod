import requests
import json
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.base import ContentFile
from django.http import JsonResponse
from dataclasses import dataclass, asdict
from .env import API_KEY, API_BASE_URL
from collections import deque

@dataclass
class badge:
    name:str
    badge:str
    
@dataclass
class player:
    id: int
    name: str
    status: int
    tags: int
    image: str
    badges: list[badge]


    
@dataclass
class Edge:
  id: str
  source: str
  target: str

@dataclass
class Node:
  id: str
  data: dict
  type: str
  
@dataclass
class Player_Badge:
    player_id:int
    badge_name:str
    

    
    


@csrf_exempt
def player_list(request):
    if request.method == "GET":
        
        database_url = API_BASE_URL + "/v2/weblite/HVZ_POLY/Player_Data"
        headers = {
                'Authorization': 'Bearer ' + API_KEY, 
          
            }
        
        database_response = requests.get(database_url, headers=headers)
        print("Database GET request status: ", database_response.status_code)

        player_data = database_response.json().get("data", [])
            
            
            

        return JsonResponse(player_data, safe=False)
    


@csrf_exempt
def paginated_player_list(request):
    if request.method != "GET":
        return JsonResponse({"error": "Invalid Request"}, status=405)

    page = int(request.GET.get("page", 1))
    itemsPerPage = int(request.GET.get("pageSize", 5))

    database_url = f"{API_BASE_URL}/v2/functions/players?page={page}&pageSize={itemsPerPage}"

    headers = {
        "Authorization": f"Bearer {API_KEY}",
    }

    try:
        database_response = requests.get(database_url, headers=headers)

        try:
            body = database_response.json()
        except Exception:
            body = {"raw": database_response.text}
            
        return JsonResponse(body, safe=False, status=200)

    except requests.RequestException as e:
        return JsonResponse({"error": "Upstream request failed", "detail": str(e)}, status=502)


@csrf_exempt
def player_count(request): 
     if (request.method == "GET"):
         database_url = API_BASE_URL + "/v2/functions/home"
         
         headers = {
                'Authorization': 'Bearer '+ API_KEY, 
          
            }
         
         database_response = requests.get(database_url, headers=headers)
          
         return JsonResponse(database_response.json(), status = 200, safe = False)
         
         
         
     return JsonResponse("Invalid Request", status = 405)
 
 
@csrf_exempt
def mvz(request): 
     if (request.method == "GET"):
         database_url = API_BASE_URL + "/v2/functions/mvz"
         
         headers = {
                'Authorization': 'Bearer '+ API_KEY, 
          
            }
         
         database_response = requests.get(database_url, headers=headers)
          
         return JsonResponse(database_response.json(), status = 200, safe = False)
         
         
         
     return JsonResponse("Invalid Request", status = 400)

@csrf_exempt
def searchPlayer(request):
    if (request.method == "GET"):
          searchName = str(request.GET.get("name", ""))
          
          database_url = API_BASE_URL + f'/v2/functions/search_player?query={searchName}'
          headers = {
                'Authorization': 'Bearer '+ API_KEY, 
            }
          database_response = requests.get(database_url, headers=headers)
          return JsonResponse(database_response.json(), status = 200, safe = False)
         
         
    return JsonResponse("Invalid Request", status = 400)

@csrf_exempt
def get_badge_list(request): #creates a player after taking in a request from a mod
    if request.method == "GET":
        try:
          
           database_url = API_BASE_URL + "/v2/functions/badge_list"
          
           headers = {
                'Authorization': 'Bearer '+ API_KEY, 
           }
           
           database_response = requests.get(database_url, headers=headers)
           
           return JsonResponse(database_response.json(), status = 200, safe = False)
            
        except:
            return JsonResponse({"Error" : "Error trying to send data to database", "status" : 400})

    return JsonResponse({"Invalid Request" : 405})

@csrf_exempt
def badge_creation(request): #creates a player after taking in a request from a mod
    if request.method == "POST":
        try:
            incoming_data = json.loads(request.body)
            
            print(incoming_data["id"])

            badge_data = badge(
                name = incoming_data['name'],
                image = incoming_data['image'],
            )
            
            post_data = asdict(badge_data)
            
        except:
            return JsonResponse({"Error" : "Error trying to match data to base datatype", "status" : 400})
        try:
           
            headers = {'Authorization': 'Bearer '+ API_KEY}
            
            database_post = requests.post(API_BASE_URL + "/v2/weblite/HVZ_POLY/Badge", json = post_data , headers=headers)
            
            return JsonResponse({"status": database_post.status_code})

        except:
            return JsonResponse({database_post.status_code :'Error in sending badge data to database - Debug if needed'})

    return JsonResponse({"Invalid Request" : 405})


@csrf_exempt
def give_badge(request): #Gives badge to player
    if request.method == "POST":
 
            incoming_data = json.loads(request.body)
            
            player_badge = Player_Badge (
                player_id=incoming_data["player_id"],
                badge_name=incoming_data["badge_name"]
            )
            
            headers = {'Authorization': 'Bearer '+ API_KEY}
            
            
            post_data = asdict(player_badge)
            print(post_data)
            
            database_post = requests.post(API_BASE_URL + "/v2/functions/give_badge", json = post_data , headers=headers)
            
            return JsonResponse({"status": database_post.status_code})
        
            
       

       

    return JsonResponse({"Invalid Request" : 405})
 
# @csrf_exempt
# def infection_map(request): 
#     if request.method == "GET":
#         database_url = API_BASE_URL + "/v2/functions/inf_map"
#         headers = {
#             'Authorization': 'Bearer ' + API_KEY
#         }
        
        
        
#         response = requests.get(database_url, headers=headers)
#         database_response = response.json()

#         ozs = database_response.get('oz', {})
#         zombies = database_response.get('zombies', [])
#         all_players = ozs + zombies
#         oz_names = [oz["name"] for oz in ozs]

#         name_to_player = {player['name']: player for player in all_players}

#         #Creates list of all infections
#         infections = {}
#         for zombie in all_players:
#             named_tags = zombie.get('named_tags', '').strip()
#             if not named_tags:
#                 continue
#             infected_list = [n.strip() for n in named_tags.split(',') if n.strip()]
#             infections[zombie['name']] = infected_list

            
            
    

#         return JsonResponse({"infections": infections, "ozs": oz_names}, safe=False)

#     return JsonResponse({'error': 'Invalid Request'}, status=400)


# def build_tree(root_name: str, infections: dict[str, list[str]], visited=None, ):
#     if visited is None:
#         visited = set()
#     if root_name in visited:
#         return {} 
#     visited.add(root_name)

#     children = infections.get(root_name, [])
#     return {child: build_tree(child, infections, visited.copy()) for child in children}
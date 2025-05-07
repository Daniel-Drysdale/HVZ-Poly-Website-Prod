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
                'Authorization': 'Bearer ' + API_KEY, 
          
            }
        
        database_response = requests.get(database_url, headers=headers)
        print("Database GET request status: ", database_response.status_code)

        player_data = database_response.json().get("data", [])
            
            
            

        return JsonResponse(player_data, safe=False)
    
    
@csrf_exempt
def paginated_player_list(request):
    if request.method == "GET":
        page = int(request.GET.get("page", 1))
        itemsPerPage = int(request.GET.get("pageSize", 5))

        database_url = API_BASE_URL + f"/v2/functions/players?page={page}&pageSize={itemsPerPage}"
        
    
        headers = {
                'Authorization': 'Bearer '+ API_KEY, 
          
          
            }
        
        database_response = requests.get(database_url, headers=headers)
            
        player_data = database_response.json()

        return JsonResponse(player_data, safe=False)

    return JsonResponse({"Invalid Request": database_response.status})

@csrf_exempt
def player_count(request): 
     if (request.method == "GET"):
         database_url = API_BASE_URL + "/v2/functions/home"
         
         headers = {
                'Authorization': 'Bearer '+ API_KEY, 
          
            }
         
         database_response = requests.get(database_url, headers=headers)
          
         return JsonResponse(database_response.json(), status = 200, safe = False)
         
         
         
     return JsonResponse("Invalid Request", status = 400)
 
 
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
def infection_map(request): 
    if request.method == "GET":
        database_url = API_BASE_URL + "/v2/functions/inf_map"
        headers = {
            'Authorization': 'Bearer ' + API_KEY
        }
        
        response = requests.get(database_url, headers=headers)
        database_response = response.json()

        ozs = database_response.get('oz', [])
        zombies = database_response.get('zombies', [])
        all_players = ozs + zombies

        name_to_player = {player['name']: player for player in all_players}

        # Track infections: who infected whom
        infections = {}
        for infector in all_players:
            named_tags = infector.get('named_tags', '').strip()
            if not named_tags:
                continue
            infected_list = [n.strip() for n in named_tags.split(',') if n.strip()]
            infections[infector['name']] = infected_list

        # Assign levels using BFS from OZs
        levels = {}
        visited = set()
        queue = deque()

        for oz in ozs:
            name = oz['name']
            levels[name] = 0
            visited.add(name)
            queue.append((name, 0))

        while queue:
            current_name, current_level = queue.popleft()
            for infected in infections.get(current_name, []):
                if infected not in visited:
                    levels[infected] = current_level + 1
                    visited.add(infected)
                    queue.append((infected, current_level + 1))

        # Build nodes
        nodes = []
        for player in all_players:
            name = player['name']
            nodes.append({
                'id': name,
                'label': name,
                'type': 'oz' if player in ozs else 'zombie',
                'level': levels.get(name)
            })

        # Build links
        links = []
        for infector_name, infected_list in infections.items():
            for infected_name in infected_list:
                if infected_name in name_to_player:
                    links.append({
                        'source': infector_name,
                        'target': infected_name
                    })

        return JsonResponse({'nodes': nodes, 'links': links}, safe=False)

    return JsonResponse({'error': 'Invalid Request'}, status=400)
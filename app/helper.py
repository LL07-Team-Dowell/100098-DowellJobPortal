import json
import requests
import pprint


def dowellconnection(cluster, database, collection, document, team_member_ID, function_ID, command, field,
                     update_field):
    url = "http://uxlivinglab.pythonanywhere.com"
    # url = "http://100002.pythonanywhere.com/"
    payload = json.dumps({
        "cluster": cluster,
        "database": database,
        "collection": collection,
        "document": document,
        "team_member_ID": team_member_ID,
        "function_ID": function_ID,
        "command": command,
        "field": field,
        "update_field": update_field,
        "platform": "bangalore"
    })
    headers = {
        'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)
    res = json.loads(response.text)

    return res


def get_event_id():
    url = "https://uxlivinglab.pythonanywhere.com/create_event"

    data = {
        "platformcode": "FB",
        "citycode": "101",
        "daycode": "0",
        "dbcode": "pfm",
        "ip_address": "192.168.0.41",  # get from dowell track my ip function
        "login_id": "lav",  # get from login function
        "session_id": "new",  # get from login function
        "processcode": "1",
        "location": "22446576",  # get from dowell track my ip function
        "objectcode": "1",
        "instancecode": "100051",
        "context": "afdafa ",
        "document_id": "3004",
        "rules": "some rules",
        "status": "work",
        "data_type": "learn",
        "purpose_of_usage": "add",
        "colour": "color value",
        "hashtags": "hash tag alue",
        "mentions": "mentions value",
        "emojis": "emojis",
        "bookmarks": "a book marks"
    }

    r = requests.post(url, json=data)
    
    if r.status_code == 201:
        #print("r->", r.text,json.loads(r.text))
        return json.loads(r.text)
    else:
        #print("r---->", r.text,json.loads(r.text))
        return json.loads(r.text)['error']


# print(response['event_id'])

def call_notification(url, request_type, data):  ## calling  notification api
    if request_type == 'post':
        notification = requests.post(url, data)
        details = notification.json()
        return details
    elif request_type == 'get':
        notification = requests.get(url)
        details = notification.json()
        return details
    elif request_type == 'patch':
        notification = requests.patch(url, data)
        details = notification.json()
        return details

def update_number(string):
            updated_string = ""
            for char in string:
                if char.isdigit():
                    updated_string += f'C{str(int(char) + 1)}'
            return updated_string

def update_string(string):
            new_str = ""
            for char in string:
                if char=="C":
                    new_str = string.replace("C", "O")
            return new_str
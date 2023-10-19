from datetime import datetime, timedelta
import json
from app.helper import dowellconnection
from app.constant import *
import requests

def get_project_details():
    url = "https://100098.pythonanywhere.com/project_deadline/?type=get_project_hours_details&company_id=ABCD12345"
    
    response = requests.get(url)
    data = response.json()

    project_details = []
    
    if data['success'] and 'response' in data:
        for item in data['response']:
            _id = item['_id']
            project_name = item['project']
            total_time = item['total_time']
            project_details.append({"_id":_id,"project_name": project_name, "total_time": total_time})
--------------------------------------------------------------------------------------------------------------------
    for project in project_details:
        project_name = project.get('project_name')
        task_field = {
            "project": project_name,
            "company_id":"6385c0f18eca0fb652c94561"
        }
        task_response = json.loads(
            dowellconnection(*task_details_module, "fetch", task_field, update_field=None)
        )

        total_duration = timedelta()

        for task in task_response["data"]:
            start_time_str = task["start_time"]
            end_time_str = task["end_time"]

            start_time = datetime.strptime(start_time_str, "%H:%M")
            end_time = datetime.strptime(end_time_str, "%H:%M")

            task_duration = end_time - start_time
            total_duration += task_duration

        total_duration_str = str(total_duration)

        return total_duration_str
    
    print(get_project_details())
from datetime import datetime, timedelta
import json
import requests
import calendar
api_key = "1b834e07-c68b-4bf6-96dd-ab7cdc62f07f"
db_name= "Reports"
num_collections = 1

def datacube_add_collection(api_key,db_name,coll_names,num_collections):

    url = "https://datacube.uxlivinglab.online/db_api/add_collection/"

    data = {
        "api_key": api_key,
        "db_name": db_name,
        "coll_names": coll_names,
        "num_collections": num_collections,
    }

    response = requests.post(url, json=data)
    return response.text

def datacube_data_insertion(api_key,database_name,collection_name,data):
    url = "https://datacube.uxlivinglab.online/db_api/crud/"

    data = {
        "api_key": api_key,
        "db_name": database_name,
        "coll_name": collection_name,
        "operation": "insert",
        "data":data
    }
    response = requests.post(url, json=data)
    return response.text

def datacube_data_retrival(api_key,database_name,collection_name,data,limit,offset):
    url = "https://datacube.uxlivinglab.online/db_api/get_data/"
    data = {
        "api_key": api_key,
        "db_name": database_name,
        "coll_name": collection_name,
        "operation": "fetch",
        "filters":data,
        "limit": limit,
        "offset": offset     
    }

    response = requests.post(url, json=data)
    return response.text

def datacube_data_update(api_key,db_name,coll_name,query,update_data):
    url = "https://datacube.uxlivinglab.online/db_api/crud/"
    data = {
        "api_key": api_key,
        "db_name": db_name,
        "coll_name": coll_name,
        "operation": "update",
        "query" : query,
        "update_data":update_data
    }

    response = requests.put(url, json=data)
    return response.text

def set_date_format(date):
    try:
        iso_format = datetime.strptime(
            date, "%Y-%m-%d"
        ).strftime("%m/%d/%Y %H:%M:%S")
        return iso_format
    except Exception as e:
        try:
            iso_format = datetime.strptime(date, "%m/%d/%Y %H:%M:%S").strftime(
                "%m/%d/%Y %H:%M:%S"
            )
            return iso_format
        except Exception:
            try:
                iso_format = datetime.strptime(
                    date, "%Y-%m-%d %H:%M:%S.%f"
                ).strftime("%m/%d/%Y %H:%M:%S")
                return iso_format
            except Exception:
                try:
                    iso_format = datetime.strptime(
                        date, "%Y-%m-%dT%H:%M:%S.%fZ"
                    ).strftime("%m/%d/%Y %H:%M:%S")
                    return iso_format
                except Exception:
                    try:
                        iso_format = datetime.strptime(date, "%m/%d/%Y").strftime(
                            "%m/%d/%Y %H:%M:%S"
                        )
                        return iso_format
                    except Exception:
                        try:
                            date_string = date.replace(
                                "(West Africa Standard Time)", ""
                            ).rstrip()
                            iso_format = datetime.strptime(
                                date_string, "%a %b %d %Y %H:%M:%S %Z%z"
                            ).strftime("%m/%d/%Y %H:%M:%S")
                            return iso_format
                        except Exception:
                            try:
                                iso_format = datetime.strptime(
                                    date, "%d/%m/%Y"
                                ).strftime("%m/%d/%Y %H:%M:%S")
                                return iso_format
                            except Exception:
                                try:
                                    iso_format = datetime.strptime(
                                        date, "%d/%m/%Y %H:%M:%S"
                                    ).strftime("%m/%d/%Y %H:%M:%S")
                                    return iso_format
                                except Exception:
                                    try:
                                        iso_format = datetime.strptime(
                                            date, "%d/%m/%Y  %H:%M:%S"
                                        ).strftime("%m/%d/%Y %H:%M:%S")
                                        return iso_format
                                    except Exception:
                                        return ""

def get_month_details(date):
    month_list = calendar.month_name
    months = []
    datime = datetime.strptime(set_date_format(date), "%m/%d/%Y %H:%M:%S")
    month_name = month_list[datime.month]
    months.append(month_name)
    return (str(datime.year),month_name,months.count(month_name))


def dowellconnection(
    cluster,
    database,
    collection,
    document,
    team_member_ID,
    function_ID,
    command,
    field,
    update_field,
):
    url = "http://uxlivinglab.pythonanywhere.com"
    payload = json.dumps(
        {
            "cluster": cluster,
            "database": database,
            "collection": collection,
            "document": document,
            "team_member_ID": team_member_ID,
            "function_ID": function_ID,
            "command": command,
            "field": field,
            "update_field": update_field,
            "platform": "bangalore",
        }
    )
    headers = {"Content-Type": "application/json"}

    response = requests.request("POST", url, headers=headers, data=payload)
    res = json.loads(response.text)

    return res   
candidate_management_reports = [
    "jobportal",
    "jobportal",
    "candidate_reports",
    "candidate_report",
    "100098002",
    "ABCDE",
]
 
task_management_reports = [
    "jobportal",
    "jobportal",
    "task_reports",
    "task_reports",
    "100098007",
    "ABCDE",
]  
task_details_module = [
    "jobportal",
    "jobportal",
    "task_details",
    "task_details",
    "1000981019",
    "ABCDE",
]
team_management_modules = [
    "jobportal",
    "jobportal",
    "team_management_report",
    "team_management_report",
    "1201001",
    "ABCDE",
]
thread_report_module = [
    "jobportal",
    "jobportal",
    "ThreadReport",
    "ThreadReport",
    "1000981016",
    "ABCDE",
]

comment_report_module = [
    "jobportal",
    "jobportal",
    "ThreadCommentReport",
    "ThreadCommentReport",
    "1000981017",
    "ABCDE",
]

def update_report_database(task_created_date,company_id):
    field = {
            "task_created_date": task_created_date,
            "company_id": company_id
        }
    """fetch all of yesterdays tasks"""
    daily_tasks = json.loads(dowellconnection(*task_management_reports,"fetch",field,update_field=None))["data"]
    for _t in daily_tasks:
        tasks = json.loads(dowellconnection(*task_details_module, "fetch", field, update_field=None))
        for i,task in enumerate(tasks['data']):
            print(f"----------processing details for task {i}/{len(tasks['data'])}----------")
            if task['task_id']==_t["_id"]:
                """getting the candidates details"""
                info=json.loads(dowellconnection(*candidate_management_reports, "fetch", {'username':_t['task_added_by']}, update_field=None))['data'][0]
                info["application_id"] = info.pop('_id')
                info["year"]=str(datetime.today().year)

                """checking if the candidates details exists in the database"""
                coll_name =info['username']
                filter_param={"year":str(datetime.today().year)}
                query={"application_id":"63daf2b63ab37b524a3f0412",#info["application_id"],
                           "year":info["year"]}
                print(f"----------retrieving data from collection {coll_name} for {filter_param['year']}----------")
                get_collection = json.loads(datacube_data_retrival(api_key,db_name,coll_name,query,10,1))
                #print(get_collection,"==",coll_name)
                
                if get_collection['success']==False:
                    print(f'collection-{coll_name} for {filter_param["year"]} not found')
                    #inserting data collection-------------------------------------- 
                    #creating collection------------------------------
                    create_collection = json.loads(datacube_add_collection(api_key,db_name,coll_name,1))
                    if create_collection['success']==True:
                        print(f'successfully created the collection-{coll_name}')
                        #inserting data into the collection------------------------------
                        _d={}
                        for month in calendar.month_name[1:]:
                            task_added = 1
                            tasks_completed =0 
                            tasks_uncompleted =0
                            if (task["status"] == "Completed" or task["status"] == "Complete" or task["status"] == "completed" or task["status"] == "complete" or task["status"] == "Mark as complete"):
                                tasks_completed+=1
                            else:
                                tasks_uncompleted+=1
                            percentage_tasks_completed=(tasks_completed/task_added)*100
                            tasks_approved = 0
                            if (("approved" in task.keys() and task["approved"] == True) or ("approval" in task.keys() and task["approval"] == True)):
                                tasks_approved+=1

                            tasks_you_approved=0
                            tasks_you_marked_as_complete=0
                            tasks_you_marked_as_uncomplete=0
                            if (("task_approved_by" in task.keys() and task["task_approved_by"] == _t['task_added_by'])):
                                tasks_you_approved+=1
                                if (tasks_completed>0):
                                    tasks_you_marked_as_complete+=1
                                else:
                                    tasks_you_marked_as_uncomplete+=1
                            
                            """checking for teams============================================="""
                            teams= 0
                            team_tasks=0
                            team_tasks_completed= 0
                            team_tasks_uncompleted= 0
                            percentage_team_tasks_completed= 0.0
                            team_tasks_approved= 0
                            team_tasks_issues_raised= 0
                            team_tasks_issues_resolved= 0
                            team_tasks_comments_added= 0
                            
                            for team in json.loads(dowellconnection(*team_management_modules, "fetch", {"date_created":task_created_date}, update_field=None))['data']:
                                if 'members' in team.keys():
                                    if _t['task_added_by'] in team['members']:
                                        teams+=1
                                        if 'team_id' in task.keys():
                                            if (task['team_id']==team['_id']):    
                                                team_tasks+=1
                                                if (task["status"] == "Completed" or task["status"] == "Complete" or task["status"] == "completed" or task["status"] == "complete" or task["status"] == "Mark as complete"):
                                                    team_tasks_completed+=1
                                                else:
                                                    team_tasks_uncompleted+=1  
                                                percentage_team_tasks_completed =  (team_tasks_completed/team_tasks)*100
                                                if ('approved' in task.keys() and task['approved']==True):
                                                    team_tasks_approved+=1
                                                for issue in json.loads(dowellconnection(*thread_report_module, "fetch", {'team_id':team['_id'],"created_date":task_created_date,'created_by':_t['task_added_by']}, update_field=None))['data']:
                                                    team_tasks_issues_raised+=1
                                                    if issue["current_status"]=="Resolved" or 'Resolved' in issue["previous_status"]:
                                                        team_tasks_issues_resolved+=1
                                                    for comment in json.loads(dowellconnection(*thread_report_module, "fetch", {"thread_id":issue['_id'],"created_date":task_created_date,'created_by':_t['task_added_by']}, update_field=None))['data']:
                                                        team_tasks_comments_added+=1
                        
                            
                            
                            _d[month]={
                                "task_added": 1,
                                "tasks_completed": tasks_completed,
                                "tasks_uncompleted": tasks_uncompleted,
                                "tasks_approved": tasks_approved,
                                "percentage_tasks_completed": percentage_tasks_completed,
                                "tasks_you_approved": tasks_you_approved,
                                "tasks_you_marked_as_complete": tasks_you_marked_as_complete,
                                "tasks_you_marked_as_incomplete": tasks_you_marked_as_uncomplete,
                                "teams": teams,
                                "team_tasks": team_tasks,
                                "team_tasks_completed": team_tasks_completed,
                                "team_tasks_uncompleted": team_tasks_uncompleted,
                                "percentage_team_tasks_completed": percentage_team_tasks_completed,
                                "team_tasks_approved": team_tasks_approved,
                                "team_tasks_issues_raised": team_tasks_issues_raised,
                                "team_tasks_issues_resolved": team_tasks_issues_resolved,
                                "team_tasks_comments_added": team_tasks_comments_added
                            }
                            
                        data =info
                        data["task_report"]={}
                        data['data']=_d
                        insert_collection = json.loads(datacube_data_insertion(api_key,db_name,coll_name,data))
                        if insert_collection['success']==True:
                            print(f'successfully inserted the data the collection- {coll_name}')
                        else:
                            print(insert_collection)
                    
                else:
                    #print(get_collection)
                    #update collection------------------------------
                    if not get_month_details(task_created_date) ==None:
                        print(f'-------------updating the collection- {coll_name}--------------')
                        _year,_monthname,_monthcnt=get_month_details(task_created_date)
                        query={"application_id":info["application_id"],
                            "year":_year}
                        print("------analysing tasks for the month- ",_monthname,"------")
                        if len(get_collection['data']) > 0:
                            task_added = get_collection['data'][0]['data'][_monthname]["task_added"]+1
                            tasks_completed = get_collection['data'][0]['data'][_monthname]["tasks_completed"]
                            tasks_uncompleted = get_collection['data'][0]['data'][_monthname]["tasks_uncompleted"]
                            if (task["status"] == "Completed" or task["status"] == "Complete" or task["status"] == "completed" or task["status"] == "complete" or task["status"] == "Mark as complete"):
                                tasks_completed +=1
                            else:
                                tasks_uncompleted +=1
                            percentage_tasks_completed  = (tasks_completed/task_added)*100

                            tasks_approved = get_collection['data'][0]['data'][_monthname]["tasks_approved"]
                            if (("approved" in task.keys() and task["approved"] == True) or ("approval" in task.keys() and task["approval"] == True)):
                                tasks_approved +=1

                            tasks_you_approved = get_collection['data'][0]['data'][_monthname]["tasks_you_approved"]
                            tasks_you_marked_as_complete = get_collection['data'][0]['data'][_monthname]["tasks_you_marked_as_complete"]
                            tasks_you_marked_as_uncomplete = get_collection['data'][0]['data'][_monthname]["tasks_you_marked_as_incomplete"]
                                
                            if (("task_approved_by" in task.keys() and task["task_approved_by"] == _t['task_added_by'])):
                                tasks_you_approved+=1
                                if (tasks_completed>get_collection['data'][0]['data'][_monthname]["tasks_completed"]):
                                    tasks_you_marked_as_complete+=1
                                else:
                                    tasks_you_marked_as_uncomplete+=1

                            """checking for teams============================================="""
                            print("------analysing team tasks for the month- ",_monthname,"------")
                            teams= get_collection['data'][0]['data'][_monthname]["teams"]
                            team_tasks=get_collection['data'][0]['data'][_monthname]["team_tasks"]
                            team_tasks_completed= get_collection['data'][0]['data'][_monthname]["team_tasks_completed"]
                            team_tasks_uncompleted= get_collection['data'][0]['data'][_monthname]["team_tasks_uncompleted"]
                            percentage_team_tasks_completed= get_collection['data'][0]['data'][_monthname]["percentage_team_tasks_completed"]
                            team_tasks_approved= get_collection['data'][0]['data'][_monthname]["team_tasks_approved"]
                            team_tasks_issues_raised= get_collection['data'][0]['data'][_monthname]["team_tasks_issues_raised"]
                            team_tasks_issues_resolved= get_collection['data'][0]['data'][_monthname]["team_tasks_issues_resolved"]
                            team_tasks_comments_added= get_collection['data'][0]['data'][_monthname]["team_tasks_comments_added"]
                            
                            for team in json.loads(dowellconnection(*team_management_modules, "fetch", {"date_created":task_created_date}, update_field=None))['data']:
                                if 'members' in team.keys():
                                    if _t['task_added_by'] in team['members']:
                                        teams+=1
                                        
                                        if 'team_id' in task.keys():
                                            if (task['team_id']==team['_id']):    
                                                team_tasks+=1
                                                if (task["status"] == "Completed" or task["status"] == "Complete" or task["status"] == "completed" or task["status"] == "complete" or task["status"] == "Mark as complete"):
                                                    team_tasks_completed+=1
                                                else:
                                                    team_tasks_uncompleted+=1  
                                                percentage_team_tasks_completed =  (team_tasks_completed/team_tasks)*100
                                                if ('approved' in task.keys() and task['approved']==True):
                                                    team_tasks_approved+=1
                                                for issue in json.loads(dowellconnection(*thread_report_module, "fetch", {'team_id':team['_id'],"created_date":task_created_date,'created_by':_t['task_added_by']}, update_field=None))['data']:
                                                    team_tasks_issues_raised+=1
                                                    if issue["current_status"]=="Resolved" or 'Resolved' in issue["previous_status"]:
                                                        team_tasks_issues_resolved+=1
                                                    for comment in json.loads(dowellconnection(*thread_report_module, "fetch", {"thread_id":issue['_id'],"created_date":task_created_date,'created_by':_t['task_added_by']}, update_field=None))['data']:
                                                        team_tasks_comments_added+=1
                            
                            _d={
                                    "task_added": task_added,
                                    "tasks_completed": tasks_completed,
                                    "tasks_uncompleted": tasks_uncompleted,
                                    "tasks_approved": tasks_approved,
                                    "percentage_tasks_completed": percentage_tasks_completed,
                                    "tasks_you_approved": tasks_you_approved,
                                    "tasks_you_marked_as_complete": tasks_you_marked_as_complete,
                                    "tasks_you_marked_as_incomplete": tasks_you_marked_as_uncomplete,
                                    "teams": teams,
                                    "team_tasks": team_tasks,
                                    "team_tasks_completed": team_tasks_completed,
                                    "team_tasks_uncompleted": team_tasks_uncompleted,
                                    "percentage_team_tasks_completed": percentage_team_tasks_completed,
                                    "team_tasks_approved": team_tasks_approved,
                                    "team_tasks_issues_raised": team_tasks_issues_raised,
                                    "team_tasks_issues_resolved": team_tasks_issues_resolved,
                                    "team_tasks_comments_added": team_tasks_comments_added
                                }
                            

                            get_collection['data'][0]['data'][_monthname]=_d
                            data=get_collection['data'][0]['data']
                            update_data={"data":data} #'''incomplete---'''
                            update_collection = json.loads(datacube_data_update(api_key,db_name,coll_name,query,update_data))
                            if update_collection['success']==True:
                                print(f"------successfully updated the data the collection- {coll_name}------")
                            else:
                                print(f"------failed to update the data the collection- {coll_name}----{update_collection['message']}")
                        else:
                            print(f"------failed to fetch the data from the collection- {coll_name}----{get_collection}")


if __name__ == "__main__":
    company_id = "6385c0f18eca0fb652c94561"
    
    search_date=datetime.today().date() - timedelta(days=1)
    #search_year = str(search_date.year)
    search_date = str(search_date)
    
    update_report_database(search_date,company_id)
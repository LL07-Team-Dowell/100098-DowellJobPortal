from django.db import models
import jsonfield

# userprofile settings----------

class SettingUserProfileInfo(models.Model):
    company_id = models.CharField(max_length=400)
    org_name = models.CharField(max_length=400)
    owner = models.CharField(max_length=400)
    data_type = models.CharField(max_length=400)
    profile_info = jsonfield.JSONField()

    def __str__(self):
        return f"{self.company_id}"

class UserProject(models.Model):
    company_id = models.CharField(max_length=400)
    data_type = models.CharField(max_length=100)
    project_list = jsonfield.JSONField()

    def __str__(self):
        return f"{self.company_id}" 

class UsersubProject(models.Model):
    parent_project=models.CharField(max_length=100)
    sub_project_list = jsonfield.JSONField()
    company_id = models.CharField(max_length=400)
    data_type = models.CharField(max_length=100)
    link_id=models.CharField(max_length=100,default="test")
    def __str__(self):
        return f"{self.parent_project}"
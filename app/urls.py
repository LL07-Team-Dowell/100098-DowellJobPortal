from django.urls import path
from .views import *

urlpatterns = [
    path('', serverStatus.as_view()),

    # accounts management-------------------------------------------
    path('onboard_candidate/<document_id>', onboard_candidate.as_view()),
    path('update_project/', update_project.as_view()),
    path('rehire_candidate/', rehire_candidate.as_view()),
    path('reject_candidate/', reject_candidate.as_view()),

    # admin management-------------------------------------------
    path('create_jobs/', create_jobs.as_view()),
    path('get_jobs/<str:company_id>/', get_jobs.as_view()),
    path('get_job/<str:document_id>/', get_job.as_view()),
    path('update_jobs/', update_jobs.as_view()),
    path('delete_job/', delete_job.as_view()),

    # candidate management-------------------------------------------
    path('apply_job/', apply_job.as_view()),
    path('get_job_application/<str:company_id>/', get_job_application.as_view()),
    path('get_candidate_application/<str:document_id>/', get_candidate_application.as_view()),
    path('get_all_onboarded_candidate/<str:company_id>/', get_all_onboarded_candidate.as_view()),
    path('delete_candidate_application/', delete_candidate_application.as_view()),

    # hr management--------------------------------------------------
    path('shortlisted_candidate/', shortlisted_candidate.as_view()),
    path('selected_candidate/', selected_candidate.as_view()),
    path('reject_candidate/', reject_candidate.as_view()),

    # lead management------------------------------------------------
    path('hire_candidate/', hire_candidate.as_view()),
    path('rehire_candidate/', rehire_candidate.as_view()),
    path('reject_candidate/', reject_candidate.as_view()),

    # task management------------------------------------------------
    path('create_task/', create_task.as_view()),
    path('get_task/<str:company_id>/', get_task.as_view()),
    path('get_candidate_task/<str:document_id>/', get_candidate_task.as_view()),
    path('update_task/', update_task.as_view()),
    path('delete_task/', delete_task.as_view()),

    # team task management--------------------------------------------
    path('create_team/', create_team.as_view()),
    path('get_team/<str:document_id>/', get_team.as_view()),
    path('get_all_teams/<str:company_id>/', get_all_teams.as_view()),
    path('edit_team/<str:document_id>/', edit_team.as_view(), ),
    path('delete_team/<int:team_id>/', delete_team.as_view()),
    path('create_team_task/', create_team_task.as_view()),
    path('get_team_task/<str:task_id>/', get_team_task.as_view()),
    path('delete_team_task/<int:task_id>/', delete_team_task.as_view(),

    # training management--------------------------------------------
    path('create_question/', create_question.as_view()),
    path("get_question/<str:document_id>/", get_question.as_view()),
    path("get_all_question/<str:company_id>/", get_all_question.as_view()),
    path("update_question/", update_question.as_view()),
    path('create_response/', response.as_view()),
    path('update_response/', update_response.as_view()),
    path('get_response/<str:document_id>/', get_response.as_view()),
    path("submit_response/", submit_response.as_view()),
    path("get_all_responses/<str:company_id>/", get_all_responses.as_view())
]

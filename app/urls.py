from django.urls import path
from .views import *

urlpatterns = [
    # job portal-------------------------------------------
    path('', serverStatus.as_view()),

    # accounts management-------------------------------------------
    path('accounts_onboard_candidate/', accounts_onboard_candidate.as_view()),
    path('accounts_update_project/', accounts_update_project.as_view()),
    path('accounts_rehire_candidate/', accounts_rehire_candidate.as_view()),
    path('accounts_reject_candidate/', accounts_reject_candidate.as_view()),
    path('onboard_candidate/<str:document_id>', accounts_onboard_candidate.as_view()),
    path('update_project/', accounts_update_project.as_view()),
    path('rehire_candidate/', accounts_rehire_candidate.as_view()),
    path('reject_candidate/', accounts_reject_candidate.as_view()),

    # admin management-------------------------------------------
    path('admin_create_jobs/', admin_create_jobs.as_view()),
    path('admin_get_job/<str:document_id>/', admin_get_job.as_view()),
    path('admin_get_all_jobs/<str:company_id>/', admin_get_all_jobs.as_view()),
    path('admin_update_jobs/', admin_update_jobs.as_view()),
    path('admin_delete_job/<str:document_id>/', admin_delete_job.as_view()),

    # candidate management-------------------------------------------
    path('candidate_apply_job/', candidate_apply_job.as_view()),
    path('candidate_get_job_application/<str:company_id>/', candidate_get_job_application.as_view()),
    path('get_all_onboarded_candidate/<str:company_id>/', get_all_onboarded_candidate.as_view()),
    path('get_candidate_application/<str:document_id>/', get_candidate_application.as_view()),
    path('delete_candidate_application/<str:document_id>/', delete_candidate_application.as_view()),

    # hr management--------------------------------------------------
    path('hr_shortlisted_candidate/', hr_shortlisted_candidate.as_view()),
    path('hr_selected_candidate/', hr_selected_candidate.as_view()),
    path('hr_reject_candidate/', hr_reject_candidate.as_view()),

    # lead management------------------------------------------------
    path('lead_hire_candidate/', lead_hire_candidate.as_view()),
    path('lead_rehire_candidate/', lead_rehire_candidate.as_view()),
    path('lead_reject_candidate/', lead_reject_candidate.as_view()),

    # task management------------------------------------------------
    path('create_task/', create_task.as_view()),
    path('get_task/<str:company_id>/', get_task.as_view()),
    path('get_candidate_task/<str:document_id>/', get_candidate_task.as_view()),
    path('update_task/', update_task.as_view()),
    path('task_request_update/<str:document_id>/', task_request_update.as_view()),
    path('approve_task/', approve_task.as_view()),
    path('delete_task/<str:document_id>/', delete_task.as_view()),
    
    # task management v2-----------
    path('task_module/', task_module.as_view()),


    # team task management--------------------------------------------
    path('create_team/', create_team.as_view()),
    path('get_team/<str:team_id>/', get_team.as_view()),
    path('get_all_teams/<str:company_id>/', get_all_teams.as_view()),
    path('edit_team/<str:team_id>/', edit_team.as_view()),
    path('delete_team/<str:team_id>/', delete_team.as_view()),
    path('create_team_task/', create_team_task.as_view()),
    path('edit_team_task/<str:task_id>/', edit_team_task.as_view()),
    path('get_team_task/<str:team_id>/', get_team_task.as_view()),
    path('delete_team_task/<str:task_id>/', delete_team_task.as_view()),
    path('create_member_task/', create_member_task.as_view()),
    path('get_member_task/<str:task_id>/', get_member_task.as_view()),
    path('delete_member_task/<str:task_id>/', delete_member_task.as_view()),

    # training management--------------------------------------------
    path('create_question/', create_question.as_view()),
    path("get_question/<str:document_id>/", get_question.as_view()),
    path("get_all_question/<str:company_id>/", get_all_question.as_view()),
    path("update_question/", update_question.as_view()),
    path('create_response/', response.as_view()),
    path('update_response/', update_response.as_view()),
    path('get_response/<str:document_id>/', get_response.as_view()),
    path("submit_response/", submit_response.as_view()),
    path("get_all_responses/<str:company_id>/", get_all_responses.as_view()),
    path("update_rating/", update_rating.as_view()),

    # settings -------------------------------------------------------
    path('settinguserprofileinfo/', SettingUserProfileInfoView.as_view()),
    path('settinguserprofileinfo/<int:pk>', SettingUserProfileInfoView.as_view()),
    path('settinguserproject/', SettingUserProjectView.as_view()),
    path('settinguserproject/<int:pk>', SettingUserProjectView.as_view()),
    path('settinguserdatatype/<int:pk>', SettingUserProfileInfoView.as_view()),
    path('settingusersubproject/', settingUserSubProject.as_view()),
    path('settingusersubproject/<int:pk>/',settingUserSubProject.as_view()),
    path('getusersubproject/', settingUserSubProject.as_view()),



    # discord -------------------------------------------------------
    path('generate_discord_invite/', generate_discord_invite.as_view()),
    path('get_discord_server_channels/<str:token>/<int:guild_id>/', get_discord_server_channels.as_view()),
    path('get_discord_server_members/<str:token>/<int:guild_id>/', get_discord_server_members.as_view()),

    # public job application link-------------------------------------
    path('public_candidate_job_application/',Public_apply_job.as_view()),
    path('generate_public_job_application_link/', createPublicApplication.as_view()),
    path('generate_public_job_application_link/<str:company_id>/', createPublicApplication.as_view()),
    path('send_mail_to_public/',sendMailToPublicCandidate.as_view()),
    path('update_user_status/',updateTheUserDetails.as_view()),
    path('public_product_url/',public_product.as_view()),
    path('fetch_public_product_url/<str:job_company_id>/',public_product.as_view()),

    # Thread-------------------------------------
    path('fetch_thread/<str:document_id>/',Thread_Apis.as_view()),
    path('fetch_team_thread/<str:team_id>/',GetTeamThreads.as_view()),
    path('fetch_all_threads/',GetAllThreads.as_view()),
    path('create_thread/',Thread_Apis.as_view()),
    path('update_thread/', Thread_Apis.as_view()),

    # Comment-------------------------------------
    path('fetch_comment/<str:document_id>/',Comment_Apis.as_view()),
    path('create_comment/',Comment_Apis.as_view()),
    path('update_comment/', Comment_Apis.as_view()),

    # Generate Report -------------------------------------
    path('generate_admin_report/',Generate_admin_Report.as_view()),
    path('get_all_qrcode/<str:job_company_id>/',GetQRCode.as_view()),
    path('generate_public_report/',Generate_public_Report.as_view()),      
    path('generate_hr_report/',Generate_hr_Report.as_view()),
    path('generate_account_Report/',Generate_account_Report.as_view()),
    path('generate_candidate_Report/',Generate_candidate_Report.as_view()),
    path('generate_team_Report/',Generate_Team_Report.as_view()),
    path('generate_lead_Report/',Generate_Lead_Report.as_view()),
    path('generate_candidate_duplicates/<str:company_id>/',Generate_candidate_dublicates.as_view()),
    path('generate_individual_Report/',Generate_Individual_Report.as_view()),

    # Payment Request Status -------------------------------------
    path('update_payment_request_status/<str:document_id>/',Update_payment_status.as_view())
]


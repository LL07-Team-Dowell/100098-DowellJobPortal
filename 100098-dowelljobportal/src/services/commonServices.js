import { formerBackendAxiosInstance } from "./axios"

export const getJobs = async () => {
    return await formerBackendAxiosInstance.get("/jobs/get_jobs/");
}

export const getCandidateApplications = async () => {
    return await formerBackendAxiosInstance.get("/jobs/get_applications/");
}

export const getAllCandidateInterviews = async () => {
    return await formerBackendAxiosInstance.get("/jobs/meeting/");
}

export const fetchCandidateTasks = async () => {
    return await formerBackendAxiosInstance.get("/jobs/get_tasks/")
}

export const getProjects = async () => {
    return await formerBackendAxiosInstance.get("/jobs/project/");
}

export const updateSingleTask = async (taskIdToUpdate, dataToPost) => {
    return await formerBackendAxiosInstance.post("/jobs/update_task/" + taskIdToUpdate, dataToPost)
}

export const addNewTask = async (data) => {
    return await formerBackendAxiosInstance.post("/jobs/add_new_task/", data)
}

export const updateCandidateApplication = async (applicationId, data) => {
    return await formerBackendAxiosInstance.post("/jobs/update_application/" + applicationId + "/", data)
}
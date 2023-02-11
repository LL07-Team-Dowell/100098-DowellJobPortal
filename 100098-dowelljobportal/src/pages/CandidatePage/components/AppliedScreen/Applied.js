import React, {useState, useEffect} from 'react';
import './Applied.css';
import { mutableNewApplicationStateNames } from '../../../../contexts/NewApplicationContext';
import TogglerNavMenuBar from '../../../../components/TogglerNavMenuBar/TogglerNavMenuBar';
import JobCard from '../../../../components/JobCard/JobCard';
import { candidateStatuses } from '../../utils/candidateStatuses';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../../../components/LoadingSpinner/LoadingSpinner';
import { useCandidateJobsContext } from '../../../../contexts/CandidateJobsContext';
import { getAllCandidateInterviews, getCandidateApplications, getJobs } from '../../../../services/commonServices';


function Applied({ currentUser }) {
  const [ currentNavigationTab, setCurrentNavigationTab ] = useState("Applied");
  const { candidateJobs, setCandidateJobs } = useCandidateJobsContext();
  const [ loading, setLoading ] = useState(true);
  const navigate = useNavigate();
  
  // const getAppliedData = async () => {
  //   const response = await myAxiosInstance.get(routes.Applications);
  //   const jobsResponse = await myAxiosInstance.get(routes.Jobs);

  //   if (Array.isArray(candidateJobs.appliedJobs) && candidateJobs.appliedJobs.length > 1) return setLoading(false);

  //   const currentUserApplications = response.data.filter(application => application.applicant === currentUser.username);
  //   const currentUserAppliedJobs = jobsResponse.data.filter((currentJob) => currentUserApplications.find(({ job }) => currentJob.id === job));
  //   setCandidateJobs((prevJobs) => { return { ...prevJobs, "appliedJobs": currentUserAppliedJobs }});
  //   setCandidateJobs((prevJobs) => { return { ...prevJobs, "currentUserApplications": currentUserApplications }});
  //   return setLoading(false);
  // }

  // const getUserInterviews = async () => {
  //   const response = await myAxiosInstance.get(routes.Meeting);
  //   setCandidateJobs((prevJobs) => { return { ...prevJobs, "userInterviews": response.data.filter(meeting => meeting.applicant === currentUser.username) }});
  //   return
  // }

  useEffect(() => {

    getCandidateApplications().then(async (res) => {
  
      try {
        const jobs = await (await getJobs()).data;

        if (Array.isArray(candidateJobs.appliedJobs) && candidateJobs.appliedJobs.length > 1) return setLoading(false);
        
        const currentUserApplications = res.data.filter(application => application.applicant === currentUser.username);
        const currentUserAppliedJobs = jobs.data.filter((currentJob) => currentUserApplications.find(({ job }) => currentJob.id === job));
        setCandidateJobs((prevJobs) => { return { ...prevJobs, "appliedJobs": currentUserAppliedJobs }});
        setCandidateJobs((prevJobs) => { return { ...prevJobs, "currentUserApplications": currentUserApplications }});
        return setLoading(false);

      } catch (error) {
        console.log(error);
        setLoading(false);
      }
      
    }).catch(err => {
      console.log(err);
      setLoading(false);
    })

    getAllCandidateInterviews().then(res => {
    
      setCandidateJobs((prevJobs) => { return { ...prevJobs, "userInterviews": res.data.filter(meeting => meeting.applicant === currentUser.username) }});
      
    }).catch(err => {
      console.log(err)
    });

  }, [])

  return <>
    <TogglerNavMenuBar className={"applied__Nav__Toggler"} menuItems={["Applied", "Interview", "Declined"]} handleMenuItemClick={(item) => setCurrentNavigationTab(item)} currentActiveItem={currentNavigationTab} />
    <div className="candidate__View__Applications__Container">
    {
      loading ? <LoadingSpinner /> :

      currentNavigationTab === "Applied" ? <>
        {
          React.Children.toArray(candidateJobs.appliedJobs.map(appliedJob => {
            return <JobCard 
              job={appliedJob} 
              showCandidateAppliedJob={true}
              buttonText={"View"}
              handleBtnClick={(job) => navigate("/applied/view_job_application", { state: { jobToView: job, applicationDetails: candidateJobs.currentUserApplications.find(application => application.job === appliedJob.id) } })}
            />
          }))
        }
      </> :

      currentNavigationTab === "Interview" ? <>
        {
          React.Children.toArray(candidateJobs.userInterviews.map(interview => {
            return <JobCard 
              job={candidateJobs.appliedJobs.find(appliedJob => appliedJob.id === interview.job_applied)} 
              interviewDetails={interview} 
              showCandidateInterview={true}
              guestUser={currentUser.role === process.env.REACT_APP_GUEST_ROLE ? true : false}
              currentApplicationStatus={candidateJobs.currentUserApplications.find(application => application.job === interview.job_applied).status} 
              handleBtnClick={
                () => candidateJobs.currentUserApplications.find(application => application.job === interview.job_applied).others[mutableNewApplicationStateNames.hr_discord_link] ? 
                window.location = candidateJobs.currentUserApplications.find(application => application.job === interview.job_applied).others[mutableNewApplicationStateNames.hr_discord_link] : 
                () => {}
              }
              buttonText={"Discord"}
            />
          }))
        }
      </> :

      currentNavigationTab === "Declined" ? <>
        {
          React.Children.toArray(candidateJobs.appliedJobs.filter(job => job.status === candidateStatuses.REJECTED).map(appliedJob => {
            return <JobCard 
              job={appliedJob}
              applicationDetails={candidateJobs.currentUserApplications.find(application => application.job === appliedJob.id)}
              showCandidateDeclinedJob={true}
              buttonText={"Closed"}
            />
          }))
        }
      </> : <></>
    }
    </div>
  </>
}

export default Applied;

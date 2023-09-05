import ApplicantIntro from "../../components/ApplicantIntro/ApplicantIntro";
import AssignedProjectDetails from "../../components/AssignedProjectDetails/AssignedProjectDetails";
import CustomHr from "../../components/CustomHr/CustomHr";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CandidateTaskItem from "../../components/CandidateTaskItem/CandidateTaskItem";
import React, { useEffect, useState } from "react";
import "./style.css";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useCandidateTaskContext } from "../../../../contexts/CandidateTasksContext";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getDaysInMonth } from "../../../../helpers/helpers";
import { differenceInCalendarDays } from "date-fns";
import { useCurrentUserContext } from "../../../../contexts/CurrentUserContext";
import { getCandidateTask, getCandidateTasksOfTheDayV2 } from "../../../../services/candidateServices";
import styled from "styled-components";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import Navbar from "../CreateMembersTask/component/Navbar";
import { getSettingUserProject } from "../../../../services/hrServices";
import { getCandidateTasksV2 } from "../../../../services/teamleadServices";
import { extractNewTasksAndAddExtraDetail } from "../../util/extractNewTasks";

const TaskScreen = ({
  handleAddTaskBtnClick,
  candidateAfterSelectionScreen,
  handleEditBtnClick,
  className,
  assignedProject,
  showBackBtn,
  loadProjects,
  isGrouplead,
}) => {
  const { currentUser } = useCurrentUserContext();
  const { userTasks, setUserTasks } = useCandidateTaskContext();
  const navigate = useNavigate();
  const [tasksToShow, setTasksToShow] = useState([]);
  const [daysInMonth, setDaysInMonth] = useState(0);
  const [currentMonth, setCurrentMonth] = useState("");
  const [datesToStyle, setDatesToStyle] = useState([]);

  const [project, setproject] = useState(null);
  const [tasksofuser, settasksofuser] = useState([]);
  const [taskdetail2, settaskdetail2] = useState([]);
  const [value, onChange] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [singleTaskLoading, setSingleTaskLoading] = useState(false);
  const [ tasksForTheDay, setTasksForTheDay ] = useState(null);
  const [ allProjects, setAllProjects ] = useState([]);
  const [ params, setParams ] = useSearchParams();
  const [ tasksForProjectLoading, setTasksForProjectLoading ] = useState(false);

  console.log(assignedProject);
  useEffect(() => {
    setLoading(true);
    setproject(assignedProject[0]);

    Promise.all([
      getCandidateTask(currentUser.portfolio_info[0].org_id),
      loadProjects && getSettingUserProject(),
    ]).then(res => {
        setUserTasks(
          res[0]?.data?.response?.data?.filter(
            (v) => v.applicant === currentUser.userinfo.username
          )
        );
        setLoading(false);

        if (loadProjects) {
          const list = res[1]?.data
          ?.filter(
            (project) =>
              project?.data_type === currentUser.portfolio_info[0].data_type &&
              project?.company_id === currentUser.portfolio_info[0].org_id &&
              project.project_list &&
              project.project_list.every(
                (listing) => typeof listing === "string"
              )
          ).reverse();

          setAllProjects(
            list.length < 1  ? []
            :
            list[0]?.project_list
          )

          list.length > 0 && setproject(list[0]?.project_list[0]);
        }
    }).catch(err => {
      setLoading(false);
    })

  }, []);

  useEffect(() => {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    settaskdetail2(
      userTasks.filter((d) => {
        const dateTime =
          d.task_created_date.split(" ")[0] +
          " " +
          d.task_created_date.split(" ")[1] +
          " " +
          d.task_created_date.split(" ")[2] +
          " " +
          d.task_created_date.split(" ")[3];
        const calendatTime =
          value.toString().split(" ")[0] +
          " " +
          value.toString().split(" ")[1] +
          " " +
          value.toString().split(" ")[2] +
          " " +
          value.toString().split(" ")[3];
        console.log({ dateTime, calendatTime });
        return dateTime === calendatTime;
      })
    );
  }, [value, userTasks]);

  useEffect(() => {
    if (!project || tasksForProjectLoading) return;

    const dataToPost = {
      "company_id": currentUser.portfolio_info[0].org_id,
      "data_type": currentUser.portfolio_info[0].data_type,
      "project": project,
    }

    setTasksForProjectLoading(true);

    const previousTasks = userTasks.filter(t => !t.task && !t.user_id && t.project);

    getCandidateTasksV2(dataToPost).then(res => {
      setTasksForProjectLoading(false);
      const foundTasksForCandidate = extractNewTasksAndAddExtraDetail(res.data.task_details, res.data.task)?.filter(item => item.user_id === currentUser.userinfo.userID && item.project === project);
      
      const projectsMatching = [
        ...previousTasks.filter(
          (task) => task?.project === project
        ),
        ...foundTasksForCandidate
      ]
      console.log(projectsMatching);
      const datesUserHasTaskForProject = [
        ...new Set(
          projectsMatching.map((task) => [new Date(task.task_created_date)])
        ).values(),
      ].flat();
      setDatesToStyle(datesUserHasTaskForProject);
  
      settaskdetail2(projectsMatching.filter(item => item.task_created_date === value));
    }).catch(err => {
      console.log(err);
      setTasksForProjectLoading(false);
    })
  }, [project]);

  useEffect(() => {
    if (!currentUser) return navigate(-1);
    if (userTasks.length > 0) return;

    setproject(assignedProject[0]);

    getCandidateTask(currentUser.portfolio_info[0].org_id)
      .then((res) => {
        const tasksForCurrentUser = res.data.response.data.filter(
          (v) => v.applicant === currentUser.userinfo.username
        );
        setUserTasks(tasksForCurrentUser);
        settaskdetail2(
          userTasks.filter(
            (d) =>
              new Date(d.task_created_date).toDateString() ===
              new Date().toLocaleDateString()
          )
        );

        // setTasksToShow(tasksForCurrentUser.filter(task => new Date(task.created).toLocaleDateString() === new Date().toLocaleDateString()));

        const datesUserHasTask = [
          ...new Set(
            tasksForCurrentUser.map((task) => [
              new Date(task.task_created_date),
            ])
          ).values(),
        ].flat();
        setDatesToStyle(datesUserHasTask);
      })
      .catch((err) => {
        console.log(err);
      });

    const today = new Date();

    setDaysInMonth(getDaysInMonth(today));
    setCurrentMonth(today.toLocaleDateString("en-us", { month: "long" }));
  }, []);

  useEffect(() => {
    setTasksToShow(
      userTasks.filter(
        (task) =>
          new Date(task.task_created_date).toDateString() ===
          new Date().toDateString()
      )
    );
  }, [userTasks]);

  useEffect(() => {
    const tab = params.get('tab');
    if (!tab || tab === 'pending') return setPanding(true);

    setPanding(false);
  }, [params])

  const isSameDay = (a, b) => differenceInCalendarDays(a, b) === 0;

  const tileClassName = ({ date, view }) => {
    // Add class to tiles in month view only
    if (view === "month") {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      if (tasksForProjectLoading) return ''
      if (datesToStyle.find((dDate) => isSameDay(dDate, date))) {
        return "task__Indicator";
      }
    }
  };

  const handleDateChange = async (dateSelected) => {
    setDaysInMonth(getDaysInMonth(dateSelected));

    // setTasksToShow(userTasks.filter(task => new Date(task.created).toDateString() === dateSelected.toDateString()));
    settaskdetail2(
      userTasks.filter(
        (d) =>
          new Date(d.task_created_date).toDateString() ===
          dateSelected.toDateString()
      )
    );
    setCurrentMonth(
      dateSelected.toLocaleDateString("en-us", { month: "long" })
    );

    setSingleTaskLoading(true);
    setTasksForTheDay(null);

    const currentDate = new Date(new Date(dateSelected).setHours(dateSelected.getHours() + 1)).toISOString().split('T')[0]
    const dataToPost = {
      "company_id": currentUser.portfolio_info[0].org_id,
      "user_id": currentUser.userinfo.userID,
      "data_type": currentUser.portfolio_info[0].data_type,
      "task_created_date": currentDate,
    }

    try {
      const res = (await getCandidateTasksOfTheDayV2(dataToPost)).data;

      if (res.task.length > 0) {
        setTasksForTheDay(res.task)
      }
      setSingleTaskLoading(false);
    } catch (error) {
      console.log(error);
      setSingleTaskLoading(false);
    }

  };

  const Wrappen = styled.section`
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 2rem;
    padding-top: 30px;
    flex-direction: row;
    width: 32%;
    margin-right: auto;
    margin-left: auto;

    

    a {
      border-radius: 10px;
      background: #f3f8f4;
      color: #b8b8b8;
      font-family: "Poppins", sans-serif;
      font-weight: 500;
      font-size: 1rem;
      line-height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      letter-spacing: 0.01em;
      cursor: pointer;
      width: 10rem;
      height: 3rem;
      transition: 0.3s ease-in-out;
      text-align: center;
    }
    .link-isActive {
      background: #005734;
      box-shadow: 0px 2.79922px 25px rgba(0, 87, 52, 0.67);
      color: #fff;
    }


    @media only screen and (max-width: 1000px) {
      width: 90%;

      a{
        font-size: 0.8rem;
      }

      

    }

  `;

  const [panding, setPanding] = useState(true);
  const clickToPandingApproval = () => {
    setPanding(true);
  };

  const clickToApproved = () => {
    setPanding(false);
  };

  return (
    <>
      {
        showBackBtn && <>
          <Navbar 
            title={'Your tasks'} 
            removeButton={true} 
          />
        </>
      }
      <Wrappen>
        <NavLink
          className={`${panding ? "link-isActive" : "link-notactive"}`}
          to={
            isGrouplead ? 
            "/user-tasks?tab=pending"
            :
            "/task?tab=pending"
          }
          onClick={clickToPandingApproval}
        >
          Pending Approval
        </NavLink>
        <NavLink
          className={`${panding ? "link-notactive" : "link-isActive"}`}
          to={
            isGrouplead ? 
            "/user-tasks?tab=approval"
            :
            "/task?tab=approval"
          }
          onClick={clickToApproved}
        >
          Approved
        </NavLink>
      </Wrappen>

      <div
        className={`candidate-task-screen-container ${className ? className : ""
          }`}
      >
        {!candidateAfterSelectionScreen && (
          <>
            <ApplicantIntro showTask={true} applicant={currentUser.username} />

            <CustomHr />
          </>
        )}

        <AssignedProjectDetails
          assignedProject={
            project ? project 
            :
            loadProjects ?
            allProjects[0]
            : 
            assignedProject[0]
          }
          showTask={true}
          availableProjects={
            loadProjects ?
            allProjects
            :
            assignedProject
          }
          removeDropDownIcon={false}
          handleSelectionClick={(e) => setproject(e)}
        />

        <div className="all__Tasks__Container">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <Calendar
                onChange={handleDateChange}
                value={value}
                tileClassName={tileClassName}
              />
              <div className="tasks__Wrapper">
                {
                  tasksForProjectLoading ? <>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <LoadingSpinner 
                        width={'16px'}
                        height={'16px'}
                      />
                      <p className="task__Title" style={{ margin: 0 }}>Filtering tasks...</p>
                    </div>
                  </> :
                  singleTaskLoading ? <>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <LoadingSpinner 
                        width={'16px'}
                        height={'16px'}
                      />
                      <p className="task__Title" style={{ margin: 0 }}>Loading tasks...</p>
                    </div>
                    
                  </> :
                  <>
                    {taskdetail2.length > 0 && (
                      <>
                        <p className="task__Title">Tasks Added</p>
                      </>
                    )}
                    <ul>
                      {
                        taskdetail2.length > 0 ?
                          tasksForTheDay && Array.isArray(tasksForTheDay) ? 
                            tasksForTheDay.filter(task => task.project === project && task.is_active && task.is_active === true).length < 1 ? <>
                              <p className="task__Title">{!project ? "No project selected" : "No tasks found for today"}</p>
                            </> :
                            <>
                              {
                                React.Children.toArray(tasksForTheDay.filter(task => task.project === project && task.is_active && task.is_active === true).map(task => {
                                  return <div style={{ color: "#000", fontWeight: 500, fontSize: "1rem" }}>
                                    {new Date(task.task_created_date).toLocaleString(
                                      "default",
                                      { month: "long" }
                                    )}
                                    <p style={{ display: "inline", marginLeft: "0.2rem" }}>{new Date(task.task_created_date).getDate()}</p>
        
                                    <p style={{ display: "inline", marginLeft: "0.7rem", fontSize: "0.9rem" }}>
                                      {task.task} <span style={{ color: "#B8B8B8" }}> from {task.start_time} to {task.end_time}</span>
                                    </p>
                                  </div>
                                }))
                              }
                            </>
                          :

                          taskdetail2.map((d, i) => (
                          <div style={{ color: "#000", fontWeight: 500, fontSize: "1rem" }} key={i}>
                            {new Date(d.task_created_date).toLocaleString(
                              "default",
                              { month: "long" }
                            )}
                            <p style={{ display: "inline", marginLeft: "0.2rem" }}>{new Date(d.task_created_date).getDate()}</p>

                            <p style={{ display: "inline", marginLeft: "0.7rem", fontSize: "0.9rem" }}>
                              {d.task}
                            </p>
                          </div>
                        ))
                        : 
                        "No Tasks Found For Today"
                      }
                    </ul> 
                  </>
                }
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TaskScreen;

{
  /* <div className="task__Details__Item">
    <h3 className="month__Title">{currentMonth}</h3>
    {
        tasksToShow.length === 0 ? <p className="empty__Task__Content">No tasks found for today</p> :

        React.Children.toArray(tasksToShow.map((task, index) => {
            return <CandidateTaskItem currentTask={task} taskNum={index + 1} candidatePage={candidateAfterSelectionScreen} handleEditBtnClick={() => handleEditBtnClick(task)} updateTasks={setUserTasks} />
        }))
    }
</div> */
}

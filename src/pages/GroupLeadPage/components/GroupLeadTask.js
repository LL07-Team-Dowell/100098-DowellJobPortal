import React, { useEffect, useState } from 'react'
import StaffJobLandingLayout from '../../../layouts/StaffJobLandingLayout/StaffJobLandingLayout';
import Navbar from '../../TeamleadPage/views/CreateMembersTask/component/Navbar';
import { AiOutlineAim } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useCurrentUserContext } from '../../../contexts/CurrentUserContext';
import TaskScreen from '../../TeamleadPage/views/TaskScreen/TaskScreen';
import { useCandidateContext } from '../../../contexts/CandidatesContext';
import { mutableNewApplicationStateNames } from '../../../contexts/NewApplicationContext';

const GroupLeadTask = () => {
    const [searchValue, setSearchValue] = useState('');
    const nevigate = useNavigate();
    const { currentUser } = useCurrentUserContext();
    const {
        candidatesData,
        dispatchToCandidatesData,
        candidatesDataLoaded,
        setCandidatesDataLoaded,
    } = useCandidateContext();
    const [currentUserProject, setCurrentUserProject] = useState(null);
    const [currentTeamMember, setCurrentTeamMember] = useState({});
    const [showAddTaskModal, setShowAddTaskModal] = useState(false)

    const username = currentUser.userinfo.username;
    console.log(candidatesData);

    // useEffect(() => {
    //     const foundCandidate = candidatesData.onboardingCandidates.find(
    //         (data) => data.applicant === currentTeamMember
    //     );

    //     if (!foundCandidate) return;

    //     const candidateProject =
    //         foundCandidate.others[mutableNewApplicationStateNames.assigned_project];
    //     setCurrentUserProject(candidateProject);
    // }, []);

    return (

        <StaffJobLandingLayout teamleadView={true} hideSearchBar={true} isGrouplead={true}>
            <br />
            <Navbar title={"View Work logs"} color={'#005734'} noButtonBack={true} removeButton={true} />
            <div className="container">
                <div style={{ marginTop: 30 }} className="Create_Team" onClick={() => nevigate(`/user-tasks`)}>
                    <div>
                        <div>
                            <AiOutlineAim
                                className="icon"
                                style={{ fontSize: "2rem" }}
                            />
                        </div>
                        <h4>View Your Added Work logs</h4>
                        <p>
                            View the work logs you have added.
                        </p>
                    </div>
                </div>

                <div style={{ marginTop: 30 }} className="Create_Team" onClick={() => nevigate(`/task`)}>
                    <div>
                        <div>
                            <AiOutlineAim
                                className="icon"
                                style={{ fontSize: "2rem" }}
                            />
                        </div>
                        <h4>View Your Team's Work logs</h4>
                        <p>
                            View work logs added by your team members.
                        </p>
                    </div>
                </div>

            </div>

            {/* <TaskScreen
                currentUser={currentTeamMember}
                handleAddTaskBtnClick={() => setShowAddTaskModal(true)}
                assignedProject={currentUser?.candidateAssignmentDetails?.assignedProjects ? currentUser.candidateAssignmentDetails.assignedProjects : ["Hi"]}
                teamleadScreen={true}
            /> */}

        </StaffJobLandingLayout >
    )
}

export default GroupLeadTask;

import { useNavigate } from "react-router-dom";
import { useCurrentUserContext } from "../../../../contexts/CurrentUserContext";
import StaffJobLandingLayout from "../../../../layouts/StaffJobLandingLayout/StaffJobLandingLayout";
import "./style.css";
import { getUserLiveStatus, postUserLiveStatus } from "../../../../services/commonServices";
import React from "react";
import { teamManagementProductName } from "../../../../utils/utils";
import { ApproveVouchar, ClaimVouchar } from "../../../TeamleadPage/views/ClaimVouchar/ClaimVouchar";

const AdminUserScreen = ({ subAdminView }) => {
    const [success, setsuccsess] = React.useState(false);
    React.useEffect(() => {
        const checkActive = setInterval(() => {
            //    getUserLiveStatus()
            Promise.all([getUserLiveStatus(), postUserLiveStatus({ product: teamManagementProductName, session_id: sessionStorage.getItem("session_id") })])
                .then(resp => { console.log(resp[0], resp[1]); setsuccsess(true) })
                .catch(err => { console.log(err[0], err[1]); setsuccsess(false); });
        }, 60000)
        return () => clearInterval(checkActive)
    }, [])


    const navigate = useNavigate();
    const { currentUser, currentUserHiredApplications } = useCurrentUserContext()
    console.log(currentUser);
    const userProject = currentUserHiredApplications.map(app => app?.project).flat().join(', ');
    // console.log("current>>>>>>>>>>>>>>>",currentUserHiredApplications);

    const handleLogout = () => navigate("/logout");

    return <>
        <StaffJobLandingLayout
            adminView={true}
            handleNavIconClick={() => navigate("/add-job")}
            adminAlternativePageActive={true}
            pageTitle={"User"}
            subAdminView={subAdminView}
            newSidebarDesign={!subAdminView ? true : false}
        >
            <div className="user__Page__Container admin">
                {<>
                    <ClaimVouchar />
                    <ApproveVouchar />
                </>
                }
                <div className="user__Intro__Item__Container">
                    <div className="user__Intro__Item">
                        <h2>User Name</h2>
                        <span>{currentUser?.userinfo.username}</span>
                    </div>
                    {/* <div className="edit__Btn">
                    Edit
                </div> */}
                </div>
                <div className="user__Intro__Item">
                    <h2>Email</h2>
                    <span>{currentUser?.userinfo.email}</span>
                </div>
                <div className="user__Intro__Item">
                    <h2>First Name</h2>
                    <span>{currentUser?.userinfo.first_name}</span>
                </div>
                <div className="user__Intro__Item">
                    <h2>Last Name</h2>
                    <span>{currentUser?.userinfo.last_name}</span>
                </div>
                <div className="user__Intro__Item" style={{ display: "flex", gap: 5, alignItems: "center" }}>
                    <h2>Live Status</h2>
                    <div style={success ? successStatus : failedStatus}></div>
                </div>
                <div className="user__Intro__Item">
                    <h2>Role</h2>
                    <span>Admin</span>
                </div>
                {
                    userProject !== "" &&
                    <div className="user__Intro__Item">
                        <h2>Project(s)</h2>
                        <span>{userProject}</span>
                    </div>
                }
                <button className="logout__Btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </StaffJobLandingLayout>
    </>
}

export default AdminUserScreen;
const defaultStatus = {
    backgroundColor: "gray",
    width: 10,
    height: 10,
    borderRadius: "50%"
}
const successStatus = { ...defaultStatus, backgroundColor: "green" };
const failedStatus = { ...defaultStatus, backgroundColor: "red" }; 
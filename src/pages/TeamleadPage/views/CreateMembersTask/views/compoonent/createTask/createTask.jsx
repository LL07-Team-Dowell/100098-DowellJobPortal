import React, { useEffect, useState } from 'react'
import './createTask.scss'
import { useValues } from '../../../context/Values';
import { useCurrentUserContext } from '../../../../../../../contexts/CurrentUserContext';
import { createTeam, createTeamTask } from '../../../../../../../services/createMembersTasks';
import { useNavigate } from 'react-router-dom';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { toast } from 'react-toastify';
import axios from 'axios';
import LittleLoading from '../../../../../../CandidatePage/views/ResearchAssociatePage/littleLoading';
import LoadingSpinner from '../../../../../../../components/LoadingSpinner/LoadingSpinner';
import { BsPlus } from 'react-icons/bs';
import { FaTimes } from 'react-icons/fa';
const CreateTask = ({id,members,team,unShowCreateTask}) => {
     // USER
  const { currentUser } = useCurrentUserContext();
  // DATA
  const { data, setdata } = useValues();
  // States
  const [name , setname] = useState(""); 
  const [description, setdiscription] = useState("") ;
    const [singleTask, setSingleTask] = useState(false);
    const [choosed, setchoosed]= useState(false); 
    const [taskMembers, setTaskMembers] = useState([]); 
    const [loading, setloading] = useState(false) 
    const [inputMembers, setInputMembers] = useState([]) ; 
    const [displaidMembers, setDesplaidMembers] = useState(members.map((member,index) => ({id:index ,member})))
    const [query,setquery] = useState('');

    const AddedMember = (id) => {
      setInputMembers([...inputMembers,displaidMembers.find(f => f.id === id)])
      setDesplaidMembers(displaidMembers.filter(f => f.id !== id))
    }
    const removeMember = (id) => {
      setInputMembers(inputMembers.filter(f => f.id !== id))
      setDesplaidMembers([...displaidMembers,inputMembers.find(f => f.id === id)])
    }
  const createTeamTask = () => {
   if(!loading){
    if(name && description && inputMembers.length > 0){
      setloading(true)
      axios.post('https://100098.pythonanywhere.com/create_team_task/',{
        "assignee": inputMembers.map(v =>v.member),
        "title": name,
        "description": description,
        "team_id": id,
        "completed": false,
        "due_date":new Date().toDateString()
    })
    // RESPONSE
    .then(resp => {
      console.log(resp)
      toast.success("task created successfully");
      unShowCreateTask()
      setloading(false)
      console.log({
        "assignee": inputMembers.map(v =>v.member),
        "title": name,
        "description": description,
        "team_id": id,
        "completed": false,
        "due_date":new Date().toDateString()
    })
    })
    // ERROR
    .catch(err => {
      toast.error("task error");
      console.log(err)
      setloading(false)
    })
  }else{
    toast.error("Complete all fields before submitting")
    setloading(false)
  }
   }
  }

 
  useEffect(()=>{
    setTaskMembers([])
  },[singleTask])
  return (
    <div className='overlay'>
    <div className='create-new-task' tabIndex={0}>
          <h2 className=''>Create New Task</h2>
          <label htmlFor='task_name'>Task Name</label>
          <input
            className='input'
            type='text'
            id='task_name'
            placeholder='Choose a Team Name'
            value={name}
            onChange={(e)=> setname(e.target.value)}
          />
          <br />
          <label htmlFor='task_description'>Task Description</label>
          <textarea
            type='text'
            id='team_description'
            className=''
            placeholder='Choose a Team Name'
            rows={10}
            value={description}
            onChange={(e)=> setdiscription(e.target.value)}
          />
          <br />
          {/*  */}
          {
            name && description ? 
            <div>
              <label>Task Type</label>
            <div>
            <div className='task-type'>
            <div>
            <p >single Task</p>
            <input
              className='input'
              id='single_task'
              type="radio"
              checked={singleTask && choosed}
              onChange={()=>{setSingleTask(true);setchoosed(true);setTaskMembers([])}}
            />
            </div>
            <div>
        <p>Team Task</p>
          <input
            className='input'
            id='team_task'
            type="radio"
            checked={!singleTask && choosed}
            onChange={()=>{setSingleTask(false);setchoosed(true);setTaskMembers([])}}
          />
          </div>
          </div>
          {
            choosed && name && description  ?
            <>
            <label>Task Members</label>
            <div className='added-members-input'>
            {
              inputMembers.map(v => <div key={v.id} onClick={()=>removeMember(v.id)}><p>{v.member}</p><FaTimes fontSize={'small'}/></div>)
            }
            <input type="text"  placeholder='search member' value={query} onChange={e => setquery(e.target.value)}/>
          </div>
          <div></div>
          <br />
          <label htmlFor='task_name'>Select Members</label>
          <div className='members'>
        {displaidMembers
          .filter(f => f.member.includes(query)).length > 0 ?
          displaidMembers
          .filter(f => f.member.includes(query))
          .map((element) => (
          <div className="single-member" onClick={()=>AddedMember(element.id)}>
            <p>{element.member}</p>
            <BsPlus/>
          </div>
      )):
        <h3>No More Members</h3>
      }
      </div>
            </>
            :
            null
          }
      </div>
            </div>
            :
            null
          }
          <div className="buttons">
            <button onClick={createTeamTask}>{loading ? <LoadingSpinner color={'white'} width='20px' height='20px' /> : 'submit'}</button>
            <button onClick={unShowCreateTask}>Cancel</button>
          </div>
        </div>
        </div>
  )
}

export default CreateTask
import React, { useEffect, useRef, useState } from 'react'
import TaskCard from './TaskCard'
import { authApiCall } from '../lib/apiCall';
import { toast } from 'react-toastify';

const ListCard = ({list,id,setIsFetchList,dragTaskId,setDragTaskId}) => {
    const {Tasks} = list;
    const [isLoading,setIsLoading] = useState(false);
    const [isLoadingDelete,setIsLoadingDelete] = useState(false);
    const [tasksComplete,setTasksComplete] = useState([]);
    const [checkedValue,setCheckedValue] = useState([]);
    const myRef = useRef(null);
    const handleDragOver = (e)=>{
         e.preventDefault();
    }
    const updateList = async()=>{
        const API = process.env.REACT_APP_API;
        const url = `${API}list/update`;
        const method = 'PUT';
        const body = {listId:list.id,taskId:dragTaskId}
        setIsLoading(true);
        const response = await authApiCall(url,method,body);
        if(!response.data || response.error){
          toast.error(response.message);
        }
        setIsLoading(false);
        // setIsFetchList((pre)=>!pre);
    }
    const handleDrop = (event)=>{
        event.preventDefault();
        const data = event.dataTransfer.getData("Text");
        myRef.current.appendChild(document.getElementById(data));
       if(list.id==='' || dragTaskId===''){
        return;
       }
       if(isLoading){
        return;
       }
       updateList();
    }

    const handleDragStart = (e)=>{
        e.dataTransfer.setData("Text",e.target.id);
        console.log(e.target.id.substring(1),)
        setDragTaskId(e.target.id.substring(1));
      }


    const handleDelete = async()=>{
        if(isLoading){
            return;
        }
        const API = process.env.REACT_APP_API;
        const url = `${API}task/delete`;
        const method = 'DELETE';
        const body = {tasks:tasksComplete}
        setIsLoadingDelete(true);
        setCheckedValue(checkedValue.map(()=>false));
        const response = await authApiCall(url,method,body);
        if(!response.data || response.error){
          toast.error(response.message);
        }
        setIsLoadingDelete(false);
        if(response.data){
        setIsFetchList(pre=>!pre);
        setTasksComplete([]);
        }
    }

  console.log(tasksComplete,Tasks)
  return (
    <div className='list_card' >
        <div className='list_card_header'>
            {list?.name}
        </div>
        <div className='list_card_div'ref={myRef} id='jigar' onDrop={handleDrop} onDragOver={handleDragOver}> 
            {Tasks?.map((task,key)=>
            <div key={key+''+task.id} id={key+''+task.id} className='task_card_div'onDragStart={handleDragStart} draggable={!isLoading && !tasksComplete.includes((task.id).toString())} >
                <TaskCard task={task} index={key} setTasksComplete={setTasksComplete} checkedValue={checkedValue} setCheckedValue={setCheckedValue}/>
            </div>)}
        </div>
        <div className='delete_selected'>
        {tasksComplete.length>0 &&  <button className='delete_selected_button' onClick={handleDelete}>{isLoadingDelete?'Loading...':'Delete Selectetd'}</button>}
        </div>
    </div>
  )
}

export default ListCard

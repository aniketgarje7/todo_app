import React, { useEffect} from 'react'

const TaskCard = ({task,setTasksComplete,index,checkedValue,setCheckedValue}) => {
  const handleChange = (e)=>{
    if(e.target.checked){
      setTasksComplete((pre)=>[...pre,task.id+'']);
    }
    else if(!e.target.checked){
      setTasksComplete((pre)=>pre.filter((id)=>task.id.toString()!==id.toString()))
    }
    setCheckedValue(checkedValue.map((v,id)=>Number(index)===Number(id)?!v:v))
  }
  
   useEffect(()=>{
    const arr = [...checkedValue];
    arr[index] = false;
    setCheckedValue([...arr])
},[])

  return (
    <div  className='task_card'  >
        <input type='checkbox' className='task_input' id={task.id}  onChange={handleChange} checked={checkedValue[index]!==undefined?checkedValue[index]:false} />
        <span className='task_name'>{task?.name}</span>
    </div>
  )
}

export default TaskCard;
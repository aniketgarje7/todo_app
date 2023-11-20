import React,{useState} from 'react'
import './index.css'
import { toast } from 'react-toastify';
import { authApiCall } from '../../lib/apiCall';
const CreateListModel = ({setShow,setIsFetchList}) => {
	const [tasks,setTasks] = useState([]);
	const [task,setTask] = useState('');
	const [listName,setListName] = useState('');
	const [isLoading,setIsLoading] = useState(false);

	const handleAddTask = (e)=>{
         e.preventDefault();
		 if(task===''){
			return;
		 }
		 setTasks([...tasks,task]);
         setTask('');
	};

	const handleCreate =async ()=>{
		if(listName===''){
			toast.error('List Name is required.')
			return;
		}
		if(tasks.length===0){
			toast.error('At least 1 task required')
			return;
		}
		const API = process.env.REACT_APP_API;
		const url = `${API}list/create`;
		const method = 'POST';
		const body = {name:listName,tasks:tasks}
		setIsLoading(true);
		const response = await authApiCall(url,method,body);
		if(!response.data || response.error){
		  toast.error(response.message);
		  setIsLoading(false);
		  return;
		}
		toast.success(response.message);
		window.location.reload();
		setShow(false);
		setIsLoading(false);
	}
  return (
    <div>
        <div className="modal">
	<article className="modal-container">
		<header className="modal-container-header">
			<h1 className="modal-container-title">
			     Create List
			</h1>
			<button className="icon-button" onClick={()=>setShow(false)}>
				close
			</button>
		</header>
		<section className="modal-container-body rtf">
		 <div>
			<label>List Name</label>
			<input type='text' className='modal_input' onChange={(e)=>setListName(e.target.value)} value={listName}/>
		 </div>
            <div>
				<div>
                 {tasks.map((t,key)=><div key={key}><span>{key+1}. </span>{t}</div>)}
				</div>
				<div>
					<label>Task Name</label>
					<input type='text' className='modal_input' onChange={(e)=>setTask(e.target.value)} value={task}/>
				</div>
				<div>
					<button className='add_task_button' onClick={handleAddTask}>Add Task</button>
				</div>
			</div>
		</section>
		<footer className="modal-container-footer">
			<button className="button is-ghost" onClick={()=>setShow(false)}>cancel</button>
			<button className="button is-primary" onClick={handleCreate} disabled={isLoading}>{isLoading?'Loading':'create'}</button>
		</footer>
	</article>
</div>
    </div>
  )
}

export default CreateListModel

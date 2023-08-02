 import React, { useState } from 'react'
 import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/esm/Button';
import UpdateTask from './UpdateTask';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedList} from '../Slices/TaskSlice';
import { removeTaskFromList } from '../Slices/TaskSlice';

 
 const TableList = () => {  
    const dispatch = useDispatch()
const  {taskList} =useSelector((state) =>state.tasks)

    const [modalShow, setModalShow] =useState(false)

     const updateTask =(task) =>{
         setModalShow(true)
         dispatch(setSelectedList(task))
     }
     const deleteTask = (task) =>
     {
         console.log('delete task');
        dispatch(removeTaskFromList(task))
     }  
      return (
        <>
    <Table striped bordered hover>
    <thead>
      <tr className='text-center'>
        <th>Id</th>
        <th>Title</th>
        <th>Decscription Name</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
        {
            taskList && taskList.map((task ,index)=>{
                return(
                    <tr className='text-center' key={task.id}>
                    <td>{index+1}</td>
                    <td>{task.title}</td>
                    <td>{task.description}</td>

                    <td><Button variant='primary' className='mx-3' onClick={()=>updateTask(task)} ><i class="bi bi-pencil-square"></i></Button>
                    
                    <Button variant='primary'><i class="bi bi-trash3"  onClick={()=> deleteTask(task)}></i></Button></td>
                </tr> 
                )
            })
        }
    
    </tbody>
  </Table>

<UpdateTask 
show={modalShow}
onHide={() => setModalShow(false)}
/>
</>
   )
 }
 
 export default TableList 
import React from 'react'
import { useSelector } from 'react-redux';

const NavBar = () => {
    const { taskList } = useSelector(state => state.tasks);
    console.log(taskList.length)
  return (
    <>
   <h1 className='text-center my-4 text-primary'>Project Management</h1>
   <p className='text-center lead'>currently {taskList.length} task(s) pending</p>
   </>
  )
}

export default NavBar
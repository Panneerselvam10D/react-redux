import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    taskList :[],
    selectedTask :{}
}

 const TaskSlice = createSlice({
    name:'taskSlice',
    initialState:initialState,
    reducers:{

        AddTaskToList:(state, action)   =>{
            const id =Math.random()*100
            let task ={...action.payload, id}
           state.taskList.push(task)
           
        },

        removeTaskFromList:(state, action) =>{
                state.taskList =state.taskList.filter((task)=> task.id !== action.payload.id)
        },

        updateTaskFromList:(state, action) =>{
            state.taskList =state.taskList.map((task)=>task.id === action.payload.id? action.payload : task)
        },
        setSelectedList:(state, action) =>{
            state.selectedTask = action.payload
        }

    
    }
     })
     export const {AddTaskToList,removeTaskFromList,updateTaskFromList, setSelectedList} = TaskSlice.actions
     export default TaskSlice.reducer
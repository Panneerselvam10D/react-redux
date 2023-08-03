import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";


const initialState ={
    taskList :[],
    selectedTask :{},
    isLoading:false,
    error:""

}
    const BaseUrl = "http://localhost:8000/tasks"

//Get

export const getTasksFromServer = createAsyncThunk(
    "tasks/getTasksFromServer", async(_,{rejectWithValue})=>{
         const response=await fetch(BaseUrl)
         if(response.ok){
            const jsonResponse = await response.json()
            return jsonResponse
         }
         else{
            return rejectWithValue({error : "No task found"})
         }
    }
)
//post  

export const addTaskToServer = createAsyncThunk(
    "tasks/addTaskToServer", async(task,{rejectWithValue})=>{
        const options = {
            method:'POST',
            body: JSON.stringify(task),
            headers : {
                "Content-type":"application/json; charset=UTF-8"
            }
        }
         const response=await fetch(BaseUrl,options)
         if(response.ok){
            const jsonResponse = await response.json()
            return jsonResponse
         }
         else{
            return rejectWithValue({error : "No Task Added"})
         }
    }
)
//Patch

export const patchUpdateInServer = createAsyncThunk(
    "tasks/patchUpdateInServer", async(task,{rejectWithValue})=>{
        const options = {
            method:'PATCH',
            body: JSON.stringify(task),
            headers : {
                "Content-type":"application/json; charset=UTF-8"
            }
        }
         const response=await fetch(BaseUrl+'/'+task.id,options)
         if(response.ok){
            const jsonResponse = await response.json()
            return jsonResponse
         }
         else{
            return rejectWithValue({error : "No Task updates"})
         }
    }
)
//delete

export const  deleteTaskFromServer = createAsyncThunk(
    "tasks/deleteTaskFromServer", async(task,{rejectWithValue})=>{
        const options = {
            method:'DELETE',
           
        }
         const response=await fetch(BaseUrl+'/'+task.id,options)
         if(response.ok){
            const jsonResponse = await response.json()
            return jsonResponse
         }
         else{
            return rejectWithValue({error : "No Task deleted"})
         }
    }
)




 const TaskSlice = createSlice({
    name:'taskSlice',
    initialState:initialState,
    reducers:{

        AddTaskToList:(state, action)   =>{
            const id =Math.random()*100
            let task ={...action.payload, id}
           state.taskList.push(task)
           console.log(state.taskList);
           
        },

        removeTaskFromList:(state, action) =>{
                state.taskList =state.taskList.filter((task)=> task.id !== action.payload.id)
        },

        updateTaskFromList:(state, action) =>{
            state.taskList =state.taskList.map((task)=>task.id === action.payload.id? action.payload : task)
            console.log(action);
        },
        setSelectedList:(state, action) =>{
            state.selectedTask = action.payload
        }
        

    
    },
    extraReducers:(builders)=>{
                builders
                .addCase(getTasksFromServer.pending,(state)=>{
                    state.isLoading = true
                })
                .addCase(getTasksFromServer.fulfilled,(state,action)=>{
                    state.isLoading = false
                    state.error = ""
                    state.taskList =action.payload
                } )
                .addCase(getTasksFromServer.rejected,(state, action)=>{
                    state.error =action.payload.error
                    state.isLoading = false
                    state.taskList=[]
                })
                //add task extraReducer lifeCycle methods

                .addCase(addTaskToServer.pending,(state)=>{
                    state.isLoading = true
                })
                .addCase(addTaskToServer.fulfilled,(state,action)=>{
                    state.isLoading = false
                    state.error = ""
                    state.taskList.push(action.payload)
                    
                } )
                .addCase(addTaskToServer.rejected,(state, action)=>{
                    state.error =action.payload.error
                    state.isLoading = false
                })
                //update task extraReducer lifeCycle methods

                .addCase(patchUpdateInServer.pending,(state)=>{
                    state.isLoading = true
                })
                .addCase(patchUpdateInServer.fulfilled,(state,action)=>{
                    state.isLoading = false
                    state.error = ""
                    state.taskList =state.taskList.map((task)=>task.id === action.payload.id? action.payload : task)
                    
                } )
                .addCase(patchUpdateInServer.rejected,(state, action)=>{
                    state.error =action.payload.error
                    state.isLoading = false
                })

                     //delete task extraReducer lifeCycle methods                
             
                
                .addCase(deleteTaskFromServer.pending,(state)=>{
                        state.isLoading = true
                    })
                .addCase(deleteTaskFromServer.fulfilled,(state,action)=>{
                        state.isLoading = false
                        state.error = ""
                       
                        
                    } )
                .addCase(deleteTaskFromServer.rejected,(state, action)=>{
                        state.error =action.payload.error
                        state.isLoading = false
                    })
    }
     })
     export const {AddTaskToList,removeTaskFromList,updateTaskFromList, setSelectedList} = TaskSlice.actions
     export default TaskSlice.reducer
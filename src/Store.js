import {configureStore} from '@reduxjs/toolkit';
import tasksReducer from './Slices/TaskSlice'

 export const Store = configureStore({
    reducer:{
        tasks :tasksReducer

    }
  
}
 )

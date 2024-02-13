import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface TaskState {
  task: {
    id: string;
    title: string;
    date: string;
    time: string;
    category: string;
    working_sessions: number;
    long_break: number;
    short_break: number;
  }[];
}

console.log('entered taskslice');
const initialState: TaskState = {
  task: [],
};

const taskSlice = createSlice({
  name: 'taskSlice',
  initialState,
  reducers: {
    addTask(state, action) {
      state.task.push(action.payload);
    },

    deleteTask(state, action) {
      state.task = state.task.filter(task => task.id !== action.payload);
    },

    editTask(state, action) {
      const {id, updateTask} = action.payload;
      const index = state.task.findIndex(task => task.id === id);
      if (index !== -1) {
        state.task[index] = updateTask;
      }
    },
  },
});

export const {addTask, deleteTask, editTask} = taskSlice.actions;
export default taskSlice.reducer;

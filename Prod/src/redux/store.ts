import {configureStore} from '@reduxjs/toolkit';
import userSlice from './features/userSlice';
import taskSlice from './features/taskSlice';
export const store = configureStore({
  reducer: {
    user: userSlice,
    task: taskSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

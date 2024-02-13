import {createSlice} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const URL = '';

export const API = axios.create({baseURL: ''});
API.interceptors.request.use(async (req: any) => {
  const profile: any = AsyncStorage.getItem('profile');
  if (profile !== null) {
    req.headers.Authorization = `${JSON.parse(profile)}`;
  }
  return req;
});

interface User {
  email: string;
  password: string;
}

const userSignUpWithGoogle = createAsyncThunk(
  'userSignUpWithGoogle',
  async (token: string) => {
    const response = await API.post('', token);
    AsyncStorage.setItem('profile', '');
  },
);
const userSignInWithGoogle = createAsyncThunk(
  'userSignInWithGoogle',
  async (token: string) => {
    const response = await API.post('', token);
    AsyncStorage.setItem('profile', '');
  },
);

const createUser = createAsyncThunk('createUser', async (credentials: User) => {
  const response = await API.post('', credentials);
  AsyncStorage.setItem('profile', 'Access Token');
  AsyncStorage.setItem('user', 'true');
  return true;
});

const userLogin = createAsyncThunk(
  // It gives a descriptive name to the action, making it easier to understand its purpose within your code. In this case, it clearly indicates that the action handles user logout functionality.
  'login',
  async (credentials: User) => {
    const response: any = await API.post('', credentials);
    AsyncStorage.setItem('profile', 'Access Token');
    AsyncStorage.setItem('user', `true`);
    return true;
  },
);

const userLogout = createAsyncThunk('logout', () => {
  AsyncStorage.setItem('profile', 'null');
  AsyncStorage.setItem('user', 'false');
  return true;
});

const getUser = createAsyncThunk('session', async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    if (user === 'true') {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: 'false',
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(createUser.pending, (state, action) => {
      state.user = 'pending';
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.user = 'fulfilled';
    });
    builder.addCase(userLogin.pending, (state, action) => {
      (state.user = 'pending'), console.log('Logging in user');
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.user = 'true';
      console.log('User logged in Successfully');
    });
    builder.addCase(userLogout.pending, (state, action) => {
      state.user = 'pending';
    });
    builder.addCase(userLogout.fulfilled, (state, action) => {
      state.user = 'false';
    });
    builder.addCase(getUser.pending, (state, action) => {
      state.user = 'false';
      console.log('Fetching the value from AsyncStorage');
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = 'true';
        console.log('User found in localstorage');
      } else {
        state.user = 'true';
        console.log('User not found in localstoarge');
      }
    });
    builder.addCase(getUser.rejected, (state, action) => {
      console.log('User not found in localstorage', action.payload);
      state.user = 'false';
    });
  },
});

//export const authActions = authSlice.actions;
export const {} = userSlice.actions;
export {userLogin, userLogout, getUser, createUser};
export default userSlice.reducer;

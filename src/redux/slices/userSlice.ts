import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import {registerForPushNotificationsAsync} from '../../utils/notifications';

let hostURL: string;

DeviceInfo.isEmulator().then(isEmulator => {
  if (!isEmulator) {
    hostURL = 'http://192.168.0.104:3000';
  } else {
    hostURL = 'http://10.0.2.2:3000';
  }
});

export interface User {
  id: string;
  username: string;
  email: string;
}

const updateExpoToken = async (jwtToken: string) => {
  registerForPushNotificationsAsync().then((token: any) => {
    axios
      .put(
        `${hostURL}/user/`,
        {
          deviceToken: token,
        },
        {
          headers: {
            Authorization: 'Bearer ' + jwtToken,
          },
        },
      )
      .then(val => console.log('success in updating the token'))
      .catch(err => console.log('error', err));
  });
};

export const registerUser = createAsyncThunk(
  'users/signupUser',
  async ({username, email, password}: any, thunkAPI) => {
    try {
      const response = await axios.post(`${hostURL}/auth/register`, {
        email: email.toLowerCase(),
        password,
        username,
      });
      let data = await response.data;

      if (response.status === 201) {
        await AsyncStorage.setItem('token', data.access_token);
        updateExpoToken(data.access_token);

        return thunkAPI.fulfillWithValue(data);
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e: any) {
      thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

export const loginUser = createAsyncThunk(
  'users/login',
  async ({email, password}: any, thunkAPI) => {
    try {
      const response = await axios.post(`${hostURL}/auth/login`, {
        email,
        password,
      });

      let data = await response.data;
      if (response.status === 200) {
        updateExpoToken(data.access_token);
        await AsyncStorage.setItem('token', data.access_token);

        return thunkAPI.fulfillWithValue(data);
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e: any) {
      thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

export const fetchUserBytoken = createAsyncThunk(
  'users/fetchUserByToken',
  async ({token}: any, thunkAPI) => {
    try {
      const response = await axios.get(`${hostURL}/user`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      let data = await response.data;
      if (response.status === 200) {
        // thunkAPI.dispatch(appActions.getChatListState());
        return {...data};
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

export const logOut = createAsyncThunk(
  'users/logOut',
  async ({token}: any, thunkAPI) => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('deviceToken');

      const update = await axios.put(
        `${hostURL}/user/`,
        {
          deviceToken: '',
        },
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      );
    } catch (e: any) {}
  },
);

export const checkState = createAsyncThunk(
  'users/checkState',
  async (_, thunkAPI) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
        thunkAPI.dispatch(fetchUserBytoken({token}));
      }
    } catch (e) {}
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    username: '',
    email: '',
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    token: null,
    isLoggedIn: false,
  },
  reducers: {
    clearState: state => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
  },
  extraReducers: builder => {
    builder.addCase(registerUser.fulfilled, (state, {payload}: any) => {
      state.id = payload.id;
      state.email = payload.email;
      state.username = payload.username;
      state.isFetching = false;
      state.isSuccess = true;
      (state.isLoggedIn = true), (state.token = payload.access_token);
    });
    builder.addCase(registerUser.pending, state => {
      state.isFetching = true;
    });
    builder.addCase(registerUser.rejected, (state, payload: any) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    });
    builder.addCase(loginUser.fulfilled, (state, {payload}: any) => {
      state.id = payload.id;
      state.email = payload.email;
      state.username = payload.username;
      state.isFetching = false;
      state.isSuccess = true;
      state.isLoggedIn = true;
      state.token = payload.access_token;
    });
    builder.addCase(loginUser.rejected, (state, payload: any) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    });
    builder.addCase(loginUser.pending, (state, payload: any) => {
      state.isFetching = true;
    });
    builder.addCase(fetchUserBytoken.pending, (state, payload: any) => {
      state.isFetching = true;
    });
    builder.addCase(fetchUserBytoken.fulfilled, (state, payload: any) => {
      state.token = payload.meta.arg.token;
      state.isFetching = false;
      state.isSuccess = true;
      state.email = payload.payload.email;
      state.username = payload.payload.username;
      state.isLoggedIn = true;
      state.id = payload.payload._id;
    });
    builder.addCase(fetchUserBytoken.rejected, (state, payload: any) => {
      state.isFetching = false;
      state.isError = true;
    });
    builder.addCase(logOut.fulfilled, (state, payload: any) => {
      (state.id = null), (state.username = '');
      state.email = '';
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = '';
      state.isLoggedIn = false;
    });
    builder.addCase(checkState.fulfilled, (state, payload: any) => {
      (state.id = null),
        (state.username = ''),
        (state.email = ''),
        (state.isFetching = false),
        (state.isSuccess = false),
        (state.isError = false),
        (state.errorMessage = '');
    });
  },
});

export const {clearState} = userSlice.actions;

export const userSelector = (state: any) => {
  return state.users;
};

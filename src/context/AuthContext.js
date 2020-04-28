import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import networkApi from '../api/network';
import { navigate } from '../navigationRef';
import registerForPushNotificationsAsync from '../services/push_notifications';


//TODO, handle null exception
const getCookieFromResponse = (response) => {
  let rawCookie = response.headers["set-cookie"][0];
  let cookie = rawCookie.split(";")[0];
  return cookie;
};
const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'signin':
      // return { errorMessage: '', cookie: action.payload };
        console.log("after sign in, we store uid : " + action.payload);
      return { errorMessage: '', uid: action.payload };
    case 'clear_error_message':
      return { ...state, errorMessage: '' };
    case 'signout':
      // return { cookie: null, errorMessage: '' };
      return { uid: "", errorMessage: '' };
    default:
      return state;
  }
};

const tryLocalSignin = dispatch => async () => {
  const token = await AsyncStorage.getItem('cookie');
  if (token) {
    dispatch({ type: 'signin', payload: token });
    navigate('Main');
  } else {
    navigate('Signup');
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({ type: 'clear_error_message' });
};

const signup = dispatch => async ({ email : email, name : name, password : password }) => {
  try {
    const response = await networkApi.post('/registerMobile', { email, name, password });
    console.log("signup reponse message : " + response.data["mes"]);
    if (response.data.mes !== "success"){
        throw new Error(response.data.mes);
    }

    const cookie = getCookieFromResponse(response);
    console.log("cookie : " + cookie);
    await AsyncStorage.setItem('Cookie', cookie);

    dispatch({ type: 'signin', payload: cookie });

    navigate('Signin');
  } catch (err) {
    console.log(err)
    dispatch({
      type: 'add_error',
      payload: err.message
    });
  }
};

const signin = dispatch => async ({ props, email, password }) => {
  try {
    //for development
    // const response = await networkApi.post('/userLoginMobile', { email: "test@apt.com", password:"test" });
    //for real application
    const response = await networkApi.post('/userLoginMobile', { email, password });
    //
    console.log("login mes:" + response.data.mes);
    if (response.data.mes != "success"){
      throw new Error(response.data.mes);
    }

    const cookie = getCookieFromResponse(response);
    const uid = response.data.uid;
    // await AsyncStorage.setItem('Cookie', cookie);
    // await AsyncStorage.setItem("uid", uid);
    // console.log("uid " + await AsyncStorage.getItem("uid"));
    // console.log("cookie : " + await AsyncStorage.getItem("Cookie"));
    // await AsyncStorage.getAllKeys().then(console.log);
    // dispatch({ type: 'signin', payload: cookie});
    dispatch({ type: 'signin', payload: uid});
    // navigate('mainFlow', {uid });
    // props.navigation.state.params.put('uid', uid);
    props.navigation.setParams({uid});
    await registerForPushNotificationsAsync(uid);
    props.navigation.navigate('CreateScreenNav',{uid : uid});
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: err.message
    });
  }
};

const signout = dispatch => async () => {
  await AsyncStorage.removeItem('cookie');
  dispatch({ type: 'signout' });
  navigate('Signin');
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalSignin },
  { uid: "", errorMessage: '' }
);

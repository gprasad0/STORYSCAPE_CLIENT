import axios from 'axios';
import { convertPrompt } from '../helperFunctions/commonHelperFunctions';
import { loginSuccessAction,logoutAction } from './slices/authSlice';
import { marketContentAction, tokenExceededAction } from './slices/marketContentSlice';

export const generateMarketingContentAction =
  (description, temp, outputs, multiInput, type, typeOfCard) => async (dispatch) => {

    let actualPrompt = convertPrompt(multiInput,type,typeOfCard,description)
    console.log("localStorage==>",actualPrompt)

    try {
      let chatData = await axios({
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        url: 'http://localhost:3000/api/storyscape/compose',
        withCredentials: true,

        // data: {
        //   description,
        //   outputs,
        //   temp,
        //   multiInput
        // },

        data: {
          prompt:actualPrompt,
          outputs,
          temp,
          multiInput
        },
      });

      console.log("dat====>",chatData)
      if(chatData.data.status == 200){
        dispatch(marketContentAction(chatData.data));

      }else{
        console.log("tokenExpired----11")
        dispatch(tokenExceededAction(chatData.data));

      }

    } catch (e) {
      return console.error(e.message);
    }
  };

  export const userRegistrationAction =
  (prompt, temp, outputs) => async (dispatch) => {
    try {
      let data = await axios({
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`
        },
        url: 'http://localhost:3000/auth/register',
        // data: {
        //   prompt,
        //   outputs,
        //   temp,
        // },
      });

      // dispatch(marketContentAction(data.data));
    } catch (e) {
      return console.error(e.message);
    }
  };


  export const loginAction =
  (loginData) => async (dispatch) => {
    try {
      let data = await axios({
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`
        },
        url: 'http://localhost:3000/auth/login',
        data:loginData,
        withCredentials: true
        // data: {
        //   prompt,
        //   outputs,
        //   temp,
        // },
      });

    console.log("data===>",data)
    if(data.status == 200){
      // let x = document.cookie;
      localStorage.setItem("token",data.data.accessToken);
      dispatch(loginSuccessAction(data.data.accessToken))
    }else{
      dispatch(logoutAction())

    }

      // dispatch(marketContentAction(data.data));
    } catch (e) {
      return console.error(e.message);
    }
  };

  export const refreshJwtAction =
  (loginData) => async (dispatch) => {
    try {

      
      let data = await axios({
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`
        },
        withCredentials: true,

        url: 'http://localhost:3000/auth/refresh',
        // data:loginData
        // data: {
        //   prompt,
        //   outputs,
        //   temp,
        // },
      });

    console.log("data===>",data)

    if(data.status == 200){
      // let x = document.cookie;
      localStorage.setItem("token",data.data.accessToken);
      dispatch(loginSuccessAction())
    }else{
      dispatch(logoutAction())

    }
    // if(data.status == 200){
      
    //   localStorage.setItem("token",data.data.accessToken);
    //   dispatch(loginSuccessAction())
    // }else{
    //   dispatch(logoutAction())

    // }

      // dispatch(marketContentAction(data.data));
    } catch (e) {
      return console.error(e.message);
    }
  };

  export const signUpAction =
  (signupData) => async (dispatch) => {
    // console.log("data====>?",data)
    try {
      let data = await axios({
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`
        },
        url: 'http://localhost:3000/auth/signup',
        data: signupData
      });

      // dispatch(marketContentAction(data.data));
    } catch (e) {
      return console.error(e.message);
    }
  };


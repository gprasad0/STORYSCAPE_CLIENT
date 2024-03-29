import axios from 'axios';
import { convertPrompt } from '../helperFunctions/commonHelperFunctions';
import { loginSuccessAction,logoutAction } from './slices/authSlice';
import { marketContentAction, tokenExceededAction } from './slices/marketContentSlice';
import { paymentOrderAction } from './slices/paymentSlice';
import {signUpDataAction} from './slices/signUpSlice';
import jwt_decode from "jwt-decode";


export const generateMarketingContentAction =
  (description, temp, outputs, multiInput, type, typeOfCard, apiCount) => async (dispatch) => {

    let actualPrompt = convertPrompt(multiInput,type,typeOfCard,description)
    console.log("localStorage==>",actualPrompt)

    try {
      let chatData = await axios({
        method: 'post',
        
        url: `${import.meta.env.VITE_BACKEND_APP_URL}/api/storyscape/compose`,
        

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
          multiInput,
          apiCount
        },
      });

      console.log("dat====>",chatData)
      if(chatData.status == 200){
        dispatch(marketContentAction(chatData.data.data));

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
        url: `${import.meta.env.VITE_BACKEND_APP_URL}/auth/register`,
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
        url: `${import.meta.env.VITE_BACKEND_APP_URL}/auth/login`,
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
      localStorage.setItem("userType","normalLogin");

      dispatch(loginSuccessAction({token:data.data.accessToken,loginType:"normalLogin"}))
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
        

        url: `${import.meta.env.VITE_BACKEND_APP_URL}/auth/refresh`,
        // data:loginData
        // data: {
        //   prompt,
        //   outputs,
        //   temp,
        // },
      });


    if(data.status == 200){
      // let x = document.cookie;
    console.log("data===>",data)

      localStorage.setItem("token",data.data.accessToken);
      dispatch(loginSuccessAction({token:data.data.accessToken,loginType:"normalLogin"}))
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
        url: `${import.meta.env.VITE_BACKEND_APP_URL}/auth/signup`,
        data: signupData
      });
      console.log("dede===>",data)
    
        // dispatch(signUpDataAction(data.data.status,data.data.message));
        dispatch(signUpDataAction({signup:data.data.status,signupMessage:data.data.message}));

      
    } catch (e) {
      return console.error(e.message);
    }
  };

  export const UserLogoutAction =
  (signupData) => async (dispatch) => {
    // console.log("data====>?",data)
    try {
      let data = await axios({
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`
        },
        url: `${import.meta.env.VITE_BACKEND_APP_URL}/auth/logout`,
        

        // data: signupData
      });
      localStorage.clear();
      dispatch(logoutAction())

      // dispatch(marketContentAction(data.data));
    } catch (e) {
      return console.error(e.message);
    }
  };



  export const makeOrderRequest =
  (amount) => async (dispatch) => {
    try {
      let data = await axios({
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`
        },
        url: `${import.meta.env.VITE_BACKEND_APP_URL}/api/makeOrder`,
        // 

        data: {
          amount
        },
      });
console.log("data===>",data)
      dispatch(paymentOrderAction(data.data))

      // dispatch(marketContentAction(data.data));
    } catch (e) {
      return console.error(e.message);
    }
  };

  export const verfiyPaymentAction =
  (response,orderId) => async (dispatch) => {
    try {
      let data = await axios({
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`
        },
        url: `${import.meta.env.VITE_BACKEND_APP_URL}/api/verifyPayment`,
        data: {
          response,orderId
        },
      });
console.log("data===>",data)
      // dispatch(paymentOrderAction(data.data))

      // dispatch(marketContentAction(data.data));
    } catch (e) {
      return console.error(e.message);
    }
  };


  export const googleAuthSuccessAction =
  () => async (dispatch) => {
    try {
      let data = await axios({
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`
        },
        

        url: `${import.meta.env.VITE_BACKEND_APP_URL}/auth/googleOauthSuccess`,
        // data:loginData
        // data: {
        //   prompt,
        //   outputs,
        //   temp,
        // },
      });
      console.log("data==>",data)
      if(data.status == 200){
        console.log("")
        localStorage.setItem("userType","googleLogin");
  
  
        dispatch(loginSuccessAction({token:data.data.accessToken,loginType:"googleUser"}))
      }
      

      // dispatch(paymentOrderAction(data.data))

      // dispatch(marketContentAction(data.data));
    } catch (e) {
      return console.error(e.message);
    }
  };

  

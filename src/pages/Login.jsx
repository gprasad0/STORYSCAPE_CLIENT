import React, { useEffect, useState } from 'react';
import {
  Checkbox,
  Grid,
  TextField,
  FormControlLabel,
  Paper,
  Button,
} from '@mui/material';
import { InstallDesktopTwoTone } from '@mui/icons-material';
import googleImg from '../assets/google.png';
import {
  generateMarketingContentAction,
  loginAction,
  refreshJwtAction,
  userRegistrationAction,
} from '../redux/apiActions';
import { useDispatch, useSelector } from 'react-redux';
import { ColorButton, MarginDiv } from '../components/commonStyledComponents';
import SignUpModal from '../components/SignUpModal';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { NotificationBar } from '../components/commonUiElements/NotificationBar';
import { signUpcloseAction } from '../redux/slices/signUpSlice';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authSelector = useSelector((state) => state.auth);
  const signupSelector = useSelector((state) => state.signUp.signUp);
  const signupMessage = useSelector((state) => state.signUp.signUpData);
  const [signUp, setSignUp] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [notificationMessage, setNotificationMessage] = useState('');
  const [errorModal, setErrorModal] = useState(false);
  const [notificationType, setNotificationType] = useState('');

  useEffect(() => {
    console.log('authSelector==>', authSelector);
    if (authSelector.authenticated) {
      let x = document.cookie;
      console.log('cookire', x);
      navigate('/home');
    } else {
      // setErrorModal(true)
    }
  }, [authSelector]);

  useEffect(() => {
    console.log('signupSelector===>', signupSelector);

    if (signupSelector) {
      setSignUp(false);
      setErrorModal(true);
      setNotificationType('success');
      setNotificationMessage(signupMessage);
      dispatch(signUpcloseAction());
    }

    if(!signupSelector  && signupMessage.length > 0){
      setErrorModal(true);
      setNotificationMessage(signupMessage);

    }
  }, [signupSelector]);

  const handleLogin = () => {
    //This will open a window for the user to login using their gmail account
    window.open('http://localhost:3000/auth/google', '_self');
  };

  const handleNormalLogin = () => {
    // dispatch(userRegistrationAction())
    dispatch(loginAction(loginData));
  };

  const closeModal = () => {
    console.log('closemodal===>');
    setSignUp(false);
  };

  const closeNotificationModal = () => {
    setErrorModal(false);
  };

  const handleSignUp = () => {
    setSignUp(true);
    // setErrorModal(true)
  };

  const handleFormEvents = (type, e) => {
    console.log('e.target.value===>', e.target);
    setLoginData((prevState) => {
      return { ...prevState, [type]: e.target.value };
    });
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100%',
        background: '#f9fafc',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ padding: 10, width: '30vw', margin: '0 auto' }}>
        <Paper
          sx={{
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',

            opacity: 0.8,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h1
            style={{
              // fontFamily: 'monospace',
              color: '#153d70',
              fontWeight: 'bold',
              marginTop: '24px',
            }}
            onClick={handleLogin}
          >
            SIGN IN
          </h1>
          <MarginDiv>
            <TextField
              value={loginData['email']}
              label='Email'
              name='Email'
              onChange={(e) => handleFormEvents('email', e)}
            ></TextField>
          </MarginDiv>
          <div>
            <TextField
              label='Password'
              name='password'
              value={loginData['password']}
              onChange={(e) => handleFormEvents('password', e)}
              type={'password'}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  // handleLogin();
                }
              }}
            ></TextField>
          </div>

          <ColorButton width={100} marginTop={20} onClick={handleNormalLogin}>
            LOGIN
          </ColorButton>

          <MarginDiv style={{ marginTop: '4px', marginBottom: '4px' }}>
            or
          </MarginDiv>

          <button
            style={{
              width: '15vw',
              height: '40px',
              borderRadius: '5px',
              border: 'none',
              outline: 'none',
              backgroundColor: 'white',
              boxShadow:
                'rgb(0 0 0 / 20%) 0px 3px 1px -2px, rgb(0 0 0 / 14%) 0px 2px 2px 0px, rgb(0 0 0 / 12%) 0px 1px 5px 0px',
              fontSize: '16px',
              fontWeight: '500',
              margin: '0 0 20px 0',
              color: '#2c444e',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              padding: '10px',
            }}
            onClick={handleLogin}
          >
            <img
              style={{ width: '24px', marginRight: '14px' }}
              src={googleImg}
              alt='google icon'
            />
            <span>Sign in with Google</span>
          </button>
          {/* <ColorButton
            width={100}
            marginTop={20}
              onClick={handleNormalLogin}
            >
             LOGIN
            </ColorButton><ColorButton
            width={100}
            marginTop={20}
              onClick={
                ()=> dispatch(refreshJwtAction(loginData))
      
              }
            >
             Refresh
            </ColorButton><ColorButton
            width={100}
            marginTop={20}
              onClick={ ()=> dispatch(generateMarketingContentAction(loginData))}
            >
             normal
            </ColorButton> */}
          <MarginDiv style={{ marginTop: '5px', marginBottom: '10px' }}>
            New Here?{' '}
            <span
              style={{
                color: 'rgb(244 162 0)',
                fontWeight: 800,
                cursor: 'pointer',
              }}
              onClick={handleSignUp}
            >
              Sign Up
            </span>
          </MarginDiv>

          {/* </Grid> */}
        </Paper>
        {signUp && <SignUpModal openDialog={signUp} closeDialog={closeModal} />}

        {/* openDialog={submitModal}  closeDialog={closeModal} */}

        {/* <Snackbar
          open={errorModal}
          autoHideDuration={6000}
          onClose={closeModal}
        >
          <Alert onClose={closeModal} severity='error' sx={{ width: '100%' }}>
            Login Failed
          </Alert>
        </Snackbar> */}

        {errorModal && (
          <NotificationBar
            message={notificationMessage}
            handleClose={closeNotificationModal}
            open={errorModal}
            type={notificationType}
          />
        )}
      </div>
    </div>
  );
};

import React, { useState, useRef } from 'react';
import { Button } from '@mui/material';
import { Google } from '@mui/icons-material';
import { signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { signInAction } from '../actions/actions';
import { auth, db } from '../firebaseConfig';
import {
    notifyAction,
    startLoadingAction,
    stopLoadingAction,
} from '../actions/actions';

const GoogleOneTapLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const googleButton = useRef(null);

    const [displayType, setDisplayType] = useState('flex');
    const [gBtnDisplay, setGBtnDisplay] = useState('none');

    const handleResponse = async (response) => {
        dispatch(startLoadingAction());
        const token = response.credential;
        const credential = GoogleAuthProvider.credential(token);

        await signInWithCredential(auth, credential)
            .then(async (response) => {
                await setDoc(doc(db, 'users', response.user.uid), {
                    uid: response.user.uid,
                    name: response.user.displayName,
                    email: response.user.email,
                    photoURL: response.user.photoURL,
                    createdAt: response.user.metadata.createdAt,
                    lastSignInTime: response.user.metadata.lastLoginAt,
                    username: response.user.email.split('@')[0],
                });
                const res = await getDoc(
                    doc(db, 'userChats', response.user.uid)
                );
                if (!res.exists()) {
                    await setDoc(doc(db, 'userChats', response.user.uid), {});
                }
                dispatch(
                    signInAction(
                        response.user.uid,
                        response.user.email,
                        response.user.displayName,
                        response.user.photoURL,
                        response.user.accessToken,
                        response.user.metadata.lastLoginAt,
                        response.user.email.split('@')[0]
                    )
                );
                navigate('/chat');
            })
            .catch((error) => {
                console.log(error);
                dispatch(
                    notifyAction(
                        true,
                        'error',
                        'Log In Failed. Please try again'
                    )
                );
            });
        dispatch(stopLoadingAction());
    };

    const handleGoogleLogIn = () => {
        try {
            window.google.accounts.id.initialize({
                client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                ux_mode: 'popup',
                callback: handleResponse,
            });
            window.google.accounts.id.renderButton(googleButton.current, {
                theme: 'filled_blue',
                size: 'large',
                width: 280,
                text: 'continue_with',
            });
            window.google.accounts.id.prompt((notification) => {
                if (notification.isNotDisplayed()) {
                    setDisplayType('none');
                    setGBtnDisplay('flex');
                    dispatch(
                        notifyAction(
                            true,
                            'error',
                            'Please allow Third Party Cookies'
                        )
                    );
                }
                if (
                    notification.isSkippedMoment() ||
                    notification.isDismissedMoment()
                ) {
                    setDisplayType('none');
                    setGBtnDisplay('flex');
                }
            });
        } catch (error) {
            dispatch(
                notifyAction(true, 'error', 'Log In Failed. Please try again')
            );
        }
    };

    return (
        <React.Fragment>
            <Button
                variant='outlined'
                startIcon={<Google />}
                sx={{
                    display: displayType,
                    width: 'fit-content',
                    mt: 3,
                    backgroundColor: '#fff',
                    '&:hover': {
                        color: '#fff',
                        borderColor: '#fff',
                        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
                    },
                }}
                onClick={handleGoogleLogIn}
            >
                Login with Google
            </Button>
            <div style={{ display: gBtnDisplay }} ref={googleButton}></div>
        </React.Fragment>
    );
};

export default GoogleOneTapLogin;

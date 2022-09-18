import React, { useState, useRef } from 'react';
import { Button } from '@mui/material';
import { Google } from '@mui/icons-material';
import jwtDecode from 'jwt-decode';
import { signInWithCredential, GoogleAuthProvider } from 'firebase/auth';

import { useDispatch } from 'react-redux';
import { signInAction } from '../actions/actions';
import { auth } from '../firebaseConfig';

const GoogleOneTapLogin = () => {
    const dispatch = useDispatch();

    const googleButton = useRef(null);

    const [displayType, setDisplayType] = useState('flex');
    const [gBtnDisplay, setGBtnDisplay] = useState('none');

    const handleResponse = (response) => {
        const token = response.credential;
        const decodedToken = jwtDecode(token);
        const {
            sub: id,
            email,
            name,
            picture: photoURL,
            iat: signInTime,
        } = decodedToken;

        const credential = GoogleAuthProvider.credential(token);

        signInWithCredential(auth, credential)
            .then(() => {
                dispatch(
                    signInAction(id, email, name, photoURL, token, signInTime)
                );
            })
            .catch((error) => {
                alert(error);
            });
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
                    alert('Please enable third party cookies for this site');
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
            alert(error);
        }
    };

    return (
        <React.Fragment>
            <Button
                variant='outlined'
                startIcon={<Google />}
                sx={{ display: displayType, width: 'fit-content', mb: 3 }}
                onClick={handleGoogleLogIn}
            >
                LogIn with @ternaengg.ac.in
            </Button>
            <div style={{ display: gBtnDisplay }} ref={googleButton}></div>
        </React.Fragment>
    );
};

export default GoogleOneTapLogin;

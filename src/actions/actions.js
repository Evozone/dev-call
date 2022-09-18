import { SIGN_IN, SIGN_OUT } from './types';

export const signInAction = (id, email, name, photoURL, token, signInTime) => {
    return {
        type: SIGN_IN,
        payload: {
            id,
            email,
            name,
            photoURL,
            token,
            signInTime,
        },
    };
};

export const signOutAction = () => {
    return {
        type: SIGN_OUT,
    };
};

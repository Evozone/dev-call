import { SIGN_IN, SIGN_OUT } from '../actions/types';

const INITIAL_STATE = {
    isSignedIn: false,
    id: null,
    email: null,
    name: null,
    photoURL: null,
    token: null,
    signInTime: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            window.localStorage.setItem(
                'dev',
                JSON.stringify({ dnd: action.payload.token, isSignedIn: true })
            );
            return {
                ...state,
                isSignedIn: true,
                id: action.payload.id,
                email: action.payload.email,
                name: action.payload.name,
                photoURL: action.payload.photoURL,
                token: action.payload.token,
                signInTime: action.payload.signInTime,
            };

        case SIGN_OUT:
            window.localStorage.removeItem('dev');
            return {
                ...state,
                isSignedIn: false,
                id: null,
                email: null,
                name: null,
                photoURL: null,
                token: null,
                signInTime: null,
            };

        default:
            return state;
    }
};

export default authReducer;

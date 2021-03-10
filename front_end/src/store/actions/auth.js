import * as actionTypes from './actionTypes';
import axios from 'axios';
const md5 = require('md5');

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};



export const authSignup = (firstName, lastName, email, password) => {
    return dispatch => {
        dispatch(authStart());
        
        const authData = {
            first: firstName,
            last: lastName,
            email: email,
            password: md5(password),
            returnSecureToken: true
        };

        axios.post('/api/signup', JSON.stringify(authData))
        .then(response => {
            if (response.data === "Email already exists") {
                dispatch(authFail(response.data))
                console.log(response.data)
            } else {
                // Create user and send user to dash board and log user in
                // Set expiration Time for 15 minutes
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
                console.log(response.data)
                //Storing a token on the local storage
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.token, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));

            }
        })
        .catch(error => {
            dispatch(authFail(error));
        })
    };
};

export const authLogin = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        
        const authData = {
            email: email,
            password: md5(password),
            returnSecureToken: true
        };
        console.log(authData.password)

        axios.post('/api/login', JSON.stringify(authData))
        .then(response => {

            if (response.data === "Some of your information isn't correct. Please try again.") {
                dispatch(authFail(response.data));

            } else if (response.data === "Some of your information isn't correct. Please try again."){
                dispatch(authFail(response.data));
            } else {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
                console.log(response.data)
                //Storing a token on the local storage
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.token, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            }  
        })
        .catch(error => {
            dispatch(authFail(error));
        })
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                // console.log(expirationDate)
                // console.log((expirationDate.getTime() - new Date().getTime() / 1000) )
                // dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime() / 1000) ));   
            }
            
        }
    };
};
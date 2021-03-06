import axios from 'axios';
import {setAlert} from './alert';
import {GET_PROFILE, GET_PROFILES, PROFILE_ERROR, UPDATE_PROFILE, CLEAR_PROFILE, ACCOUNT_DELETED, GET_REPOS} from './types';

//profile error
export const profileError = (err) => {
    return dispatch => {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};
//Get current user profile
export const getCurrentProfile = () => {
    return async dispatch => {
        try{
            const res = await axios.get('/api/profile/me');
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            });
        }catch(err){
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status}
            });
        }
    };
};
//Get all profiles
export const getProfiles = (profiles) => {
    return async dispatch => {
        dispatch({type: CLEAR_PROFILE});
        dispatch({
            type: GET_PROFILES,
            payload: profiles
        });
    }
};
//Get all profiles
export const getProfileById = (userId) => {
    return async dispatch => {
        try{
            const res = await axios.get(`/api/profile/user/${userId}`);
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            });
        }catch(err){
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status}
            });
        }
    };
};
//Get Github repos
export const getGithubRepos = (userName) => {
    return async dispatch => {
        try{
            const res = await axios.get(`/api/profile/github/${userName}`);
            dispatch({
                type: GET_REPOS,
                payload: res.data
            });
        }catch(err){
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status}
            });
        }
    };
};
//Create or Update a profile 
export const createProfile = (formData, history, edit = false) => {
    return async dispatch => {
        try{
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const res = await axios.post('/api/profile', formData, config);
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            });
            dispatch(setAlert(edit ? 'Profile updated' : 'Profile created', 'success'));
            if(!edit){
                history.push('/dashboard');
            }
        }catch(err){
            console.log(err);
            const errors = err.response.data.errors;
            if(errors){
                errors.forEach(error => {
                    dispatch(setAlert(error.msg, "danger"));  
                });
            }
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status}
            });
        }
    };
};
//Add Experience
export const addExperience = (formData, history) => {
    return async dispatch => {
        try{
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const res = await axios.put('/api/profile/experience', formData, config);
            dispatch({
                type: UPDATE_PROFILE,
                payload: res.data
            });
            dispatch(setAlert('Experience added', 'success'));
            history.push('/dashboard');
        }catch(err){
            console.log(err);
            const errors = err.response.data.errors;
            if(errors){
                errors.forEach(error => {
                    dispatch(setAlert(error.msg, "danger"));  
                });
            }
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status}
            });
        }
    };
};
//Add Education
export const addEducation = (formData, history) => {
    return async dispatch => {
        try{
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const res = await axios.put('/api/profile/education', formData, config);
            dispatch({
                type: UPDATE_PROFILE,
                payload: res.data
            });
            dispatch(setAlert('Education added', 'success'));
            history.push('/dashboard');
        }catch(err){
            console.log(err);
            const errors = err.response.data.errors;
            if(errors){
                errors.forEach(error => {
                    dispatch(setAlert(error.msg, "danger"));  
                });
            }
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status}
            });
        }
    };
};
//Delete experience
export const deleteExperience = (id) => {
    return async dispatch => {
        try{
            const res = await axios.delete(`/api/profile/experience/${id}`);
            dispatch({
                type: UPDATE_PROFILE,
                payload: res.data
            });
            dispatch(setAlert('Experience Removed', 'success'));
        }catch(err){
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status}
            });
        }
    };
};
//Delete education
export const deleteEducation = (id) => {
    return async dispatch => {
        try{
            const res = await axios.delete(`/api/profile/education/${id}`);
            dispatch({
                type: UPDATE_PROFILE,
                payload: res.data
            });
            dispatch(setAlert('Education Removed', 'success'));
        }catch(err){
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status}
            });
        }
    };
};
//Delete account & profile
export const deleteAccount = () => {
    return async dispatch => {
        if(window.confirm("Are you sure? This can not be undone.")){
            try{
                await axios.delete(`/api/profile`);
                dispatch({
                    type: CLEAR_PROFILE
                });
                dispatch({
                    type: ACCOUNT_DELETED
                });
                dispatch(setAlert('Your account has been permanantly deleted'));
            }catch(err){
                dispatch({
                    type: PROFILE_ERROR,
                    payload: {msg: err.response.statusText, status: err.response.status}
                });
            }
        }
    };
};
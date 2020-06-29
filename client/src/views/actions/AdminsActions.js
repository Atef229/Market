import axios from 'axios';

import {
  // GET_RESIDENTS,
  GET_ADMINS,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER,
  GET_ERRORS
} from './types';

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/admin/all')
    .then(res =>
      dispatch({
        type: GET_ADMINS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ADMINS,
        payload: {}
      })
    );
};

export const deleteAccount = () => dispatch => {
    if (window.confirm('Are you sure?')) {
      axios
        .delete('api/admin/delete/:resident_id')
        .then(res =>
          dispatch({
            type: SET_CURRENT_USER,
            payload: {}
          })
        )
        .catch(err =>
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
        );
    }
  };


// Create Profile
export const updateprofile = (profileData) => dispatch => {
    axios
      .put('/api/admin/update/'+ this.props.match.params.admin_id, profileData)
      .then(res =>
        dispatch({
          type: GET_ADMINS,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
  
  export const getById = (profileData) => dispatch => {
    axios
      .get('/api/admin/'+ this.props.match.params.admin_id, profileData)
      .then(res =>
        dispatch({
          type: GET_ADMINS,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };

  export const search = (data) => dispatch => {
    axios
      .get('/api/admin/search/'+ this.props.match.params.username, data)
      .then(res =>
        dispatch({
          type: GET_ADMINS,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

import axios from 'axios';

import {
  // GET_RESIDENTS,
  GET_USERS,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER,
  GET_ERRORS
} from './types';

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/user/all')
    .then(res =>
      dispatch({
        type: GET_USERS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_USERS,
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
      .put('/api/user/update/'+ this.props.match.params.user_id, profileData)
      .then(res =>
        dispatch({
          type: GET_USERS,
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
      .get('/api/user/'+ this.props.match.params.user_id, profileData)
      .then(res =>
        dispatch({
          type: GET_USERS,
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
      .get('/api/user/search/'+ this.props.match.params.email, data)
      .then(res =>
        dispatch({
          type: GET_USERS,
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

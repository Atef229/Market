import axios from 'axios';

import {
  // GET_RESIDENTS,
  GET_CATEGORIES,
  GET_ERRORS
} from './types';

  
  export const getById = (profileData) => dispatch => {
    axios
      .get('/api/category/'+ this.props.match.params.category_id, profileData)
      .then(res =>
        dispatch({
          type: GET_CATEGORIES,
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
      .get('/api/category/search/'+ this.props.match.params.name, data)
      .then(res =>
        dispatch({
          type: GET_CATEGORIES,
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

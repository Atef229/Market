import axios from 'axios';

import {
  // GET_RESIDENTS,
  GET_PRODUCTS,
  GET_ERRORS
} from './types';

// Get current profile
export const allproducts = () => dispatch => {
  dispatch();
  axios
    .get('/api/product/all')
    .then(res =>
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PRODUCTS,
        payload: {}
      })
    );
};


export const updateproduct = (profileData) => dispatch => {
    axios
      .put('/api/product/update/'+ this.props.match.params.product_id, profileData)
      .then(res =>
        dispatch({
          type: GET_PRODUCTS,
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
      .get('/api/product/'+ this.props.match.params.product_id, profileData)
      .then(res =>
        dispatch({
          type: GET_PRODUCTS,
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
      .get('/api/product/search/'+ this.props.match.params.name, data)
      .then(res =>
        dispatch({
          type: GET_PRODUCTS,
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

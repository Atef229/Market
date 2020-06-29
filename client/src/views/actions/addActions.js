import axios from 'axios';
import setAuthToken from '../components/utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from './types';

// add Category
export const addCategory = (data,history) => dispatch => {
  axios
    .post('/api/category/add', data)
    .then(res => history.push('/dashboard')
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// add SubCategory
export const addSubCategory = (data,history) => dispatch => {
  axios
    .post('/api/subcategory/add', data)
    .then(res => history.push('/dashboard')
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// add product
export const addProduct = (data,history) => dispatch => {
  axios
    .post('/api/product/add', data)
    .then(res => history.push('/dashboard')
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

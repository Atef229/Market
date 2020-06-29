import axios from 'axios';

import {
  GET_ORDERS,
  GET_ERRORS
} from './types';

  
  export const getByuserId = (profileData) => dispatch => {
    axios
      .get('/api/order/'+ this.props.match.params.owner_id, profileData)
      .then(res =>
        dispatch({
          type: GET_ORDERS,
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

  export const getByorderId = (profileData) => dispatch => {
    axios
      .get('/api/order/orders/'+ this.props.match.params.order_id, profileData)
      .then(res =>
        dispatch({
          type: GET_ORDERS,
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

import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getNames_ = (names) => {
     return { type: actionTypes.GET_ALL, names: names };
};
export const getNames = () => {
     return dispatch => {
          return axios.get('/api/name/')
               .then(res => dispatch(getNames_(res.data)));
           }
      }
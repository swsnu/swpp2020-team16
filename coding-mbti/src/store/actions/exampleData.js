/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import * as actionTypes from './actionTypes';

export const getNames_ = (names) => ({ type: actionTypes.GET_ALL, payload: names });
export const getNames = () => (dispatch) => axios.get('/api/name/')
  .then((res) => dispatch(getNames_(res.data)));

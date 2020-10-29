import * as actionTypes from '../actions/actionTypes';

const initialState = {
  names: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL:
      return { ...state, names: action.payload };

    default:
      break;
  }

  return state;
};

export default reducer;

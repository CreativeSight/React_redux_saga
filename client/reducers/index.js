import { combineReducers } from 'redux';

const initState = {
    stats: [],
    loading: false,
    error: false,
    noData: true
}

const dataReducer = (state = initState, action) => {
switch (action.type) {
    case 'CURRENT_FETCH_DATA':
      return {
        ...state,
        stats: [...state.stats],
        loading: true,
        error: false,
        noData: false
      };
    case 'FETCH_USER_SUCCESS':
      return {
        ...state,
        stats: [...state.stats, {[action.id]: action.data}],
        loading: false,
        error: false,
        noData: false
      };
    case 'FETCH_ALL_SUCCESS':
      return {
        ...state,
        stats: [{[action.id]: action.data}],
        loading: false,
        error: false,
        noData: false
      };
    case 'FETCH_DATA_FAILED':
      return {
        ...state,
        data: 'Sorry connection problems, please try again later',
        loading: false,
        error: true,
        noData: null
      };
    case 'DELETE_USER':
      return {
        ...state,
        stats: [...state.stats.filter(el => {
          return parseFloat(Object.keys(el)) !== action.id;
        })],
        loading: false,
        error: false,
        noData: false
    };
    case 'CLEAR_DATA':
      return {
        ...state,
        stats: [],
        loading: false,
        error: false,
        noData: true
    };
    default:
      return state;
  }
};

export default combineReducers({
    data: dataReducer
});
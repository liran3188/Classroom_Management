// src/store.js
import { createStore } from 'redux';

// Action types
const SET_THEME = 'SET_THEME';

// Action creators
export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: theme,
});

// Initial state
const initialState = {
  themeColor: '#F50057', // Default theme color
};

// Reducer
const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        themeColor: action.payload,
      };
    default:
      return state;
  }
};

// Create store
const store = createStore(themeReducer);

export default store;

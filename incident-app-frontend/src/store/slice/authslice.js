import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import Reducer from "../reducers/Userreducers";
//configureStore is a function that creates a Redux store instance. 
//It takes an object as an argument which has a reducer property that maps to a reducer function
const store = configureStore({
  reducer: {
    expander: Reducer,
  },
}, applyMiddleware(thunk));
export default store;




import { combineReducers } from 'redux';
import userReducer from './slice/userSlice';

import orderReducer from "./slice/orderSlice";

import cartReducer from "./slice/cartSlice";

import contactReducer from './slice/contactSlice';

import productReducer from './slice/productSlice';

import selectionReducer from './slice/selectedSlice';

import feedbackReducer from './slice/feedbackSlice';
const rootReducers = combineReducers({
  user: userReducer,

  order:orderReducer,

  cart: cartReducer,

  contact:contactReducer, 

  product:productReducer,

  selection:selectionReducer,

  feedback:feedbackReducer

});

export default rootReducers;    
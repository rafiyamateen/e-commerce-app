import products from "./productsReducer";
import cart from "./cartReducer";
import form from './formReducer'
import { combineReducers } from "redux";
export default combineReducers({
    products, cart, form
})
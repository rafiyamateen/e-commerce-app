import products from "./productsReducer";
import cart from "./cartReducer";
import favorites from './favoritesReducer'
import { combineReducers } from "redux";
export default combineReducers({
    products,cart
    // ,favorites
})
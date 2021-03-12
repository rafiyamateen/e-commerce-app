import { ADD_TO_CART, ORDER_PLACED, QUANTITY_CHANGER, REMOVE_FROM_CART } from "../actionTypes";

const cartReducer = (state = JSON.parse(localStorage.getItem('cartItems')) || [], action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return action.payload
        case REMOVE_FROM_CART:
            return action.payload
        case QUANTITY_CHANGER:
            return action.payload
        case ORDER_PLACED:
            return null
        default:
            return state;
    }
}
export default cartReducer
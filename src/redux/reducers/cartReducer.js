import { ADD_TO_CART, QUANTITY_CHANGER, REMOVE_FROM_CART } from "../actionTypes";

export default (state = JSON.parse(localStorage.getItem('cartItems')) || [], action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return [...state, action.payload]
        case REMOVE_FROM_CART:
            return  action.payload
        case QUANTITY_CHANGER:
            return [...state, action.payload]
        default:
            return state;
    }

}
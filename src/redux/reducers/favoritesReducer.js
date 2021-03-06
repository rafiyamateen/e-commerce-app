import { ADD_TO_FAVORITES } from "../actionTypes";

export default (state = JSON.parse(localStorage.getItem('favorites')) || [], action) => {
    switch (action.type) {
        case ADD_TO_FAVORITES:
            return  action.payload
        default:
            return state;
    }
}
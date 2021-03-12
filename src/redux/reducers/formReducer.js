import { LOGIN, LOGOUT, SIGNUP } from "../actionTypes";

const initState = {
    accounts: JSON.parse(localStorage.getItem('accounts')) || [],
    login: JSON.parse(localStorage.getItem('login')) || {}
}
const formReducer = (state = initState, action) => {
    switch (action.type) {
        case SIGNUP:
            localStorage.setItem('accounts', JSON.stringify([...state.accounts, action.payload]))
            return {
                accounts: [...state.accounts, action.payload],
                login: action.payload
            }
        case LOGIN:
            return {
                accounts: state.accounts,
                login: action.payload
            }
        case LOGOUT:
            localStorage.removeItem('login')
            return {
                ...state, login: {}
            }
        default:
            return state
    }
}
export default formReducer
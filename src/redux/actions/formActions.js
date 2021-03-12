import { LOGIN, SIGNUP, LOGOUT } from "../actionTypes"

export const signup = (data) => {
    return {
        type: SIGNUP,
        payload: data
    }
}
export const login = (data) => {
    return {
        type: LOGIN,
        payload: data
    }
}
export const logout = () => {
    return {
        type: LOGOUT
    }
}

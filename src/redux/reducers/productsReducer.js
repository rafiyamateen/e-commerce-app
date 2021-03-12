import itemsList from "../../assets/products";
import { ADD_TO_FAVORITES, SELL_PRODUCT } from "../actionTypes";
const initState = {
    products: JSON.parse(localStorage.getItem('allProducts')) || itemsList,
    favorites: JSON.parse(localStorage.getItem('favorites')) || []
}
const products = (state = initState, action) => {
    switch (action.type) {
        case SELL_PRODUCT: {
            const newList = [...state.products, action.payload]

            localStorage.setItem('allProducts', JSON.stringify(newList))
            return { ...state, products: newList }
        }
        case ADD_TO_FAVORITES: {
            let itemExist = false
            for (const favProd of state.favorites) {
                if (action.payload.id === favProd.id) {
                    itemExist = true
                    action.payload.fav = false
                    state.favorites = state.favorites.filter(fav => fav.id !== action.payload.id)
                    break
                }
            }
            if (!itemExist) {
                action.payload.fav = true
                state.favorites.push(action.payload)
            }
            localStorage.setItem('favorites', JSON.stringify(state.favorites))
            for (const fav of state.favorites) {
                for (const item of state.products) {
                    if (fav.id === item.id) {
                        item.fav = true
                    }
                }
            }
            localStorage.setItem('allProducts', JSON.stringify(state.products))
            return { products: state.products, favorites: state.favorites }
        }
        default: {
            localStorage.setItem('allProducts', JSON.stringify(state.products))
            return state
        }
    }
}
export default products
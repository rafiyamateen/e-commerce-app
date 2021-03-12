import { SELL_PRODUCT, ADD_TO_FAVORITES } from '../actionTypes'
export const addProductToSell = (newProduct) => {
    return {
        type: SELL_PRODUCT,
        payload: newProduct
    }
}
export const addToFavorites = (item) => {
    return {
        type: ADD_TO_FAVORITES,
        payload: item
    }
}
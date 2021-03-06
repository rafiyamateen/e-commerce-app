import { SELL_PRODUCT } from '../actionTypes'
export const addProductToSell = (newProduct) => {
    return {
        type: SELL_PRODUCT,
        payload: newProduct
    }
}
import { ADD_TO_CART, REMOVE_FROM_CART, QUANTITY_CHANGER, ORDER_PLACED } from "../actionTypes"

export const addToCart = (product, details) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || []
    let productExists = false
    for (const item of cartItems) {
        if (product.id === item.id) {
            item.quantity = details ? product.quantity : ++item.quantity
            productExists = true
        }
    }
    if (!productExists) {
        const cartProduct = { ...product, quantity: 1 }
        cartItems.push(cartProduct)
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
    return {
        type: ADD_TO_CART,
        payload: cartItems
    }
}
export const removeFromCart = (item) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || []
    const filteredItems = cartItems.filter((cartItem) => item.id !== cartItem.id)
    localStorage.setItem('cartItems', JSON.stringify(filteredItems))
    return {
        type: REMOVE_FROM_CART,
        payload: filteredItems
    }
}
export const quantityChanger = (item, quantity) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || []
    for (const i of cartItems) {
        if (i.id === item.id) {
            i.quantity = quantity
        }
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
    return {
        type: QUANTITY_CHANGER,
        payload: cartItems
    }
}
export const orderPlaced = () => {
    localStorage.removeItem('cartItems')
    return {
        type: ORDER_PLACED
    }
}
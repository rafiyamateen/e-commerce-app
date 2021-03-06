// import { useSelector } from "react-redux";
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
            // console.log(typeof (state.products), action.payload);
            // const favorites = JSON.parse(localStorage.getItem('favorites'))
            for (const fav of action.payload) {
                for (const item of state.products) {
                    if (item.fav === undefined) { item.fav = false }
                    if (fav.id === item.id) {
                        item.fav = true
                    }
                }
            }
            console.log(state.products);
            localStorage.setItem('allProducts', JSON.stringify(state.products))
            return { products: state.products, favorites: action.payload }
        }
        default: {
            localStorage.setItem('allProducts', JSON.stringify(state.products))
            return state
        }
    }
}
export default products
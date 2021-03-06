import { ADD_TO_FAVORITES } from "../actionTypes"

export const addToFavorites = (item) => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || []
    let itemExist = false
    for (const i of favorites) {
        if (item.id === i.id) {
            itemExist = true
            item.fav = false
            favorites = favorites.filter(fav => fav.id !== item.id)
            break
        }
    }
    if (!itemExist) {
        item.fav = true
        favorites.push(item)
    }
    localStorage.setItem('favorites', JSON.stringify(favorites))
    // console.log(favorites);
    return {
        type: ADD_TO_FAVORITES,
        payload: favorites
    }
}
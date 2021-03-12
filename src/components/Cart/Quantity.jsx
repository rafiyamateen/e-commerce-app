import { useState } from "react"
import { useDispatch } from "react-redux"
import { quantityChanger } from "../../redux/actions/cartActions"
import '.././ProductDetails/quantity.css'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'

const Quantity = ({ item }) => {
    const dispatch = useDispatch()
    let [quantity, setQuantity] = useState(item.quantity)
    const increment = (item) => {
        setQuantity(++quantity)
        dispatch(quantityChanger(item, quantity))
    },
        decrement = (item) => {
            if (quantity > 1) {
                setQuantity(--quantity)
                dispatch(quantityChanger(item, quantity))
            }
        }
    return (
        <div>
            <AiOutlineMinus onClick={() => decrement(item)} className='decrement' />
            {quantity}<AiOutlinePlus onClick={() => increment(item)} className='increment' />
        </div>
    )
}

export default Quantity


import { useState } from "react"
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import './quantity.css'

const Quantity = ({ item }) => {
    let [quantity, setQuantity] = useState(1)
    item.quantity = quantity
    const increment = () => {
        setQuantity(++quantity)
    },
        decrement = () => {
            if (quantity > 1) {
                setQuantity(--quantity)
            }
        }
    return (
        <div className='quan_div'>
            <AiOutlineMinus onClick={decrement} className='decrement' />
            {quantity}<AiOutlinePlus onClick={increment} className='increment' />
        </div>
    )
}

export default Quantity
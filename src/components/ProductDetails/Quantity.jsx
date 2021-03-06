import { useState } from "react"
import { Card } from "react-bootstrap"
import { useDispatch } from "react-redux"
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
        <div>
            <Card.Text>Quantity : {quantity} <span className='decrement' onClick={decrement} >-</span><span className='increment' onClick={increment} >+</span> </Card.Text>
        </div>
    )
}

export default Quantity


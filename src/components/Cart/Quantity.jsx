import { useState } from "react"
import { Card } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { quantityChanger } from "../../redux/actions/cartActions"
import '.././ProductDetails/quantity.css'

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
            <Card.Text>Quantity: {quantity}<span className='decrement' onClick={() => decrement(item)} >-</span><span className='increment' onClick={() => increment(item)} >+</span> </Card.Text>
        </div>
    )
}

export default Quantity


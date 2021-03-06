import { useState } from "react";
import { Button, Card, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from '../../redux/actions/cartActions'
import Quantity from "./Quantity";
import './cart.css'

const Cart = () => {
    const cartItems = useSelector(state => state.cart)
        || JSON.parse(localStorage.getItem('cartItems'))
        ,
        dispatch = useDispatch()
    console.log(cartItems);

    return (
        <Container id='cart_container'>
            {cartItems ? cartItems.map((item) => {
                return (
                    <div key={item.id} >
                        <Row id='cart_row' >
                            <Card.Img id='cart_img' src={item.img} />
                            <div>
                                <Card.Title>
                                    {item.title}
                                </Card.Title>
                            </div>
                            <div>
                                <Quantity item={item} />
                                <Button onClick={() => { dispatch(removeFromCart(item)) }} >Remove</Button>
                            </div>
                        </Row>
                        <hr />
                    </div>
                )
            })
                : null}
        </Container>
    )
}

export default Cart

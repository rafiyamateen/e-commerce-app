import { useEffect, useState } from "react"
import { Button, Container, Form, Modal, div } from "react-bootstrap"
import { AiFillEdit } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { orderPlaced } from "../../redux/actions/cartActions"
import './checkout.css'

const Checkout = () => {
    useEffect(() => {
        document.getElementsByName('address')[0].focus()
    }, [])
    const account = useSelector(state => state.form.login),
        cartItems = useSelector(state => state.cart),
        [show, setShow] = useState(false),
        [edit, setEdit] = useState(false),
        dispatch = useDispatch(),
        handleClose = () => {
            setShow(false)
            dispatch(orderPlaced())
        },
        placeOrder = () => {
            if (document.getElementsByName('address')[0].value && document.getElementsByName('city')[0].value) {
                setShow(true)
            } else {
                alert('Enter your complete address & city to place order')
                document.getElementsByName('address')[0].focus()
                return false
            }
        },
        onEdit = () => {
            setEdit(true)
        }
    useEffect(() => {
        edit && document.getElementsByName('username')[0]?.focus()
    }, [edit])
    return (
        <Container className='checkout_container'>
            <div className='checkout_cards'>
                <h3> Delivery Address</h3>
                <Form>
                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Address</Form.Label>
                        <Form.Control name='address' placeholder="Enter delivery address" />
                    </Form.Group>
                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>City</Form.Label>
                        <Form.Control name='city' placeholder="Enter your city" />
                    </Form.Group>
                </Form>
            </div>
            <div className='checkout_cards'>
                <h3> Payment</h3>
                <p>Cash on delivery</p>
            </div>
            <div className='checkout_cards'>
                <span className='edit_sec'>
                    <h3> Personal Details</h3>
                    <AiFillEdit className='edit_icon' onClick={onEdit} />
                </span>
                {edit ? <>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>User name</Form.Label>
                        <Form.Control value={account.username} type="text" name='username' placeholder="Enter your name" />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control value={account.email} type="email" name='email' placeholder="Enter your email" />
                    </Form.Group></> : <>
                    {account.username} <br />
                    {account.email}
                </>
                }
            </div>
            <div className='checkout_cards'>
                <h3> Your order </h3>
                {cartItems.map(item => {
                    return (<div key={item.id} className='prod_detail' >
                        <span>
                            {item.quantity} &times; {item.title[0] + item.title.slice(1)}
                        </span>
                        <span className='price'>Rs.{item.price * item.quantity}</span>
                    </div>)
                })}
            </div>
            <div>
                <Button className='fullWidthBtn' onClick={placeOrder} >Place Order</Button>
                <Modal show={show} onHide={handleClose}
                    backdrop="static"
                    keyboard={false} centered>
                    <Modal.Header>
                        Your order has been placed successfully!
                    </Modal.Header>
                    <Modal.Footer>
                        <Button as={Link} to='/' className='bg_color' onClick={handleClose}>
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </Container>
    )
}

export default Checkout
import { useEffect, useState } from "react"
import { Button, Container, Form, Modal } from "react-bootstrap"
import { AiFillEdit } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { orderPlaced } from "../../redux/actions/cartActions"
import './checkout.css'
import NumberFormat from 'react-number-format';

const Checkout = () => {
    useEffect(() => {
        document.getElementsByName('address')[0].focus()
    }, [])
    const account = useSelector(state => state.form.login),
        cartItems = useSelector(state => state.cart),
        [show, setShow] = useState(false),
        [edit, setEdit] = useState(false),
        [values, setValues] = useState({ username: account.username, email: account.email }),
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
        },
        editOnChange = (e) => {
            setValues(prevState => ({
                ...prevState,
                [e.target.name]: e.target.value
            }))
        }
    let total = 0
    useEffect(() => {
        edit && document.getElementsByName('username')[0]?.focus()
    }, [edit])
    document.title = 'Checkout'
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
                        <Form.Control onChange={editOnChange} value={values.username} type="text" name='username' placeholder="Enter your name" />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={editOnChange} value={values.email} type="email" name='email' placeholder="Enter your email" />
                    </Form.Group></> : <>
                    {account.username} <br />
                    {account.email}
                </>
                }
            </div>
            <div className='checkout_cards'>
                <h3> Your order </h3>
                {cartItems.map(item => {
                    total += item.price * item.quantity
                    return (<div key={item.id} className='prod_detail' >
                        <span>
                            {item.quantity} &times; {item.title[0] + item.title.slice(1)}
                        </span>
                        <span className='price'>Rs.<NumberFormat value={item.price * item.quantity} displayType={'text'} thousandSeparator={true} /></span>
                    </div>)
                })}
                <hr className='checkout_hr' />
                <div className='prod_detail'>
                    <span>
                        Subtotal
                    </span>
                    <span>
                        Rs.<NumberFormat value={total} displayType={'text'} thousandSeparator={true} />
                    </span>
                </div>
                <hr className='checkout_hr' />
                <div className='prod_detail'>
                    <span>
                        Shipping Charges
                    </span>
                    <span>
                        Rs.200
                </span>
                </div>
                <hr className='checkout_hr' />
                <div className='prod_detail'>
                    <span>
                        Total
                    </span>
                    <span className=''>
                        Rs.<NumberFormat value={total + 200} displayType={'text'} thousandSeparator={true} />
                    </span>
                </div>
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
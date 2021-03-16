import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from '../../redux/actions/cartActions'
import Quantity from "./Quantity";
import './cart.css'
import { Link } from "react-router-dom";
import NumberFormat from 'react-number-format';

const Cart = () => {
    const cartItems = useSelector(state => state.cart) ||
        JSON.parse(localStorage.getItem('cartItems')),
        dispatch = useDispatch()
    let total = 0
    if (cartItems && cartItems[0]) {
        for (const item of cartItems) {
            total += item.price * item.quantity
        }
    }
    document.title = 'Your Cart'
    return (<>
        { cartItems?.[0] ?
            <Container id='cart_container'>
                < Row className='head_foot' >
                    <Col> <Card.Title>Products</Card.Title></Col>
                    <Col> <Card.Title>Details</Card.Title></Col>
                    <Col> <Card.Title className='align_right'>Quantity</Card.Title></Col>
                </Row >
                <hr />
                {cartItems ? cartItems.map((item) => {
                    return (
                        <div key={item.id} >
                            <Row className='cart_row' >
                                <span className='del_cart' onClick={() => { dispatch(removeFromCart(item)) }}>&times;</span>
                                <Col className='cart_img_col'>
                                    <Link to={{
                                        pathname: `products/${item.category.replace(/ /g, '_')}/${item.title.replace(/ /g, '_')}`,
                                        state: item
                                    }}>
                                        <Card.Img className='cart_img' src={item.img} alt={`${item.title} ${item.category}`} />
                                    </Link>
                                </Col>
                                <Col className='cart_detail'>
                                    <Card.Title className='title'>
                                        {`${item.title[0].toUpperCase()}${item.title.slice(1)}`}
                                    </Card.Title>
                                    <Col>
                                        Rs.<NumberFormat value={item.price} displayType={'text'} thousandSeparator={true} />
                                    </Col>
                                </Col>
                                <Col className='align_right'>
                                    <Col>
                                        Rs.<NumberFormat value={item.price * item.quantity} displayType={'text'} thousandSeparator={true} />
                                    </Col>
                                    <Quantity item={item} />
                                </Col>
                            </Row>
                            <hr />
                        </div>
                    )
                }) : null}
                <Row className='head_foot foot_row' >
                    <Row>
                        <Col>
                            Subtotal
                    </Col>
                        <Col className='align_right'>
                            Rs.<NumberFormat value={total} displayType={'text'} thousandSeparator={true} />
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col>
                            Shipping Charges
                    </Col>
                        <Col className='align_right'>
                            Rs.200
                </Col>
                    </Row>
                    <hr className='total_sec' />
                    <Row>
                        <Col>
                            Total
                    </Col>
                        <Col className='align_right'>
                            Rs.<NumberFormat value={total + 200} displayType={'text'} thousandSeparator={true} />
                        </Col>
                    </Row>
                </Row>
                <Row className='checkout'>
                    <Button as={Link} to='/checkout' className='fullWidthBtn'>Go to Checkout</Button>
                </Row>
            </Container > :
            <Col className='empty_cart'>
                <h3 className='empty_cart_head'>Oops! you have no item in the cart</h3>
                <Link to='/' className='empty_cart_link'>Continue Shopping</Link>
            </Col>
        }
    </>
    )
}

export default Cart

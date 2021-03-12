import { useState } from "react";
import { Button, Modal, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { AiOutlineShoppingCart, AiOutlinePlus } from 'react-icons/ai'
import { IoMdContact } from 'react-icons/io'
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../../redux/actions/formActions";
import './header.css'

const Header = () => {
    const login = useSelector(state => state.form.login),
        cartItems = useSelector(state => state.cart),
        [show, setShow] = useState(false),
        handleClose = () => setShow(false),
        handleShow = () => setShow(true),
        dispatch = useDispatch(),
        history = useHistory(),
        handleSelect = (e) => {
            history.push(`/category/${e.replace(/ /g, '_')}`)
        }
    let quantity = 0
    cartItems && cartItems.map(item => {
        quantity += Number(item.quantity)
        return null
    })

    return (
        <Navbar sticky='top' className='header bg_color' collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Link to='/'>
                <Navbar.Brand id='nav_brand'>Buy and Sell</Navbar.Brand>
            </Link>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto nav_links" >
                    <Nav.Link as={Link} to='/favorites' href='/favorites'>
                        Favorites
                    </Nav.Link>
                    <NavDropdown onSelect={handleSelect} title="Categories" id="collasible-nav-dropdown">
                        <NavDropdown.Item eventKey='mobile phones' >Mobile Phones</NavDropdown.Item>
                        <NavDropdown.Item eventKey='fashion' >Fashion</NavDropdown.Item>
                        <NavDropdown.Item eventKey='electronics and home appliances' >Electronics and Home Appliances</NavDropdown.Item>
                    </NavDropdown>
                    {login.username ?
                        <>
                            <Nav.Link onClick={handleShow}><IoMdContact id='con_icon' />{login.username}</Nav.Link>
                            <Modal show={show} onHide={handleClose}
                                backdrop="static"
                                keyboard={false} centered>
                                <Modal.Header closeButton>
                                    <Modal.Body>Do you want to log out?</Modal.Body>
                                </Modal.Header>
                                <Modal.Footer>
                                    <Button className='bg_color' onClick={handleClose}>
                                        Close
                                     </Button>
                                    <Button onClick={() => dispatch(logout())} className='bg_color' >
                                        Log out
                                     </Button>
                                </Modal.Footer>
                            </Modal>
                        </>
                        : <>
                            <Nav.Link as={Link} to='/login' href='/login'>
                                Log in
                            </Nav.Link>
                            <Nav.Link as={Link} to='/signup' href='/signup'>
                                Sign up</Nav.Link></>}
                </Nav>
            </Navbar.Collapse>
            <div id='nav_div'>
                <Nav.Link as={Link} to='/sellProducts' href='/sellProducts'>
                    <button className='sell_btn' >
                        <AiOutlinePlus /> SELL</button>
                </Nav.Link>
                <Nav.Link className='cart' as={Link} to='/cart' href='/cart'>
                    <AiOutlineShoppingCart id='cart_icon' />
                    <span className='cart_quan'>
                        {quantity}
                    </span>
                </Nav.Link>
            </div>
        </Navbar>
    )
}

export default Header

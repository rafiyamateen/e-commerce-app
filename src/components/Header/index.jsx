import { Button, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { AiOutlineShoppingCart, AiFillHeart } from 'react-icons/ai'
import { Link } from "react-router-dom";
import './header.css'
import { AiOutlinePlus } from "react-icons/ai";

const Header = () => {
    return (
        <Navbar sticky='top' className='header' collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Link to='/'>
                <Navbar.Brand id='nav_brand'>Buy and Sell</Navbar.Brand>
            </Link>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto nav_links">
                    <Link to='/favorites'>
                        Favorites
                    </Link>
                    <NavDropdown title="Categories" id="collasible-nav-dropdown">
                        <NavDropdown.Item >Mobile Phones</NavDropdown.Item>
                        <NavDropdown.Item >Fashion</NavDropdown.Item>
                        <NavDropdown.Item >Electronics and Home Appliances</NavDropdown.Item>
                        <NavDropdown.Item >All</NavDropdown.Item>
                    </NavDropdown>
                    <Link to='/login'>
                        Log in
                    </Link>
                    <Link to='/signup'>
                        Sign up</Link>
                </Nav>
            </Navbar.Collapse>
            <div id='nav_div'>
                <Link to='/sellProducts'>
                    <button className='sell_btn' >
                        <AiOutlinePlus /> SELL</button>
                </Link>
                <Link to='/cart'>
                    <AiOutlineShoppingCart id='cart_icon' />
                </Link>
            </div>
        </Navbar>
    )
}

export default Header

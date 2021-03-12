import { Button, Card } from "react-bootstrap";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { addToCart } from '../../redux/actions/cartActions'
import { addToFavorites } from "../../redux/actions/productsActions";
import './products.css'

const Products = ({ products, title }) => {
    const login = useSelector(state => state.form.login),
        dispatch = useDispatch(),
        history = useHistory(),
        addProductToCart = (item) => {
            if (!login.username) {
                return history.push('/login')
            }
            else {
                dispatch(addToCart(item, false))
            }
        }
    document.title = title

    return (
        <div className='prod_container'>
            {products.map(item => {
                return (
                    <Card className='prod_card' key={item.id} style={{ width: '18rem' }}>
                        <span className='circle'>
                            {item.fav ? <AiFillHeart className='heart' onClick={() => dispatch(addToFavorites(item))} />
                                : <AiOutlineHeart className='heart' onClick={() => dispatch(addToFavorites(item))} />}
                        </span>
                        <Link to={{
                            pathname: `products/${item.title.replace(/ /g, '_')}`,
                            state: item
                        }}>
                            <Card.Img className='card_img' variant="top" src={item.img} alt={`${item.title} ${item.category}`} />
                        </Link>
                        <Card.Body className='card_body'>
                            <Card.Title>{`${item.title[0].toUpperCase()}${item.title.slice(1)}`}</Card.Title>
                            <Card.Text>
                                Rs.{item.price}
                            </Card.Text>
                            <Button className='fullWidthBtn' variant="primary" onClick={() => addProductToCart(item)} >Add to cart</Button>
                        </Card.Body>
                    </Card>
                )
            })}
        </div>
    )
}

export default Products

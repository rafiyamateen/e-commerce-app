import { Button, Card } from "react-bootstrap";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from '../../redux/actions/cartActions'
import { addToFavorites } from "../../redux/actions/favoritesActions";
import './products.css'

const Products = () => {
    const productsList = useSelector(state => state.products),
        dispatch = useDispatch()

    return (
        <div className='prod_container'>
            {productsList.products.map(item => {
                return (
                    <Card className='prod_card' key={item.id} style={{ width: '18rem' }}>
                        <span className='circle'>
                        {item.fav ? <AiFillHeart className='heart' onClick={() => dispatch(addToFavorites(item))} />
                            : <AiOutlineHeart className='heart' onClick={() => dispatch(addToFavorites(item))} />
                        }
                        </span>
                        <Link to={{
                            pathname: `products/${item.title}`,
                            state: item
                        }}>
                            <Card.Img className='card_img' variant="top" src={item.img} alt={`${item.title}${item.category}`} />
                        </Link>
                        <Card.Body className='card_body'>
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Text>
                                Rs.{item.price}
                            </Card.Text>
                            <Button variant="primary" onClick={() => dispatch(addToCart(item, false))} >Add to cart</Button>
                        </Card.Body>
                    </Card>
                )
            })}
        </div>
    )
}

export default Products

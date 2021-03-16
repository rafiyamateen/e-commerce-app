import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart } from "../../redux/actions/cartActions";
import Quantity from "./Quantity";
import './productDetails.css'
import NumberFormat from 'react-number-format';

const ProductDetails = () => {
    const detail = useSelector(state => state.products.products),
        dispatch = useDispatch(),
        params = useParams()
    for (const i in detail) {
        if (detail[i].title === params.product.replace(/_/g, ' ')) {
            var product = detail[i]
            break
        }
    }
    const title = product.title,
        titleTransform = title[0].toUpperCase() + title.slice(1)
    document.title = `${product.category} | ${titleTransform}`
    return (
        <Container>
            <Row className='prod_details'>
                <Col>
                    <Card.Img src={product.img} alt={product.title} />
                </Col>
                <Col id='detail_Col'>
                    <div>
                        <Card.Title>{titleTransform}</Card.Title>
                        <Card.Body>{product.description} </Card.Body>
                        <Card.Body>
                            <b>Price: </b>
                            Rs. <NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} />
                        </Card.Body>
                    </div>
                    <div id='quan_div'>
                        <Quantity item={product} />
                        <Button id='add_btn' className='fullWidthBtn' onClick={() => dispatch(addToCart(product, true))} >Add to cart</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
export default ProductDetails
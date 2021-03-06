import { useState } from "react"
import { Button, Form, InputGroup } from "react-bootstrap"
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addProductToSell } from "../../redux/actions/productsActions";

const SellProducts = () => {
    let [newId, setId] = useState(localStorage.getItem('id') || 5);
    const [newProduct, setNewProduct] = useState({
        id: Number(newId),
        img: '',
        title: '',
        price: '',
        description: '',
        category: ''
    }),
        dispatch = useDispatch(),
        sellProduct = () => {
            // console.log('onclick', Object.values(newProduct));
            let ready = true
            for (const prop of Object.values(newProduct)) {
                if (!prop || prop === '0') {
                    console.log(true);
                    ready = false
                }
            }
            if (ready) {
                dispatch(addProductToSell(newProduct))
                setId(++newId)
                localStorage.setItem('id',newId)
                console.log(newProduct, newId);
            }



        },
        // strt


        onChangePic = (e) => {
            setNewProduct(prev => ({
                ...prev,
                [e.target.name]: URL.createObjectURL(e.target.files[0])
            }))
            // console.log(newProduct);
            // console.log(e.target.value);
        },
        onChange = (e) => {
            setNewProduct(prev => ({
                ...prev,
                [e.target.name]: e.target.value
            }))
            // console.log( (e.target.files[0]));
            // console.log(newProduct);
        }
    // console.log(newProduct);
    return (
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Product Category</Form.Label>
                <Form.Control name='category' value={newProduct.category} onChange={onChange} type="text" placeholder="Enter category" />
                {/* <Form.Text className="text-muted" /> */}
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Brand/ Company</Form.Label>
                <Form.Control name='title' value={newProduct.title} onChange={onChange} type="text" placeholder="Enter Brand/ Company" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Description</Form.Label>
                <Form.Control name='description' value={newProduct.description} onChange={onChange} type="text" placeholder="Enter Description" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Price</Form.Label>
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">PKR</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control name='price' value={newProduct.price} onChange={onChange} type="number" placeholder="Enter Price" />
                </InputGroup>
            </Form.Group>
            <Form.Group>
                <Form.File name='img' onChange={onChangePic} id="exampleFormControlFile1" label="Add Pictures of the product" />
            </Form.Group>
            <Link to='/'>
                <Button variant="primary" onClick={sellProduct}>
                    Submit
  </Button>
            </Link>
        </Form>
    )
}

export default SellProducts

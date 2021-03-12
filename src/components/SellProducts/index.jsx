import { useEffect, useState } from "react"
import { Button, Form, InputGroup, Spinner } from "react-bootstrap"
import { FiCamera } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addProductToSell } from "../../redux/actions/productsActions";
import { storage } from '../../firebase'
import './sellProducts.css'
import './../Login/forms.css'

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
        [img, setImg] = useState(),
        dispatch = useDispatch(),
        history = useHistory(),
        sellProduct = (e) => {
            e.preventDefault()
            let ready = true
            for (const prop of Object.values(newProduct)) {
                if (!prop || prop === '0') {
                    ready = false
                    alert('All fields are required!')
                    document.getElementsByName('category')[0].focus()
                    break
                }
            }
            if (ready) {
                dispatch(addProductToSell(newProduct))
                setId(++newId)
                localStorage.setItem('id', newId)
                history.push('/')
            }
        },
        onChangeImg = (e) => {
            setImg(e.target.files[0])
        },
        onChange = (e) => {
            setNewProduct(prev => ({
                ...prev,
                [e.target.name]: e.target.value
            }))
        },
        selectCategory = (e) => {
            setNewProduct(prev => ({
                ...prev,
                category: e.value
            }))
        },
        addImg = () => {
            document.getElementsByName('img')[0].click()
        }
    useEffect(() => {
        if (img) {
            const uploadTask = storage.ref(`images/${img.name}`).put(img)
            uploadTask.on('state_changed', () => { }, () => { }, () => {
                storage.ref('images').child(img.name).getDownloadURL().then(url => {
                    setNewProduct(prev => ({
                        ...prev,
                        img: url
                    }))
                })
            })
        }
    }, [img])
    document.title = 'Sell Your Products'
    return (
        <div className='form_div'>
            <Form onSubmit={sellProduct} className='form'>
                <h2>Start selling your products!</h2>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Select Category</Form.Label>
                    <Form.Control onChange={selectCategory} name='category' as="select">
                        <option>mobile phones </option>
                        <option>fashion </option>
                        <option>electronics and home appliances</option>
                        <option>all</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Brand/ Company</Form.Label>
                    <Form.Control name='title' value={newProduct.title} onChange={onChange} type="text" placeholder="Enter Brand/ Company" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Description</Form.Label>
                    <Form.Control name='description' value={newProduct.description} onChange={onChange} as="textarea" placeholder="Enter Description" />
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
                    <Form.File hidden name='img' onChange={onChangeImg} id="exampleFormControlFile1" label="Upload Photo" />
                    <div className='add_img' onClick={addImg}>{img ? <>{newProduct.img ? <img className='prod_img' src={newProduct.img} alt={img.name} /> :
                        <Spinner animation="border" className='loading' />} </> : <FiCamera />}</div>
                </Form.Group>
                <Button className='fullWidthBtn' type='submit'>
                    Post
                </Button>
            </Form>
        </div >
    )
}

export default SellProducts

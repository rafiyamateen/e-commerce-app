import { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { signup } from "../../redux/actions/formActions"
import './../Login/forms.css'

const Signup = () => {
    useEffect(() => {
        document.getElementsByName('username')[0].focus()
    }, [])
    const dispatch = useDispatch(),
        history = useHistory(),
        [data, setData] = useState({
            username: '',
            email: '',
            password: '',
            confirm_password: ''
        }),
        [logged, setLogged] = useState(false),
        savedData = useSelector(state => state.form.accounts),
        onChange = (e) => {
            setData(prevState => ({
                ...prevState,
                [e.target.name]: e.target.value
            }))
        },
        onSubmit = (e) => {
            e.preventDefault()
            const inputs = Object.keys(e.target)
                .filter(key => e.target[key].tagName === 'INPUT')
                .map(key => e.target[key])
            for (const input of inputs) {
                setLogged(true)
                if (!data[input.name]) {
                    setLogged(false)
                    alert('Please enter all required fields')
                    document.getElementsByName([input.name])[0].focus()
                    break
                }
            }
            if (document.getElementsByName('password')[0].value !== document.getElementsByName('confirm_password')[0].value) {
                alert('Please confirm your password again!')
                document.getElementsByName('password')[0].focus()
                return false
            }
            if (savedData) {
                for (let i = 0; i < savedData.length; i++) {
                    if (data.email === savedData[i].email) {
                        alert('Already registered on this email')
                        document.getElementsByName('email')[0].focus()
                        setLogged(false)
                        break
                    }
                }
            }
        }
    useEffect(() => {

        if (logged) {
            const { confirm_password, ...account } = data
            dispatch(signup(account))
            localStorage.setItem('login', JSON.stringify(account))
            history.push('/')
            alert('You have created an account!')
            setData({
                username: '',
                email: '',
                password: '',
                confirm_password: ''
            })
        }
    },[logged,data,dispatch,history])
    return (
        <Form onSubmit={onSubmit} className='form' noValidate >
            <h2>Sign up</h2>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>User name</Form.Label>
                <Form.Control onChange={onChange} value={data.username} type="text" name='username' placeholder="Enter your name" />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control onChange={onChange} value={data.email} type="email" name='email' placeholder="Enter your email" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={onChange} value={data.password} type="password" name='password' placeholder="Enter your password" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control onChange={onChange} value={data.confirm_password} type="password" name='confirm_password' placeholder="Confirm your password" />
            </Form.Group>
            <Form.Text className='text'>Already have an account? <Link to='/login'>login</Link></Form.Text>
            <Button className='fullWidthBtn' type='submit'>
                Sign up
            </Button>
        </Form>
    )
}

export default Signup

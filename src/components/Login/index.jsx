import { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { login } from "../../redux/actions/formActions"
import './forms.css'

const Login = () => {
    useEffect(() => {
        document.getElementsByName('email')[0].focus()
    }, [])
    const [data, setData] = useState({
        email: '',
        password: ''
    }),
        history = useHistory(),
        savedData = useSelector(state => state.form.accounts),
        dispatch = useDispatch(),
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
                if (!data[input.name]) {
                    alert(`Please enter your ${[input.name]}`)
                    document.getElementsByName([input.name])[0].focus()
                    return false
                }
            }
            if (savedData) {
                let logIn = false;
                for (let i = 0; i < savedData.length; i++) {
                    if (data.email === savedData[i].email &&
                        data.password === savedData[i].password) {
                        logIn = true;
                        localStorage.setItem('login', JSON.stringify(savedData[i]))
                        alert('You are logged in');
                        dispatch(login(savedData[i]))
                        history.push('/')
                        break
                    }
                }
                if (!logIn) {
                    alert('Incorrect email or password');
                    document.getElementsByName('email')[0].focus()
                    return false;
                }
            }
            else {
                alert('Incorrect email or password');
                document.getElementsByName('email')[0].focus()
                return false;
            }
        }

    return (
        <Form className='form' onSubmit={onSubmit} noValidate >
            <h2>Login</h2>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control onChange={onChange} value={data.email} type="email" name='email' placeholder="Enter your email" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={onChange} value={data.password} type="password" name='password' placeholder="Enter your password" />
            </Form.Group>
            <Form.Text className='text'>Don't have an account? <Link to='/signup'>sign up</Link></Form.Text>
            <Button className='fullWidthBtn' type='submit'>
                Login
            </Button>
        </Form>
    )
}

export default Login

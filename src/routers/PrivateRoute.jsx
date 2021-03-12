import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ path, component: Component }) => {
    const login = useSelector(state => state.form.login)
    return (
        <Route path={path} render={props => {
            if (login.username) {
                return <Component {...props} />
            } else {
                return <Redirect to='/login' />
            }
        }} />
    )
}

export default PrivateRoute

import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Login from './components/Login';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import SellProducts from './components/SellProducts';
import Checkout from './components/Checkout';
import Signup from './components/Signup';
import NotFound from './components/NotFound';
import PrivateRoute from './routers/PrivateRoute';
import Category from './components/Category';
import { useSelector } from 'react-redux';


function App() {
  const products = useSelector(state => state.products),
    login = useSelector(state => state.form.login)

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' render={() => {
          return (
            <Products products={products.products} title='Buy & Sell' />)
        }} />
        <Route path='/products/:product' component={ProductDetails} />
        <PrivateRoute path='/cart' component={Cart} />
        <PrivateRoute path='/sellProducts' component={SellProducts} />
        <Route path='/favorites' render={() => {
          return (<>{
            products.favorites[0] ?
              <Products products={products.favorites} title='My Favorite Products' /> :
              <h3 className='no_fav'>You have no favorites yet!</h3>
          }</>
          )
        }} />
        <PrivateRoute path='/checkout' component={Checkout} />
        <PrivateRoute path='/category/:category' component={Category} />
        {!login.username && <><Route path='/signup' component={Signup} />
          <Route path='/login' component={Login} /></>}
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;

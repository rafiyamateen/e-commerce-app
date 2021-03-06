import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Route, Switch } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Login from './components/Login';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import SellProducts from './components/SellProducts';
import Favorites from './components/Favorites';
import Checkout from './components/Checkout';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={Products} />
        <Route path='/products/:product' component={ProductDetails} />
        <Route path='/cart' component={Cart} />
        <Route path='/sellProducts' component={SellProducts} />
        <Route path='/favorites' component={Favorites} />
        <Route path='/checkout' component={Checkout} />
        {/* <Route component={NotFound}/> */}
      </Switch>
      <Footer />
    </div>
  );
}

export default App;

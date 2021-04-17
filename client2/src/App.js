import { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import NavBar from './components/navbar/Navbar';
import Cart from './components/order/Cart/Cart';
import ProductsBlock from './components/products/ProductsBlock/ProductsBlock';
import { useDispatch } from 'react-redux';
import { setShippingInfo, setBillingInfo } from './redux/actions/userActions';
import { fetchProducts } from './redux/middlewares/productsMiddleware';
import { fetchAvailableCountries } from './redux/middlewares/countriesMiddleware';

const API_KEY = '0dbb09b1c28c4374ba4821a81e3a8f9b';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    let position = detectUserLocation(API_KEY) || {
      country: 'USA',
      city: 'Los Angeles',
      street: 'Hollywood walk of fame'
    };

    dispatch(fetchProducts());
    dispatch(fetchAvailableCountries());

    dispatch(setShippingInfo({
      recipientName: '',
      recipientPhone: '',
      streetAdress: position.street,
      building: '',
      city: position.city,
      country: position.country,
      ZIP: ''
    }));
    dispatch(setBillingInfo({
      fullName: '',
      email: '',
      streetAdress: position.street,
      building: '',
      city: position.city,
      country: position.country,
      ZIP: ''
    }));
  }, []);

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/products" component={ProductsBlock} />
        <Route path="/cart" component={Cart} />
        <Redirect from="/" to="/products" />
      </Switch>
    </div>
  );
}

function detectUserLocation(API_KEY) {
  let position = {
    country: 'USA',
    city: 'Irkutsk',
    street: 'Lenina'
  };
  return position;
  // it works, just don't wanna waste my API calls
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async function(position) {
      let response = await 
        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=${API_KEY}&language=en`);
      if (response.ok) {
        let data = await response.json();
        position = {
          country: data.results[0].components.country,
          city: data.results[0].components.city, 
          street: data.results[0].components.road
        }
        // console.log(data);
      }
    });
  }
  return position;
}

export default App;

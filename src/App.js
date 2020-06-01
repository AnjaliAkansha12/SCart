import React from 'react';
import ProductListing from './Components/ProductListing';
import MyCart from './Components/MyCart';
import { Route, BrowserRouter,Switch } from 'react-router-dom';
import Login from './Components/Login'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/" component={Login} />
          <Route exact={true} path="/home" component={ProductListing} />
          <Route path="/cart" component={MyCart} />
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;

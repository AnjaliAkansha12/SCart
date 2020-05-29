import React from 'react';
import ShoppingPage from './Components/shoppingpage';
import Cart from './Components/Cart';
import { Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={ShoppingPage} />
        <Route path="/cart" component={Cart} />
      </BrowserRouter>

    </div>
  );
}

export default App;

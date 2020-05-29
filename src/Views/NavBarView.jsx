import React from 'react'
import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';


const NavBarView = (payload) => {
    const { searchOnchangeHandler } = payload
    return (
        <nav className="navbar-wrapper">
            <div className="navbar-left-side">
                <div className="logo-wrapper"><img src={logo} alt="nothing here" /></div>
                <Link to="/">  <div className="products-link-wrapper">Products</div></Link>
            </div>
            <div className="product-search-wrapper">
                <input type="text" onChange={(e) => { searchOnchangeHandler(e.target.value) }} />
            </div>
            <div className="navbar-right-side">
                <Link to="/cart"> <div className="mycart-logo-wrapper"> My Cart</div> </Link>
            </div>
        </nav>
    )
}


export default NavBarView;
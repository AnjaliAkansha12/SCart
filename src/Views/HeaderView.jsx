import React from 'react';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import { ProductConsumer } from '../DataRepository/Context';


const HeaderView = (payload) => {
const {props}=payload;
const logout=()=>props.history.push("/");

    return (
        <ProductConsumer>
            { contextProduct=>{
                return(
                <nav className="header">
                <div className="header__logo">
                <img src={logo} alt="SCart" />   
                </div>
                <div className="header__search">
                    <input type="text"  className="header__search__input" placeholder="search product" onChange={(e) => { contextProduct.searchOnchangeHandler(e.target.value) }} />
                </div>

                <Link to="/home">  <div className="header__text">Products</div></Link>
                
                <Link to="/cart"> <div className="header__text">MyCart</div></Link>
                <div class="notification">{contextProduct.myCartItemCount}</div>
                <button className="logout" onClick={logout}>Logout</button>
             
            </nav>)
            }
            }
        
        </ProductConsumer>
        
    )
}


export default HeaderView;
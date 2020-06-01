import React from 'react';
import { ProductConsumer } from '../DataRepository/Context';

const CartList = (payload) => {
    const { product } = payload
    return (
        <React.Fragment>
            <ProductConsumer>
                {
                    value => {
                        return (
                            <div className="cartlist">
                                <img src={product.image} alt="nothing here" />
                               
                                <div className="contain">
                                    <div className="cart-title">BRAND:  {product.brand}</div>
                                    <div className="cart-price">MRP:  {product.price.final_price}</div>
                                
                                    <button className="size" onClick={() => value.itemDecrement(product.id)}>-</button>
                                    <button className="size">{value.itemCountTracker(product.id)}</button>
                                    <button className="size" onClick={() => value.itemIncrement(product.id)}>+</button>
                                     Amount: {value.itemPriceCalc(product.id)}
                                <button className="remove" onClick={() => value.removeItem(product.id)}><i class="fa fa-trash"></i></button>
                                
                            </div>
                            </div> 
                        )
                    }
                }
            </ProductConsumer>
        </React.Fragment>
    )
}

export default CartList;

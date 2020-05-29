import React from 'react';
import { ProductConsumer } from '../Data/Context';

const CartList = (payload) => {
    const { product } = payload
    return (
        <ProductConsumer>
            {
                value => {
                    return (
                        <div className="individual-cartlist-item-wrapper">
                            <div className="cartlist-item-image-wrapper"><img src={product.image} alt="nothing here" /></div>
                            <div className="cartlist-item-title-wrapper">{product.brand}</div>
                            <div className="cartlist-item-price-wrapper">{console.log(product)}{product.price.final_price}</div>
                        </div>
                    )
                }
            }
        </ProductConsumer>
    )
}

export default CartList;

import React from 'react'
import { ProductConsumer } from '../DataRepository/Context'


export default function Product(payload) {
    const { id, image, brand, price,discount} = payload.product;
    return (
        <ProductConsumer>
                {
                    value => {
                        return (
                            <div className="grid-item">
                                <div className="card" key={id}>
                                    <img src={image} alt="nothing here" className="card__img" />
                                    <div className="card__content">
                                        <div className="card__header">BRAND: {brand}</div>
                                        <div className="card__text">MRP: {price.final_price}</div>
                                        <div className="card__text discount">{discount}%</div>
                                        <button className="card__btn" onClick={() => value.addToCart(id)}>Add <span>&rarr;</span></button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                }
            </ProductConsumer>
    )
}
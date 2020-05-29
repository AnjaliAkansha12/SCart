import React, { Component } from 'react'
import { ProductConsumer } from '../Data/Context'

export default class Product extends Component {

    render() {
        const { id, image, brand, price } = this.props.product;

        return (
            <ProductConsumer>
                {
                    value => {
                        return (
                            <div className="product-container" key={id}>
                                <div className="product-left-side">
                                    <div className="product-image-wrapper">
                                        <img src={image} alt="nothing here" width="100px" height="70px" />
                                    </div>
                                </div>
                                <div className="product-right-side">
                                    <div className="product-name-wrapper">{brand}</div>
                                    <div className="product-price-wrapper">{price.final_price}</div>
                                    <div className="add-to-cart-button-wrapper" onClick={() => value.handleAddtoCard(id)}><button>Add</button></div>
                                </div>
                            </div>

                        )
                    }
                }
            </ProductConsumer>
        )
    }
}


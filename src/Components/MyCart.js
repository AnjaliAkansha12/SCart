import React, { Component } from 'react';
import HeaderView from '../Views/HeaderView';
import { ProductConsumer } from '../DataRepository/Context';
import CartList from '../Views/CartList';

export default class MyCart extends Component {
    render() {
        return (
            <ProductConsumer>
                {contextProduct => {

                    return (
                        <React.Fragment>
                            <HeaderView />
                            {
                                contextProduct.myCartItems ?
                                    contextProduct.allProducts.filter(product => contextProduct.myCartItems.includes(product.id))
                                        .map(item => {
                                            return (
                                                <CartList product={item} key={item.id} />
                                            )
                                        })
                                    : <p>nothing</p>
                            }
                        </React.Fragment>
                    )
                }}

            </ProductConsumer>

        )
    }
}

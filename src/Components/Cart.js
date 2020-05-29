import React, { Component } from 'react';
import NavBarView from '../Views/NavBarView';
import { ProductConsumer } from '../Data/Context';
import CartList from '../Views/CartList';

export default class Cart extends Component {
    render() {
        return (
            <ProductConsumer>
                {value => {

                    return (
                        <React.Fragment>
                            <NavBarView />
                            {
                                value.cartElements ?
                                    value.productData.filter(product => value.cartElements.includes(product.id))
                                        .map(item => {
                                            return (
                                                <CartList product={item} key={item.id} />
                                            )
                                        })
                                    : console.log("non")
                            }
                        </React.Fragment>
                    )
                }}

            </ProductConsumer>

        )
    }
}

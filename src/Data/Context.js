import React, { Component } from 'react';
import axios from 'axios'

const ProductContext = React.createContext();

class ProductProvider extends Component {

    state = {
        productData: [],
        filters: [],
        cartElements: [],
        cartCount: 0
    }

    componentDidMount() {
        axios.get("https://xebiascart.herokuapp.com/products")
            .then((response) => {
                this.setState({ productData: response.data })


            })
        axios.get("https://xebiascart.herokuapp.com/filters")
            .then((response) => {

                this.setState({ filters: response.data })
            })
    }


    handleDetails = () => {
        console.log("hello from detail")
    }

    handleAddtoCard = (id) => {
        let allAddedElements = [...this.state.cartElements];

        if (allAddedElements.indexOf(id) === -1) {
            const array = [...this.state.cartElements, id];
            this.setState({ cartElements: array, cartCount: this.state.cartCount + 1 })
        } else {
            alert("Item already added to cart! Please navigate to cart to update the quantity")
        }
        // this.setState({ cartElements: allAddedElements })
        // const array = [...this.state.cartElements, id];
        // this.setState({ cartElements: array, cartCount: this.state.cartCount + 1 })



    }

    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleDetails: this.handleDetails,
                handleAddtoCard: this.handleAddtoCard
            }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };

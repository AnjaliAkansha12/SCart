import React, { Component } from 'react';
import ShoppingView from '../Views/ShoppingView';
import axios from 'axios';

class Shoppingpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productData: [],
            searchString: null,
            filters: [],
            brandFilterValue: null,
            colorFilterValue: null
        }
    }


    componentDidMount() {
        axios.get("https://xebiascart.herokuapp.com/products")
            .then((response) => {

                this.setState({ productData: response.data })
            })
        axios.get("https://xebiascart.herokuapp.com/filters")
            .then((response) => {
                console.log(response)
                this.setState({ filters: response.data })
            })
    }

    brandSelectOnChangeHandler = (selectValue) => {
        this.setState({ brandFilterValue: selectValue })
    }

    filterSubmitHandler = () => {
        axios.get("https://xebiascart.herokuapp.com/products?title=" + this.state.brandFilterValue)
            .then(response => {
                this.setState({ productData: response.data })
            })
    }

    searchOnchangeHandler = (searchString) => {
        this.setState({ searchString: searchString });

    }

    render() {
        return (

            <div>
                <ShoppingView {...this.state} searchOnchangeHandler={this.searchOnchangeHandler}
                    brandSelectOnChangeHandler={this.brandSelectOnChangeHandler}
                    filterSubmitHandler={this.filterSubmitHandler}
                />
            </div>
        )
    }
}

export default Shoppingpage;

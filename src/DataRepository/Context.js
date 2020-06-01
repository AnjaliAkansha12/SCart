import React, { Component } from 'react';
import axios from 'axios';

const ProductContext = React.createContext();

class ProductProvider extends Component {

    state = {
        inputBrand: null,
        allProducts: [],
        filters: [],
        myCartItems: [],
        myCartItemCount: 0,
        individualItemCount: [],
        individualPrices: [],
        selectedBrand: '',
        selectedColor: '',
        selectedMinPrice: '',
        selectedMaxPrice: '',
        error: false,
        isButtonDisabled: false,
        username: null,
        password: null
    }
 

    componentDidMount() {
        axios.get("https://xebiascart.herokuapp.com/products")
            .then((response) => {
                this.setState({ allProducts: response.data })

                this.state.allProducts.forEach((product) => {
                    return (
                        this.setState({ individualItemCount: [...this.state.individualItemCount, { id: product.id, quantity: 0 }] })
                    )
                })

            })
            .catch(error => {
                this.setState({ error: error })
                console.log(error)

                })
        axios.get("https://xebiascart.herokuapp.com/filters")
            .then((response) => {

                this.setState({ filters: response.data })
            })
            .catch(error => {
                this.setState({ error: error.response })
                
                })
    }

    resetHandler=()=>{ window.location.reload(); }

    removeItem = (id) => {
        let myCartItems = [...this.state.myCartItems];
        myCartItems = myCartItems.filter(product => product !== id)
        this.setState({ myCartItems: myCartItems,  myCartItemCount: this.state. myCartItemCount - 1 })
        }

    searchOnchangeHandler = (inputBrand) => {
        this.setState({ inputBrand: inputBrand });

    }

    selectOnChangeHandler=(selectValue)=> {
       this.setState(selectValue)
        }

    colorAndBrandFilter = (allProducts) => {
        allProducts = allProducts.filter(product => this.state.selectedBrand !== '' ? product.title.toLowerCase().includes(this.state.selectedBrand.toLowerCase()) : true)
        .filter(product => this.state.selectedColor !== '' ? product.colour.title.includes(this.state.selectedColor) : true)
        return allProducts
        }

    filterSubmitHandler = () => {
        if (this.state.selectedMinPrice === '' && this.state.selectedMaxPrice === '') {
        axios.get("https://xebiascart.herokuapp.com/products")
        .then((response) => {
        this.setState({allProducts: response.data })
        let allProducts= [...this.state.allProducts];
        allProducts= this.colorAndBrandFilter(allProducts)
        this.setState({ allProducts: allProducts})
        
        })
        .catch(error => {
        this.setState({ error: error.response })
        
        })
        
        } else if (this.state.selectedMinPrice !== '' && this.state.selectedMaxPrice === '') {
        axios.get("https://xebiascart.herokuapp.com/products")
        .then((response) => {
        this.setState({ allProducts: response.data })
        let allProducts= [...this.state.allProducts];
        allProducts= this.colorAndBrandFilter(allProducts).filter(product => product.price.final_price >= parseInt(this.state.selectedMinPrice.replace('₹', '')))
        this.setState({ allProducts: allProducts})
        })
        .catch(error => {
        this.setState({ error: error.response })
        
        })
        
        } else if (this.state.selectedMinPrice === '' && this.state.selectedMaxPrice !== '') {
        axios.get("https://xebiascart.herokuapp.com/products")
        .then((response) => {
        this.setState({ allProducts: response.data })
        let allProducts= [...this.state.allProducts];
        allProducts= this.colorAndBrandFilter(allProducts).filter(product => product.price.final_price <= parseInt(this.state.selectedMaxPrice.replace('₹', '')))
        this.setState({ allProducts: allProducts})
        })
        .catch(error => {
        this.setState({ error: error.response })
        
        })
        
        }
        else if (this.state.selectedMinPrice !== '' && this.state.selectedMaxPrice !== '' && this.state.selectedMaxPrice !== '₹4000+') {
        axios.get("https://xebiascart.herokuapp.com/products")
        .then((response) => {
        this.setState({ allProducts: response.data })
        let allProducts= [...this.state.allProducts];
        allProducts= this.colorAndBrandFilter(allProducts).filter(
        product =>
        product.price.final_price <= parseInt(this.state.selectedMaxPrice.replace('₹', ''))
        &&
        product.price.final_price >= parseInt(this.state.selectedMinPrice.replace('₹', ''))
        )
        this.setState({ allProducts: allProducts})
        })
        .catch(error => {
        this.setState({ error: error.response })
        
        })
        } else {
            axios.get("https://xebiascart.herokuapp.com/products")
            .then((response) => {
            this.setState({ allProducts: response.data })
            let allProducts= [...this.state.allProducts];
            allProducts= this.colorAndBrandFilter(allProducts)
            this.setState({ allProducts: allProducts})
            })
            .catch(error => {
            this.setState({ error: error.response })
        
        })
        
        }
        
        }

    itemCountTracker = (id) => {
        const individualItemCount = [...this.state.individualItemCount];
        const index = individualItemCount.findIndex(item => item.id === id);

        return (individualItemCount[index].quantity)
    }
    itemPriceCalc = (id) => {
        const allProducts = [...this.state.allProducts];
        const allProductsIndex = allProducts.findIndex(item => item.id === id);
        const price = allProducts[allProductsIndex].price.final_price;

        const individualItemCount = [...this.state.individualItemCount];
        const individualItemCountIndex = individualItemCount.findIndex(item => item.id === id);
        const count = individualItemCount[individualItemCountIndex].quantity;

        const final_price = price * count;
        return final_price;
    }


    itemIncrement = (id) => {

        this.setState(prevState => {
            const individualItemCount = [...prevState.individualItemCount];
            const index = individualItemCount.findIndex(item => item.id === id);

            individualItemCount[index].quantity = individualItemCount[index].quantity + 1 //<= 10 ? individualItemCount[index].quantity + 1 : individualItemCount[index].quantity;
            return { individualItemCount }
        })

    }
    itemDecrement = (id) => {

        this.setState(prevState => {
            const individualItemCount = [...prevState.individualItemCount];
            const index = individualItemCount.findIndex(item => item.id === id);

            individualItemCount[index].quantity = individualItemCount[index].quantity - 1 > 0 ? individualItemCount[index].quantity - 1 : individualItemCount[index].quantity;
            return { individualItemCount }

        })

    }

    addToCart = (id) => {
        let allAddedElements = [...this.state.myCartItems];

        if (allAddedElements.indexOf(id) === -1) {
            const array = [...this.state.myCartItems, id];
            this.setState({ myCartItems: array, myCartItemCount: this.state.myCartItemCount + 1 })
            this.itemIncrement(id)
        } else {
            alert("Item already added to cart!")
        }
    }

    render() {
        return (

            <ProductContext.Provider value={{
                ...this.state,
                handleDetails: this.handleDetails,
                itemIncrement: this.itemIncrement,
                itemDecrement: this.itemDecrement,
                itemCountTracker: this.itemCountTracker,
                itemPriceCalc: this.itemPriceCalc,
                searchOnchangeHandler:this.searchOnchangeHandler,
                removeItem:this.removeItem,
                addToCart: this.addToCart,
                filterSubmitHandler:this.filterSubmitHandler,
                selectOnChangeHandler :this.selectOnChangeHandler,
                resetHandler:this.resetHandler
            }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
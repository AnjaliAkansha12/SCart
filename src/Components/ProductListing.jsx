import React,{Component} from 'react';
import HeaderView from '../Views/HeaderView';
import { ProductConsumer } from '../DataRepository/Context';
import Product from '../Views/Product';

class ProductListing extends Component {
    brandFilter = (filters) => {
        return ( filters.map((filter) => {
                return ( filter.type === 'BRAND' ? filter.values.map((value) => <option key={value.value}>{value.value}</option>) : null )
             })
        )
    }

    colorFilter = (filters) => {
        return ( filters.map((filter) => {
                return ( filter.type === 'COLOUR' ?filter.values.map((value) => <option key={value.color}>{value.title}</option>) : null
                )

            })
        )
    }

    maxPriceFilter = (filters) => {
        return (
            filters.map((filter) => {
                return (
                    filter.type === 'PRICE' ?

                        filter.values.map((value) => {
                            return (
                                value.key > 2000 || value.key === "Max" ?
                                    <option key={value.key}>{value.displayValue}</option> : null)
                        }) : null
                )

            })
        )
    }

     minPriceFilter = (filters) => {
        return (
            filters.map((filter) => {
                return (
                    filter.type === 'PRICE' ?

                        filter.values.map((value) => {
                            return (
                                value.key < 2000 || value.key === "Min" ?
                                    <option key={value.key}>{value.displayValue}</option> : null)
                        }) : null
                )

            })
        )
    }
  
    render() {
        return (
            <ProductConsumer>
                {contextProduct=>{return (<React.Fragment>
            <HeaderView  props={this.props}/>
            <div className="bottom-container">
                <div className="bottom-container-left">
                    <div className="price-filter-wrapper">
                        <select className="brand-select" onChange={(e) => contextProduct.selectOnChangeHandler({ selectedBrand: e.target.value })}>
                            { this.brandFilter(contextProduct.filters)}
                        </select>
                        <select className="color-select" onChange={(e) => contextProduct.selectOnChangeHandler({ selectedColor: e.target.value })} >  {this.colorFilter(contextProduct.filters)}  </select>
                        <div className="prise-handler">
                        <select onChange={(e) => contextProduct.selectOnChangeHandler({ selectedMinPrice: e.target.value })}>{this.minPriceFilter(contextProduct.filters)} </select>
                        <select onChange={(e) => contextProduct.selectOnChangeHandler({ selectedMaxPrice: e.target.value })}>  {this.maxPriceFilter(contextProduct.filters)} </select>
                        </div>
                        <div className="filter-submit-button-wrapper">
                            <button className="filter-submit-button" onClick={contextProduct.filterSubmitHandler} >Apply</button>
                            <button className="filter-submit-button" onClick={contextProduct.resetHandler} >Reset</button>
                        </div>
                    </div>

                </div>


                <div className="grid">
                    <ProductConsumer>
                        {value => {
                            return (
                                value.inputBrand ?
                                    value.allProducts.filter((product) => product.brand.includes(value.inputBrand.toLowerCase()))
                                        .map(product => { return <Product key={product.id} product={product} /> }) :
                                    value.allProducts.map(product => { return <Product key={product.id} product={product} /> })

                            )
                        }}
                    </ProductConsumer>
                </div>
            </div>
        </React.Fragment>)}}
            
        </ProductConsumer>

        )
    }
}

export default ProductListing;


import React from 'react';
import NavBarView from './NavBarView';
import { ProductConsumer } from '../Data/Context';
import Product from '../Components/Product';


const ShoppingView = (payload) => {
    const { productData, searchOnchangeHandler, searchString, filters, brandSelectOnChangeHandler, filterSubmitHandler } = payload;
    const selectMapper = (filters) => {
        return (
            filters.map((filter) => {
                return (
                    filter.type === 'BRAND' ?

                        filter.values.map((value) => <option key={value.value}>{value.value}</option>) : null
                )

            })
        )

        /*filter.type === 'BRAND' ?

                    filter.values.map((value) => <option>valeu</option>)

                    : null) */
    }
    const ColorSelectMapper = (filters) => {
        return (
            filters.map((filter) => {
                return (
                    filter.type === 'COLOUR' ?

                        filter.values.map((value) => <option key={value.color}>{value.title}</option>) : null
                )

            })
        )
    }
    const maxPriceSelectMapper = (filters) => {
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

    const minpriceSelectMapper = (filters) => {
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

    return (
        <React.Fragment>
            <NavBarView searchOnchangeHandler={searchOnchangeHandler} />
            <div className="bottom-container">
                <div className="bottom-container-left">
                    <div className="price-filter-wrapper">
                        <select className="brand-select" onChange={(e) => brandSelectOnChangeHandler(e.target.value)}>
                            {
                                selectMapper(filters)
                            }
                        </select>
                        <select className="color-select" >
                            {ColorSelectMapper(filters)}
                        </select>
                        <select>
                            {minpriceSelectMapper(filters)}
                        </select>
                        <select>
                            {maxPriceSelectMapper(filters)}
                        </select>
                        <div className="filter-submit-button-wrapper">
                            <button className="filter-submit-button" onClick={filterSubmitHandler} >Filter</button>
                        </div>
                    </div>

                </div>


                <div className="bottom-container-right">
                    <ProductConsumer>
                        {value => {
                            return (
                                searchString ?
                                    value.productData.filter((product) => product.brand.includes(searchString.toLowerCase()))
                                        .map(product => { return <Product key={product.id} product={product} /> }) :
                                    value.productData.map(product => { return <Product key={product.id} product={product} /> })

                            )
                        }}
                    </ProductConsumer>



                </div>
            </div>
        </React.Fragment>
    )
}

export default ShoppingView;



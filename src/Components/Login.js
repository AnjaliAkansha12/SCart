import React, { Component } from 'react';
import Login from '../Views/Login';
import { ProductConsumer } from '../DataRepository/Context'
import axios from 'axios';

export default class LoginPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: null,
            password: null,
            name: null,
            users: null,
            isValid: true
        }
    }

    componentDidMount() {
        axios.get("https://xebiascart.herokuapp.com/users")
            .then((response) => {
                this.setState({ users: response.data })
            })
    }

    onInputChange = (payload) => {
        this.setState({ ...this.state, ...payload });
    }
    onSubmitHandler = (e) => {
        e.preventDefault();
        const validUser = this.state.users.filter(user => user.username === this.state.username && user.password === this.state.password);

        if (validUser.length !== 0) {
            this.setState({ isValid: true, name: validUser[0].fullName }, this.navigateHome)
        } else {
            this.setState({ isValid: false })
        }

    }

    navigateHome = () => {
        if (this.state.isValid === true) {
            this.props.history.push('/home')
        }
    }

    render() {
        return (
            <ProductConsumer>
                {
                    value => {

                        return (
                            <Login {...{
                                ...this.state,
                                onInputChange: this.onInputChange,
                                onSubmitHandler: this.onSubmitHandler
                            }} />

                        )
                    }
                }

            </ProductConsumer>
        );
    }

}
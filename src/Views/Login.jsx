import React from 'react';
import { ProductConsumer } from '../DataRepository/Context';

export default function Login(payload) {
    const { name, onInputChange, onSubmitHandler, isValid } = payload
    return (
        <ProductConsumer>
            {
                value => {
                    return (
                        <div className="login-container">
                            <div className="login-form-container">
                                <form className="form" onSubmit={onSubmitHandler}>
                                    <div className='login-error'>{isValid ? null : <p>Please Enter the Correct Credentials</p>}</div>
                                    <input type="text" id="username" placeholder="Username" onChange={(e) => onInputChange({ username: e.currentTarget.value })} />
                                    <label for="name" class="form_label">UserName</label>
                                    <input type="password" id="password" placeholder="Password" onChange={(e) => onInputChange({ password: e.currentTarget.value })} />
                                    <label for="name" class="form_label">Password</label>
                                    <div className="center">
                                    <button  className= "submit-button" type='submit' id="submit" >Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )
                }
            }

        </ProductConsumer>
    )
}
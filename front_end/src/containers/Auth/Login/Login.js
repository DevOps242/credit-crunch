import React, { useState } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import { updateObject, checkValidity } from '../../../shared/utility';
import * as actions from '../../../store/actions/index';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';

import classes from './Login.module.css';

const Login = props => {

    const [loginForm, setLoginForm] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Email Address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched:false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched:false
        }   
    });


    const inputChangedHandler= (event, controlName) => {
        const updatedControls = updateObject(loginForm, {
            [controlName]: updateObject(loginForm[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, loginForm[controlName].validation),
                touched: true
            })
        });
        setLoginForm(updatedControls);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        console.log(loginForm.email.value,loginForm.password.value);
        props.onAuth(loginForm.email.value, loginForm.password.value, setLoginForm);
    }

    const formElementsArray = [];

    for (let key in loginForm) {
        formElementsArray.push({
            id: key,
            config: loginForm[key]
        })
    }

    let signupFormContent = formElementsArray.map(formElement => (
        <Input 
            key = {formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => inputChangedHandler(event, formElement.id)}
        />   
    ));
    
    let errorMessage = null;

    if (props.error) {
        errorMessage = (
            <p>{props.error}</p>
        )
    }

    let authRedirect = null;
    if (props.isAuthenticated) {
        authRedirect = <Redirect to ={props.authRedirectPath}/>
    }
    

    return (
        <div className={classes.Login}>
            {authRedirect}
            
            <h1>Credit Crunch</h1>
            <h3>Login</h3>
            {errorMessage}
            <form onSubmit={submitHandler} className={classes}>
                {signupFormContent}
                <Button btnType="Success">Log In</Button>
                <hr/>
                <p onClick={() => props.history.push('/signup') }>Create a new account!</p>
            </form>
            
            <div className={classes}></div>
        </div>
    );
   

}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.authLogin(email, password)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
import React, { useState } from 'react';

import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import { updateObject, checkValidity } from '../../../shared/utility';
import * as actions from '../../../store/actions/index';

import classes from './Signup.module.css';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Logo from '../../../assets/images/creditcrunch-side.png';

const Signup = props => {

    const [signupForm, setSignupForm] = useState({
        firstName: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'First Name'
            },
            value: '',
            validation: {
                required: true,
                // isEmail: true
            },
            valid: false,
            touched:false
        },
        lastName: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Last Name'
            },
            value: '',
            validation: {
                required: true,
                // isEmail: true
            },
            valid: false,
            touched:false
        },
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
        const updatedControls = updateObject(signupForm, {
            [controlName]: updateObject(signupForm[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, signupForm[controlName].validation),
                touched: true
            })
        });
        setSignupForm(updatedControls);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(
            signupForm.firstName.value,
            signupForm.lastName.value,
            signupForm.email.value, 
            signupForm.password.value
        );
    };

    const formElementsArray = [];

    for (let key in signupForm) {
        formElementsArray.push({
            id: key,
            config: signupForm[key]
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
            <p className={classes.ErrorMessage}>{props.error}</p>
        )
    }

    let authRedirect = null;
    if (props.isAuthenticated) {
        authRedirect = <Redirect to ={props.authRedirectPath}/>
    }

    return (
        <div className={classes.Signup}>
            {authRedirect}
            <img className={classes.Logo} src={Logo} alt="Logo" />
            <h4 className={classes.Text}>Sign Up</h4>
            {errorMessage}

            <form onSubmit={submitHandler} className={classes}>
                {signupFormContent}
                <Button btnType="Success">Sign Up</Button>
                <hr/>
                <p className={classes.ButtonText} onClick={() => props.history.push('/login') }>Already have an account?</p>
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
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (first, last, email, password) => dispatch(actions.authSignup(first, last, email, password)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
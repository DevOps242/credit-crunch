import React, {useState, useEffect} from 'react';

import axios from 'axios';
import Input from '../../../components/UI/Input/Input';
import Table from '../../../components/UI/Table/Table';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';

import classes from './Income.module.css';

import {FaPlus} from 'react-icons/fa';


const Income = props => {
    const [incomeForm, setIncomeForm] = useState({
        description: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Enter Description'
            },
            value: '',
            validation: {
                required: true,
                // isEmail: true
            },
            valid: false,
            touched:false
        },
        category: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Category'
            },
            value: 'Income',
            validation: {
                required: false,
                // isEmail: true
            },
            valid: false,
            touched:false
        },
        currency: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Currency'
            },
            value: 'USD',
            validation: {
                required: false,
                // isEmail: true
            },
            valid: false,
            touched:false
        },
        amount: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Enter Amount'
            },
            value: '',
            validation: {
                required: false,
                // isEmail: true
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

    const [loading, setLoading] = useState(false);

    const [incomeData, setIncomeData] = useState([]);

    useEffect(() => {
        setLoading(true)
        axios.post('/income', '10002')
        .then(response => {
            const newData = [];
            const Data = response.data;
            Data.forEach(item => {
                const tempData = Object.values(item)
                newData.push(tempData);
            })
            setIncomeData(newData)
            setLoading(false)
        })
        .catch (error => {
            alert('Something went wrong please, Contact support')
        })
    }, [setIncomeData])
    
    const formElementsArray = [];

    for (let key in incomeForm) {
        formElementsArray.push({
            id: key,
            config: incomeForm[key]
        })
    }

    let spinner = null
    if (loading) {
        spinner = <Spinner/>
    }

    let inputFormContent = formElementsArray.map(formElement => (
        <Input 
            key = {formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            // changed={(event) => inputChangedHandler(event, formElement.id)}
        />   
    ));

    
    return (
        <React.Fragment>
            <h1>Income Statements</h1>
             
            {/* Form to add income */}
            {/* {inputFormContent} */}


            <p>Graph goes here</p>

            <div className={classes.HeadingWrapper}>
                <div>
                    <h2>Income</h2>
                </div>
                <div className={classes.HeadingButton}>
                    <Button 
                        btnType='Success'
                        > <FaPlus/> Add more
                    </Button>
                </div>
            </div>

           
            {spinner}
            <Table 
                heading={['Description', 'Amount', 'Currency', 'Category']}
                content={incomeData}
            />

            {/* Build tables to view income */}
        </React.Fragment>
    )
}

export default Income;
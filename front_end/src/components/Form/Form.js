import React, {useState} from 'react';

import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';

import classes from './Form.module.css';

const Form = props => {

    const [formType, setFormType] = useState(null);

    const [formData, setFormData] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Enter '
            },
            value: '',
            validation: {
                required: true,
                isEmail: false
            },
            valid: false,
            touched:false
        },

        amount: {
            elementType: 'input',
            elementConfig: {
                type: 'number',
                placeholder: 'Enter in the Amount'
            },
            value: '',
            validation: {
                required: false,
                isEmail: false
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
            value: window.localStorage.getItem('user_Currency'),
            validation: {
                required: true,
                isEmail: false
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
            value: formType,
            validation: {
                required: true,
                isEmail: false
            },
            valid: false,
            touched:false
        },

    });

    const checkFormType = (type) => {
        const formType = null;

        switch (type) {
            case ('incomeAddition'):
                return 'incomeFormAdd';

            case 'expenseAddition': 
                return 'expenseFormAdd';

            case 'recurringAddition':
                return 'recurringFormAdd'
    
            default:
                return null; 
        }
    }

    // // Pushing the form elements to an array 
    // const formElementsArray = [];

    // for (let key in formData) {
    //     formElementsArray.push({
    //         id: key,
    //         config: formData[key]
    //     })
    // }

    // // Building the form content from the array that was populated.
    // let inputFormContent = formElementsArray.map(formElement => (
    //     <div>
    //         <label>Test</label>
    //         <Input 
    //             key = {formElement.id}
    //             elementType={formElement.config.elementType}
    //             elementConfig={formElement.config.elementConfig}
    //             value={formElement.config.value}
    //             invalid={!formElement.config.valid}
    //             shouldValidate={formElement.config.validation}
    //             touched={formElement.config.touched}
    //             changed={(event) => props.changed(event, formElement.id)}
    //         />   
    //     </div>
    // ));


    // Checking the form type directing from the props.
    const type = checkFormType(props.formType);
    

    let formDisplay = null;

    if (true) {
        formDisplay = (
            <div>
                <h2>{props.formType} Form</h2>
                <form className={classes.FormLayout} onSubmit={() => console.log('Form Submitted')}>
                    {props.formConent}
                    <Button btnType='Success'> Add Transaction</Button>
                    <Button btnType='Danger' onClick={props.closed}>Cancel</Button>
                </form>
                    
                
            </div>
        )
    }

    return (
        <div>
            {formDisplay}
        </div>
           
    )
}

export default Form;

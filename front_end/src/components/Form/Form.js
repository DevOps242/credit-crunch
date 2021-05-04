import React from 'react';

import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';

import classes from './Form.module.css';

const form = props => {

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


    

    let formDisplay = null;

    if (true) {
        formDisplay = (
            <div>
                <div>
                    <h2>{props.formType} Form</h2>
                    
                </div>
                
                <form className={classes.FormLayout} onSubmit={props.submit}>
                    {props.formConent}
                    <Button btnType='Success'> Add Transaction</Button>
                    <Button btnType='Danger' clicked={(event) => props.closed(event)}>Cancel</Button>
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

export default form;

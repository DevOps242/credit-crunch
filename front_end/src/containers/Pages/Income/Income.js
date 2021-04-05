import React, {useState, useEffect} from 'react';
import {FaPlus} from 'react-icons/fa';
import axios from 'axios';

import Input from '../../../components/UI/Input/Input';
import Table from '../../../components/UI/Table/Table';
import RecurringTable from '../../../components/RecurringTable/RecurringTable';
import TaskTable from '../../../components/TaskTable/TaskTable';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import Chart from '../../../components/UI/Chart/Chart';

import classes from './Income.module.css';


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

    const [totalIncome, setTotalIncome] = useState(0);

    const [recurringIncome, setRecurringIncome] = useState([]);

    const [invoiceIncome, setInvoiceIncome] = useState([]);

    const [taskIncome, setTaskIncome] = useState([]);


    const addTotalAmount = (incomeData) => {
        let preTotal = 0;

        incomeData.forEach(item => {
            return preTotal += parseFloat(item[1])
            }
        )
        setTotalIncome(preTotal.toFixed(2));
    }

    useEffect(() => {
        setLoading(true)

        //Need to add the dynamic UserID here
        axios.post('/income', '10002')
        .then(response => {
            const newIncomeData = [];
            const newRecurrData = [];
            const Data = response.data;
            console.log(Data)
            console.log(Data[0].Income)
            console.log(Data[1].Recurrence)

            // Loop over each Income and push it to the state.
            Data[0].Income.forEach(item => {
                const tempData = Object.values(item);
                newIncomeData.push(tempData);
            })
            setIncomeData(newIncomeData);
            addTotalAmount(newIncomeData);


            // Loop over each Recurrence and push it to the state            
            Data[1].Recurrence.forEach(item => {
                const tempData = Object.values(item);
                newRecurrData.push(tempData);
            })
            setRecurringIncome(newRecurrData);

            
            // Test time out to see the loading affect
            setTimeout(() => {
                setLoading(false)
            }, 1000)

        })
        .catch (error => {
            alert('Something went wrong please, Contact support')
        })
    }, [setIncomeData,setLoading])
    
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

    let displayPage = (
            <div>
            
                <h1 className={classes.IncomeHeadingText}>Income Records</h1>
                
                <div className={classes.ChartWrapper}>
                    <Chart 
                        data={incomeData}
                        mainColor={'rgba(57.0, 179.0, 161.0, 1.0)'}
                        chartType={'Income Data'}
                    />
                </div>

                <div className={classes.HeadingWrapper}>
                    <div className={classes.HeadingText}>
                        <h3>Income Table</h3>
                    </div>

                    <div className={classes.HeadingAmount}>
                        <b>Total Income: ${totalIncome}</b>
                    </div>

                    <div className={classes.HeadingButton}>
                        <Button 
                            btnType='Success'
                            > <FaPlus/> Add more
                        </Button>
                    </div>
                </div>

                <div className={classes.TableWrapper}>
                    <Table 
                        heading={['Description', 'Amount', 'Currency', 'Category', 'Date']}
                        content={incomeData}
                        mainColor={'rgba(57.0, 179.0, 161.0, 1.0)'}
                    />
                </div>

                <div className={classes.ColumnWrapper}>
                    <div className={classes.RowWrapper}>
                        <RecurringTable
                            // heading={['Description', 'Amount', 'Currency', 'Category', 'Date']}
                            content={recurringIncome}
                            mainColor={'rgba(57.0, 179.0, 161.0, 1.0)'}
                        />
                    </div>

                    <div className={classes.RowWrapper}>
                        <TaskTable
                            // heading={['Description', 'Amount', 'Currency', 'Category', 'Date']}
                            content={recurringIncome}
                            mainColor={'rgba(57.0, 179.0, 161.0, 1.0)'}
                        />
                    </div>

                    {/* <div className={classes.SectionWrapper}>
                        <h5>Recurring Income </h5>
                        <div>
                            <div>
                                Columns
                                <div>
                                    #
                                </div>
                                <div>
                                    Name
                                </div>
                                <div>
                                    Description
                                </div>
                                <div>
                                    Amount
                                </div>
                                <div>
                                    Often
                                </div>
                                <div>
                                    Status
                                </div>
                            </div>
                            <div>
                                Rows
                            </div>
                        </div>
                    </div>
                    
                    <div className={classes.SectionWrapper}>
                        <p>Invoice Incomes</p>
                    </div>

                    <div className={classes.SectionWrapper}>
                        <p>Tasked Incomes</p>
                    </div> */}
                </div>

                
            
            </div>
    );

    if (loading) {
        displayPage = (
            <div className={classes.SpinnerWrapper}>
                {spinner}
            </div> 
        )
    }
    
    return (
        <React.Fragment>
            <div className={classes.IncomeWrapper}>
                {displayPage}
 
            </div>
        </React.Fragment>
    )
}

export default Income;
import React from 'react';

import {FaEdit} from 'react-icons/fa';
import {TiDelete} from 'react-icons/ti';

import classes from './RecurringTable.module.css'
import ProgressBar from '../UI/ProgressBar/ProgressBar';



const recurringTable = (props) => {
    

    // const headers = null;

    // if (props.content) {
    //     for(const key in props.content){
    //         console.log(key)
    //     }
    // }
    

    return (
        <React.Fragment>
            <div className={classes.RecurringTableWrapper}>
                <div>
                    <h5 className={classes.RecurringHeader}>Recurring Income</h5>
                </div>
                {
                props.content == null || props.content.length < 1 ? 
                    <div className={classes.RecurringWarningWrapper}>
                        <p className={classes.RecurringWarning}>There is no Reccuring Income to Display</p> 
                        <button className={classes.RecurringWarningButton}>Add Recurring Income</button>
                    </div>: 
                    <div>
                        
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th className={classes.RecurringTableHeading}>Name</th>
                                    <th className={classes.RecurringTableHeading}>Percentage</th>
                                    <th className={classes.RecurringTableHeading}>Goal Amount</th>
                                    <th className={classes.RecurringTableHeading}> Recurrence</th>
                                    <th className={classes.RecurringTableHeading}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.content.map(item => {
                                    return <tr key={item[0]}>
                                        <td className={classes.RecurringTableContent}>{item[0]}</td>
                                        <td className={classes.RecurringTableContent}>{item[1]}</td>
                                        <td className={classes.RecurringTableContent}><ProgressBar key={item[0]} bgColor={props.mainColor} completed={ parseInt(parseFloat(item[3]) / parseFloat(item[4]) * 100) }/></td>
                                        <td className={classes.RecurringTableContent}>${parseFloat(item[4]).toLocaleString()}</td>
                                        <td className={classes.RecurringTableContent}>{item[6]}</td>
                                        <td className={classes.RecurringTableContent}>{item[5]}</td>
                                        <td>
                                            <div className={classes.RecurringTableEditButtonWrapper}>
                                                <p className={classes.RecurringTableEditButtonEdit}><FaEdit size={25}/></p>
                                                <p className={classes.RecurringTableEditButtonDelete}><TiDelete size={28}/></p>
                                            </div>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td>Ending</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                }
            </div>
        </React.Fragment>
    )
}

export default React.memo(recurringTable);

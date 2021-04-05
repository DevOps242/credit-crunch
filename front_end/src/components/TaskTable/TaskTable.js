import React from 'react';

import {FaEdit} from 'react-icons/fa';
import {TiDelete} from 'react-icons/ti';

import classes from './TaskTable.module.css';



const taskTable = (props) => {
    

    const headers = null;

    // if (props.content) {
    //     for(const key in props.content){
    //         console.log(key)
    //     }
    // }
    console.log(props.content)
    return (
        <React.Fragment>
            <div className={classes.TaskTableWrapper}>
                <div>
                    <h5 className={classes.TaskHeader}>Tasked Income</h5>
                </div>
                <div>
                    {/* <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th className={classes.TaskTableHeading}>Name</th>
                                <th></th>
                                <th className={classes.TaskTableHeading}>Amount</th>
                                <th className={classes.TaskTableHeading}> Deadline</th>
                                <th className={classes.TaskTableHeading}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.content.map(item => {
                                console.log(item)
                                return <tr>
                                    <td className={classes.TaskTableContent}>{item[0]}</td>
                                    <td className={classes.TaskTableContent}>{item[1]}</td>
                                    <td></td>
                                    <td className={classes.TaskTableContent}>${parseFloat(item[4]).toLocaleString()}</td>
                                    <td className={classes.TaskTableContent}>{item[6]}</td>
                                    <td className={classes.TaskTableContent}>{item[5]}</td>
                                    <td>
                                        <div className={classes.TaskTableEditButtonWrapper}>
                                            <p className={classes.TaskTableEditButtonEdit}><FaEdit size={25}/></p>
                                            <p className={classes.TaskTableEditButtonDelete}><TiDelete size={28}/></p>
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
                    </table> */}
                </div>
            </div>
        </React.Fragment>
    )
}

export default taskTable;

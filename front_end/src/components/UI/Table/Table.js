import React from 'react';

import classes from './Table.module.css'

const table = (props) => {
    

    const headers = null;

    // if (props.content) {
    //     for(const key in props.content){
    //         console.log(key)
    //     }
    // }

    return (
        <React.Fragment>
            <div className={classes.TableWrapper}>
                <table className={classes.Table}>
                    <tr>
                        {props.heading.map(item => {
                            return <th className={classes.TableHeading}>{item}</th>
                        })}
                    </tr>
                    {props.content.map(item => {
                        return <tr className={classes.TableContentWrapper}>{item.map(itemContent => {
                            return <td className={classes.TableContent}>{itemContent}</td>
                        })}</tr>
                    })}

                    <tr>
                        <tf>
                            {props.content.length > 5 ? <p>1</p> : null
                            }
                            
                        </tf>
                    </tr>
                
                </table>
            </div>
        </React.Fragment>
    )
}

export default table;

// <td className={classes.TableContent}>{item}</td>


// let contentItems = null
//                         if (item.length < 0) {
//                             contentItems = <td>None</td>
//                         }
//                         if (item.length > 0) {
//                             contentItems = <td className={classes.TableContent}>{item}</td>
//                         }
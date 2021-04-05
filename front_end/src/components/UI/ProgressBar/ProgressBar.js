import React from 'react';

import classes from './ProgressBar.module.css';

const progressBar = props => {
    const { bgColor, completed } = props;
    
    // const loading = {
    //     setTime(() => {
            
    //     }, 500)
    // };

    const ProgressBarFiller = {
        height: '100%',
        width: `${completed}%`,
        backgroundColor: bgColor,
        borderRadius: 'inherit',
        textAlign: 'right',
        transition: 'width 1s ease-in-out',
      }

    return (
        <React.Fragment>
            <div className={classes.ProgressBarContainer}>
                <div style={ProgressBarFiller}>
                    <span className={classes.ProgressBarLabel}>{`${completed}%`}</span>
                </div>
            </div>
        </React.Fragment>
    )
}

export default progressBar;
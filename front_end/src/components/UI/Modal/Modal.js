import React from 'react';

import classes from './Modal.module.css';
// import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

const modal = props => {

    // shouldComponentUpdate ( nextProps, nextState ) {
    //     return nextProps.show !== this.props.show;
    // }

    // componentWillUpdate () {
    //     console.log('[Modal] WillUpdate');
    // }
    // console.log(props);
    // console.log('MODAL: ' + props);
  
    return (
        <React.Fragment>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div
                className={classes.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                {props.children}
            </div>
        </React.Fragment>
    );
    
};

// Using react memo to determine if the prevProps and prevChildren are the same as the next props and next children
export default React.memo(modal, (prevProps, nextProps) => nextProps.show === prevProps.show && nextProps.children === prevProps.children);
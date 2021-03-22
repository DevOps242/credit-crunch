import React from 'react';

import classes from './SideDrawer.module.css';

import Backdrop from '../../UI/Backdrop/Backdrop';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../../assets/images/creditcrunch-side.png';

const sideDrawer = props => {

    let attachedClasses = [classes.SideDrawer, classes.Close];

    if(props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    let drawer = null;

    if (props.isAuthenticated) {
        drawer = (
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <div className={classes.LogoWrapper}>
                    {/* Logo */}
                    <img className={classes.Logo} src={Logo} alt="Logo" />
                </div>
                <nav>
                   <NavigationItems sideDrawerItems={props.open} />
                </nav>
            </div>
        )
    }

    return (
        <React.Fragment>
            <Backdrop show={props.open} clicked={props.closed}/>
            {drawer}
            
        </React.Fragment>
        
    )
}

export default sideDrawer;
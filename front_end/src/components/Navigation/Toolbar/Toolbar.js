import React from "react";

import classes from './Toolbar.module.css';

import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import Logo from '../../../assets/images/creditcrunch-side.png';

const Toolbar = props => {

    let toolbar = null;

    if (props.isAuthenticated) {
        toolbar = (
            <header className={classes.Toolbar}>
                <DrawerToggle clicked={props.drawerTogglerClicked} />
                <div className={classes.LogoWrapper}>
                    <img className={classes.Logo} src={Logo} alt="Logo" />
                </div>
                <nav className={classes.DesktopOnly}>
                    <NavigationItems isAuthenticated={props.isAuthenticated}/>
                </nav>
            </header>
        )
    }

    return (
        <React.Fragment>
            {toolbar}
        </React.Fragment>
    )
}

export default Toolbar;
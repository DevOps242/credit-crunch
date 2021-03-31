import React from "react";
import {Link} from 'react-router-dom';

import classes from './Toolbar.module.css';

import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import Logo from '../../../assets/images/creditcrunch-side.png';

const Toolbar = props => {

    let toolbar = null;

    if (props.isAuthenticated) {
        toolbar = (
            <header className={classes.Toolbar}>
                {/* <div className={classes.ToggleWrapper}> */}
                    <DrawerToggle clicked={props.drawerTogglerClicked} />
                {/* </div> */}
                
                <div className={classes.LogoWrapper}>
                    <Link to="/"> <img className={classes.Logo} src={Logo} alt="Logo" /></Link>
                </div>

                {/* <div className={classes.ProfileWrapper}> */}
                    <nav className={classes.DesktopOnly}>
                        <NavigationItems isAuthenticated={props.isAuthenticated}/>
                    </nav>
                {/* </div> */}
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
import React, {useState} from 'react';
import {connect} from 'react-redux';

import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Footer from '../../components/Footer/Footer';

const Layout = props => {

    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    }

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(!showSideDrawer);
    } 

    let footer = null;

    if (props.isAuthenticated) {
        footer = (
            <Footer/>
        )
    }

    return (
        <React.Fragment className={classes.Layout}>
            {/* Task Bar  */}
            <Toolbar 
                isAuthenticated = {props.isAuthenticated}
                drawerTogglerClicked={sideDrawerToggleHandler}
            />
            
            {/* Side Drawer */}
            <SideDrawer 
                isAuthenticated = {props.isAuthenticated}
                open={showSideDrawer}
                closed={sideDrawerClosedHandler}
            />
            <main className={classes.Content}>
                {props.children}   
            </main>  
            {footer}
           
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token != null
    }
}

export default connect(mapStateToProps)(Layout);
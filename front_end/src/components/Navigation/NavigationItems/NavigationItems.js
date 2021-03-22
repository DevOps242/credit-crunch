import React from 'react';

import {FaChartBar} from 'react-icons/fa';
import {FaChartLine} from 'react-icons/fa';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import {FaExchangeAlt} from 'react-icons/fa';
import {FaHistory} from 'react-icons/fa';
import {FaExternalLinkAlt} from 'react-icons/fa';

import classes from './NavigationItems.module.css';

import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = props => {


    return (
        <div>
            <ul className={classes.NavigationItems}>
                {props.isAuthenticated ? <NavigationItem link="/profile">Profile</NavigationItem> : null}
                { props.isAuthenticated ? <NavigationItem link="/logout">Logout</NavigationItem> : null}

            </ul>

            <ul className={classes.SideDrawerNavigationItems}>
                
                {/* Side Drawer Nav Items */}
                {props.sideDrawerItems ? <div className={classes.IconWrapper}>     
                    <NavigationItem link="/" exact>
                        <FaChartBar className={classes.Icon}/>
                        Dashboard
                    </NavigationItem>
                </div> : null}

                {props.sideDrawerItems ? <div className={classes.IconWrapper}>     
                    <NavigationItem link="/income" exact>
                        <FaChartLine className={classes.Icon}/>
                        Income
                    </NavigationItem>
                </div> : null}

                {props.sideDrawerItems ? <div className={classes.IconWrapper}>     
                    <NavigationItem link="/expense" exact>
                        <FaMoneyCheckAlt className={classes.Icon}/>
                        Expense
                    </NavigationItem>
                </div> : null}

                {props.sideDrawerItems ? <div className={classes.IconWrapper}>     
                    <NavigationItem link="/history" exact>
                        <FaHistory className={classes.Icon}/>
                        History
                    </NavigationItem>
                </div> : null}

                {props.sideDrawerItems ? <div className={classes.IconWrapper}>     
                    <NavigationItem link="/exchange" exact>
                        <FaExchangeAlt className={classes.Icon}/>
                        Exchange Rates
                    </NavigationItem>
                </div> : null}

                {props.sideDrawerItems ? <div className={classes.IconWrapper}>     
                    <NavigationItem link="/about-us" exact>
                        <FaExternalLinkAlt className={classes.Icon}/>
                        About Us
                    </NavigationItem>
                </div> : null}
            </ul>
        </div>
    )
};

export default NavigationItems;
import React from 'react'

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// core components
import Header from "components/MaterialKit/Header/Header.js";
import HeaderLinks from "components/Layout/HeaderLinks.js";

import styles from 'assets/jss/nextjs-material-kit/pages/componentsSections/navbarsStyle.js';
const useStyles = makeStyles(styles);

// Redux
import { useSelector } from "react-redux";

const Navbar = () => {
    const classes = useStyles();

    const pageMiddleTitle = useSelector(state=> state.general.pageMiddleTitle) || ""
    return (
        <Header
            color="primary"
            brand="IndEAA"
            brandImage={<img id='logo' src='/img/logos/SHL.png' alt='logo' className={classes.img} style={{marginRight:"10px"}}/>}
            rightLinks={<HeaderLinks />}
            fixed
            pageMiddleTitle={pageMiddleTitle}
        // changeColorOnScroll={{
        //     height: 400,
        //     color: "primary"
        // }}
        />
    )
}

export default Navbar

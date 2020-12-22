import React from 'react'

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// core components
import Header from "components/MaterialKit/Header/Header.js";
import HeaderLinks from "components/Layout/HeaderLinks.js";

import styles from 'assets/jss/nextjs-material-kit/pages/componentsSections/navbarsStyle.js';
const useStyles = makeStyles(styles);

const Navbar = () => {
    const classes = useStyles();

    return (
        <Header
            color="white"
            brand="NextJS Material Kit"
            brandImage={<img id='logo' src='/img/logos/SHL.png' alt='logo' className={classes.img} />}
            rightLinks={<HeaderLinks />}
            fixed
            changeColorOnScroll={{
                height: 400,
                color: "primary"
            }}
        />
    )
}

export default Navbar

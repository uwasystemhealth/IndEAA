import React from 'react'

// CORE COMPONENTS
import GridContainer from 'components/MaterialKit/Grid/GridContainer.js';
import GridItem from 'components/MaterialKit/Grid/GridItem.js';
import Parallax from 'components/MaterialKit/Parallax/Parallax.js';

// STYLES
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/nextjs-material-kit/pages/landingPage.js';
const useStyles = makeStyles(styles);

const ContentWrapper = ({ title, children }) => {
    const classes = useStyles();

    return (
        <>
            <Parallax small filter responsive image={require("assets/img/landing-bg.jpg")}>
                <div className={classes.container}>
                    <GridContainer>
                        <GridItem xs={12}>
                            <h1 className={classes.title}>{title}</h1>
                        </GridItem>
                    </GridContainer>
                </div>
            </Parallax>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                    {children}
                </div>
            </div>
        </>
    )
}

export default ContentWrapper

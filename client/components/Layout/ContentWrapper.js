import React from 'react';
import { SnackbarProvider} from 'notistack';

// CORE COMPONENTS
import Card from 'components/MaterialKit/Card/Card.js';
import CardBody from 'components/MaterialKit/Card/CardBody.js';
import GridContainer from 'components/MaterialKit/Grid/GridContainer.js';


import Footer from 'components/Layout/Footer';
import Notification from 'components/Layout/Notification';

// STYLES
import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/nextjs-material-kit/pages/loginPage.js';
const useStyles = makeStyles(styles);
import image from 'assets/img/bg7.jpg';

const ContentWrapper = ({ children }) => {
    const classes = useStyles();
    return (
        <>
            <SnackbarProvider maxSnack={5}
                preventDuplicate={true}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
            >
                <Notification />
                <div
                    className={classes.pageHeader}
                    style={{
                        backgroundImage: 'url(' + image + ')',
                        backgroundSize: 'cover',
                        backgroundPosition: 'top center'
                    }}
                >
                    <div className={classes.container}>
                        <GridContainer justify="center">
                            <Card >
                                <CardBody>
                                    {children}
                                </CardBody>
                            </Card>

                        </GridContainer>
                    </div>
                    <Footer whiteFont />
                </div>
            </SnackbarProvider>
        </>
    );
};

export default ContentWrapper;

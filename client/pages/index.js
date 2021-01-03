import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "components/MaterialKit/Header/Header.js";
import HeaderLinks from "components/MaterialKit/Header/HeaderLinks.js";
import GridContainer from "components/MaterialKit/Grid/GridContainer.js";
import GridItem from "components/MaterialKit/Grid/GridItem.js";
import Button from "components/MaterialKit/CustomButtons/Button.js";
import Card from "components/MaterialKit/Card/Card.js";
import CardBody from "components/MaterialKit/Card/CardBody.js";
import CardHeader from "components/MaterialKit/Card/CardHeader.js";
import CardFooter from "components/MaterialKit/Card/CardFooter.js";
import CustomInput from "components/MaterialKit/CustomInput/CustomInput.js";

// Own Components
import Navbar from "components/Layout/Navbar"
import Footer from "components/Layout/Footer"

// redux
import { useSelector } from "react-redux"

// Styles
import styles from "assets/jss/nextjs-material-kit/pages/loginPage.js";
import image from "assets/img/bg7.jpg";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();

  // Get User Details
  const user = useSelector((state) => state.auth.user)
  console.log(user)

  return (
    <div
      className={classes.pageHeader}
      style={{
        backgroundImage: "url(" + image + ")",
        backgroundSize: "cover",
        backgroundPosition: "top center"
      }}
    >
      <Navbar></Navbar>
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={6} md={4}>
            <Card className={classes[cardAnimaton]}>
              <form className={classes.form}>
                <CardHeader color="primary" className={classes.cardHeader}>
                  {
                    user !== null ?
                      <h4>Greetings, {user.name}</h4>
                      :
                      (<><h4>Login</h4>
                        <div className={classes.socialLine}>
                          <Button
                            justIcon
                            href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/oauth/google`}
                            color="transparent"
                            external={true}
                          >
                            <i className={"fab fa-google-plus-g"} />
                          </Button>
                        </div></>)
                  }

                </CardHeader>
                {/* <CardBody>
                  
                  </CardBody> */}
                <CardFooter className={classes.cardFooter}>
                  <Button simple color="primary" size="lg">
                    Get started
                    </Button>
                </CardFooter>
              </form>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
      <Footer whiteFont></Footer>
    </div>
  );
}

LoginPage.customLayout = ({ children }) => <div>{children}</div>
// React + Redux + Functionality
import React from 'react';

// Utilities
// nodejs library that concatenates classes
import classNames from 'classnames';
// react components for routing our app without refresh
import Link from 'next/link';

// Material Kit
import Header from 'components/MaterialKit/Header/Header.js';
import HeaderLinks from 'components/MaterialKit/Header/HeaderLinks.js';
import Footer from 'components/MaterialKit/Footer/Footer.js';
import GridContainer from 'components/MaterialKit/Grid/GridContainer.js';
import GridItem from 'components/MaterialKit/Grid/GridItem.js';
import Button from 'components/MaterialKit/CustomButtons/Button.js';
import Parallax from 'components/MaterialKit/Parallax/Parallax.js';

// sections for this page
import SectionBasics from 'pages-sections/Components-Sections/SectionBasics.js';
import SectionNavbars from 'pages-sections/Components-Sections/SectionNavbars.js';
import SectionTabs from 'pages-sections/Components-Sections/SectionTabs.js';
import SectionPills from 'pages-sections/Components-Sections/SectionPills.js';
import SectionNotifications from 'pages-sections/Components-Sections/SectionNotifications.js';
import SectionTypography from 'pages-sections/Components-Sections/SectionTypography.js';
import SectionJavascript from 'pages-sections/Components-Sections/SectionJavascript.js';
import SectionCarousel from 'pages-sections/Components-Sections/SectionCarousel.js';
import SectionCompletedExamples from 'pages-sections/Components-Sections/SectionCompletedExamples.js';
import SectionLogin from 'pages-sections/Components-Sections/SectionLogin.js';
import SectionExamples from 'pages-sections/Components-Sections/SectionExamples.js';
import SectionDownload from 'pages-sections/Components-Sections/SectionDownload.js';
import SectionMaterialDashboard from 'pages-sections/Components-Sections/SectionMaterialDashboard.js';

// Styles
import styles from 'assets/jss/nextjs-material-kit/pages/components.js';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(styles);

export default function Components(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        brand="NextJS Material Kit"
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: 'white'
        }}
        {...rest}
      />
      <Parallax image={require('assets/img/nextjs_header.jpg')}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>NextJS Material Kit.</h1>
                <h3 className={classes.subtitle}>
                  A Badass Material Kit based on Material-UI and NextJS.
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <SectionBasics />
        <SectionNavbars />
        <SectionTabs />
        <SectionPills />
        <SectionNotifications />
        <SectionTypography />
        <SectionJavascript />
        <SectionCarousel />
        <SectionCompletedExamples />
        <SectionMaterialDashboard />
        <SectionLogin />
        <GridItem md={12} className={classes.textCenter}>
          <Link href="/login">
            <a className={classes.link}>
              <Button color="primary" size="lg" simple>
                View Login Page
              </Button>
            </a>
          </Link>
        </GridItem>
        <SectionExamples />
        <SectionDownload />
      </div>
      <Footer />
    </div>
  );
}

// React + Redux + Functionality
import React from 'react';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// nodejs library that concatenates classes
import classNames from 'classnames';

// Styles
import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/nextjs-material-kit/components/footerStyle.js';
const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  const aClasses = classNames({
    [classes.a]: true,
    // [classes.footerWhiteFont]: whiteFont
  });
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          &copy; {1900 + new Date().getYear()}, made by{' '}
          <a
            href="https://frinzelapuz.now.sh"
            className={aClasses}
            target="_blank"
          >
            Frinze Erin Lapuz
          </a>{' '}
          and{' '}
          <a
            href="https://nefsite.vercel.app/"
            className={aClasses}
            target="_blank"
          >
            Michael Nefiodovas
          </a>{' '}
          on Behalf of the{' '}
          <a
            href="https://systemhealthlab.com/"
            className={aClasses}
            target="_blank"
          >
            System Health Lab
          </a>{' '}
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool,
};

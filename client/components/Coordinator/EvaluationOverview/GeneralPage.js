// CORE COMPONENTS
import CustomTabs from "components/MaterialKit/CustomTabs/CustomTabs.js";
import Face from "@material-ui/icons/Face";
import Chat from "@material-ui/icons/Chat";
import Build from "@material-ui/icons/Build";

// Styles
import styles from "assets/jss/nextjs-material-kit/pages/landingPage.js";
import { makeStyles } from "@material-ui/core/styles";
const customStyles = {
  textCenter: {
    textAlign: "center",
  },
};
const useStyles = makeStyles({ ...styles, ...customStyles });

const GeneralPage = ({ courseID }) => {
  const classes = useStyles();
  return (
    <CustomTabs
      headerColor="success"
      tabs={[
        {
          tabName: "General",
          tabIcon: Face,
          tabContent: (
            <p className={classes.textCenter}>
              I think that’s a responsibility that I have, to push
              possibilities, to show people, this is the level that things could
              be at. So when you get something that has the name Kanye West on
              it, it’s supposed to be pushing the furthest possibilities. I will
              be the leader of a company that ends up being worth billions of
              dollars, because I got the answers. I understand culture. I am the
              nucleus.
            </p>
          ),
        },
        {
          tabName: "Justifications",
          tabIcon: Chat,
          tabContent: (
            <p className={classes.textCenter}>
              I think that’s a responsibility that I have, to push
              possibilities, to show people, this is the level that things could
              be at. I will be the leader of a company that ends up being worth
              billions of dollars, because I got the answers. I understand
              culture. I am the nucleus. I think that’s a responsibility that I
              have, to push possibilities, to show people, this is the level
              that things could be at.
            </p>
          ),
        },
        {
          tabName: "Documents",
          tabIcon: Chat,
          tabContent: (
            <p className={classes.textCenter}>
              think that’s a responsibility that I have, to push possibilities,
              to show people, this is the level that things could be at. So when
              you get something that has the name Kanye West on it, it’s
              supposed to be pushing the furthest possibilities. I will be the
              leader of a company that ends up being worth billions of dollars,
              because I got the answers. I understand culture. I am the nucleus.
            </p>
          ),
        },
        {
          tabName: "Reviews",
          tabIcon: Build,
          tabContent: <p className={classes.textCenter}> yeeettt</p>,
        },
      ]}
    />
  );
};

export default GeneralPage;

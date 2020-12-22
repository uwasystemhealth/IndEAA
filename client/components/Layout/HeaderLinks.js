/*eslint-disable*/
import React from "react";
import Link from "next/link";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

// core components
import CustomDropdown from "components/MaterialKit/CustomDropdown/CustomDropdown.js";
import Button from "components/MaterialKit/CustomButtons/Button.js";

import styles from "assets/jss/nextjs-material-kit/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
    const classes = useStyles();
    return (
        <List className={classes.list}>
            <ListItem className={classes.listItem}>
                <CustomDropdown
                    noLiPadding
                    navDropdown
                    buttonText="[Role Name]"
                    buttonProps={{
                        className: classes.navLink,
                        color: "transparent"
                    }}
                    buttonIcon={Apps}
                    dropdownList={[
                        <Link href="/admin/">
                            <a className={classes.dropdownLink}>Administrator</a>
                        </Link>,
                        <Link href="/coordinator/">
                            <a className={classes.dropdownLink}>Coordinator</a>
                        </Link>,
                        <Link href="/reviewer/">
                            <a className={classes.dropdownLink}>Reviewer</a>
                        </Link>,
                    ]}
                />
            </ListItem>
            <ListItem className={classes.listItem}>
                <Button
                    href="https://indeaa-docs.systemhealthlab.com/"
                    color="transparent"
                    target="_blank"
                    external={true}
                    className={classes.navLink}
                >
                    <Icon className={classes.icons}>unarchive</Icon> Documentation
        </Button>
            </ListItem>
            <ListItem className={classes.listItem}>
                <Tooltip
                    id="instagram-tooltip"
                    title="Login"
                    placement={"top"}
                    classes={{ tooltip: classes.tooltip }}
                >
                    <Button
                        color="info"
                        href="/login"
                        target="_blank"
                    >
                        Login
                    </Button>
                </Tooltip>
            </ListItem>
        </List>
    );
}

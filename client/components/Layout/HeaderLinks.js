// React + Redux + Functionality
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from 'actions/auth';
import Link from 'next/link';

// Utilities
import { getAvailablePermissionsOfUser, roleIcons } from 'utils/permissions';

// Material Kit
import CustomDropdown from 'components/MaterialKit/CustomDropdown/CustomDropdown.js';
import Button from 'components/MaterialKit/CustomButtons/Button.js';

// Material UI
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';

// Icons
import { Apps } from '@material-ui/icons';

// Styles
import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/nextjs-material-kit/components/headerLinksStyle.js';
const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
    const user = useSelector(state => state.auth.user);
    const currentRoleSelected = useSelector(state => state.general.currentRoleSelected);

    const dispatch = useDispatch();
    const classes = useStyles();

    // Get All the Unique permissions of the user by the role
    // Turn it into JSX Links
    const rolesOfUser = user && Array.from(getAvailablePermissionsOfUser(user.perms));//.filter(role => role!==currentRoleSelected)
    const rolesLinksToUsers = user && rolesOfUser.map(
        permission => {
            const RoleIcon = roleIcons[permission];
            return (<Link href={`/${permission.toLowerCase()}`}>
                <a className={classes.dropdownLink}><RoleIcon />{permission}</a>
            </Link>);
        }
    );
    return (
        <List className={classes.list}>
            {user && (rolesOfUser.length != 0 || currentRoleSelected!='') &&
                <ListItem className={classes.listItem}>
                    <CustomDropdown
                        noLiPadding
                        navDropdown
                        buttonText={currentRoleSelected || 'Choose Your Role'}
                        buttonProps={{
                            className: classes.navLink,
                            color: 'transparent'
                        }}
                        buttonIcon={currentRoleSelected ? roleIcons[currentRoleSelected] : Apps}
                        dropdownList={rolesLinksToUsers}
                    />
                </ListItem>
            }
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

            {user &&
                (<ListItem className={classes.listItem}>
                    <Tooltip
                        title={`You are login as ${user.name}`}
                        placement={'top'}
                        classes={{ tooltip: classes.tooltip }}
                    ><Button
                            color="info"
                            onClick={(e) => dispatch(signOut())}
                        >
                            Signout
                        </Button>
                    </Tooltip>
                </ListItem>

                )

            }

        </List>
    );
}

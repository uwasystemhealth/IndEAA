import { useEffect, useState } from "react"

// MUI Icons
import Placeholder from "@material-ui/icons/Mood";

// Core Components
import Card from "components/MaterialKit/Card/Card.js";
import CardBody from "components/MaterialKit/Card/CardBody.js";
import CardHeader from "components/MaterialKit/Card/CardHeader.js";
import Button from "components/MaterialKit/CustomButtons/Button.js";
import Grid from "components/MaterialKit/Grid/GridContainer.js";
import GridItem from "components/MaterialKit/Grid/GridItem.js";
import Tooltip from "@material-ui/core/Tooltip";

//Styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/nextjs-material-kit/pages/landingPage";

// Redux
import { useDispatch, useSelector } from "react-redux"
import { services } from "store/feathersClient"

// Helper
import { getAvailablePermissionsOfUser, roleIcons } from "utils"

const useStyles = makeStyles(styles);

const AdminstratorMainPage = () => {
    const dispatch = useDispatch()

    // Update state with all users
    useEffect(() => {
        dispatch(services.users.find())
    }, [])

    const userState = useSelector(state => state.users)
    const authUserState = useSelector(state => state.auth.user)

    // Current User Selected
    const [currentUserSelected, setCurrentUserSelected] = useState(null)

    const selectUser = (user_id) => {

    }

    const classes = useStyles();
    return (
        <Card>
            <CardHeader color="primary">Manage Users</CardHeader>
            <CardBody>
                <Grid direction="row" alignItems="center" justify="center">
                    {userState && !userState.isLoading ?
                        userState.queryResult.data.map(user => {
                            const rolesOfUser = Array.from(getAvailablePermissionsOfUser(user.perms))
                            return (
                                <GridItem key={user._id} md={6}><Card>
                                    <CardBody>
                                        <Grid direction="row" alignItems="center" justify="center">
                                            <GridItem xs={9}>
                                                {rolesOfUser.map(role => {
                                                    const RoleIcon = roleIcons[role]
                                                    return (
                                                        <Tooltip
                                                            title={`${user.name} has ${role} permission`}
                                                            placement={"top"}
                                                            classes={{ tooltip: classes.tooltip }}
                                                        ><RoleIcon></RoleIcon>
                                                        </Tooltip>
                                                    )
                                                })}
                                                <h4>{user.name}</h4>
                                                <p>{user.email}</p>
                                            </GridItem>
                                            <GridItem xs={1}>
                                                <Button color="primary" justIcon round
                                                    onClick={(e) => selectUser(user._id)}
                                                ><Placeholder></Placeholder></Button>
                                            </GridItem>
                                        </Grid>
                                    </CardBody>
                                </Card></GridItem>
                            )
                        })
                        :
                        <p>Loading...</p>
                    }
                </Grid>
            </CardBody>
        </Card >
    )
}

export default AdminstratorMainPage

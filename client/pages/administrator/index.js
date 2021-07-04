// React + Redux + Functionality
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { services } from 'store/feathersClient';

// Custom Components
import UserModal from 'components/administrator/UserModal';
import CreateUserModal from 'components/administrator/CreateUserModal';

// Utilities
import { getAvailablePermissionsOfUser, roleIcons } from 'utils/permissions';

// Material Kit
import Card from 'components/MaterialKit/Card/Card.js';
import CardBody from 'components/MaterialKit/Card/CardBody.js';
import CardHeader from 'components/MaterialKit/Card/CardHeader.js';
import Button from 'components/MaterialKit/CustomButtons/Button.js';
import Grid from 'components/MaterialKit/Grid/GridContainer.js';
import GridItem from 'components/MaterialKit/Grid/GridItem.js';

// Material UI
import Tooltip from '@material-ui/core/Tooltip';

// Icons
import EditIcon from '@material-ui/icons/Edit';

//Styles
import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/nextjs-material-kit/pages/landingPage';
const useStyles = makeStyles(styles);

const AdminstratorMainPage = () => {
  const dispatch = useDispatch();

  // Update state with all users
  useEffect(() => {
    services.users.find();
    services['course-evaluation'].find({
      query: {
        $select: ['_id', 'courseId']
      }
    });
  }, []);

  const userState = useSelector(state => state.users);
  const courseEvaluation = useSelector(state => state['course-evaluation']);
  const authUserState = useSelector(state => state.auth.user);

  // Current User Selected
  const [currentUserSelected, setCurrentUserSelected] = useState(null);
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);

  const openNewUserModal = () => setIsNewUserModalOpen(true);
  const closeNewUserModal = () => setIsNewUserModalOpen(false);

  const selectUser = async (user_id) => {
    // Make life easier by doing a direct query
    const userSelectedDetails = await services.users.get(user_id);
    setCurrentUserSelected(userSelectedDetails.value);
  };

  const deselectUser = () => {
    setCurrentUserSelected(null);
  };

  const classes = useStyles();
  return (
    <Card>
      <UserModal user={currentUserSelected} courseEvaluation={courseEvaluation} closeModal={deselectUser} />
      <CreateUserModal isOpen={isNewUserModalOpen} setCurrentUserSelected={setCurrentUserSelected}
        closeModal={closeNewUserModal} />
      <CardHeader color="primary">Manage Users</CardHeader>
      <CardBody>
        <Grid direction="row" alignItems="center" justify="center">
          {userState && userState.queryResult != null ?
            <>
              {userState.queryResult.data.map(user => {
                const rolesOfUser = Array.from(getAvailablePermissionsOfUser(user.perms));
                return (
                  <GridItem key={user._id} md={6}><Card>
                    <CardBody>
                      <Grid direction="row" alignItems="center" justify="center">
                        <GridItem xs={9}>
                          {rolesOfUser.map(role => {
                            const RoleIcon = roleIcons[role];
                            return (
                              <Tooltip
                                key={`${user._id}-${role}`}
                                title={`${user.name || user.email} has ${role} role`}
                                placement={'top'}
                                classes={{ tooltip: classes.tooltip }}
                              ><RoleIcon />
                              </Tooltip>
                            );
                          })}
                          <h4>{user.name || user.email}</h4>
                          <p>{user.name ? user.email : 'Has Not Yet Logged In'}</p>
                        </GridItem>
                        <GridItem xs={1}>
                          <Button color="primary" justIcon round
                            onClick={(e) => selectUser(user._id)}
                          ><EditIcon /></Button>
                        </GridItem>
                      </Grid>
                    </CardBody>
                  </Card></GridItem>
                );
              })}
              <GridItem>
                <Button color="primary" onClick={() => openNewUserModal()}>Add New User</Button>
              </GridItem>
            </>
            :
            <p>Loading...</p>
          }
        </Grid>
      </CardBody>
    </Card >
  );
};

export default AdminstratorMainPage;

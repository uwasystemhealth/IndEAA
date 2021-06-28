// React + Redux + Functionality
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { services } from 'store/feathersClient';
import { addNotificationMessage } from 'actions/general';

// Material Kit
import Button from 'components/MaterialKit/CustomButtons/Button.js';
import GridContainer from 'components/MaterialKit/Grid/GridContainer.js';
import GridItem from 'components/MaterialKit/Grid/GridItem.js';

// Material UI
import TextField from '@material-ui/core/TextField';

// Styles
import { makeStyles } from '@material-ui/core/styles';
import modalStyle from 'assets/jss/nextjs-material-kit/modalStyle.js';
const styles = { ...modalStyle };
const useStyles = makeStyles(styles);

const ViewModal = ({ isReadOnly }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const reviewState = useSelector((state) => state.review);
    const review = reviewState?.queryResult.data[0] || null;

    const initialStateModal = {
        step4ReviewComment: review?.step4ReviewComment || '',
    };

    const [state, setState] = useState(initialStateModal);

    // Rerenders on everytime the EOC changes
    useEffect(() => {
        setState(initialStateModal);
    }, [review]);

    const handleChange = (event) => {
        const { id, value } = event.target;
        const newState = { ...state, [id]: value };
        setState(newState);
    };

    const handleSave = (event) => {
        if (review) {
            // Review exist hence be updated
            services.review.patch(review._id, {
                step4ReviewComment: state.step4ReviewComment,
            });
        } else {
            // Impossible to give general review on does not exist review
            dispatch(
                addNotificationMessage({
                    message:
            'It is not possible give a general comment when no other steps has been taken',
                })
            );
        }
    };

    return (
        <GridContainer style={{ width: '100%' }}>
            <GridItem>
        General Comment
                {!isReadOnly ? (
                    <TextField
                        multiline
                        fullWidth
                        rows={4}
                        variant="filled"
                        value={state.step4ReviewComment}
                        id="step4ReviewComment"
                        onChange={handleChange}
                    />
                ) : (
                    <p>{state.step4ReviewComment}</p>
                )}
            </GridItem>
            <GridItem>
                {!isReadOnly && (
                    <Button color="primary" onClick={() => handleSave()}>
            Save
                    </Button>
                )}
            </GridItem>
        </GridContainer>
    );
};

export default ViewModal;

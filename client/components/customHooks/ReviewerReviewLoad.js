import {useEffect} from 'react';
import { getOrCreateReview, updateCurrentlyBeingViewedCourse } from 'utils/feathersUpdate';

export const useCurrentReviewOfUser = (authUser, reviewState, course_id) => {
    // Fetch Review dependent on AuthUser and when the Review fetched matches the course route
    // If it cannot find it, then create it
    // Executes on Component Remount (after auth user is fetched)
    return useEffect(() => {
        // Only Call when authUser is now defined
        if (
            authUser &&
          (reviewState.queryResult.total <= 0 || reviewState.queryResult.data[0] !== course_id)
        ) {
            getOrCreateReview(course_id, authUser._id);
            updateCurrentlyBeingViewedCourse(course_id);

        }
    }, [authUser]);
};

export const useReviewOfUser = (user_id, reviewState, course_id) => {
    // Fetch Review dependent on AuthUser and when the Review fetched matches the course route
    // If it cannot find it, then create it
    // Executes on Component Remount (after auth user is fetched)
    return useEffect(() => {
        try
        { // Only Call when authUser is now defined
            if (
                user_id &&
          (reviewState.queryResult.total <= 0 || reviewState.queryResult.data[0] !== course_id)
            ) {
                getOrCreateReview(course_id, user_id);
                updateCurrentlyBeingViewedCourse(course_id);

            }
        }
        catch(err){
            // Handled By Redux Saga
        }
    }, [user_id]);
};
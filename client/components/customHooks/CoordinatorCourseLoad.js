// React + Redux + Functionality
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

// Utilities
import { updateCurrentlyBeingViewedCourse } from 'utils/feathersUpdate';

export const useCurrentCourseData = () => {
  // Fetch Course dependent on AuthUser and when the Course fetched matches the course route
  // Executes on Component Remount (after auth user is fetched)
  const router = useRouter();
  const { courseID } = router.query;
  const authUser = useSelector((state) => state.auth.user);
  const courseState = useSelector((state) => state['course-evaluation']);

  return useEffect(() => {
    // Only Call when authUser is now defined
    if (
      authUser &&
          (courseState.data?._id !== courseID)
    ) {
      updateCurrentlyBeingViewedCourse(courseID);

    }
  }, [authUser]);
};

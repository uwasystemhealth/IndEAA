import React, { useEffect } from "react";
import { useRouter } from "next/router";

// Store Actions and Redux
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "actions/auth";
import { setCurrentRoleSelected, setPageMiddleTitle } from "actions/general";
import { services } from "store/feathersClient";

// Utils
import { permissions, getAvailablePermissionsOfUser } from "utils";

const AuthGuard = ({ children, isProtected }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Authentication Setup
    dispatch(signIn());
  }, []);

  // Hooks
  const user = useSelector((state) => state.auth.user);
  const courseState = useSelector((state) => state["course-evaluation"]);
  const course = courseState.data;
  const router = useRouter();

  if (isProtected) {
    // Check Login Of User

    let allowed = false; // Server side starts with false
    if (typeof window !== "undefined") {
      allowed = true; // true until becomes unauthorised

      // Force the user to login when unauthenticated
      if (
        user === null &&
        router.pathname !== "/" &&
        !("feathers-jwt" in window.localStorage)
      ) {
        router.push("/");
        allowed = false;
      }

      if (user !== null) {
        // Check Permission of User
        const currentRoleBeingChecked = permissions.find((permission) =>
          router.pathname.startsWith(`/${permission.toLowerCase()}`)
        );

        // The Current Role being checked can be null if it is not protected by role based permission
        if (currentRoleBeingChecked) {
          if (
            !getAvailablePermissionsOfUser(user.perms).has(
              currentRoleBeingChecked
            )
          ) {
            router.push("/404");
            allowed = false;
            return null;
          }

          // If the router has the courseId, then a combination of both the courseId
          // and permission should be found
          if (router.query.hasOwnProperty("courseID")) {
            const { courseID } = router.query;
            const courseSpecificPermissions = user.perms.filter(
              (permission) => courseID == permission.course_id
            );
            if (
              !getAvailablePermissionsOfUser(courseSpecificPermissions).has(
                currentRoleBeingChecked
              )
            ) {
              router.push("/404");
              allowed = false;
              return null;
            }
            const getAndSetPageTitle = async () => {
              // Get Course ID Review To Display Title
              const currentCourseId =course?.courseId
              dispatch(setPageMiddleTitle(currentCourseId));
            };
            getAndSetPageTitle();
          } else {
            // Does not have router query
            dispatch(setPageMiddleTitle(""));
          }
          // Set the Current Role Being Viewed in the State
          dispatch(setCurrentRoleSelected(currentRoleBeingChecked));
        } else {
          // Set the Current Role Being Viewed in the State
          dispatch(setCurrentRoleSelected(null));
        }
      }
    }

    return <>{allowed ? children : null}</>;
  }
  return <>{children}</>;
};

export default AuthGuard;

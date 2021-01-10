import React, { useEffect } from 'react'
import { useRouter } from "next/router"

// Store Actions and Redux
import { useDispatch, useSelector } from "react-redux"
import { signIn } from "actions/auth"
import { setCurrentRoleSelected } from "actions/general"
import { services } from "store/feathersClient"

// Utils
import { permissions, getAvailablePermissionsOfUser } from "utils"

const AuthGuard = ({ children, isProtected }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        // Authentication Setup
        dispatch(signIn())
    }, [])

    // Hooks
    const user = useSelector(state => state.auth.user)
    const router = useRouter()

    if (isProtected) {
        // Check Login Of User


        let allowed = false // Server side starts with false
        if (typeof window !== "undefined") {
            allowed = true // true until becomes unauthorised

            // Force the user to login when unauthenticated
            if (user === null &&
                router.pathname !== "/" &&
                !("feathers-jwt" in window.localStorage)
            ) {
                router.push("/")
                allowed = false
            }

            if (user !== null) {// Check Permission of User
                const currentRoleBeingChecked = permissions.find(
                    permission => router.pathname.startsWith(`/${permission.toLowerCase()}`))

                // The Current Role being checked can be null if it is not protected by role based permission
                if (currentRoleBeingChecked) {
                    if (!getAvailablePermissionsOfUser(user.perms).has(currentRoleBeingChecked)) {
                        router.push("/404")
                        allowed = false
                        return (null)
                    }

                    // If the router has the courseId, then a combination of both the courseId
                    // and permission should be found
                    if (router.query.hasOwnProperty("courseID")) {
                        const { courseID } = router.query
                        const currentCourse = services.courseEvaluation.get({ courseId: courseID })
                        const courseSpecificPermissions = user.perms.filter(permission => currentCourse._id == permission.course_id)
                        if (!getAvailablePermissionsOfUser(courseSpecificPermissions).has(currentRoleBeingChecked)) {
                            router.push("/404")
                            allowed = false
                            return (null)
                        }
                    }
                    // Set the Current Role Being Viewed in the State
                    dispatch(setCurrentRoleSelected(currentRoleBeingChecked))
                }
                else {
                    // Set the Current Role Being Viewed in the State
                    dispatch(setCurrentRoleSelected(null))

                }

            }


        }

        console.log(allowed)
        return (
            <>{allowed ? children : null}</>
        )
    }
    return (<>{children}</>)
}

export default AuthGuard
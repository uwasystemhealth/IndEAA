import React, { useEffect } from 'react'
import { useRouter } from "next/router"

// Store Actions and Redux
import { useDispatch, useSelector } from "react-redux"
import { signIn } from "actions/auth"
import { services } from "store/feathersClient"

// Utils
import { permissions, getAvailablePermissionsOfUser } from "utils"

const AuthGuard = ({ children }) => {
    const dispatch = useDispatch()
    // Check Login Of User
    const user = useSelector(state => state.auth.user)
    const router = useRouter()

    let notAllowed = false
    if (typeof window !== "undefined") {
        // Force the user to login when unauthenticated
        if (user === null &&
            router.pathname !== "/" &&
            !("feathers-jwt" in window.localStorage)
        ) {
            router.push("/")
            notAllowed = true
        }

        if (user !== null) {// Check Permission of User
            permissions.every(permission => {
                if (router.pathname.startsWith(`/${permission.toLowerCase()}`) &&
                    !getAvailablePermissionsOfUser(user.perms).has(permission)
                ) {
                    router.push("/404")
                    notAllowed = true
                    return false // Breaks the "every" loop
                }
                return true // Continue "every" loop
            })

            // If the router has the courseId, then a combination of both the courseId
            // and permission should be found
            if (router.query.hasOwnProperty("courseID")) {
                const { courseID } = router.query
                const currentCourse = services.courseEvaluation.get({ courseId: courseID })
                const courseSpecificPermissions = user.perms.filter(permission => currentCourse._id == permission.course_id)
                permissions.every(permission => {
                    if (router.pathname.startsWith(`/${permission.toLowerCase()}`) &&
                        !getAvailablePermissionsOfUser(courseSpecificPermissions).has(permission)
                    ) {
                        router.push("/404")
                        notAllowed = true
                        return false // Breaks the "every" loop
                    }
                    return true // Continue "every" loop
                })
            }
        }


    }

    useEffect(() => {
        // Authentication Setup
        dispatch(signIn())
    }, [])


    return (
        <div>{notAllowed ? null : children}</div>
    )
}

export default AuthGuard

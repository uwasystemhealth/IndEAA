import React, { useEffect } from 'react'
import { useRouter } from "next/router"

// Store Actions and Redux
import { useDispatch, useSelector } from "react-redux"
import { signIn } from "actions/auth"

const AuthGuard = ({ children }) => {
    const dispatch = useDispatch()
    // Check Login Of User
    const user = useSelector(state => state.auth.user)
    const router = useRouter()
    // Force the user to login when unauthenticated
    if (user === null && typeof window !== "undefined" && router.pathname !== "/") {
        router.push("/")
    }

    useEffect(() => {
        // Authentication Setup
        dispatch(signIn())
    }, [])


    return (
        <div>{children}</div>
    )
}

export default AuthGuard

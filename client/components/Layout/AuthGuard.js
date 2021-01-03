import React, { useEffect } from 'react'

// Store Actions and Redux
import { useDispatch } from "react-redux"
import { signIn } from "actions/auth"

const AuthGuard = ({ children }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        // Authentication Setup
        dispatch(signIn())
    }, [])

    return (
        <div>   {children}

        </div>
    )
}

export default AuthGuard

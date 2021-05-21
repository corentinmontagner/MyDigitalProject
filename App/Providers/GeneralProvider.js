import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import AuthContext from '../Contexts/AuthContext'

import AuthProvider from './AuthProvider'

const GeneralProvider = ({children, ...props}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const authContext = {
        isLoggedIn,
        setIsLoggedIn,
    }

    return(
        <AuthContext.Provider value={authContext}>
            <AuthProvider>
                {children}
            </AuthProvider>
        </AuthContext.Provider>
    )
}

export default GeneralProvider
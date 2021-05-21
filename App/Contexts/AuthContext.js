import React from 'react'
import {Text, View} from 'react-native'

const AuthContext = React.createContext({
    isLoggedIn: false,
    setIsLoggedIn: () => {},
})

export default AuthContext
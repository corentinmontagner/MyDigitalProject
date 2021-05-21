import React, { useEffect, useState, useContext } from 'react'
import {Text, View, Button} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../Contexts/AuthContext'

const ProfileScreen = () => {
    const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)

    const Logout = () => {
        setIsLoggedIn(false)
        AsyncStorage.clear()
    }

    return (
        <View>
            <Text>PROFIL SCREEN</Text>
            {isLoggedIn ? <Button onPress={()=>{Logout()}} title="Logout"></Button> : <Text>Logged Out</Text>}
        </View>
    )
}

export default ProfileScreen
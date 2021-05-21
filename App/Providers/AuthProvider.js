import React, { useEffect, useState, useContext } from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../Contexts/AuthContext'

import LoginScreen from '../Screens/LoginScreen'

const Stack = createStackNavigator();

const AuthProvider = ({children, ...props}) => {
    //const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)

    const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)

    const context = useContext(AuthContext)

    const getToken = async () => {
      try {
          const token = await AsyncStorage.getItem('token')
          console.log('StoredTokenAuthProvider', token)
          return token
          if(token !== null) {
            // value previously stored
          }
      } catch(error) {
          console.log(error);
      }
    }

    React.useEffect( async () => {
      console.log('context', context)
      const token = await getToken()
      console.log('token', token)

      if(token) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
      setIsLoaded(true)
    }, [])

    return(
        <>
          {isLoaded ? (
            <>
              {isLoggedIn ? (
                <>{children}</>
              ) : (
                <Stack.Navigator>
                  <Stack.Screen
                    name="login"
                    component={LoginScreen}
                  />
                </Stack.Navigator>
              )}
            </>
          ) : (
            <Text>Loading</Text>
          )}
        </>
    )
}

export default AuthProvider
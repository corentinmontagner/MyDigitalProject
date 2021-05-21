import React, { useState, useContext } from 'react'
import {
    Text
  } from 'react-native';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'

import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from './Contexts/AuthContext'

import HomeScreen from './Screens/HomeScreen'
import LoginScreen from './Screens/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen'
import ProfileScreen from './Screens/ProfileScreen'

const LoginStack = createStackNavigator()

const Home = createBottomTabNavigator()

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name='Home' component={HomeScreen} />
      <Drawer.Screen name='Profile' component={ProfileScreen} />
    </Drawer.Navigator>
  )
}

const Navigation = () => {

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
        <NavigationContainer>
          {isLoaded ? (
            <>
              {isLoggedIn ? (
                <Home.Navigator initialRouteName='Home'>
                    <Home.Screen name='Home' component={HomeScreen} />
                    <Home.Screen name='Profile' component={ProfileScreen} />
                    <Home.Screen name='Drawer' component={DrawerNavigator} />
                </Home.Navigator>
              ) : (
                <LoginStack.Navigator initialRouteName='Login'>
                    <LoginStack.Screen name='Login' component={LoginScreen} />
                    <LoginStack.Screen name='Register' component={RegisterScreen} />
                </LoginStack.Navigator>
              )}
            </>
          ) : (
            <Text>Loading</Text>
          )}
        </NavigationContainer>
    )

  
}

export default Navigation
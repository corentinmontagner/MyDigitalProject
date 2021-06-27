import React, { useState, useContext } from 'react'
import {
    Text,
    Button
  } from 'react-native';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'

import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from './Contexts/AuthContext'
import axios from 'axios';

import HomeScreen from './Screens/HomeScreen'
import LoginScreen from './Screens/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen'
import ProfileScreen from './Screens/ProfileScreen'
import CreateChatScreen from './Screens/CreateChatRoom'
import RoomScreen from './Screens/RoomScreen'
import SessionsScreen from './Screens/SessionsScreen'

const LoginStack = createStackNavigator()

const Room = createStackNavigator()

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
    const {user, setUser} = useContext(AuthContext)

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

        var config = {
          method: 'get',
          url: 'http://10.0.2.2:1337/users/me',
          headers: { 
              'Authorization': "Bearer " + token,
          }
          };
  
          axios(config)
            .then(function (response) {
                //console.log(JSON.stringify(response.data, null, 2));
                //const token = response.data.jwt
                setIsLoggedIn(true)
                console.log("Data user : ", response.data)
                setUser(response.data)
                //getToken()
            })
            .catch(function (error) {
                console.log(error);
            });

      } else {
        setIsLoggedIn(false)
      }
      setIsLoaded(true)
    }, [])

    function RoomTabs() {
      return (
        <Room.Navigator>
          <Room.Screen name='Home' component={HomeScreen} />
          <Room.Screen name='Chat' component={CreateChatScreen} />
          <Room.Screen name='Room' component={RoomScreen} options={({ route }) => ({title: route.params.thread.name})}/>
        </Room.Navigator>
      );
    }

    return(
        <NavigationContainer>
          {isLoaded ? (
            <>
              {isLoggedIn ? (
                <>
                  <Home.Navigator initialRouteName='Home'>
                      <Home.Screen name='Home' component={RoomTabs} />
                      <Home.Screen name='Create' component={CreateChatScreen} />
                      <Home.Screen name='Sessions' component={SessionsScreen} />
                      <Home.Screen name='Profile' component={ProfileScreen} />
                      <Home.Screen name='Drawer' component={DrawerNavigator} />
                  </Home.Navigator>
                </>
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
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useContext} from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  View,
  Text
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import GeneralProvider from './Providers/GeneralProvider'

import AuthContext from './Contexts/AuthContext'

import Navigation from './Navigation'

import LoggedInStack from './Stacks/LoggedInStack';

const Stack = createStackNavigator()

const App: () => Node = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState()
  const authContext = {
      isLoggedIn,
      setIsLoggedIn,
      user, 
      setUser,
  }

  return (
    <AuthContext.Provider value={authContext}>
      <StatusBar />
        <Navigation />
    </AuthContext.Provider>
  );
};

export default App;

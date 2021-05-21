import React from 'react'
import {Text, View} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../Screens/HomeScreen'

const Stack = createStackNavigator();

const LoggedInStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="home" component={HomeScreen} />
        </Stack.Navigator>
    )
}

export default LoggedInStack
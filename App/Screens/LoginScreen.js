import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../Contexts/AuthContext'

import axios from 'axios';

import RegisterScreen from './RegisterScreen'

import styles from './Styles/LoginStyle'

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)

    const Login = () => {
        console.log(`LOGIN : `, email, password)

        var axios = require('axios');
        var data = JSON.stringify({"identifier":email,"password":password});

        var config = {
        method: 'post',
        url: 'http://10.0.2.2:1337/auth/local',
        headers: { 
            'Content-Type': 'application/json',
        },
        data : data
        };

        axios(config)
            .then(function (response) {
                //console.log(JSON.stringify(response.data));
                const token = response.data.jwt
                saveToken(token)
                setIsLoggedIn(true)
                //getToken()
            })
            .catch(function (error) {
                console.log(error);
            });

            const saveToken = async (token) => {
                try {
                    let userToken = await AsyncStorage.setItem('token', token)
                } catch (error) {
                    console.log(error)
                }
            }

            const getToken = async () => {
                try {
                    const value = await AsyncStorage.getItem('token')
                    console.log('StoredToken', value)
                    if(value !== null) {
                      // value previously stored
                    }
                } catch(error) {
                    console.log(error);
                }
            }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.text}>LOGIN SCREEN</Text>
            <TextInput
                style={styles.textInput}
                placeholder='Entrez votre email'
                autoCompleteType='email'
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                secureTextEntry
                style={styles.textInput}
                placeholder='Entrez votre password'
                onChangeText={text => setPassword(text)}
            />
            <Button 
                title='Login' 
                onPress={Login}
            />
            <Button 
                title='Register' 
                onPress={() => navigation.navigate('Register')} />
        </View>
    )
}

export default LoginScreen
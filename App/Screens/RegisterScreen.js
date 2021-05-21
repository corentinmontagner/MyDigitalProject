import React, { useEffect, useState, useContext } from 'react'
import {Text, TextInput, View, Button} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../Contexts/AuthContext'

import styles from './Styles/LoginStyle'

const RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const Register = () => {
        var axios = require('axios');
        var data = JSON.stringify({"username":username,"email":email,"password":password});

        var config = {
        method: 'post',
        url: 'http://10.0.2.2:1337/auth/local/register',
        headers: { 
            'Content-Type': 'application/json', 
            'Cookie': '.Nop.Customer=24e3973e-145b-4f32-a4a3-fdab02f741c7'
        },
        data : data
        };

        axios(config)
            .then(function (response) {
            console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
            console.log(error);
        });

        navigation.navigate("Login")
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>REGISTER SCREEN</Text>
            <TextInput
                style={styles.textInput}
                placeholder='Entrez votre username'
                autoCompleteType='username'
                onChangeText={text => setUsername(text)}
            />
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
                autoCompleteType='password'
                onChangeText={text => setPassword(text)}
            />
            <Button 
                title='Register' 
                onPress={Register} 
            />
        </View>
    )
}

export default RegisterScreen
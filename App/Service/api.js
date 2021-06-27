import AsyncStorage from "@react-native-async-storage/async-storage"
import * as React from 'react';
import axios from 'axios';

const API_URL = 'http://10.0.2.2:1337'

const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('token')
        return token
    } catch (error) {
        console.error(error)
        return null
    }
}

const getUser = async () => {
    const token = await getToken()
    if(token) {
        try {
            const response = await axios(`${API_URL}/users/me`, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            return response.data
        } catch (error) {
            console.error(error)
        }
    }
}

const getSessions = async () => {
    const token = await getToken()
    if(token) {
        try {
            const response = await axios(`${API_URL}/session-sports`, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            return response.data
        } catch (error) {
            console.error(error)
        }
    }
}

const createSession = async ( session ) => {
    const token = await getToken()
    if (token) {
        try {
            const response = await axios(`${API_URL}/session-sports`, {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                data: JSON.stringify(session)
            })
            return response.data
        } catch (error) {
            console.error(error)
        }
    }
}

const addMembre = async ( session ) => {
    const token = await getToken()
    const sessionId = session._id
    if (token) {
        try {
            const response = await axios(`${API_URL}/session-sports/` + sessionId, {
                method: 'PUT',
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                data: JSON.stringify(session)
            })
            return response.data
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = { 
    getUser,
    getSessions,
    createSession,
    addMembre,
    API_URL
}
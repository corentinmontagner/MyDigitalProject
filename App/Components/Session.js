import * as React from 'react';
import { View, Text } from 'react-native';

import { getUser, addMember } from '../Service/api'

import styles from './Styles/SessionStyle'

const Session = ({ session }) => {
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{session.sport}</Text>
                <Text style={styles.content}>{session.commentaire}</Text>
            </View>
        </View>
    )
}

export default Session
import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './Styles/ButtonFabStyle'

const ButtonFab = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.text}>+</Text>
        </TouchableOpacity>
    )
}

export default ButtonFab

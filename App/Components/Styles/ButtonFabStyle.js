import { StyleSheet } from 'react-native'
import { darkTheme } from '../../Theme/Color'

export default StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20,
        right: 15,
        width: 80,
        height: 80,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: darkTheme.background,
        elevation: 5
    },
    text: {
        color: darkTheme.text,
        fontSize: 45,
        lineHeight: 50
    }
})
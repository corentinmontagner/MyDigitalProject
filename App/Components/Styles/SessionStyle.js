import { StyleSheet } from 'react-native'
import { darkTheme } from '../../Theme/Color'

export default StyleSheet.create({
    container: {
        width: '48%',
        backgroundColor: '#F45133',
        elevation: 5,
        marginTop: 10
    },
    contentContainer: {
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    title: {
        color: darkTheme.text,
        fontSize: 20,
        fontWeight: 'bold'
    },
    content: {
        color: darkTheme.text,
        fontSize: 15,
    }
})
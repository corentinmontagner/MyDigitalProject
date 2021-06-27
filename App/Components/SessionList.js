import * as React from 'react';
import { RefreshControl, ScrollView, Text, View } from 'react-native';
import Session from './Session'
import { getSessions } from '../Service/api'

import styles from './Styles/SessionListStyle'

const SessionList = () => {
    const [refreshing, setRefreshing] = React.useState(false)
    const [sessions, setSessions] = React.useState([])
    
    const getData = async () => {
        const result = await getSessions()
        console.log(result)
        if(result){
            setSessions(result)
        }
    }

    React.useEffect(() => {
        getData()
    }, [])

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                {
                    sessions
                        ? (
                            sessions.map(session => 
                                <Session key={session.id} session={session} />    
                            )
                        )
                        : <Text>Aucune session</Text>
                }
            </ScrollView>
        </View>
    )
}

export default SessionList
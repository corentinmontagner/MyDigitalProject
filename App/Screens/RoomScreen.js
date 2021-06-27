import React, { useState, useEffect, useContext } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import AuthContext from '../Contexts/AuthContext';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

export default function RoomScreen({ route }) {
    const [messages, setMessages] = useState([
      {
        _id: 0,
        text: 'thread created',
        createdAt: new Date().getTime(),
        system: true
      },
      {
        _id: 1,
        text: 'hello!',
        createdAt: new Date().getTime(),
        user: {
          _id: 2,
          name: 'Demo'
        }
      }
    ])
    const { thread } = route.params
    const { user } = useContext(AuthContext)

    async function handleSend(messages) {
      const text = messages[0].text
      firestore()
          .collection('MESSAGE_THREADS')
          .doc(thread._id)
          .collection('MESSAGES')
          .add({
              text,
              createdAt: new Date().getTime(),
              user: {
              _id: user._id,
              displayName: user.username
              }
          })
       await firestore()
           .collection('MESSAGE_THREADS')
           .doc(thread._id)
           .set(
             {
               latestMessage: {
                 text,
                 createdAt: new Date().getTime()
               }
             },
             { merge: true }
           )
    }

    useEffect(() => {
      const unsubscribeListener = firestore()
        .collection('MESSAGE_THREADS')
        .doc(thread._id)
        .collection('MESSAGES')
        .orderBy('createdAt', 'desc')
        .onSnapshot(querySnapshot => {
          if(querySnapshot && querySnapshot.docs){
            const messages = querySnapshot.docs.map(doc => {
              const firebaseData = doc.data()
      
              const data = {
                _id: doc.id,
                text: '',
                createdAt: new Date().getTime(),
                ...firebaseData
              }
      
              if (!firebaseData.system) {
                data.user = {
                  ...firebaseData.user,
                  name: firebaseData.user.displayName
                }
              }
      
              return data
            })
      
            setMessages(messages)

          } else {
            console.log("noQuerySnapchot")
          }
        })
    
      return () => unsubscribeListener()
    }, [])
  
    return (
      user &&
        <GiftedChat
          messages={messages}
          onSend={handleSend}
          user={{
            _id: user._id
          }}
        />
    )
}
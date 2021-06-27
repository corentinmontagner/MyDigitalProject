import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Modal, Button, TextInput, ScrollView, Picker } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { getSessions, createSession } from '../Service/api'

import SessionList from '../Components/SessionList'
import ButtonFab from '../Components/ButtonFab'

function SessionsScreen({ navigation }) {
  const [data, setData] = React.useState('')
  const [selectedValue, setSelectedValue] = useState("Foot");
  const [modalVisible, setModalVisible] = React.useState(false)
  const [sport, setSport] = React.useState('Foot')
  const [commentaire, setCommentaire] = React.useState('Mon super sport ajouté')
  const [debut, setDebut] = React.useState(new Date())
  const [fin, setFin] = React.useState(new Date())

  React.useEffect(() => {
    const fetchData = async () => {
      const sessions = await getSessions()
      setData(sessions)
    }

    fetchData()
  }, [])

  const addSession = () => {
    if (sport && commentaire && debut && fin) {
      createSession({
          sport: sport,
          commentaire: commentaire,
          dateDebut: debut,
          dateFin: fin
      })
    }
    setModalVisible(false)
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <SessionList sessions={data} getSessions={getSessions} />
      <ButtonFab onPress={() => setModalVisible(true)} />
      <Modal 
          animationType='slide'
          visible={modalVisible}
      >
        <ScrollView>
          <Button title='Fermer' onPress={() => setModalVisible(false)} />
          <Text>AJOUTER UNE SESSION</Text>
          <Picker
            selectedValue={selectedValue}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            value={sport}
            onChangeText={text => setSport(text)}
          >
            <Picker.Item label="Foot" value="foot" />
            <Picker.Item label="Volley" value="volley" />
            <Picker.Item label="Rugby" value="rugby" />
            <Picker.Item label="Tennis" value="tennis" />
            <Picker.Item label="Running" value="running" />
            <Picker.Item label="Natation" value="natation" />
          </Picker>
          <TextInput 
            placeholder='Commentaire'
            multiline
            numberOfLines={10}
            value={commentaire}
            onChangeText={text => setCommentaire(text)} 
          />
          <DatePicker
            mode="datetime"
            locale= "fr"
            is24hourSource= "locale"
            androidVariant= 'iosClone'
            date={debut}
            onDateChange={setDebut}
          />
          <DatePicker
            mode="datetime"
            locale= "fr"
            is24hourSource= "locale"
            androidVariant= 'iosClone'
            date={fin}
            onDateChange={setFin}
          />
        </ScrollView>
        <Button title='Ajouter la session' onPress={addSession} />
      </Modal>
    </View>
  );
}

export default SessionsScreen

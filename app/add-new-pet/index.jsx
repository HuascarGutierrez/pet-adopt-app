import { View, Text, Image, TextInput } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router'
import Colors from '../../constants/Colors';
import stylesGlobal from '../../constants/styles';

export default function AddNewPet() {
    const navigation = useNavigation();

    useEffect(()=>{
        navigation.setOptions({headerTitle: 'Add New Pet', headerStyle:{backgroundColor: Colors.PRIMARY}, headerTintColor: Colors.WHITE})
    },[])
  return (
    <View style={{padding: 15}}>
      <Text style={stylesGlobal.title}>Add new pet for adoption</Text>
      <Image source={require('./../../assets/images/paw.jpeg')} style={{width: 100, height: 100, borderRadius: 20, borderColor: Colors.GRAY, borderWidth: 1, objectFit: 'contain'}}/>
      <View>
        <Text style={{fontFamily: 'outfit-light'}}>Pet Name *</Text>
        <TextInput/>
      </View>
    </View>
  )
}
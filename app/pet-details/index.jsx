import { View, Text, Image, ScrollView, Pressable, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import PetInfo from '../../components/PetDetails/PetInfo';
import PetSubInfo from '../../components/PetDetails/PetSubInfo';
import AboutPet from '../../components/PetDetails/AboutPet';
import OwnerInfo from '../../components/PetDetails/OwnerInfo';
import Colors from '../../constants/Colors';

export default function PetDetails() {
    const pet = useLocalSearchParams();
    const navigation = useNavigation();

    useEffect(()=>{
        navigation.setOptions({
            headerTransparent: true,
            headerTitle: '',
        })
    },[])
  return (
    <View>
        <View >
          <ScrollView >
          <PetInfo pet={pet}/>
          <PetSubInfo pet={pet}/>
          <AboutPet pet={pet}/>
          <OwnerInfo pet={pet}/>
          <View style={{height:80}}></View>
          </ScrollView>
        </View>

        <Pressable style={styles.adopt_me_button}>
        <Text style={styles.adopt_me_text}>Adopt me</Text>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  adopt_me_button: {
    position: 'absolute',
    bottom: 0,
    marginInline: 15,
    borderWidth: 2,
    borderColor: Colors.LIGHT_PRIMARY,
    borderRadius: 15,
    padding: 10,
    backgroundColor: Colors.PRIMARY,
    height: 70,
  },
  adopt_me_text: {
    fontSize: 24,
    fontFamily: 'outfit',
    color: Colors.WHITE,
    textAlign: 'center',
  },
})
import { View, Text, Image, ScrollView, Pressable, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import PetInfo from '../../components/PetDetails/PetInfo';
import PetSubInfo from '../../components/PetDetails/PetSubInfo';
import AboutPet from '../../components/PetDetails/AboutPet';
import OwnerInfo from '../../components/PetDetails/OwnerInfo';
import Colors from '../../constants/Colors';
import { query, getDocs, collection, where } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';

export default function PetDetails() {
    const pet = useLocalSearchParams();
    const navigation = useNavigation();
    const [data, setData] = useState('');
    
    useEffect(()=>{
      GetPetData(pet.id)
        navigation.setOptions({
            headerTransparent: true,
            headerTitle: '',
        })
    },[])

    const GetPetData = async(petId) => {
          const q = query(collection(db, "Pets"),where('id','==',Number(petId)));
          const CatSnapshot = await getDocs(q);
          CatSnapshot.forEach(doc=>{setData(doc.data())})
      }

    return (
    <View>
        <View >
          <ScrollView >
          <PetInfo pet={data}/>
          <PetSubInfo pet={pet}/>
          <AboutPet pet={pet}/>
          <OwnerInfo pet={pet}/>
          <View style={{height:80}}></View>
          </ScrollView>
        </View>

        <View style={{width: '100%', paddingHorizontal: 15}}>
          <Pressable style={styles.adopt_me_button}>
          <Text style={styles.adopt_me_text}>Adopt me</Text>
          </Pressable>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  adopt_me_button: {
    width: '100%',
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
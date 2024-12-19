import { View, Text, Image, ScrollView, Pressable, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import PetInfo from '../../components/PetDetails/PetInfo';
import PetSubInfo from '../../components/PetDetails/PetSubInfo';
import AboutPet from '../../components/PetDetails/AboutPet';
import OwnerInfo from '../../components/PetDetails/OwnerInfo';
import Colors from '../../constants/Colors';
import { query, getDocs, collection, where, setDoc, doc } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';

export default function PetDetails() {
    const pet = useLocalSearchParams();
    const navigation = useNavigation();
    const [data, setData] = useState('');
    const {user} = useUser()
    const router = useRouter()
    
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

    const InitiateChat = async () => {
      const docId1 = user?.primaryEmailAddress.emailAddress+'_'+pet?.userEmail
      const docId2 = pet?.userEmail+'_'+user?.primaryEmailAddress.emailAddress

      const q = query(collection(db,'Chat'),where('id','in',[docId1,docId2]))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach(doc =>{ 
        router.push({pathname: '/chat', params: {id: doc.id}})
      })
      if(querySnapshot.size == 0) {
        await setDoc(doc(db,'Chat',docId1),{
          id: docId1,
          users: [
            {
              email: user?.primaryEmailAddress.emailAddress,
              imageUrl: user?.imageUrl,
              name: user?.fullName,
            },
            {
              email: pet?.userEmail,
              imageUrl: pet?.userImageUrl,
              name: pet?.userName,
            }
          ],
          userIds: [user?.primaryEmailAddress.emailAddress,pet?.userEmail]
        });
        router.push({pathname: '/chat', params: {id:docId1}})
      }
    }

    return (
    <View>
        <View >
          <ScrollView >
          <PetInfo pet={pet} imageUrl={data.imageUrl}/>
          <PetSubInfo pet={pet}/>
          <AboutPet pet={pet}/>
          <OwnerInfo pet={pet}/>
          <View style={{height:80}}></View>
          </ScrollView>
        </View>

        <View style={{width: '100%', paddingHorizontal: 15}}>
          <Pressable onPress={InitiateChat} style={styles.adopt_me_button}>
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
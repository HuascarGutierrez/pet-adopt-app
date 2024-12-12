import { View, Text, FlatList } from 'react-native'
import React, {useEffect, useState} from 'react'
import Category from './Category'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'
import stylesGlobal from '../../constants/styles'
import PetListItem from './PetListItem'
import { ScrollView } from 'react-native'

export default function PetListByCategory() {

  const [petList, setPetList] = useState([])
  useEffect(()=>{
    GetPetList('Cats');
  },[])

  const GetPetList = async(category) => {
      setPetList([]);
      const q = query(collection(db, "Pets"),where('category','==',category));
      const CatSnapshot = await getDocs(q);

      CatSnapshot.forEach(doc => {
        console.log(doc.data())
        setPetList(petList=>[...petList,doc.data()])
      });
  }

  return (
    <View>
      <Category category={(value)=>{GetPetList(value)}}/>
      <Text style={stylesGlobal.title}>Pet List</Text>
        <FlatList
          horizontal={true}
          data={petList}
          renderItem={({item, index})=>(
            <PetListItem pet={item}/>
          )}
        />
    </View>
  )
}
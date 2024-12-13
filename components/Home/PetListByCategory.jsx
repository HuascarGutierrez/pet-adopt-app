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
  const [loader, setLoader] = useState(false)

  useEffect(()=>{
    GetPetList('Cats');
  },[])

  const GetPetList = async(category) => {
      setLoader(true)

      setPetList([]);
      const q = query(collection(db, "Pets"),where('category','==',category));
      const CatSnapshot = await getDocs(q);

      CatSnapshot.forEach(doc => {
        setPetList(petList=>[...petList,doc.data()])
      });

      setLoader(false)
  }

  return (
    <>
    <View>
      <Category category={(value)=>{GetPetList(value)}}/>
      <Text style={stylesGlobal.title}>Pet List</Text>
    </View>
    <FlatList
          //horizontal={true}
          numColumns={2}
          data={petList}
          refreshing={loader}
          onRefresh={()=>GetPetList('Cats')}
          renderItem={({item, index})=>(
            <PetListItem pet={item}/>
          )}
        />
    </>
  )
}
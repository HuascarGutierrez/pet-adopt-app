import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import stylesGlobal from '../../constants/styles'
import Shared from '../../Shared/Shared'
import { useUser } from '@clerk/clerk-expo'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'
import PetListItem from '../../components/Home/PetListItem'

export default function Favorite() {
  const {user} = useUser();
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [favoritePetList, setFavoritePetList] = useState([]);
  const [loader,setLoader] = useState(false);

  useEffect(()=>{
    user && fetchData();
  },[])

  async function fetchData(){
    setLoader(true);
    const favoriteList = await Shared.GetFavoriteList(user);
    setFavoriteIds(favoriteList.favorites);
    GetFavPetList(favoriteList.favorites);
    setLoader(false);
  }

  const GetFavPetList = async(favIds)=>{
    setFavoritePetList([])
    const q = query(collection(db,'Pets'),where('id','in',favIds));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc =>{
      setFavoritePetList(prev=>[...prev,doc.data()]);
    });
  }


  return (
    <View style={{padding: 15, height: '100%'}}>
      <Text style={stylesGlobal.title}>Favorite Pets</Text>
      <FlatList
        data={favoritePetList}
        numColumns={2}
        refreshing={loader}
        onRefresh={()=>{fetchData()}}
        renderItem={({item,index})=>(
          <View>
            <PetListItem pet={item}/>
          </View>
        )}
      />
    </View>
  )
}
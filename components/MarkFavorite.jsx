import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useUser } from '@clerk/clerk-expo';
import Shared from './../Shared/Shared'

export default function MarkFavorite({pet, colorNotFavorite='white'}) {
    const {user} = useUser();
    const [favList, setFavList] = useState();

    useEffect(()=>{
        user && GetFav();
    },[user])

    const GetFav = async() => {
        const result = await Shared.GetFavoriteList(user)
        setFavList(result?.favorites?result.favorites:[])
    }

    const AddToFav = async() =>{
      const favoriteList = favList;
      favoriteList.push(Number(pet.id));
      await Shared.UpdateFavoriteList(user,favoriteList);
      GetFav();
    }

    const RemToFav = async() => {
      const favoriteList = favList;
      const newList = favoriteList.filter(item => item !== Number(pet.id))
      await Shared.UpdateFavoriteList(user,newList);
      GetFav();
    }

  return (
    <Pressable>
        {favList?.includes(Number(pet.id))?
        <Pressable onPress={()=>{RemToFav()}}>
          <Ionicons name="heart" size={42} color="red" />
        </Pressable>:
        <Pressable onPress={()=>{AddToFav()}}>
          <Ionicons name="heart-outline" size={42} color={colorNotFavorite} />
        </Pressable>
        }
    </Pressable>
  )
}
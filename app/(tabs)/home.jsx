import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import Slider from '../../components/Home/Slider'
import PetListByCategory from '../../components/Home/PetListByCategory'
import AddNewPet from '../../components/Home/AddNewPet'
import { FlatList } from 'react-native'

export default function home() {
  const datos = [1,2,3,4,5,6,1,2,3,4,5,6,7]
  return (
    <View style={{
      padding: 20,
      height: '100%',
    }}>
      <Header/>
      <Slider/>
      <PetListByCategory/>
      <AddNewPet/>
    </View>
  )
}
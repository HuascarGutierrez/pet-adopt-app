import { View, Text } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import Slider from '../../components/Home/Slider'
import PetListByCategory from '../../components/Home/PetListByCategory'

export default function home() {
  return (
    <View style={{
      padding: 20,
    }}>
      <Header/>
      <Slider/>
      <PetListByCategory/>
    </View>
  )
}
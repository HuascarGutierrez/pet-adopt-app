import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import stylesGlobal from '../../constants/styles'
import Colors from '../../constants/Colors'

export default function PetListItem({pet}) {
  return (
    <View style={styles.pet_item}>
      <Image source={{uri: pet.imageUrl}} style={{width: 150, height: 120, objectFit: 'cover', borderRadius: 5}}/>
      <Text style={{fontFamily: 'outfit-light'}}>{pet.name}</Text>
      <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Text style={{color: Colors.GRAY}}>{pet.breed}</Text>
        <Text style={styles.pet_years_old}>{pet.age} yrs</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  pet_item: {
    padding: 10,
    marginRight: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
  },
  pet_years_old: {
    color: Colors.PRIMARY, 
    backgroundColor: Colors.LIGHT_PRIMARY, 
    borderRadius: 5, 
    paddingInline: 2, 
    fontSize: 12
  },
})
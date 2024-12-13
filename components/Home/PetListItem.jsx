import { View, Text } from 'react-native'
import React from 'react'
import stylesGlobal from '../../constants/styles'
import Colors from '../../constants/Colors'

export default function PetListItem({pet}) {
  return (
    <View style={styles.pet_item}>
      <Image source={{uri: pet.imageUrl}} style={{width: 150, height: 135, objectFit: 'cover'}}/>
      <Text>{pet.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  pet_item: {
    padding: 10,
    marginRight: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
  }
})
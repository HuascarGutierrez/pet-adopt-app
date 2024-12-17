import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import MarkFavorite from '../MarkFavorite'

export default function PetInfo({pet, imageUrl}) {
  return (
    <View>
      <Image source={{uri: imageUrl}} style={styles.pet_image}/>
      <View style={styles.pet_principal}>
        <View style={styles.pet_name_container}>
            <Text style={styles.pet_name}>{pet?.name}</Text>
            <Text style={styles.pet_address}>{pet?.address}</Text>
        </View>
        <MarkFavorite pet={pet} colorNotFavorite='black'/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    pet_principal: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingInline: 15,
    },
    pet_image: {
        width: '100%',
        height: 320,
    },
    pet_name: {
        fontSize: 28,
        fontFamily: 'outfit',
    },
    pet_address: {
        fontSize: 12,
        fontFamily: 'outfit-thin',
    },
    pet_name_container: {
        flexDirection: 'column',
    }
})
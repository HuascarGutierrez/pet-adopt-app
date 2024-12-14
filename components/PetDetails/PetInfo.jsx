import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function PetInfo({pet}) {
  return (
    <View>
      <Image source={{uri: pet.imageUrl}} style={styles.pet_image}/>
      <View style={styles.pet_principal}>
        <View style={styles.pet_name_container}>
            <Text style={styles.pet_name}>{pet?.name}</Text>
            <Text style={styles.pet_address}>{pet?.address}</Text>
        </View>
        <Ionicons name="heart-outline" size={42} color="black" />
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
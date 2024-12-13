import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import PetSubInfoDetails from './PetSubInfoDetails'

export default function PetSubInfo({pet}) {
  return (
    <View style={{padding: 15}}>
        <View>
            <PetSubInfoDetails pet={pet} detail={'Age'}/>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    pet_subInfo_image: {
        width: 40,
        height: 40,
    },
    pet_subInfo_detail: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.WHITE,
        padding: 5,
        margin: 5,
        borderRadius: 8,
        gap: 10,
    },
    pet_subInfo_title: {
        color: Colors.GRAY,
        fontSize: 12,
        fontFamily: 'outfit-light',
    },
    pet_subInfo_content: {
        fontSize: 15,
    }
})
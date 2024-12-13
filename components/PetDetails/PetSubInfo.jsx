import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'

export default function PetSubInfo({pet}) {
  return (
    <View style={{padding: 15}}>
        <View>
            <View style={styles.pet_subInfo_detail}>
                <Image source={require('./../../assets/images/sub-info-images/calendar.png')} style={styles.pet_subInfo_image}/>
                <View>
                    <Text style={styles.pet_subInfo_title}>Age</Text>
                    <Text style={styles.pet_subInfo_content}>{pet?.age}</Text>
                </View>
            </View>
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
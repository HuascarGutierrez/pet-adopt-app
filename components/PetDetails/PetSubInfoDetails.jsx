import { View, Image, Text, StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'
import React from 'react'

const imagePaths = {
    Age: require( './../../assets/images/sub-info-images/calendar.png'),
    
}

export default function PetSubInfoDetails({pet, image, detail}) {
  return (
    <View>
      <View style={styles.pet_subInfo_detail}>
        <Image source={imagePaths[detail]} style={styles.pet_subInfo_image}/>
        <View>
            <Text style={styles.pet_subInfo_title}>{detail}</Text>
            <Text style={styles.pet_subInfo_content}>{pet?.age}</Text>
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
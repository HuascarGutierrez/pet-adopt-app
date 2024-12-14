import { View, Image, Text, StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'
import React from 'react'

const imagePaths = {
    Age: require( './../../assets/images/sub-info-images/calendar.png'),
    Breed: require( './../../assets/images/sub-info-images/bone.png'),
    Sex: require( './../../assets/images/sub-info-images/sex.png'),
    Weight: require( './../../assets/images/sub-info-images/weight.png'),
}

export default function PetSubInfoDetails({info, detail}) {
  const detailQuery = detail.toLowerCase();
  return (
    <View style={styles.pet_subInfo_detail}>
        <Image source={imagePaths[detail]} style={styles.pet_subInfo_image}/>
        <View style={{flex: 1}}>
            <Text style={styles.pet_subInfo_title}>{detail}</Text>
            <Text style={styles.pet_subInfo_content}>{info}</Text>
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
        flex: 1,
        height: 'auto',
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
        fontSize: 14,
        fontFamily: 'outfit-light',
    },
    pet_subInfo_content: {
        fontSize: 15,
    }
})
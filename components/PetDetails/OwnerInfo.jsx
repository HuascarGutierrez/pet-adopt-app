import { View, Image, Text, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function OwnerInfo({pet}) {
  return (
    <View style={styles.owner_pet_container}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
            <Image source={{uri: pet?.userImageUrl}} style={{width: 60, height: 60, borderRadius: 30}}/>
            <View>
                <Text style={{fontFamily: 'outfit', fontSize: 14}}>{pet?.userName}</Text>
                <Text style={{color: Colors.GRAY, fontSize: 12}}>Pet Owner</Text>
            </View>
        </View>
        <Ionicons name="send" size={24} color={Colors.PRIMARY} />
    </View>
  )
}

const styles = StyleSheet.create({
    owner_pet_container: {display: 'flex', 
        marginHorizontal: 15, 
        padding: 10,
        paddingHorizontal: 20,
        flexDirection: 'row', 
        alignItems: 'center', 
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Colors.PRIMARY,
        backgroundColor: Colors.WHITE,
        justifyContent: 'space-between'
    },
})
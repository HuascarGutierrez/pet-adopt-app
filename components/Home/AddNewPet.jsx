import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';

export default function AddNewPet() {
  const router = useRouter();
  return (
    <Pressable onPress={()=>router.push({pathname:'/add-new-pet'})} style={styles.button}>
      <MaterialIcons name="pets" size={24} color={Colors.PRIMARY} />
      <Text style={styles.button_text}>Add New Pet</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 50,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 10,
        borderColor: Colors.PRIMARY,
        width: Dimensions.get('window').width*0.9,
        height: 50,
        backgroundColor: Colors.LIGHT_PRIMARY,
    },
    button_text: {
        fontSize: 24,
        fontFamily: 'outfit',
        fontWeight: 'bolder',
        color: Colors.PRIMARY,
    }
})
import { View, Text, Image } from 'react-native'
import React from 'react'
import Colors from './../../constants/Colors'

export default function LoginScreen() {
  return (
    <View>
        <Image source={require('./../../assets/images/login.png')} style={{
            width: '100%',
            height: 500,
        }}/>
        <View style={{
            padding: 20,
            display: 'flex',
            alignItems: 'center',
        }}>
            <Text style={{
            fontFamily: 'outfit',
            fontSize: 25,
            textAlign: 'center',
        }}>Ready to make a new friend?</Text>
        <Text style={{
            fontWeight: 'lighter',
            fontSize: 15,
            textAlign: 'center',
            color: Colors.GRAY,
        }}>Let's adopt the pet which you like and make there life happy again</Text>
        </View>
    </View>
  )
}
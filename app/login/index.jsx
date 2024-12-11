import { View, Text, Image, Pressable } from 'react-native'
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

        <Pressable style={{
            padding: 14,
            marginTop: 100,
            backgroundColor: Colors.PRIMARY,
            width: '100%',
            borderRadius: 14,
        }}>
            <Text style={{
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: 20,
                color: Colors.WHITE,
            }}>Get Started</Text>
        </Pressable>
        </View>
    </View>
  )
}
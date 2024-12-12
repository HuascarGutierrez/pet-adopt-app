import { View, Text } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Image } from 'react-native';

export default function Header() {

    const {user} = useUser();

  return (
    <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }}>
        <View>
            <Text style={{
                fontFamily: 'outfit',
                fontSize: 13,
            }}>Welcome</Text>
            <Text style={{
                fontFamily: 'outfit-light',
                fontSize: 18,
            }}>{user?.fullName}</Text>
        </View>
        <Image source={{uri: user?.imageUrl}} style={{
            width: 40,
            height: 40,
            borderRadius: 20,
        }}/>
    </View>
  )
}
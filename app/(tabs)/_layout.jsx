import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Colors from '../../constants/Colors';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: Colors.PRIMARY,
    }}>
        <Tabs.Screen name='home' options={{
            title: 'home',
            headerShown: false,
            tabBarIcon: ({color})=> <FontAwesome5 name="home" size={24} color={color}/>,
          }}/>
        <Tabs.Screen name='favorite' options={{
          tile: 'Favorite',
          headerShown: false,
          tabBarIcon: ({color})=><Ionicons name="heart-circle" size={24} color={color} />,
        }}/>
        <Tabs.Screen name='inbox' options={{
          title: 'Inbox',
          headerShown: false,
          tabBarIcon: ({color})=><Octicons name="inbox" size={24} color={color} />,
        }}/>
        <Tabs.Screen name='profile' options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({color})=><FontAwesome6 name="face-laugh-squint" size={24} color={color}/>,
        }}/>
    </Tabs>
  )
}
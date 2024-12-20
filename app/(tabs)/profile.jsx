import { View, Text, Image, FlatList, Pressable } from 'react-native'
import React from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo'
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from './../../constants/Colors'
import { useRouter } from 'expo-router';
import { Route } from 'expo-router/build/Route';

export default function Profile() {
  const {user} = useUser();
  const router = useRouter();
  const {signOut} = useAuth();
  const Menu = [
    {
      id: 1,
      name: 'Add New Pet',
      icon: 'add-circle',
      path: '/add-new-pet',
    },
    {
      id: 2,
      name: 'Favorites',
      icon: 'heart',
      path: '/(tabs)/favorite',
    },
    {
      id: 3,
      name: 'Inbox',
      icon: 'chatbox',
      path: '/(tabs)/inbox',
    },
    {
      id: 4,
      name: 'Log out',
      icon: 'exit',
      path: 'logout',
    }
  ]

  const onPressMenu = async (menu) =>{
    if(menu=='logout'){
      await signOut();
      router.push('/');
      return ;
    }
    router.push(menu)
  }

  return (
    <View style={{padding: 15}}>
      <Text style={{fontFamily: 'outfit', fontSize: 25}}>Your Profile</Text>
      <View style={{display: 'flex', alignItems: 'center', marginVertical: 20, gap: 5}}>
        <Image source={{uri: user?.imageUrl}} style={{width: 60, height: 60, borderRadius: 60}}/>
        <Text style={{fontFamily: 'outfit-light', fontSize: 18}}>{user?.fullName}</Text>
        <Text style={{fontFamily: 'outfit-thin', fontSize: 14}}>{user?.primaryEmailAddress.emailAddress}</Text>
      </View>

      <FlatList
        data={Menu}
        renderItem={({item,index})=>(
          <Pressable onPress={()=>onPressMenu(item.path)} key={index} style={{marginVertical: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10,
            backgroundColor: Colors.WHITE, padding: 10, borderRadius: 10
          }}>
            <Ionicons name={item.icon} size={30} color={Colors.PRIMARY} 
          style={{padding: 10, backgroundColor: Colors.LIGHT_PRIMARY, borderRadius: 10}}/>
            <Text style={{fontFamily: 'outfit-light', fontSize: 16}}>{item.name}</Text>
          </Pressable>
        )}
      />
    </View>
  )
}
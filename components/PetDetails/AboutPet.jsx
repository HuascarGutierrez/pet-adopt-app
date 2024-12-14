import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import stylesGlobal from '../../constants/styles'
import Colors from '../../constants/Colors'
import { ScrollView } from 'react-native'

export default function AboutPet({pet}) {
    const [readMore, setReadMore] = useState(true)
  return (
        <View style={{paddingHorizontal: 15}}>
        <Text style={stylesGlobal.title}>About {pet?.name}: </Text >
        <Text numberOfLines={readMore?4:20}>{pet?.about}</Text>
        <Pressable onPress={()=>{setReadMore(!readMore)}}><Text style={{fontFamily:'outfit', color: Colors.GRAY, fontSize: 13, marginBottom: 10}}>Read {readMore?'Read More':'Read Less'}...</Text></Pressable>
    </View>
  )
}
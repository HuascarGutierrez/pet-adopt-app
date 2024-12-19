import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import { Link } from 'expo-router'

export default function UserItem({userInfo}) {
  return (
    <Link href={'/chat?id='+userInfo.docId}>
        <View style={styles.inbox_container}>
            <Image source={{uri: userInfo?.imageUrl}} style={{width: 40, height: 40, borderRadius: 40}}/>
            <Text style={{fontFamily: 'outfit-light', fontSize: 18}}>{userInfo?.name}</Text>
        </View>
    </Link>
  )
}

const styles = StyleSheet.create({
    inbox_container: {
        width: '100%',
        marginVertical: 10,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        borderBottomWidth: 0.75,
        borderBottomColor: Colors.GRAY,
        paddingBottom: 5,
    },
})
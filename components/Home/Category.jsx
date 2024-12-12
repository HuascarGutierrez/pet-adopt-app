import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import stylesGlobal from '../../constants/styles'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'
import Colors from '../../constants/Colors'

export default function Category() {

    const [categoryList, setCategoryList] = useState([])

    useEffect(()=>{
        GetCategories();
    },[])

    const GetCategories = async() => {
        setCategoryList([])
        const snapshot = await getDocs(collection(db,'Category'));
        snapshot.forEach((doc)=>{
            setCategoryList(categoryList=> [...categoryList,doc.data()])
        })
    }

  return (
    <View style={styles.category}>
        <Text style={stylesGlobal.title}>Category</Text>
        <FlatList 
        numColumns={4}
        data={categoryList}
        renderItem={({item,index})=>
            (
                <View style={{flex: 1}}>
                    <View style={styles.container}>
                    <Image source= {{uri: item?.imageUrl}} style= {{width: 50, height: 50}}/>
                    <Text style={{fontFamily: 'outfit-thin'}}>{item?.name}</Text>
                    </View>
                </View>
            )
        }/>
    </View>
  )
}

const styles = StyleSheet.create({
    category: {
        marginTop: 20,
    },
    container: {
        backgroundColor: Colors.LIGHT_PRIMARY,
        padding: 15,
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 15,
        borderColor: Colors.PRIMARY,
        margin: 5,
    }
})
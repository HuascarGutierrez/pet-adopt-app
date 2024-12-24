import { View, Text, FlatList, Pressable, Alert, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import Colors from '../../constants/Colors';
import { collection, deleteDoc, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { useUser } from '@clerk/clerk-expo';
import { db } from '../../config/FirebaseConfig';
import stylesGlobal from '../../constants/styles';
import PetListItem from '../../components/Home/PetListItem'
import AddNewPet from '../../components/Home/AddNewPet';

export default function UserPost() {
    const navigation = useNavigation();
    const {user} = useUser();
    const [posts, setPots] = useState([])
    const [loader, setLoader] = useState(false)
    
    const GetUserPost = async() => {
        setLoader(true);
        setPots([]);
        const q = query(collection(db,'Pets'),where('userEmail','==',user?.primaryEmailAddress.emailAddress));
        const snapshot = await getDocs(q);
        //snapshot.forEach(doc=>{console.log(doc.data())})
        snapshot.forEach(doc=>{setPots(prev=> [...prev,doc.data()])})
        setLoader(false);
    }

    const deleteItem = (docId, name) => {
      Alert.alert('Delete post','Do you really want to delete '+name+`'s post?`,[
        {
          text:'No, KEEP it',
          style: 'Cancel',
        },
        {
          text: 'Yes, DELETE it',
          onPress: ()=> deletePost(docId),
        }
    ])
    }

    const deletePost = async(docId) => {
        await deleteDoc(doc(db,'Pets',String(docId)));
        GetUserPost();
        Alert.alert('Delete is completed');
    }

    useEffect(()=>{
        GetUserPost();
        navigation.setOptions({headerTitle: 'My Posts', title: 'hola'})
        //console.log(posts)
    },[]);
  return (
    <View style={{height: '100%', padding: 15}}>
        <Text style={stylesGlobal.title}>My Posts</Text>
      <FlatList
        refreshing= {loader}
        onRefresh={()=> GetUserPost()}
        numColumns={2}
        data={posts}
        renderItem={({item,index})=>(
            <View>
              <PetListItem pet={item} key={index}/>
              <Pressable style={styles.deleteButtom} onPress={()=>{deleteItem(item?.id, item?.name)}}>
                <Text style={styles.textButton}>Delete</Text>
              </Pressable>
            </View>
        )}
      />
      {posts?.length == 0 && <Text style={styles.noPosts}>No Posts yet</Text>}
      <AddNewPet/>
    </View>
  )
}

const styles = StyleSheet.create({
  deleteButtom: {
    backgroundColor: Colors.LIGHT_PRIMARY,
    borderRadius: 10,
    marginRight: 10,
    paddingVertical: 5,
    marginBottom: 30,
  },
  textButton: {
    textAlign: 'center',
    fontFamily: 'outfit',
  },
  noPosts: {
    width: '100%',
    textAlign: 'center',
    position: 'absolute',
    bottom: '55%',
    fontFamily: 'outfit-thin',
    color: Colors.GRAY,
    fontSize: 30,
  }
})
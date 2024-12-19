import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'
import { useUser } from '@clerk/clerk-expo'
import UserItem from '../../components/Inbox/UserItem'
import stylesGlobal from '../../constants/styles'

export default function Inbox() {
  const {user} = useUser()
  const [userList, setUserList] = useState([])
  const [loader, setLoader] = useState(false)

  const GetUserList = async() => {
    setLoader(true)
    setUserList([])
    const q = query(collection(db,'Chat'),where('userIds','array-contains',user?.primaryEmailAddress.emailAddress))
    const snapshot = await getDocs(q)
    snapshot.forEach(doc => {
      setUserList(prevList => [...prevList, doc.data()])
    })
    setLoader(false)
  }

  const MapOtherUserList = ()=> {
    const list = []
    userList.forEach((record)=>{
      const otherUser = record.users?.filter(User=>User?.email!=user?.primaryEmailAddress.emailAddress)
      const result = {
        docId: record.id,
        ...otherUser[0],
      }
      list.push(result)
    })
    return list;
  }

  useEffect(()=>{
    user && GetUserList();
  },[])

  return (
    <View style={{padding: 15, height: '100%', gap: 15}}>
      <Text style={stylesGlobal.title}>Your Inbox</Text>
      <FlatList
        refreshing={loader}
        onRefresh={()=>{GetUserList()}}
        data = {MapOtherUserList()}
        renderItem={({item,index})=>(
          <UserItem userInfo={item} key={index}/>
        )}
      />
    </View>
  )
}
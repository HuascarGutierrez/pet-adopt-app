import { View, Text, Image, TextInput, StyleSheet, ScrollView, Pressable, ToastAndroid, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import Colors from '../../constants/Colors';
import stylesGlobal from '../../constants/styles';
import { Picker } from '@react-native-picker/picker';
import { getDocs, collection, setDoc, doc } from 'firebase/firestore';
import {db, storage} from './../../config/FirebaseConfig'
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useUser } from '@clerk/clerk-expo';

export default function AddNewPet() {
    const navigation = useNavigation();
    const router = useRouter();

    const [formData, setFormData] = useState(
      {
        category: 'Cats',
        sex: 'Male',
      }
    )
    const [gender,setGender] = useState()
    const [categoryList, setCategoryList] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('Cats')
    const [image, setImage] = useState()
    const [loader, setLoader] = useState(false)
    const {user} = useUser()

    const handleInputChange = (fieldname, fieldValue)=>{
      setFormData(prev=>({...prev, [fieldname]:fieldValue}))
    }

    const GetCategories = async() => {
      setCategoryList([])
      const snapshot = await getDocs(collection(db,'Category'));
      snapshot.forEach((doc)=>{
        setCategoryList(categoryList => [...categoryList, doc.data()])
      })
    }

    const onSubmit = () => {
      if(Object.keys(formData).length!=8){
        ToastAndroid.show('Enter All Details pls',ToastAndroid.SHORT)
        return ;
      }
      UploadImage();
    }

    const UploadImage = async() => {
      setLoader(true)
      const resp = await fetch(image);
      const blobImage = await resp.blob();
      const storageRef = ref(storage,'/PetAdopt/'+Date.now()+'.jpg')
      uploadBytes(storageRef,blobImage).then((snapshot)=>{
        console.log('File uploaded')
      }).then(resp=>{
        getDownloadURL(storageRef).then(async(downloadUrl)=>{
          console.log(downloadUrl);
          SaveFormData(downloadUrl);
        })
      })
    }

    const SaveFormData = async(imgUrl) => {
        const docId = Date.now().toString();
        await setDoc(doc(db,'Pets',docId),{
          ...formData,
          imageUrl: imgUrl,
          userName: user?.fullName,
          userEmail: user?.primaryEmailAddress.emailAddress,
          userImageUrl: user?.imageUrl,
          id: Number(docId)
        })
        setLoader(false)
        router.replace('/(tabs)/home')
    }

    const imagePicker = async() => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    }

    useEffect(()=>{
        navigation.setOptions({headerTitle: 'Add New Pet', headerStyle:{backgroundColor: Colors.PRIMARY}, headerTintColor: Colors.WHITE})
        GetCategories();
    },[])
  return (
    <ScrollView style={{padding: 15}}>
      <Text style={stylesGlobal.title}>Add new pet for adoption</Text>
      <Pressable onPress={imagePicker}>
        {!image?
          <Image source={require('./../../assets/images/paw.jpeg')} 
          style={{width: 100, height: 100, borderRadius: 20, borderColor: Colors.GRAY, borderWidth: 1, objectFit: 'contain'}}/>:
          <Image source={{uri: image}} 
        style={{width: 100, height: 100, borderRadius: 20, borderColor: Colors.GRAY, borderWidth: 1, objectFit: 'cover'}}/>
        }
      </Pressable>
      <View style={styles.inputContainer}>
        <Text style={styles.input_label}>Pet Name *</Text>
        <TextInput onChangeText={(value)=>{handleInputChange('name',value)}} style={styles.input}/>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.input_label}>Gender *</Text>
        <Picker
          style={styles.inputSelector}
          selectedValue={selectedCategory}
          onValueChange={(itemValue, itemIndex) =>{
            setSelectedCategory(itemValue)
            handleInputChange('category',itemValue)
          }
          }>
          {categoryList.map((category,index)=>(
            <Picker.Item key={index} label={category.name} value={category.name} />
          ))}
        </Picker>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.input_label}>Breed *</Text>
        <TextInput onChangeText={(value)=>{handleInputChange('breed',value)}} style={styles.input}/>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.input_label}>Age *</Text>
        <TextInput keyboardType='numeric' onChangeText={(value)=>{handleInputChange('age',value)}} style={styles.input}/>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.input_label}>Gender *</Text>
        <Picker
          style={styles.inputSelector}
          selectedValue={gender}
          onValueChange={(itemValue, itemIndex) =>{
            setGender(itemValue)
            handleInputChange('sex',itemValue)
          }
          }>
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.input_label}>Weight *</Text>
        <TextInput keyboardType='numeric' onChangeText={(value)=>{handleInputChange('weight',value)}} style={styles.input}/>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.input_label}>Address *</Text>
        <TextInput onChangeText={(value)=>{handleInputChange('address',value)}} style={styles.input}/>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.input_label}>About *</Text>
        <TextInput
        style={styles.input}
        numberOfLines={5}
        multiline= {true}
        onChangeText={(value)=>{handleInputChange('about',value)}}
        />
      </View>
      <TouchableOpacity disabled={loader} onPress={onSubmit} style={styles.submit_button}>
        {
          loader?<ActivityIndicator size={'large'}/>:
        <Text style={{textAlign: 'center', fontSize: 20, fontFamily: 'outfit', color: Colors.WHITE}}>Submit Information</Text>
        }
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 5,
  },
  input: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 7,
  },
    input_label: {fontFamily: 'outfit-light',
    marginVertical: 5,
  },
  submit_button: {
    marginVertical: 10,
    marginBottom: 30,
    paddingVertical: 10,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
  },
  inputSelector: {
    paddingHorizontal: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 7,
  },
})
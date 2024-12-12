import { View, Text, FlatList, Image, StyleSheet, Dimensions } from 'react-native'
import { collection, query, where, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from 'react'
import { db } from '../../config/FirebaseConfig';

export default function Slider() {

    const [sliderList, setSliderList] = useState([])

    useEffect(()=>{
        getSlider();
    },[])

    const getSlider = async () => {
        setSliderList([])
        const q = query(collection(db, "Sliders"));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const listOfSliders = sliderList
        setSliderList(sliderList=>[...sliderList,doc.data()])
        });
    }

  return (
    <View style={styles.slider}>
      <FlatList
        horizontal= {true}
        showsHorizontalScrollIndicator= {false}
        data={sliderList}
        renderItem={({item,index})=>(
            <View>
                <Image source={{uri: item?.imageUrl}} style={styles.sliderImage}/>
            </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    slider: {
        marginTop: 20,
    },
    sliderImage: {
        width: Dimensions.get('screen').width * 0.9,
        height: 160,
        borderRadius: 15,
        marginRight: 15,
    }
})
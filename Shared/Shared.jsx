import { doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore"
import { db } from "../config/FirebaseConfig"

const GetFavoriteList = async(user) => {
    const docSnap = await getDoc(doc(db,'UserFavoritePet',user.primaryEmailAddress.emailAddress));
    if(docSnap?.exists()){
        return docSnap.data();
    } else{
        await setDoc(doc(db, 'UserFavoritePet',user?.primaryEmailAddress?.emailAdress),{
            email:user?.primaryEmailAdress?.emailAdress,
            favorites: []
            })
        return 
    }
}

const UpdateFavoriteList = async(user, favorites) => {
    const docRef = doc(db,'UserFavoritePet',user.primaryEmailAddress.emailAddress)
    try{
        await updateDoc(docRef,{
            favorites: favorites,
        })
    } catch(e){
    }
}

export default {GetFavoriteList, UpdateFavoriteList}
import { useUser } from "@clerk/clerk-expo";
import { Link, Redirect, useRootNavigationState } from "expo-router";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function Index() {

  const {isSignedIn, user} = useUser();

  const rootNativationState = useRootNavigationState()

  useEffect(()=>{
    checkNavLoaded();
  },[])

  const checkNavLoaded = () => {
    if(!rootNativationState.key) return null;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      { isSignedIn?
        <Redirect href={'(tabs)/home'}/>:
        <Redirect href={'login'}/>
      }
    </View>
  );
}

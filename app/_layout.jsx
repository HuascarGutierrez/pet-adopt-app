import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SecureStore from 'expo-secure-store'
import { Platform } from 'react-native'

const createTokenCache = () => {
  return {
    getToken: async (key) => {
      try {
        const item = await SecureStore.getItemAsync(key)
        if (item) {
          console.log(`${key} was used 🔐 \n`)
        } else {
          console.log('No values stored under key: ' + key)
        }
        return item
      } catch (error) {
        console.error('secure store get item error: ', error)
        await SecureStore.deleteItemAsync(key)
        return null
      }
    },
    saveToken: (key, token) => {
      return SecureStore.setItemAsync(key, token)
    },
  }
}
const tokenCache = Platform.OS !== 'web' ? createTokenCache() : undefined


export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY


  useFonts({
    'outfit': require('./../assets/fonts/PlaywriteHU-Regular.ttf'),
    'outfit-light': require('./../assets/fonts/PlaywriteHU-Light.ttf'),
    'outfit-thin': require('./../assets/fonts/PlaywriteHU-Thin.ttf')

  })

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
    <Stack>
      <Stack.Screen name="index"/>
      <Stack.Screen name="(tabs)"/>
      <Stack.Screen name="login/index"
        options={{
          headerShown: false,
        }}/>
    </Stack>
    </ClerkProvider>
  );
}

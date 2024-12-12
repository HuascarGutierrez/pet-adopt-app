import { View, Text, Image, Pressable } from 'react-native'
import React, { useCallback } from 'react'
import Colors from './../../constants/Colors'
import * as WebBrowser from 'expo-web-browser'
import * as Linking from 'expo-linking'
import { useOAuth } from '@clerk/clerk-expo'

export const useWarmUpBrowser = () => {
    React.useEffect(() => {
      // Warm up the android browser to improve UX
      // https://docs.expo.dev/guides/authentication/#improving-user-experience
      void WebBrowser.warmUpAsync()
      return () => {
        void WebBrowser.coolDownAsync()
      }
    }, [])
  }

export default function LoginScreen() {
    useWarmUpBrowser()
    const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })
    
    const onPress = useCallback(async () => {
        try {
          const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
            redirectUrl: Linking.createURL('/(tabs)/home', { scheme: 'myapp' }),
          })
    
          // If sign in was successful, set the active session
          if (createdSessionId) {
            //setActive!({ session: createdSessionId })
          } else {
            //this is the part that need fixing 
            
            // Use signIn or signUp returned from startOAuthFlow
            // for next steps, such as MFA
          }
        } catch (err) {
          // See https://clerk.com/docs/custom-flows/error-handling
          // for more info on error handling
          console.error(JSON.stringify(err, null, 2))
        }
      }, [])

  return (
    <View>
        <Image source={require('./../../assets/images/login.png')} style={{
            width: '100%',
            height: 500,
        }}/>
        <View style={{
            padding: 20,
            display: 'flex',
            alignItems: 'center',
        }}>
            <Text style={{
            fontFamily: 'outfit',
            fontSize: 25,
            textAlign: 'center',
        }}>Ready to make a new friend?</Text>
        <Text style={{
            fontWeight: 'lighter',
            fontSize: 15,
            textAlign: 'center',
            color: Colors.GRAY,
        }}>Let's adopt the pet which you like and make there life happy again</Text>

        <Pressable onPress={onPress} style={{
            padding: 14,
            marginTop: 100,
            backgroundColor: Colors.PRIMARY,
            width: '100%',
            borderRadius: 14,
        }}>
            <Text style={{
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: 20,
                color: Colors.WHITE,
            }}>Get Started</Text>
        </Pressable>
        </View>
    </View>
  )
}
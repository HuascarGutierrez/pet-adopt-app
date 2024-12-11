import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {

  useFonts({
    'outfit': require('./../assets/fonts/PlaywriteHU-Regular.ttf'),
    'outfit-light': require('./../assets/fonts/PlaywriteHU-Light.ttf'),
    'outfit-thin': require('./../assets/fonts/PlaywriteHU-Thin.ttf')

  })

  return (
    <Stack>
      <Stack.Screen name="index"/>
    </Stack>
  );
}

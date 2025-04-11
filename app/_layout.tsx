import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native"
import { useFonts } from "expo-font"
import { Slot, Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { StatusBar } from "expo-status-bar"
import { useEffect } from "react"
import { SessionProvider, useSession } from "../hooks/useSession"

import { useColorScheme } from "@/hooks/useColorScheme"

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Inter: require("../assets/fonts/Inter/Inter_24pt-Regular.ttf"),
    InterVariable: require("../assets/fonts/Inter/Inter-VariableFont_opsz,wght.ttf"),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <SessionProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="[id]" options={{ headerShown: true }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" options={{ headerShown: false }} />
          <Stack.Screen name="ForgotPassword" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <StatusBar style="auto" />
        </Stack>
      </SessionProvider>
    </ThemeProvider>
  )
}

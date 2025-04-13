import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useSession } from "@/hooks/useSession"
import { addNewReportData, signOut } from "@/api/utils"
import { useRouter } from "expo-router"
import { ThemedText } from "@/components/ThemedText"
import ThemedButton from "@/components/ThemedButton"
import SwiftLogo from "@/components/SwiftLogo"
import { dummyData } from "@/constants/dummy"

export default function account() {
  const { session, setSession } = useSession()
  const name = session?.user.identities[0].identity_data.name

  const router = useRouter()

  const handleSignout = async () => {
    const isSuccess = await signOut()
    if (isSuccess) {
      if (session) setSession(null)
      await AsyncStorage.removeItem("LOGIN_TOKEN")
      router.push("/login")
    }
  }

  const testPushData = async () => {
    const data = dummyData[0]
    console.log(data.datetime)
    const result = await addNewReportData(data.id, data.datetime, null, data.data)
    if (result) console.log(result)
  }

  return (
    <View style={styles.container}>
      <SwiftLogo style={[{ alignItems: "baseline", justifyContent: "center", margin: 30 }]} />
      <View style={{ flex: 1, width: "100%", justifyContent: "center" }}>
        <ThemedText type={"title"} style={{ fontSize: 24, textAlign: "center", marginBottom: 20 }}>
          Welcome {name}!
        </ThemedText>
        <ThemedButton onPress={handleSignout} text={"Sign Out"} />
        {/* <ThemedButton onPress={testPushData} text={"debug: test push data"} /> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
})

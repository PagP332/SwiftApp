import { Keyboard, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useEffect, useState } from "react"
import { useRouter } from "expo-router"
import SwiftLogo from "@/components/SwiftLogo"
import { ThemedText } from "@/components/ThemedText"
import FormEntry from "@/components/FormEntry"
import ThemedButton from "@/components/ThemedButton"

export default function ForgotPassword() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true))
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false))

    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [])
  return (
    <View style={styles.container}>
      {!isKeyboardVisible && <SwiftLogo absolute />}
      <View style={[{ justifyContent: "center", width: "100%" }]}>
        <ThemedText type="title" style={{ fontSize: 20, justifyContent: "center", textAlign: "center", marginBottom: 15 }}>
          FORGOT PASSWORD
        </ThemedText>
        <ThemedText style={{ color: "#828282", fontSize: 14, textAlign: "center", marginBottom: 20 }}>
          It’s okay for us to recover your password, kindly enter your email for us to verify your account and to send you a confirmation for your
          password reset
        </ThemedText>
        <FormEntry value={undefined} onChangeText={undefined} textLabel={"Email"} placeholder={"Enter your email"} keyboardType={"email-address"} />
        <ThemedButton onPress={() => {}} text={"Submit"} />
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 20 }}>
          <ThemedText style={{ color: "#828282", fontSize: 12 }}>Remembered your password?</ThemedText>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <ThemedText style={{ fontSize: 12 }}> Login Now!</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
      {!isKeyboardVisible && (
        <View style={{ position: "absolute", bottom: 20, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
          <ThemedText style={{ fontSize: 10, color: "#828282" }}>
            By clicking sign up, you agree to our Terms of Service and Privacy Policy
          </ThemedText>
        </View>
      )}
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

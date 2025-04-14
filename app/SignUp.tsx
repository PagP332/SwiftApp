import { Keyboard, Modal, Pressable, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native"
import React, { useEffect, useState } from "react"
import SwiftLogo from "@/components/SwiftLogo"
import { ThemedText } from "@/components/ThemedText"
import { useRouter } from "expo-router"
import FormEntry from "@/components/FormEntry"
import ThemedButton from "@/components/ThemedButton"
import { signUpNewUser } from "@/api/utils"

export default function signUp() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false)

  const [formEmail, setFormEmail] = useState("")
  const [formName, setFormName] = useState("")
  const [formPassword, setFormPassword] = useState("")
  const [formConfirmPassword, setFormConfirmPassword] = useState("")

  const [isSuccess, setIsSuccess] = useState(false)

  const [errorFallback, setErrorFallback] = useState(null)

  const router = useRouter()

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true))
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false))

    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [])

  const handleSignUp = async () => {
    if (formEmail === "_debug") {
      console.log("debug called")
      setIsSuccess(true)
      return
    }
    if (formPassword !== formConfirmPassword) {
      setErrorFallback("Passwords do not match")
      return
    }
    const result = await signUpNewUser(formEmail, formName, formPassword, setErrorFallback)
    if (result) {
      setIsSuccess(true)
    }
  }

  const backToLogin = () => {
    router.push("/login")
    setIsSuccess(false)
  }

  const SuccessModal = () => {
    return (
      <Modal animationType="slide" transparent={true} visible={isSuccess}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#00000080" }}>
          <View style={{ backgroundColor: "white", paddingVertical: 30, paddingHorizontal: 70, borderRadius: 20 }}>
            <ThemedText>Sign up success!</ThemedText>
            <ThemedButton onPress={backToLogin} text={"Back to Login"} style={{ width: "100%" }} />
          </View>
        </View>
      </Modal>
    )
  }

  return (
    <View style={styles.container}>
      {isSuccess && <SuccessModal />}
      {!isKeyboardVisible && <SwiftLogo absolute />}
      <View style={[{ justifyContent: "center", width: "100%" }]}>
        <ThemedText type="title" style={{ fontSize: 20, justifyContent: "center", textAlign: "center", marginBottom: 20 }}>
          SIGN UP
        </ThemedText>
        <FormEntry
          style={styles.form}
          value={formEmail}
          onChangeText={setFormEmail}
          textLabel={"Email"}
          placeholder={"Enter your email"}
          keyboardType="email-address"
        />
        <FormEntry style={styles.form} value={formName} onChangeText={setFormName} textLabel={"Name"} placeholder={"Enter your name"} />
        <FormEntry
          style={styles.form}
          value={formPassword}
          onChangeText={setFormPassword}
          textLabel={"Password"}
          placeholder={"Enter your password"}
          secure
        />
        <FormEntry
          style={styles.form}
          value={formConfirmPassword}
          onChangeText={setFormConfirmPassword}
          textLabel={"Confirm Password"}
          placeholder={"Confirm your password"}
          secure
        />
        {errorFallback && <ThemedText style={{ color: "red", fontSize: 12, textAlign: "center" }}>{String(errorFallback).toUpperCase()}</ThemedText>}
        <ThemedButton onPress={() => handleSignUp()} text={"Sign Up"} />
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 20 }}>
          <ThemedText style={{ color: "#828282", fontSize: 12 }}>Already have an account?</ThemedText>
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
  text: {
    fontSize: 14,
  },
  inputBox: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
  },
  form: {
    marginBottom: 15,
  },
})

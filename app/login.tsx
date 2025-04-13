import { ActivityIndicator, Keyboard, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import React, { useEffect, useState } from "react"
import { ThemedText } from "@/components/ThemedText"
import SwiftLogo from "@/components/SwiftLogo"
import { useSession } from "@/hooks/useSession"
import Checkbox from "expo-checkbox"
import { Redirect, useRouter } from "expo-router"
import FormEntry from "@/components/FormEntry"
import ThemedButton from "@/components/ThemedButton"
import { signInUser } from "../api/utils"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function login() {
  const { session, setSession } = useSession()
  const [isKeyboardVisible, setKeyboardVisible] = useState(false)

  const [formPassword, setFormPassword] = useState("")
  const [formEmail, setFormEmail] = useState("")
  const [formRememberMe, setFormRememberMe] = useState(true)

  const [errorFallback, setErrorFallback] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true))
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false))

    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [])

  useEffect(() => {
    const getToken = async () => {
      setIsLoading(true)
      const loginToken = await AsyncStorage.getItem("LOGIN_TOKEN")
      // console.log("getting token")
      if (loginToken) {
        // console.log("token found")
        redirectOnLogin(JSON.parse(loginToken))
        setIsLoading(false)
      } else setIsLoading(false)
    }
    getToken()
  }, [])

  const redirectOnLogin = async (result?) => {
    setErrorFallback(null)
    // console.log("rerouting")
    router.replace("/")
    if (result) {
      setSession(result)
      if (formRememberMe) await AsyncStorage.setItem("LOGIN_TOKEN", JSON.stringify(result))
    }
    // console.log("loading set 2")
    setIsLoading(false)
  } //

  const handleLogin = async () => {
    const result = await signInUser(formEmail, formPassword, setErrorFallback)
    if (result) {
      await redirectOnLogin(result)
    }
    // console.log("loading set 3")
    setIsLoading(false)
    // router.replace("/")
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    )
  } else
    return (
      <View style={styles.container}>
        {!isKeyboardVisible && <SwiftLogo absolute />}
        <View style={[{ justifyContent: "center", width: "100%" }]}>
          <ThemedText type="title" style={{ fontSize: 20, justifyContent: "center", textAlign: "center", marginBottom: 30 }}>
            LOGIN
          </ThemedText>
          <FormEntry
            style={{ marginBottom: 20 }}
            value={formEmail}
            onChangeText={(e) => {
              setFormEmail(e)
            }}
            placeholder={"Enter your email"}
            keyboardType={"email-address"}
            textLabel={"Email"}
          />
          <FormEntry
            value={formPassword}
            onChangeText={(e) => {
              setFormPassword(e)
            }}
            textLabel={"Password"}
            placeholder={"Enter your password"}
            secure
          />
          {errorFallback && (
            <ThemedText style={{ textAlign: "center", fontSize: 12, margin: 5, color: "red" }}>{String(errorFallback).toUpperCase()}</ThemedText>
          )}
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Checkbox
                value={formRememberMe}
                onValueChange={setFormRememberMe}
                color={formRememberMe ? "#4630EB" : undefined}
                style={{ width: 14, height: 14, marginRight: 5 }}
              />
              <ThemedText style={{ fontSize: 14 }}>Remember me</ThemedText>
            </View>
            <TouchableOpacity
              onPress={() => {
                console.log("forgor")
                router.push("/ForgotPassword")
              }}
            >
              <ThemedText style={{ fontSize: 14, color: "#0000FF" }}>Forgot your password?</ThemedText>
            </TouchableOpacity>
          </View>
          <ThemedButton onPress={() => handleLogin()} text={"Login"} />
          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 20 }}>
            <ThemedText style={{ color: "#828282", fontSize: 12 }}>Need an account?</ThemedText>
            <TouchableOpacity onPress={() => router.push("/SignUp")}>
              <ThemedText style={{ fontSize: 12 }}> Sign Up!</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
        {!isKeyboardVisible && (
          <View style={{ position: "absolute", bottom: 20, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
            <ThemedText style={{ fontSize: 10, color: "#828282" }}>
              By clicking login, you agree to our Terms of Service and Privacy Policy
            </ThemedText>
          </View>
        )}
      </View>
    )
}

const styles = StyleSheet.create({
  testBox: {
    flex: 1,
    borderWidth: 2,
    alignItems: "stretch",
    borderColor: "red",
  },
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
})

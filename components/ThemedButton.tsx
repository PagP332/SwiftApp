import { Pressable, StyleSheet, Text, View } from "react-native"
import React from "react"
import { ThemedText } from "./ThemedText"

export default function ThemedButton({ onPress, text, ...props }) {
  return (
    <Pressable
      {...props}
      onPress={onPress}
      style={{ backgroundColor: "black", height: 40, justifyContent: "center", alignItems: "center", borderRadius: 8, marginTop: 10 }}
    >
      <ThemedText style={{ color: "white", fontWeight: "bold" }}>{text}</ThemedText>
    </Pressable>
  )
}

const styles = StyleSheet.create({})

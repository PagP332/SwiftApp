import { StyleSheet, Text, TextInput, View } from "react-native"
import React from "react"
import { ThemedText } from "./ThemedText"

export default function FormEntry({ value, onChangeText, textLabel, placeholder, keyboardType = "default", secure = false, ...props }) {
  return (
    <View {...props}>
      <ThemedText style={styles.text}>{textLabel}</ThemedText>
      <View style={styles.inputBox}>
        <TextInput value={value} onChangeText={onChangeText} placeholder={placeholder} keyboardType={keyboardType} secureTextEntry={secure} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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

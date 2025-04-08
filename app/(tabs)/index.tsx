import { StyleSheet, Text, View } from "react-native"
import React from "react"
import SwiftLogo from "@/components/SwiftLogo"

export default function index() {
  return (
    <View style={styles.container}>
      <SwiftLogo style={[{ flex: 1 / 3, alignItems: "center", justifyContent: "center" }, styles.testBox]} />
      <View style={{ flex: 1 }}>
        <Text>index</Text>
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
  testBox: {
    borderWidth: 2,
    borderColor: "red",
  },
})

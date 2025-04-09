import { Image, StyleSheet, Text, View } from "react-native"
import React from "react"
import { ThemedText } from "./ThemedText"

export default function SurfaceFlaw({ uri, label, report, ...props }) {
  return (
    <>
      <View style={[{ flex: 2, justifyContent: "center", alignItems: "center" }]}>
        <Image source={require("../assets/images/surface_flaw_test.jpg")} style={{ maxHeight: 120, width: "100%" }} resizeMode="contain" />
        <ThemedText style={{ fontSize: 14, color: "black", textAlign: "center" }} type="title">
          {label}
        </ThemedText>
      </View>
      <View style={[{ flex: 1 }]}></View>
    </>
  )
}

const styles = StyleSheet.create({
  testBox: {
    // flex: 1,
    borderWidth: 2,
    alignItems: "stretch",
    borderColor: "red",
  },
})

import { StyleSheet, Text, View, Image } from "react-native"
import React from "react"

export default function SwiftLogo() {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/swift_logo.png")} style={{ width: 106, height: 30 }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 73,
  },
})

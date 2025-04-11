import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import { Link, useLocalSearchParams } from "expo-router"
import { ThemedText } from "@/components/ThemedText"
import AntDesign from "@expo/vector-icons/AntDesign"
import SurfaceFlaw from "@/components/SurfaceFlaw"
import ThemedButton from "@/components/ThemedButton"

export default function activeReport() {
  let { id, uri, label, data, type } = useLocalSearchParams()

  console.log("Active Report: ", id, uri, label, data, type)

  data = data ? JSON.parse(data) : {}
  label = label ? (label.length > 30 ? label.substring(0, 30) + "..." : label) : ""

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        <Link href={"/"} asChild>
          <TouchableOpacity>
            <AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
        </Link>
        <ThemedText style={{ flex: 1, fontSize: 16, fontWeight: 700, textAlign: "center" }}>{label}</ThemedText>
      </View>
      <View style={[{ padding: 14 }, styles.bottomContainers]}>
        <SurfaceFlaw label={null} data={data} uri={uri} type={type} maxHeight={200} />
      </View>
      <View style={{ flex: 0.8, width: "100%" }}>
        <ThemedButton onPress={() => console.log(`print ${id}`)} text={"Print"} />
        <ThemedButton onPress={() => console.log(`delete ${id}`)} text={"Delete"} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  bottomContainers: {
    flex: 1,
    width: "100%",
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
  },
})

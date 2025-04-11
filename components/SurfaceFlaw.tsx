import { Image, StyleSheet, Text, View } from "react-native"
import React from "react"
import { ThemedText } from "./ThemedText"

export default function SurfaceFlaw({ uri, label, data, type, maxHeight = 120, ...props }) {
  /*
  data: {
        trainNo: 1,
        compNo: 4,
        wheelNo: 2,
        status: "Flawed",
        recommendation: "For Replacment",
      },
  */

  const ListComponent = ({ title, value }) => {
    return (
      <View>
        <ThemedText style={{ fontSize: 14, marginBottom: -10 }} type="title">
          {title}
        </ThemedText>
        <ThemedText style={{ fontSize: 12, color: "#828282", lineHeight: 12, marginTop: 8 }}>{value}</ThemedText>
      </View>
    )
  }

  if (!data) {
    return null
  } else
    return (
      <>
        <View style={[{ flex: 2, justifyContent: "center", alignItems: "center" }]}>
          <Image source={{ uri: uri }} style={{ maxHeight: maxHeight, width: "100%", height: "100%" }} resizeMode="contain" />
          {label && (
            <ThemedText style={{ fontSize: 14, color: "black", textAlign: "center" }} type="title">
              {label}
            </ThemedText>
          )}
        </View>
        <View
          style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 10 }}
        >
          <ListComponent title={"Train #"} value={data.trainNo} />
          <ListComponent title={"Compartment #"} value={data.compNo} />
          <ListComponent title={"Wheel #"} value={data.wheelNo} />
          <ListComponent title={type === "surface" ? "Status" : "Diameter"} value={type === "surface" ? data.status : data.diameter} />
          <ListComponent title={"Recommendation"} value={data.recommendation} />
        </View>
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

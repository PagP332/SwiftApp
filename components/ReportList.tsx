import { StyleSheet, Text, TouchableOpacity, View, FlatList } from "react-native"
import React from "react"
import { ThemedText } from "./ThemedText"

export default function ReportList({ setActiveReport, data, ...props }) {
  const renderListItem = ({ item }) => {
    return (
      <TouchableOpacity key={item.id} onPress={() => setActiveReport(item.id)}>
        <ThemedText style={{ color: "black", fontSize: 14 }} type="defaultSemiBold">
          {item.report}
        </ThemedText>
        <ThemedText style={{ color: "#828282", fontSize: 12 }}>{item.datetime}</ThemedText>
      </TouchableOpacity>
    )
  }
  return (
    <>
      <FlatList data={data} renderItem={renderListItem} {...props} />
    </>
  )
}

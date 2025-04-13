import { StyleSheet, Text, TouchableOpacity, View, FlatList } from "react-native"
import React from "react"
import { ThemedText } from "./ThemedText"

export default function ReportList({ setActiveReport, data, ...props }) {
  const renderListItem = ({ item }) => {
    item.report = String(item.report).length > 40 ? item.report.substring(0, 40) + "..." : item.report
    item.id = item.id || item.report_id
    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => setActiveReport(item.id)}
        style={{ flexWrap: "nowrap", borderBottomWidth: 1, borderColor: "#E0E0E0" }}
      >
        <ThemedText style={{ color: "black", fontSize: 14, fontWeight: 500 }} type="defaultSemiBold">
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

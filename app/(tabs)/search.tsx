import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import React, { useEffect, useState } from "react"
import SwiftLogo from "@/components/SwiftLogo"
import ReportList from "@/components/ReportList"
import { dummyData } from "@/constants/dummy"
import { ThemedText } from "@/components/ThemedText"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { Redirect, useRouter } from "expo-router"

export default function search() {
  const [searchInput, setSearchInput] = useState("")
  const router = useRouter()

  const handleActiveReport = (id) => {
    const active_id = dummyData.find((item) => item.id === id)
    router.push({
      pathname: `/${id}`,
      params: { uri: active_id?.image, data: JSON.stringify(active_id?.data || {}), label: active_id?.report, type: active_id?.type },
    })
  }

  return (
    <View style={styles.container}>
      <SwiftLogo style={[{ alignItems: "center", justifyContent: "center", margin: 30 }]} />
      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        <TextInput style={{ flex: 1 }} value={searchInput} onChange={(e) => setSearchInput(e)} placeholder="Search for Reports" />
        <Pressable>
          <FontAwesome name="search" size={24} color="black" />
        </Pressable>
      </View>
      <View style={[{ flex: 1, marginBottom: 12, padding: 14 }, styles.bottomContainers]}>
        <ThemedText style={{ fontSize: 16, marginBottom: 5 }} type="title">
          REPORTS
        </ThemedText>
        <ReportList setActiveReport={handleActiveReport} data={dummyData} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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

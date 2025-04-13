import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import React, { useEffect, useState } from "react"
import SwiftLogo from "@/components/SwiftLogo"
import ReportList from "@/components/ReportList"
import { dummyData } from "@/constants/dummy"
import { ThemedText } from "@/components/ThemedText"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { Redirect, useRouter } from "expo-router"
import { getReportDetails, getReportList, searchQuery } from "@/api/utils"
import Loading from "@/components/Loading"

export default function search() {
  const [searchInput, setSearchInput] = useState("")
  const [reportList, setReportList] = useState([])

  const [activeReport, setActiveReport] = useState(null)

  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const fetchList = async () => {
      setIsLoading(true)
      const list = await getReportList()
      setReportList(list)
      setIsLoading(false)
    }
    fetchList()
  }, [])

  useEffect(() => {
    handleActiveReport()
  }, [activeReport])

  const handleActiveReport = async () => {
    // const active_id = dummyData.find((item) => item.id === id)
    let active_id = await getReportDetails(activeReport)
    active_id = active_id[0]
    router.push({
      pathname: `/${active_id.id || active_id.report_id}`,
      params: { uri: active_id?.image, data: JSON.stringify(active_id?.data || {}), label: active_id?.report, type: active_id?.type },
    })
  }

  const handleSearchQuery = async () => {
    if (!searchInput) return
    console.log(searchInput)
    setIsLoading(true)
    const result = await searchQuery(searchInput)
    if (result) setReportList(result)
    setIsLoading(false)
  }

  return (
    <View style={styles.container}>
      <SwiftLogo style={[{ alignItems: "center", justifyContent: "center", margin: 30 }]} />
      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        <TextInput
          style={{ flex: 1 }}
          value={searchInput}
          onChangeText={(e) => setSearchInput(e)}
          onSubmitEditing={handleSearchQuery}
          placeholder="Search for Reports"
        />
        <TouchableOpacity onPress={handleSearchQuery}>
          <FontAwesome name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={[{ flex: 1, marginBottom: 12, padding: 14 }, styles.bottomContainers]}>
        <ThemedText style={{ fontSize: 16, marginBottom: 5 }} type="title">
          REPORTS
        </ThemedText>
        {!isLoading ? <ReportList setActiveReport={setActiveReport} data={reportList} /> : <Loading />}
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

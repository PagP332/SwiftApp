import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useEffect, useState } from "react"
import SwiftLogo from "@/components/SwiftLogo"
import { ThemedText } from "@/components/ThemedText"
import ReportList from "@/components/ReportList"
import SurfaceFlaw from "@/components/SurfaceFlaw"
import { Link } from "expo-router"
import { dummyData } from "@/constants/dummy"
import { getReportDetails, getReportList, realtimeReportChannel, unsubToChannel } from "@/api/utils"
import Loading from "@/components/Loading"

export default function index() {
  const [activeTab, setActiveTab] = useState(0)
  const [activeReportID, setActiveReportID] = useState(null)

  const [reportList, setReportList] = useState({})

  const [lastActiveSurfaceReportID, setLastActiveSurfaceReportID] = useState(0)
  const [lastActiveWheelReportID, setLastActiveWheelReportID] = useState(0)

  const [reportLabel, setReportLabel] = useState("")
  const [reportData, setReportData] = useState({})
  const [reportImage, setReportImage] = useState("")
  const [reportType, setReportType] = useState("")

  const [isListLoading, setIsListLoading] = useState(false)
  const [isDetailsLoading, setIsDetailsLoading] = useState(false)

  useEffect(() => {
    const fetchDetails = async () => {
      setIsDetailsLoading(true)
      try {
        let active_id = await getReportDetails(activeReportID)
        // const active_id = dummyData.find((item) => item.id === activeReportID)
        active_id = active_id[0]
        // console.log("active details", active_id)
        setReportLabel(active_id?.report)
        setReportData(active_id?.data)
        setReportImage(active_id?.image)
        setReportType(active_id?.type)
        if (active_id?.type === "surface") {
          setActiveTab(0)
          setLastActiveSurfaceReportID(active_id?.id)
        } else {
          setActiveTab(1)
          setLastActiveWheelReportID(active_id?.id)
        }
      } catch (error) {
        console.error(error)
      }
      setIsDetailsLoading(false)
    }

    console.log("Active Report: ", activeReportID)
    if (activeReportID) {
      fetchDetails()
    }
  }, [activeReportID])

  useEffect(() => {
    onRealtimeChange()
    const channel = realtimeReportChannel(onRealtimeChange)
    return () => unsubToChannel(channel)
  }, [])

  useEffect(() => {
    console.log("isListLoading:", isListLoading)
  }, [isListLoading])

  useEffect(() => {
    console.log("isDetailsLoading:", isDetailsLoading)
  }, [isDetailsLoading])

  const onRealtimeChange = async (payload) => {
    // console.log("changes found ", payload)
    setIsListLoading(true)
    const list = await getReportList()
    setReportList(list)
    setIsListLoading(false)
  }

  const handleActiveTab = (id) => {
    setActiveTab(id)
    setActiveReportID(id === 0 ? lastActiveSurfaceReportID : lastActiveWheelReportID)
  }

  return (
    <View style={[styles.container]}>
      <SwiftLogo style={[{ alignItems: "center", justifyContent: "center", margin: 30 }]} />
      <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <TouchableOpacity style={[styles.tabButton, activeTab === 0 && styles.active]} onPress={() => handleActiveTab(0)}>
          <ThemedText style={[styles.text, activeTab === 0 && styles.activeText]}>Surface Flaw</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabButton, activeTab === 1 && styles.active]} onPress={() => handleActiveTab(1)}>
          <ThemedText style={[styles.text, activeTab === 1 && styles.activeText]}>Wheel Diameter</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabButton, activeTab === 2 && styles.active]} onPress={() => setActiveTab(2)}>
          <ThemedText style={[styles.text, activeTab === 2 && styles.activeText]}> </ThemedText>
        </TouchableOpacity>
      </View>
      {activeReportID ? (
        <Link
          href={{
            pathname: `/${activeReportID}`,
            params: { uri: reportImage, data: JSON.stringify(reportData || {}), label: reportLabel, type: reportType },
          }}
          asChild
          style={[{ padding: 14 }, styles.bottomContainers]}
        >
          <TouchableOpacity>
            {!isDetailsLoading ? <SurfaceFlaw label={reportLabel} data={reportData} uri={reportImage} type={reportType} /> : <Loading />}
          </TouchableOpacity>
        </Link>
      ) : (
        <View style={[{ padding: 14, justifyContent: "center", alignItems: "center" }, styles.bottomContainers]}>
          <ThemedText style={{ color: "#828282", fontSize: 12 }}>No report selected</ThemedText>
        </View>
      )}
      <View style={[{ flex: 1, marginBottom: 12, padding: 14 }, styles.bottomContainers]}>
        <ThemedText style={{ fontSize: 16, marginBottom: 5 }} type="title">
          REPORTS
        </ThemedText>
        {!isListLoading ? <ReportList setActiveReport={setActiveReportID} data={reportList} /> : <Loading />}
      </View>
    </View>
  )
}

export const styles = StyleSheet.create({
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
  tabButton: {
    backgroundColor: "#F6F6F6",
    paddingHorizontal: 20,
    paddingVertical: 6,
    gap: 10,
    borderRadius: 30,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
  },
  active: {
    backgroundColor: "black",
  },
  activeText: {
    color: "white",
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

import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useEffect, useState } from "react"
import SwiftLogo from "@/components/SwiftLogo"
import { ThemedText } from "@/components/ThemedText"
import ReportList from "@/components/ReportList"
import SurfaceFlaw from "@/components/SurfaceFlaw"

export default function index() {
  const [activeTab, setActiveTab] = useState(0)
  const [activeReportID, setActiveReportID] = useState(null)
  const [reportLabel, setReportLabel] = useState("")
  const [reportData, setReportData] = useState({})

  useEffect(() => {
    console.log("Active Report: ", activeReportID)
    setReportLabel(dummyData.find((item) => item.id === activeReportID)?.report)
    setReportData(dummyData.find((item) => item.id === activeReportID)?.data)
  }, [activeReportID])

  const dummyData = [
    {
      id: 1,
      type: "surface",
      report: "Surface Flaw Report #1",
      datetime: "03/23/25 12:00 PM",
      data: {
        trainNo: 1,
        compNo: 4,
        wheelNo: 2,
        status: "Flawed",
        recommendation: "For Replacmeent",
      },
    },
    {
      id: 2,
      type: "wheel",
      report: "Wheel Diameter Report #2",
      datetime: "03/23/25 12:00 PM",
      data: {
        trainNo: 1,
        compNo: 4,
        wheelNo: 2,
        diameter: "650 mm",
        recommendation: "Good Condition, For Monitoring",
      },
    },
  ]

  return (
    <View style={[styles.container]}>
      <SwiftLogo style={[{ alignItems: "center", justifyContent: "center", margin: 30 }]} />
      <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <TouchableOpacity style={[styles.tabButton, activeTab === 0 && styles.active]} onPress={() => setActiveTab(0)}>
          <ThemedText style={[styles.text, activeTab === 0 && styles.activeText]}>Surface Flaw</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabButton, activeTab === 1 && styles.active]} onPress={() => setActiveTab(1)}>
          <ThemedText style={[styles.text, activeTab === 1 && styles.activeText]}>Wheel Diameter</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabButton, activeTab === 2 && styles.active]} onPress={() => setActiveTab(2)}>
          <ThemedText style={[styles.text, activeTab === 2 && styles.activeText]}> </ThemedText>
        </TouchableOpacity>
      </View>
      <View style={[{ flex: 1, padding: 14 }, styles.bottomContainers]}>
        <SurfaceFlaw label={reportLabel} report={reportData} />
      </View>
      <View style={[{ flex: 1, marginBottom: 12, padding: 14 }, styles.bottomContainers]}>
        <ThemedText style={{ fontSize: 16, marginBottom: 5 }} type="title">
          REPORTS
        </ThemedText>
        <ReportList setActiveReport={setActiveReportID} data={dummyData} />
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

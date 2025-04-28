import { StyleSheet, Text, View } from "react-native"
import React, { useEffect, useState } from "react"
import { PulseIndicator, WaveIndicator } from "react-native-indicators"

export default function StatusIndicator() {
  const [isConnecting, setIsConnecting] = useState(false)

  const checkForConnection = () => {
    // Return true if connected, false if not connect/trying to connect
    return false
  }

  useEffect(() => {
    const status = checkForConnection()
    if (status) {
      setIsConnecting(false)
    } else {
      setIsConnecting(true)
    }
  }, [])

  return <>{isConnecting ? <WaveIndicator color="rgb(255,105,97)" size="26" /> : <PulseIndicator color="rgb(48,219,91)" size="26" />}</>
}

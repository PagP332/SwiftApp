import { supabase } from "./client"
import { dummyData } from "@/constants/dummy"

// !--------------------! User Authentication !--------------------!
export const signInUser = async (email, password, setErrorFallback) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    console.log("login")
    if (error) {
      throw error
    } else return data
  } catch (e) {
    console.error("Error signing in user:", e)
    setErrorFallback(e.message)
    return null
  }
}

export const signUpNewUser = async (email, name, password, setErrorFallback) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    })
    if (error) throw error
    else return data
  } catch (e) {
    console.error("Error signing up new user:", e)
    setErrorFallback(e.message)
    return null
  }
}

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    else console.log("Signout successful!")
    return true
  } catch (e) {
    console.error("Error signing out user:", e)
    return false
  }
}

// !--------------------! Listen to realtime changes on database !--------------------!
export const realtimeReportChannel = (onChange) => {
  return supabase
    .channel("custom-all-channel")
    .on("postgres_changes", { event: "*", schema: "public", table: "report_data" }, (payload) => {
      onChange(payload)
    })
    .subscribe()
}

export const unsubToChannel = (channel) => {
  supabase.removeChannel(channel)
}

export const getReportList = async () => {
  try {
    const { data, error } = await supabase.from("report_data").select("report_id,datetime,report")
    if (error) throw error
    else return data
  } catch (e) {
    console.error(e.message)
    return null
  }
}

// !--------------------! Data fecthing from database !--------------------!
export const getReportDetails = async (id) => {
  try {
    if (id === null) return
    // console.log("type of id", typeof id)
    const { data, error } = await supabase.from("report_data").select("*").eq("report_id", id)
    if (error) throw error
    else return data
  } catch (e) {
    console.error(e.message)
    return null
  }
}

export const addNewReportData = async (id, datetime, image, data) => {
  try {
    const { data, error } = await supabase
      .from("report_data")
      .insert({
        report_id: id,
        datetime,
        image,
        data,
      })
      .select()
    if (error) throw error
    else return data
  } catch (e) {
    console.error(e.message)
    return null
  }
}

// !--------------------! Search query !--------------------!
export const searchQuery = async (query) => {
  try {
    const { data, error } = await supabase.from("report_data").select().textSearch("search_report", query)
    if (error) throw error
    else return data
  } catch (e) {
    console.error(e.message)
    return null
  }
}

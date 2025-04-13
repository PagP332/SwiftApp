import { supabase } from "./client"

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
    else console.log("Signout successcful!")
  } catch (e) {
    console.error("Error signing out user:", e)
  }
}

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  const { member } = useSelector((state) => state.auth)
  useEffect(() => {
    if (member) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
    setLoading(false)
  }, [member])

  return { loggedIn, loading }
}

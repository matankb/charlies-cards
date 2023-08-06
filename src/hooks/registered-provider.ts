import { useEffect, useState } from 'react'
import { getCreditCard } from '../controllers/settings'

export default function useRegistered(): [
  isRegistered: boolean,
  loading: boolean,
] {
  const [isRegistered, setIsRegistered] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function prepare() {
      const card = await getCreditCard()
      if (card !== null && typeof card !== 'undefined') {
        setIsRegistered(true)
      }

      setLoading(false)
    }

    prepare().catch((e) => {
      console.error(e)
      alert('An unexpected error occurred. Please try again later.')
    })
  }, [])

  return [isRegistered, loading]
}

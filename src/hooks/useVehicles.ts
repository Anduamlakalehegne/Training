import { useState, useEffect, useCallback } from 'react'

interface Vehicle {
  id: string
  name: string
  status: string
  lastUpdated: string
}

export function useVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchVehicles = useCallback(async () => {
    try {
      const response = await fetch('/api/vehicles')
      if (!response.ok) {
        throw new Error('Failed to fetch vehicles')
      }
      const data = await response.json()
      setVehicles(data)
      setError(null)
    } catch (err) {
      setError('Error fetching vehicles')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchVehicles()
  }, [fetchVehicles])

  const mutate = useCallback(() => {
    setIsLoading(true)
    fetchVehicles()
  }, [fetchVehicles])

  return { vehicles, isLoading, error, mutate }
}


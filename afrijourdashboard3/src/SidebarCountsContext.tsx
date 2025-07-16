// contexts/SidebarCountsContext.tsx
import { createContext, useEffect, useState, ReactNode } from 'react'
// import { BASE_URL } from '../config'
import { BASE_URL } from './config'
interface Counts {
  journals: number
  volumes: number
  articles: number
}

export const SidebarCountsContext = createContext<Counts>({
  journals: 0,
  volumes: 0,
  articles: 0,
})

export const SidebarCountsProvider = ({ children }: { children: ReactNode }) => {
  const [counts, setCounts] = useState<Counts>({
    journals: 0,
    volumes: 0,
    articles: 0,
  })

  const fetchCounts = async () => {
    try {
      // Adjust endpoints to your actual API URLs
      const [journalsRes, volumesRes, articlesRes] = await Promise.all([
        fetch(`${BASE_URL}/journal_api/user/journals/`),
        fetch(`${BASE_URL}/journal_api/api/user-volumes/`),
        fetch(`${BASE_URL}/journal_api/api/articles/`),
      ])

      const journalsData = await journalsRes.json()
      const volumesData = await volumesRes.json()
      const articlesData = await articlesRes.json()

      setCounts({
        journals: journalsData.length,
        volumes: volumesData.length,
        articles: articlesData.length,
      })
    } catch (error) {
      console.error('Error fetching sidebar counts', error)
    }
  }

  useEffect(() => {
    fetchCounts()
  }, [])

  return (
    <SidebarCountsContext.Provider value={counts}>
      {children}
    </SidebarCountsContext.Provider>
  )
}

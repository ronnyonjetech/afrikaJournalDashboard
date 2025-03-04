import { Layout } from '@/components/custom/layout'
import { UserNav } from '@/components/user-nav'
import { TopNav } from '@/components/top-nav'
import { useState, useEffect } from 'react'
import { SearchSection } from '@/components/home/SearchSection'
import { JournalResults } from '@/components/home/JournalResults'
import { WelcomePopup } from '@/components/home/WelcomePopup'
import { Hero } from '@/components/home/Hero'

export default function Home() {
  const [showPopup, setShowPopup] = useState(true)
  const [journals, setJournals] = useState([])
  const [searchType, setSearchType] = useState<string>('keyword')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [results, setResults] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  // const [storageUpdate, setStorageUpdate] = useState(0)
  const pageSize = 10

  type Filters = {
    Present_on_ISSN: boolean | null
    african_index_medicus: boolean | null
    directory_of_african_journals: boolean | null
    hosted_on_INASPS: boolean | null
    indexed_on_google_scholar: boolean | null
    member_of_Committee_on_publication_Ethics: boolean | null
    online_publisher_in_africa: boolean | null
    open_access_journal: boolean | null
  }

  const [filters] = useState<Filters>({
    Present_on_ISSN: null,
    african_index_medicus: null,
    directory_of_african_journals: null,
    hosted_on_INASPS: null,
    indexed_on_google_scholar: null,
    member_of_Committee_on_publication_Ethics: null,
    online_publisher_in_africa: null,
    open_access_journal: null,
  })

  // ✅ Update searchQuery when URL changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const queryValue = params.get('query')

    if (queryValue) {
      console.log('Extracted query:', queryValue)
      const searchUrl = `https://backend.afrikajournals.org/journal_api/journals/search/?query=${queryValue}&page=1&page_size=10`
      console.log("Generated searchUrl:", searchUrl)

      localStorage.setItem('lastSearchUrl', searchUrl)
      setSearchQuery(queryValue) // ✅ Ensure state updates
      // setStorageUpdate(prev => prev + 1) // ✅ Force re-fetch

      window.history.replaceState(null, '', window.location.origin)
    }
  }, [window.location.search]) // ✅ Now depends on URL updates

  // ✅ Generates the correct search URL dynamically
  const generateUrl = () => {
    const baseUrl = 'https://backend.afrikajournals.org/journal_api/journals/search/'
    const params = new URLSearchParams()

   

    Object.entries(filters)
      .filter(([_, value]) => value !== null)
      .forEach(([key, value]) => {
        if (value !== null) {
          params.append(key, value.toString())
        }
      })

    if (searchQuery) params.append('query', searchQuery) // ✅ Uses latest query
    params.append('page', currentPage.toString())
    params.append('page_size', pageSize.toString())

    const fullUrl = `${baseUrl}?${params.toString()}`
    localStorage.setItem('lastSearchUrl', fullUrl)

    return fullUrl
  }

  // ✅ Fetch journals when searchQuery or page changes
  const fetchJournals = async () => {
    setLoading(true)
    try {
      const url = generateUrl()
      console.log('Fetching from:', url)
      const response = await fetch(url)
      const data = await response.json()
      setJournals(data.results)
      setTotalPages(Math.ceil(data.count / pageSize))
      setResults(data.count)
    } catch (error) {
      console.error('Error fetching journals:', error)
    } finally {
      setLoading(false)
    }
  }

  // ✅ Default fetch when refreshing or clearing filters
  const fetchJournals1 = async () => {
    setLoading(true)
    try {
      const url = 'https://backend.afrikajournals.org/journal_api/journals/search/?page=1&page_size=10'
      console.log('Fetching from:', url)
      const response = await fetch(url)
      const data = await response.json()
      setJournals(data.results)
      setTotalPages(Math.ceil(data.count / pageSize))
      setResults(data.count)
    } catch (error) {
      console.error('Error fetching journals:', error)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    const fetchFromStoredUrl = async (savedUrl: string) => {
      console.log('A')
      setLoading(true)
      try {
        const response = await fetch(savedUrl)
        const data = await response.json()
        setJournals(data.results)
        setTotalPages(Math.ceil(data.count / pageSize))
        setResults(data.count)
  
        // Restore search parameters from URL
        const urlParams = new URLSearchParams(savedUrl.split('?')[1])
        setSearchQuery(urlParams.get('query') || '')
        const restoredPage = Number(urlParams.get('page')) || 1
        setCurrentPage(restoredPage)
  
        // Avoid immediate second fetch
        setHasFetchedFromUrl(true)  
      } catch (error) {
        console.error('Error fetching journals:', error)
      } finally {
        setLoading(false)
      }
    }
  
    const savedUrl = localStorage.getItem('lastSearchUrl')
  
    if (savedUrl) {
      fetchFromStoredUrl(savedUrl)
    } else {
      fetchJournals()
    }
  }, [location.search]) // Runs only once when component mounts
  
  // Track if initial fetch has occurred to prevent unnecessary refetch
  const [hasFetchedFromUrl, setHasFetchedFromUrl] = useState(false)
  
  useEffect(() => {
    if (hasFetchedFromUrl) {
      console.log('B')
      fetchJournals() 
    }
  }, [currentPage,location.search]) // Avoid refetching immediately after restoring `currentPage`
  
  // ✅ Handles refresh button
  const handleRefresh = () => {
    localStorage.removeItem('lastSearchUrl') // ✅ Clears stored search
    setSearchQuery('')
    setCurrentPage(1)
    setJournals([])
    setTotalPages(1)
    // setStorageUpdate(prev => prev + 1) // ✅ Forces re-fetch
    fetchJournals1()
    console.log('Refresh Clicked')
  }

  return (
    <Layout>
      <WelcomePopup show={showPopup} onClose={() => setShowPopup(false)} />

      <Layout.Header>
        <TopNav links={topNav} />
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className="flex min-h-screen flex-col">
          <Hero totalJournals={results} />
          <SearchSection
            searchType={searchType}
            searchQuery={searchQuery}
            onSearchTypeChange={setSearchType}
            onSearchQueryChange={setSearchQuery}
            onSearch={() => {
              setCurrentPage(1)
              fetchJournals()
            }}
          />
          <JournalResults
            journals={journals}
            loading={loading}
            currentPage={currentPage}
            totalPages={totalPages}
            totalResults={results}
            onRefresh={handleRefresh} // ✅ Ensures refresh works correctly
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </Layout.Body>
    </Layout>
  )
}

const topNav = [
  {
    title: 'Home',
    href: '/',
    isActive: true,
  },
]

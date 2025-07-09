import { Layout } from '@/components/custom/layout'
import React, { useState, useEffect } from 'react'
import { BASE_URL } from '../../config'

interface Language {
  id: number
  language: string
  created_at: string
}

interface ThematicArea {
  id: number
  thematic_area: string
  created_at: string
}

interface Journal {
  id: number
  journal_title: string
  language: Language | null
  platform: string | null
  country: string | null
  thematic_area: ThematicArea | null
  volumes: Array<any>
  image: string | null
  publishers_name: string
  issn_number: string
  link: string
  aim_identifier: boolean
  medline: boolean
  google_scholar_index: string | null
  impact_factor: number | null
  sjr: number | null
  h_index: number | null
  eigen_factor: number | null
  eigen_metrix: number | null
  snip: number | null
  snip_metrix: number | null
  open_access_journal: boolean | null
  listed_in_doaj: boolean | null
  present_issn: string | null
  publisher_in_cope: boolean | null
  online_publisher_africa: boolean | null
  hosted_on_inasps: boolean | null
  summary: string
  user: number
}

interface AuthTokens {
  access: string
  refresh: string
}

const Index = () => {
  const [journals, setJournals] = useState<Journal[]>([])
  const [selectedJournalId, setSelectedJournalId] = useState<number | null>(
    null
  )
  const [error, setError] = useState('')

  const getAuthTokens = (): AuthTokens | null => {
    const tokens = localStorage.getItem('authTokens')
    return tokens ? JSON.parse(tokens) : null
  }

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const authTokens = getAuthTokens()
        const token = authTokens?.access
        const response = await fetch(`${BASE_URL}/journal_api/user/journals/`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          const data: Journal[] = await response.json()
          setJournals(data)
          console.log('Fetched journals:', data)
        } else {
          console.error('Failed to fetch journals', response.status)
        }
      } catch (error) {
        console.error('Error fetching journals:', error)
      }
    }

    fetchJournals()
  }, [])

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   const formData = new FormData(e.target as HTMLFormElement)

  //   if (!selectedJournalId) {
  //     setError('Please select a journal.')
  //     return
  //   }

  //   const newVolume = {
  //     journal_id: selectedJournalId,
  //     volume_number: parseInt(formData.get('volume_number') as string, 10) || 0,
  //     issue_number: parseInt(formData.get('issue_number') as string, 10) || 0,
  //     year: parseInt(formData.get('year') as string, 10) || 2022,
  //   }

  //   try {
  //     const response = await fetch(`${BASE_URL}/journal_api/api/volume/`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(newVolume),
  //     })

  //     if (response.ok) {
  //       console.log('Volume added successfully')
  //       setError('')
  //     } else {
  //       setError('Failed to add volume')
  //       console.error('Failed to add volume', response.status)
  //     }
  //   } catch (error) {
  //     console.error('Error adding volume:', error)
  //     setError('Error adding volume')
  //   }
  // }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    if (!selectedJournalId) {
      setError('Please select a journal.')
      return
    }

    const newVolume = {
      journal_id: selectedJournalId,
      volume_number: parseInt(formData.get('volume_number') as string, 10) || 0,
      issue_number: parseInt(formData.get('issue_number') as string, 10) || 0,
      year: parseInt(formData.get('year') as string, 10) || 2022,
    }

    try {
      const response = await fetch(`${BASE_URL}/journal_api/api/volume/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newVolume),
      })

      if (response.ok) {
        console.log('Volume added successfully')
        alert("Volume Added Successfully to the Journal")
        setError('')

        // ✅ Clear form inputs
        form.reset()

        // ✅ Clear dropdown selection if desired
        setSelectedJournalId(null)
      } else {
        setError('Failed to add volume')
        console.error('Failed to add volume', response.status)
      }
    } catch (error) {
      console.error('Error adding volume:', error)
      setError('Error adding volume')
    }
  }

  return (
    <Layout>
      <div className='container mx-auto p-8'>
        <h1 className='mb-4 text-3xl font-bold'>Add Volume to Your Journal</h1>

        <form
          onSubmit={handleSubmit}
          className='mt-4 rounded border p-4 shadow-md'
        >
          <div>
            <label htmlFor='journal' className='mb-2 block'>
              Select Journal
            </label>
            <select
              id='journal'
              name='journal'
              className='w-full rounded border p-2'
              required
              value={selectedJournalId || ''}
              onChange={(e) =>
                setSelectedJournalId(parseInt(e.target.value, 10))
              }
            >
              <option value=''>-- Select a Journal --</option>
              {journals.map((journal) => (
                <option key={journal.id} value={journal.id}>
                  {journal.journal_title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor='volume_number' className='mb-2 block'>
              Volume Number
            </label>
            <input
              type='number'
              id='volume_number'
              name='volume_number'
              className='w-full rounded border p-2'
              required
              min='0'
            />
          </div>

          <div>
            <label htmlFor='issue_number' className='mb-2 block'>
              Issue Number
            </label>
            <input
              type='number'
              id='issue_number'
              name='issue_number'
              className='w-full rounded border p-2'
              required
              min='0'
            />
          </div>

          <div>
            <label htmlFor='year' className='mb-2 block'>
              Year
            </label>
            <input
              type='number'
              id='year'
              name='year'
              className='w-full rounded border p-2'
              required
              min='0'
            />
          </div>

          {error && <p className='mt-2 text-red-500'>{error}</p>}

          <button
            type='submit'
            className='mt-4 rounded bg-green-500 p-2 text-white'
          >
            Add Volume
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default Index

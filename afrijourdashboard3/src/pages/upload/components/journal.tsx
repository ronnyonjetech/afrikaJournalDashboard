// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
// } from '@/components/ui/card'
// import { BASE_URL } from '../../../config'
// import { FaPen, FaTrash } from 'react-icons/fa'
// // Define types for the journal data structure
// interface Language {
//   id: number
//   language: string
//   created_at: string
// }

// interface ThematicArea {
//   id: number
//   thematic_area: string
//   created_at: string
// }

// interface Journal {
//   id: number
//   language: Language | null
//   platform: string | null
//   country: string | null
//   thematic_area: ThematicArea | null
//   volumes: Array<any>
//   image: string | null
//   journal_title: string
//   publishers_name: string
//   issn_number: string
//   link: string
//   aim_identifier: boolean
//   medline: boolean
//   google_scholar_index: string | null
//   impact_factor: number | null
//   sjr: number | null
//   h_index: number | null
//   eigen_factor: number | null
//   eigen_metrix: number | null
//   snip: number | null
//   snip_metrix: number | null
//   open_access_journal: boolean | null
//   listed_in_doaj: boolean | null
//   present_issn: string | null
//   publisher_in_cope: boolean | null
//   online_publisher_africa: boolean | null
//   hosted_on_inasps: boolean | null
//   summary: string
//   user: number
// }

// // Define a type for auth tokens
// interface AuthTokens {
//   access: string
//   refresh: string
// }

// const Journals: React.FC = () => {
//   const [journals, setJournals] = useState<Journal[]>([])

//   // Function to get the auth tokens from local storage
//   const getAuthTokens = (): AuthTokens | null => {
//     const tokens = localStorage.getItem('authTokens') // Adjust the key based on your implementation
//     return tokens ? JSON.parse(tokens) : null
//   }

//   useEffect(() => {
//     const fetchJournals = async () => {
//       try {
//         const authTokens = getAuthTokens()
//         const token = authTokens?.access
//         const response = await fetch(`${BASE_URL}/journal_api/user/journals/`, {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         })

//         if (response.ok) {
//           const data: Journal[] = await response.json()
//           setJournals(data)
//           console.log(data)
//         } else {
//           console.error('Failed to fetch journals', response.status)
//         }
//       } catch (error) {
//         console.error('Error fetching journals:', error)
//       }
//     }

//     fetchJournals()
//   }, [])

//   return (
//     <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2'>
//       {journals.map((journal) => (
//         <Card
//           key={journal.id}
//           className='relative flex aspect-square flex-col items-center justify-between rounded-lg border p-4 shadow transition-shadow hover:shadow-lg'
//         >
//           <div className='absolute right-3 top-3 flex space-x-2'>
//             <Link to={`/upload/${journal.id}`}>
//               <button
//                 type='button'
//                 className='flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
//               >
//                 <FaPen className='h-4 w-4 text-yellow-500' />
//               </button>
//             </Link>
//             <button
//               type='button'
//               onClick={() => handleDelete(journal.id)}
//               className='flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500'
//             >
//               <FaTrash className='h-4 w-4 text-red-500' />
//             </button>
//           </div>

//           {/* Card Content */}
//           <CardHeader className='text-center'>
//             <CardTitle className='truncate text-lg font-semibold'>
//               {journal.journal_title}
//             </CardTitle>
//             <CardDescription className='mt-1 text-sm text-gray-500'>
//               Language:{' '}
//               {journal.language ? journal.language.language : 'Not specified'}
//             </CardDescription>
//           </CardHeader>
//           <CardContent className='mt-4 text-center text-sm text-gray-600'>
//             <p>
//               <strong>Thematic Area:</strong>{' '}
//               {journal.thematic_area
//                 ? journal.thematic_area.thematic_area
//                 : 'Not specified'}
//             </p>
//             <p>
//               <strong>Publisher:</strong>{' '}
//               {journal.publishers_name || 'Not specified'}
//             </p>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   )
// }

// export default Journals

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { BASE_URL } from '../../../config'
import { FaPen, FaTrash } from 'react-icons/fa'

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
  language: Language | null
  platform: string | null
  country: string | null
  thematic_area: ThematicArea | null
  volumes: Array<any>
  image: string | null
  journal_title: string
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

const Journals: React.FC = () => {
  const [journals, setJournals] = useState<Journal[]>([])

  const getAuthTokens = (): AuthTokens | null => {
    const tokens = localStorage.getItem('authTokens')
    return tokens ? JSON.parse(tokens) : null
  }

  const handleDelete = (id: number) => {
    // Placeholder — implement deletion logic
    console.log('Delete journal with ID:', id)
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
        } else {
          console.error('Failed to fetch journals', response.status)
        }
      } catch (error) {
        console.error('Error fetching journals:', error)
      }
    }

    fetchJournals()
  }, [])

  return (
    // <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2'>
    //   {journals.map((journal) => (
    //     <Card
    //       key={journal.id}
    //       className='transition-all hover:scale-105 relative p-4 rounded-xl border shadow'
    //     >
    //       {/* Action Buttons */}
    //       <div className='absolute right-3 top-3 flex space-x-2'>
    //         <Link to={`/upload/${journal.id}`}>
    //           <button
    //             type='button'
    //             className='flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
    //           >
    //             <FaPen className='h-4 w-4 text-yellow-500' />
    //           </button>
    //         </Link>
    //         <button
    //           type='button'
    //           onClick={() => handleDelete(journal.id)}
    //           className='flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500'
    //         >
    //           <FaTrash className='h-4 w-4 text-red-500' />
    //         </button>
    //       </div>

    //       {/* Journal Info */}
    //       <CardHeader className='text-center space-y-1'>
    //         <CardTitle className='text-sm font-medium truncate'>
    //           {journal.journal_title}
    //         </CardTitle>
    //         <CardDescription className='text-xs text-gray-500'>
    //           Language:{' '}
    //           {journal.language ? journal.language.language : 'Not specified'}
    //         </CardDescription>
    //       </CardHeader>

    //       <CardContent className='mt-2 text-sm text-center text-gray-600'>
    //         <p>
    //           <strong>Thematic Area:</strong>{' '}
    //           {journal.thematic_area?.thematic_area || 'Not specified'}
    //         </p>
    //         <p>
    //           <strong>Publisher:</strong>{' '}
    //           {journal.publishers_name || 'Not specified'}
    //         </p>
    //       </CardContent>
    //     </Card>
    //   ))}
    // </div>
    <div className='grid gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {journals.map((journal) => (
        <Card
          key={journal.id}
          className='relative flex flex-col justify-between rounded-2xl border bg-white p-6 shadow-md transition-all hover:scale-[1.03] hover:shadow-lg'
        >
          {/* Action Buttons */}
          <div className='absolute right-4 top-4 flex space-x-2'>
            <Link to={`/upload/${journal.id}`}>
              <button
                type='button'
                className='flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400'
              >
                <FaPen className='h-4 w-4 text-yellow-600' />
              </button>
            </Link>
            <button
              type='button'
              onClick={() => handleDelete(journal.id)}
              className='flex h-8 w-8 items-center justify-center rounded-full bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-400'
            >
              <FaTrash className='h-4 w-4 text-red-600' />
            </button>
          </div>

          {/* Journal Info */}
          <CardHeader className='mb-3 space-y-1 text-center'>
            <CardTitle className='truncate text-base font-semibold leading-snug text-gray-800'>
              {journal.journal_title}
            </CardTitle>
            <CardDescription className='text-xs text-gray-500'>
              {journal.language ? journal.language.language : 'No language set'}
            </CardDescription>
          </CardHeader>

          <CardContent className='space-y-2 text-center text-sm text-gray-700'>
            <p>
              <span className='font-medium text-gray-900'>Thematic:</span>{' '}
              {journal.thematic_area?.thematic_area || 'Not specified'}
            </p>
            <p>
              <span className='font-medium text-gray-900'>Publisher:</span>{' '}
              {journal.publishers_name || 'Not specified'}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default Journals

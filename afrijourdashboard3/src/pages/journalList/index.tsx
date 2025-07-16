// import { Layout } from '@/components/custom/layout'
// import  { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
// } from '@/components/ui/card'
// import { FaPen, FaTrash } from 'react-icons/fa'
// import { BASE_URL } from '../../config'

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

// interface AuthTokens {
//   access: string
//   refresh: string
// }

// const journalList = () => {
//   const [journals, setJournals] = useState<Journal[]>([])

//   const getAuthTokens = (): AuthTokens | null => {
//     const tokens = localStorage.getItem('authTokens')
//     return tokens ? JSON.parse(tokens) : null
//   }

//   const handleDelete = async(id: number) => {
//     // Placeholder — implement deletion logic
//     console.log('Delete journal with ID:', id)

//     const authTokens = getAuthTokens()
//     const token = authTokens?.access

//     if (!token) {
//       alert('You are not authenticated')
//       return
//     }

//     if (!window.confirm('Are you sure you want to delete this journal?')) {
//       return
//     }

//     try {
//       const response = await fetch(
//         `${BASE_URL}/journal_api/api/user-journals/${id}/`,
//         {
//           method: 'DELETE',
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       )

//       if (response.ok || response.status === 204) {
//         setJournals((prev) => prev.filter((volume) => volume.id !== id))
//         alert('Journal deleted successfully')
//       } else {
//         console.error('Failed to delete journal', response.status)
//         alert('Failed to delete journal')
//       }
//     } catch (error) {
//       console.error('Error deleting journal:', error)
//       alert('Error deleting journal')
//     }
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
//     <Layout>
//       <Layout.Body>
//         <div className='grid gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
//           {journals.map((journal) => (
//             <Card
//               key={journal.id}
//               className='relative flex flex-col justify-between rounded-2xl border bg-white p-6 shadow-md transition-all hover:scale-[1.03] hover:shadow-lg'
//             >
//               {/* Action Buttons */}
//               <div className='absolute right-4 top-4 flex space-x-2'>
//                 <Link to={`/upload/${journal.id}`}>
//                   <button
//                     type='button'
//                     className='flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400'
//                   >
//                     <FaPen className='h-4 w-4 text-yellow-600' />
//                   </button>
//                 </Link>
//                 <button
//                   type='button'
//                   onClick={() => handleDelete(journal.id)}
//                   className='flex h-8 w-8 items-center justify-center rounded-full bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-400'
//                 >
//                   <FaTrash className='h-4 w-4 text-red-600' />
//                 </button>
//               </div>

//               {/* Journal Info */}
//               <CardHeader className='mb-3 space-y-1 text-center'>
//                 <CardTitle className='truncate text-base font-semibold leading-snug text-gray-800'>
//                   {journal.journal_title}
//                 </CardTitle>
//                 <CardDescription className='text-xs text-gray-500'>
//                   {journal.language
//                     ? journal.language.language
//                     : 'No language set'}
//                 </CardDescription>
//               </CardHeader>

//               <CardContent className='space-y-2 text-center text-sm text-gray-700'>
//                 <p>
//                   <span className='font-medium text-gray-900'>Thematic:</span>{' '}
//                   {journal.thematic_area?.thematic_area || 'Not specified'}
//                 </p>
//                 <p>
//                   <span className='font-medium text-gray-900'>Publisher:</span>{' '}
//                   {journal.publishers_name || 'Not specified'}
//                 </p>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </Layout.Body>
//     </Layout>
//   )
// }

// export default journalList

import { Layout } from '@/components/custom/layout'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { FaPen, FaTrash } from 'react-icons/fa'
import { BASE_URL } from '../../config'
import './index.css'
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

const JournalList = () => {
  const [journals, setJournals] = useState<Journal[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const getAuthTokens = (): AuthTokens | null => {
    const tokens = localStorage.getItem('authTokens')
    return tokens ? JSON.parse(tokens) : null
  }

  const handleDelete = async (id: number) => {
    console.log('Delete journal with ID:', id)
    const authTokens = getAuthTokens()
    const token = authTokens?.access

    if (!token) {
      alert('You are not authenticated')
      return
    }

    if (!window.confirm('Are you sure you want to delete this journal?')) {
      return
    }

    try {
      const response = await fetch(
        `${BASE_URL}/journal_api/api/user-journals/${id}/`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      if (response.ok || response.status === 204) {
        setJournals((prev) => prev.filter((volume) => volume.id !== id))
        alert('Journal deleted successfully')
      } else {
        console.error('Failed to delete journal', response.status)
        alert('Failed to delete journal')
      }
    } catch (error) {
      console.error('Error deleting journal:', error)
      alert('Error deleting journal')
    }
  }

  useEffect(() => {
    const fetchJournals = async () => {
      setLoading(true)
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
      } finally {
        setLoading(false)
      }
    }

    fetchJournals()
  }, [])

  return (
    <Layout>
      <Layout.Body>
        <div className='grid gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {loading ? (
            // <p className='col-span-full text-center'>Loading journals...</p>
            <div className='col-span-full flex h-[80vh] w-full items-center justify-center'>
              <p className='text-center text-lg text-gray-600'>
                Loading journals...
              </p>
            </div>
          ) : journals.length === 0 ? (
            // <div className='col-span-full flex h-[80vh] w-full items-center justify-center'>
            //   <p className='text-center text-lg text-gray-600'>
            //     No journals Added.
            //   </p>
            // </div>
            <div className='col-span-full flex h-[80vh] w-full flex-col items-center justify-center'>
              <div className='mb-4'>
                <svg
                  viewBox='0 0 80 80'
                  xmlns='http://www.w3.org/2000/svg'
                  className='animate-disagree h-24 w-24'
                  fill='none'
                >
                  <path
                    d='M40.475 70.95C57.3059 70.95 70.95 57.3059 70.95 40.475C70.95 23.6441 57.3059 10 40.475 10C23.6441 10 10 23.6441 10 40.475C10 57.3059 23.6441 70.95 40.475 70.95Z'
                    fill='url(#paint0_radial)'
                  />
                  <path
                    opacity='0.5'
                    d='M40.475 70.95C57.3059 70.95 70.95 57.3059 70.95 40.475C70.95 23.6441 57.3059 10 40.475 10C23.6441 10 10 23.6441 10 40.475C10 57.3059 23.6441 70.95 40.475 70.95Z'
                    fill='url(#paint1_radial)'
                  />
                  <path
                    d='M40.4749 51.7579C49.419 51.7579 52.2822 60.6027 49.5466 59.2136C45.8896 57.3568 43.5791 57.1867 40.4749 57.1867C37.3707 57.1867 35.0603 57.3709 31.4033 59.2136C28.6676 60.6027 31.5309 51.7579 40.4749 51.7579Z'
                    fill='#643800'
                  />
                  <path
                    d='M28.852 42.2185C28.852 42.2185 34.3517 41.694 35.9534 37.8527C36.0526 37.6118 36.1093 37.3566 36.1235 37.1015C36.1377 36.5912 35.6416 36.0526 34.6494 36.5487C28.5544 39.6245 25.0391 38.5473 22.4027 37.796C21.3679 37.4984 20.4466 38.5898 20.9144 39.3269C23.2815 43.0548 28.852 42.2185 28.852 42.2185Z'
                    fill='url(#paint2_radial)'
                  />
                  <path
                    d='M21.6371 29.1355C21.552 30.3545 22.8136 31.2049 25.0815 31.375C27.0092 31.5168 31.304 30.7514 34.4933 27.2077C35.0744 26.5557 34.2807 26.1163 33.7279 26.5274C31.8285 27.9165 26.8958 29.5324 23.1821 28.8662C21.6654 28.5827 21.6371 29.1355 21.6371 29.1355Z'
                    fill='url(#paint3_linear)'
                  />
                  <path
                    d='M35.9535 36.6054C35.7267 36.3503 35.3014 36.2369 34.6636 36.5629C28.5686 39.6387 25.0533 38.5615 22.4169 37.8102C21.8641 37.6543 21.3538 37.8953 21.0562 38.2496C25.2943 41.0845 33.2887 39.9506 35.9535 36.6054Z'
                    fill='url(#paint4_linear)'
                  />
                  <path
                    d='M40.4749 53.3171C45.7478 53.3171 49.0787 56.2937 50.5387 58.76C50.6237 56.9741 47.3495 51.7579 40.4749 51.7579C33.6144 51.7579 30.326 56.9741 30.411 58.76C31.871 56.2937 35.202 53.3171 40.4749 53.3171Z'
                    fill='url(#paint5_linear)'
                  />
                  <path
                    d='M52.0838 42.2185C52.0838 42.2185 46.5841 41.694 44.9824 37.8527C44.8832 37.6118 44.8265 37.3566 44.8123 37.1015C44.7981 36.5912 45.2942 36.0526 46.2864 36.5487C52.3814 39.6245 55.8967 38.5473 58.5331 37.796C59.5679 37.4984 60.4892 38.5898 60.0215 39.3269C57.6685 43.0548 52.0838 42.2185 52.0838 42.2185Z'
                    fill='url(#paint6_radial)'
                  />
                  <path
                    d='M59.3129 29.1355C59.398 30.3545 58.1365 31.2049 55.8686 31.375C53.9408 31.5168 49.646 30.7514 46.4568 27.2077C45.8756 26.5557 46.6694 26.1163 47.2222 26.5274C49.1215 27.9165 54.0542 29.5324 57.7679 28.8662C59.2846 28.5827 59.3129 29.1355 59.3129 29.1355Z'
                    fill='url(#paint7_linear)'
                  />
                  <path
                    d='M44.9966 36.6054C45.2234 36.3503 45.6486 36.2369 46.2865 36.5629C52.3815 39.6387 55.8967 38.5615 58.5332 37.8102C59.086 37.6543 59.5962 37.8953 59.8939 38.2496C55.6558 41.0845 47.6472 39.9506 44.9966 36.6054Z'
                    fill='url(#paint8_linear)'
                  />
                  <defs>
                    <radialGradient
                      id='paint0_radial'
                      cx='0'
                      cy='0'
                      r='1'
                      gradientUnits='userSpaceOnUse'
                      gradientTransform='translate(34.479 28.1245) scale(36.7641)'
                    >
                      <stop stopColor='#FFDF30' />
                      <stop offset='1' stopColor='#FFB82E' />
                    </radialGradient>
                    <radialGradient
                      id='paint1_radial'
                      cx='0'
                      cy='0'
                      r='1'
                      gradientUnits='userSpaceOnUse'
                      gradientTransform='translate(34.479 28.1245) scale(28.924)'
                    >
                      <stop stopColor='#FFE95F' />
                      <stop offset='1' stopColor='#FFBB47' stopOpacity='0' />
                    </radialGradient>
                    <radialGradient
                      id='paint2_radial'
                      cx='0'
                      cy='0'
                      r='1'
                      gradientUnits='userSpaceOnUse'
                      gradientTransform='translate(28.5837 39.6331) rotate(-5.56162) scale(5.89043 2.61753)'
                    >
                      <stop offset='0.00132565' stopColor='#7A4400' />
                      <stop offset='1' stopColor='#643800' />
                    </radialGradient>
                    <linearGradient
                      id='paint3_linear'
                      x1='27.6175'
                      y1='33.233'
                      x2='28.0462'
                      y2='29.0953'
                      gradientUnits='userSpaceOnUse'
                    >
                      <stop offset='0.00132565' stopColor='#3C2200' />
                      <stop offset='1' stopColor='#7A4400' />
                    </linearGradient>
                    <linearGradient
                      id='paint4_linear'
                      x1='28.3979'
                      y1='35.8144'
                      x2='28.6879'
                      y2='40.8502'
                      gradientUnits='userSpaceOnUse'
                    >
                      <stop offset='0.00132565' stopColor='#3C2200' />
                      <stop offset='1' stopColor='#512D00' />
                    </linearGradient>
                    <linearGradient
                      id='paint5_linear'
                      x1='40.4745'
                      y1='49.4458'
                      x2='40.4745'
                      y2='56.4978'
                      gradientUnits='userSpaceOnUse'
                    >
                      <stop offset='0.00132565' stopColor='#3C2200' />
                      <stop offset='1' stopColor='#512D00' />
                    </linearGradient>
                    <radialGradient
                      id='paint6_radial'
                      cx='0'
                      cy='0'
                      r='1'
                      gradientUnits='userSpaceOnUse'
                      gradientTransform='translate(52.3638 39.6331) rotate(-174.438) scale(5.89043 2.61753)'
                    >
                      <stop offset='0.00132565' stopColor='#7A4400' />
                      <stop offset='1' stopColor='#643800' />
                    </radialGradient>
                    <linearGradient
                      id='paint7_linear'
                      x1='53.3302'
                      y1='33.234'
                      x2='52.9015'
                      y2='29.0963'
                      gradientUnits='userSpaceOnUse'
                    >
                      <stop offset='0.00132565' stopColor='#3C2200' />
                      <stop offset='1' stopColor='#7A4400' />
                    </linearGradient>
                    <linearGradient
                      id='paint8_linear'
                      x1='52.5496'
                      y1='35.8133'
                      x2='52.2596'
                      y2='40.849'
                      gradientUnits='userSpaceOnUse'
                    >
                      <stop offset='0.00132565' stopColor='#3C2200' />
                      <stop offset='1' stopColor='#512D00' />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <p className='text-center text-lg text-gray-600'>
                No journals Added.
              </p>
            </div>
          ) : (
            journals.map((journal) => (
              <Card
                key={journal.id}
                className='relative flex flex-col justify-between rounded-2xl border bg-white p-6 shadow-md transition-all hover:scale-[1.03] hover:shadow-lg'
              >
                <div className='absolute right-4 top-4 flex space-x-2'>
                  <Link to={`/volume_update`}>
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

                <CardHeader className='mb-3 space-y-1 text-center'>
                  <CardTitle className='truncate text-base font-semibold leading-snug text-gray-800'>
                    {journal.journal_title}
                  </CardTitle>
                  <CardDescription className='text-xs text-gray-500'>
                    {journal.language
                      ? journal.language.language
                      : 'No language set'}
                  </CardDescription>
                </CardHeader>

                <CardContent className='space-y-2 text-center text-sm text-gray-700'>
                  <p>
                    <span className='font-medium text-gray-900'>Thematic:</span>{' '}
                    {journal.thematic_area?.thematic_area || 'Not specified'}
                  </p>
                  <p>
                    <span className='font-medium text-gray-900'>
                      Publisher:
                    </span>{' '}
                    {journal.publishers_name || 'Not specified'}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </Layout.Body>
    </Layout>
  )
}

export default JournalList

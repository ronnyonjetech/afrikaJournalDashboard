// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { Layout } from '@/components/custom/layout'
// import ArticleForm from './Article'
// import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
// import Volumes from './Volumes'
// import { BASE_URL } from '../../config';

// interface UploadDetail {
//   id: number
//   journal_title: string
//   description: string
//   journal_id: number
//   volumes: Volume[]
// }

// interface Volume {
//   id: number
//   journal_id: number
//   volume_number: number
//   issue_number: number
//   year: number
//   article_count: number
// }
// interface AuthTokens {
//   access: string
//   refresh: string
// }

// const getAuthTokens = (): AuthTokens | null => {
//   const tokens = localStorage.getItem('authTokens')
//   return tokens ? JSON.parse(tokens) : null
// }

// const fetchVolumes = async (
//   setVolumes: React.Dispatch<React.SetStateAction<Volume[]>>
// ) => {
//   try {
//     const authTokens = getAuthTokens()
//     const token = authTokens?.access
//     const response = await fetch(
//       `${BASE_URL}/journal_api/api/user-volumes/`,
//       {
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     )

//     if (response.ok) {
//       const data: Volume[] = await response.json()
//       setVolumes(data)
//       console.log('Fetched volumes:', data)
//     } else {
//       console.error('Failed to fetch volumes', response.status)
//     }
//   } catch (error) {
//     console.error('Error fetching volumes:', error)
//   }
// }

// const UploadDetailPage: React.FC = () => {
//   const { uploadId } = useParams<{ uploadId: string }>()
//   const [upload, setUpload] = useState<UploadDetail | null>(null)
//   const [journalId, setJournalId] = useState<number | null>(null)

//   const [error, setError] = useState<string>('')
//   const [volumes, setVolumes] = useState<Volume[]>([])

//   useEffect(() => {
//     if (!uploadId) {
//       console.error('Upload ID is missing')
//       return
//     }

//     fetchVolumes(setVolumes)

//     const fetchUploadDetail = async () => {
//       try {
//         const response = await fetch(
//           `${BASE_URL}/journal_api/api/journals/${uploadId}`
//         )
//         if (response.ok) {
//           const data: UploadDetail = await response.json()
//           setUpload(data)
//           setJournalId(data.id)
//           console.log('data', data)
//           console.log('journal id', data.id)
//           console.log('volumes', volumes)
//         } else {
//           console.error('Failed to fetch upload details', response.status)
//         }
//       } catch (error) {
//         console.error('Error fetching upload details:', error)
//       }
//     }

//     fetchUploadDetail()
//   }, [uploadId])

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     const formData = new FormData(e.target as HTMLFormElement)

//     const newVolume = {
//       journal_id: journalId,
//       volume_number: parseInt(formData.get('volume_number') as string, 10) || 0,
//       issue_number: parseInt(formData.get('issue_number') as string, 10) || 0,
//       year: parseInt(formData.get('year') as string, 10) || 2022,
//     }

//     if (
//       !newVolume.volume_number ||
//       !newVolume.issue_number ||
//       !newVolume.year ||
//       !journalId
//     ) {
//       setError('All fields are required.')
//       console.error('Form submission failed: Missing fields')
//       return
//     }

//     console.log('Submitting volume data:', newVolume)

//     try {
//       const response = await fetch(
//         `${BASE_URL}/journal_api/api/volume/`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(newVolume),
//         }
//       )

//       const responseData = await response.json()
//       console.log('Server response:', responseData)

//       if (response.ok) {
//         console.log('Volume added successfully!')

//         setError('')
//       } else {
//         console.error('Failed to add volume', response.status)
//         setError('Failed to add volume')
//       }
//     } catch (error) {
//       console.error('Error adding volume:', error)
//       setError('Error adding volume')
//     }
//   }

//   if (!uploadId) {
//     return <div>Error: Upload ID is missing.</div>
//   }

//   if (!upload) {
//     return <div>Loading...</div>
//   }

//   return (
//     <Layout>
//       <Layout.Body>
//         <div className='container mx-auto p-8 text-center'>
//           <h1 className='mb-4 text-3xl font-bold'>{upload?.journal_title}</h1>
//           <p className='mb-6 text-lg'>{upload?.description}</p>

//           <Tabs defaultValue='volumes' className='mx-auto w-full max-w-3xl'>
//             <TabsList className='grid h-14 w-full grid-cols-3'>
//               <TabsTrigger value='volumes' className=' flex items-center gap-2'>
//                 Existing Volumes
//               </TabsTrigger>
//               <TabsTrigger
//                 value='add-article'
//                 className=' flex items-center gap-2'
//               >
//                 Add Article
//               </TabsTrigger>
//               <TabsTrigger
//                 value='add-volumes'
//                 className=' flex items-center gap-2'
//               >
//                 Add Volume
//               </TabsTrigger>
//             </TabsList>

//             <TabsContent value='volumes'>
//               {/* <Volumes journalId={journalId} /> */}
//               {journalId !== null ? <Volumes journalId={journalId} /> : <p>Loading...</p>}
//             </TabsContent>

//             <TabsContent value='add-article'>
//               {journalId ? (
//                 <ArticleForm journalId={journalId} volumes={volumes} />
//               ) : (
//                 <p className='text-center'>Loading volume data...</p>
//               )}
//             </TabsContent>

//             <TabsContent value='add-volumes'>
//               <form
//                 onSubmit={handleSubmit}
//                 className='mt-4 rounded border p-4 shadow-md'
//               >
//                 <div>
//                   <label htmlFor='volume_number' className='mb-2 block'>
//                     Volume Number
//                   </label>
//                   <input
//                     type='number'
//                     id='volume_number'
//                     name='volume_number'
//                     className='w-full rounded border p-2'
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor='issue_number' className='mb-2 block'>
//                     Issue Number
//                   </label>
//                   <input
//                     type='number'
//                     id='issue_number'
//                     name='issue_number'
//                     className='w-full rounded border p-2'
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor='year' className='mb-2 block'>
//                     Year
//                   </label>
//                   <input
//                     type='number'
//                     id='year'
//                     name='year'
//                     className='w-full rounded border p-2'
//                     required
//                   />
//                 </div>
//                 {error && <p className='mt-2 text-red-500'>{error}</p>}
//                 <button
//                   type='submit'
//                   className='mt-4 rounded bg-green-500 p-2 text-white'
//                 >
//                   Add Volume
//                 </button>
//               </form>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </Layout.Body>
//     </Layout>
//   )
// }

// export default UploadDetailPage

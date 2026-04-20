// import { useEffect, useState } from 'react'
// import { Layout } from '@/components/custom/layout'
// import { BASE_URL } from '../../config'
// import { FaPen, FaTrash, FaTimes } from 'react-icons/fa'
// import './index.css'

// interface Article {
//   id: number
//   journal: number
//   volume: number
//   title: string
//   authors: string
//   publisher: string
//   journal_title: string
//   publication_date: string
//   doi: string
//   license_url: string
//   electronic_issn: string
//   print_issn: string
//   article_type: string
//   pdf: string | File | null
//   volume_number: string
//   volume_issue_number: string
//   volume_year: string
//   country: string
//   language: string
//   thematic_area: string
//   reference_count: number
//   citation_count: number
//   abstract: string | null
// }

// const index = () => {
//   const [articles, setArticles] = useState<Article[]>([])
//   const [loading, setLoading] = useState(true)
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [editingArticle, setEditingArticle] = useState<Article | null>(null)
//   const [newPdf, setNewPdf] = useState<File | null>(null)

//   const getAuthTokens = () => {
//     const tokens = localStorage.getItem('authTokens')
//     return tokens ? JSON.parse(tokens) : null
//   }

//   const fetchArticles = async () => {
//     try {
//       const token = getAuthTokens()?.access
//       const response = await fetch(
//         `${BASE_URL}/journal_api/api/user-articles/`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       )
//       if (response.ok) {
//         const data = await response.json()
//         setArticles(data.results)
//       }
//     } catch (error) {
//       console.error('Error:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchArticles()
//   }, [])

//   const handleUpdate = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!editingArticle) return

//     const token = getAuthTokens()?.access

//     // We use FormData to handle the PDF file upload properly
//     const formData = new FormData()
//     formData.append('journal', String(editingArticle.journal))
//     formData.append('volume', String(editingArticle.volume))
//     formData.append('title', editingArticle.title)
//     formData.append('authors', editingArticle.authors)
//     formData.append('publisher', editingArticle.publisher)
//     formData.append('publication_date', editingArticle.publication_date)
//     formData.append('doi', editingArticle.doi)
//     formData.append('license_url', editingArticle.license_url)
//     formData.append('electronic_issn', editingArticle.electronic_issn)
//     formData.append('print_issn', editingArticle.print_issn)
//     formData.append('article_type', editingArticle.article_type)
//     formData.append('abstract', editingArticle.abstract || '')

//     // If a new PDF was selected, upload it. Otherwise, keep existing.
//     if (newPdf) {
//       formData.append('pdf', newPdf)
//     }

//     try {
//       const response = await fetch(
//         `${BASE_URL}/journal_api/api/user-articles/${editingArticle.id}/`,
//         {
//           method: 'PUT',
//           headers: { Authorization: `Bearer ${token}` }, // Note: Do NOT set Content-Type for FormData
//           body: formData,
//         }
//       )

//       if (response.ok) {
//         const updatedData = await response.json()
//         setArticles((prev) =>
//           prev.map((a) => (a.id === updatedData.id ? updatedData : a))
//         )
//         setIsModalOpen(false)
//         setNewPdf(null)
//         alert('Article updated successfully')
//       } else {
//         alert('Failed to update article')
//       }
//     } catch (error) {
//       alert('Error updating article')
//     }
//   }

//   const handleDelete = async (id: number) => {
//     const authTokens = getAuthTokens()
//     const token = authTokens?.access

//     if (
//       !token ||
//       !window.confirm('Are you sure you want to delete this article?')
//     )
//       return

//     try {
//       const response = await fetch(
//         `${BASE_URL}/journal_api/api/user-articles/${id}/`,
//         {
//           method: 'DELETE',
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       )

//       if (response.ok || response.status === 204) {
//         setArticles((prev) => prev.filter((article) => article.id !== id))
//         alert('Article deleted successfully')
//       }
//     } catch (error) {
//       alert('Error deleting article')
//     }
//   }

//   return (
//     <Layout>
//       <Layout.Body>
//         {isModalOpen && editingArticle && (
//           <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm'>
//             <div className='max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-6 shadow-2xl'>
//               <div className='mb-4 flex items-center justify-between border-b pb-3'>
//                 <h3 className='text-xl font-bold'>Edit Article Details</h3>
//                 <button onClick={() => setIsModalOpen(false)}>
//                   <FaTimes className='text-gray-400' />
//                 </button>
//               </div>

//               <form
//                 onSubmit={handleUpdate}
//                 className='grid grid-cols-1 gap-4 md:grid-cols-2'
//               >
//                 {/* Text Fields */}
//                 <div className='md:col-span-2'>
//                   <label className='block text-xs font-bold uppercase text-gray-500'>
//                     Title
//                   </label>
//                   <input
//                     type='text'
//                     className='w-full rounded border p-2'
//                     value={editingArticle.title}
//                     onChange={(e) =>
//                       setEditingArticle({
//                         ...editingArticle,
//                         title: e.target.value,
//                       })
//                     }
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className='block text-xs font-bold uppercase text-gray-500'>
//                     Authors
//                   </label>
//                   <input
//                     type='text'
//                     className='w-full rounded border p-2'
//                     value={editingArticle.authors}
//                     onChange={(e) =>
//                       setEditingArticle({
//                         ...editingArticle,
//                         authors: e.target.value,
//                       })
//                     }
//                   />
//                 </div>
//                 <div>
//                   <label className='block text-xs font-bold uppercase text-gray-500'>
//                     DOI
//                   </label>
//                   <input
//                     type='text'
//                     className='w-full rounded border p-2'
//                     value={editingArticle.doi}
//                     onChange={(e) =>
//                       setEditingArticle({
//                         ...editingArticle,
//                         doi: e.target.value,
//                       })
//                     }
//                   />
//                 </div>
//                 <div>
//                   <label className='block text-xs font-bold uppercase text-gray-500'>
//                     License URL
//                   </label>
//                   <input
//                     type='text'
//                     className='w-full rounded border p-2'
//                     value={editingArticle.license_url}
//                     onChange={(e) =>
//                       setEditingArticle({
//                         ...editingArticle,
//                         license_url: e.target.value,
//                       })
//                     }
//                   />
//                 </div>
//                 <div>
//                   <label className='block text-xs font-bold uppercase text-gray-500'>
//                     Electronic ISSN
//                   </label>
//                   <input
//                     type='text'
//                     className='w-full rounded border p-2'
//                     value={editingArticle.electronic_issn}
//                     onChange={(e) =>
//                       setEditingArticle({
//                         ...editingArticle,
//                         electronic_issn: e.target.value,
//                       })
//                     }
//                   />
//                 </div>
//                 <div>
//                   <label className='block text-xs font-bold uppercase text-gray-500'>
//                     Print ISSN
//                   </label>
//                   <input
//                     type='text'
//                     className='w-full rounded border p-2'
//                     value={editingArticle.print_issn}
//                     onChange={(e) =>
//                       setEditingArticle({
//                         ...editingArticle,
//                         print_issn: e.target.value,
//                       })
//                     }
//                   />
//                 </div>
//                 <div>
//                   <label className='block text-xs font-bold uppercase text-gray-500'>
//                     Article Type
//                   </label>
//                   <input
//                     type='text'
//                     className='w-full rounded border p-2'
//                     value={editingArticle.article_type}
//                     onChange={(e) =>
//                       setEditingArticle({
//                         ...editingArticle,
//                         article_type: e.target.value,
//                       })
//                     }
//                   />
//                 </div>
//                 <div>
//                   <label className='block text-xs font-bold uppercase text-gray-500'>
//                     Publication Date
//                   </label>
//                   <input
//                     type='date'
//                     className='w-full rounded border p-2'
//                     value={editingArticle.publication_date}
//                     onChange={(e) =>
//                       setEditingArticle({
//                         ...editingArticle,
//                         publication_date: e.target.value,
//                       })
//                     }
//                   />
//                 </div>

//                 {/* PDF Upload */}
//                 <div className='border-t pt-4 md:col-span-2'>
//                   <label className='mb-2 block text-xs font-bold uppercase text-gray-500'>
//                     Article PDF
//                   </label>
//                   <input
//                     type='file'
//                     accept='application/pdf'
//                     className='w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100'
//                     onChange={(e) =>
//                       setNewPdf(e.target.files ? e.target.files[0] : null)
//                     }
//                   />
//                   {editingArticle.pdf && !newPdf && (
//                     <p className='mt-1 text-xs text-green-600'>
//                       Current PDF exists:{' '}
//                       {String(editingArticle.pdf).split('/').pop()}
//                     </p>
//                   )}
//                 </div>

//                 <div className='md:col-span-2'>
//                   <label className='block text-xs font-bold uppercase text-gray-500'>
//                     Abstract
//                   </label>
//                   <textarea
//                     className='h-24 w-full rounded border p-2'
//                     value={editingArticle.abstract || ''}
//                     onChange={(e) =>
//                       setEditingArticle({
//                         ...editingArticle,
//                         abstract: e.target.value,
//                       })
//                     }
//                   />
//                 </div>

//                 <div className='flex gap-3 border-t pt-4 md:col-span-2'>
//                   <button
//                     type='submit'
//                     className='flex-1 rounded-md bg-blue-600 py-2 font-semibold text-white transition-colors hover:bg-blue-700'
//                   >
//                     Save Changes
//                   </button>
//                   <button
//                     type='button'
//                     onClick={() => setIsModalOpen(false)}
//                     className='flex-1 rounded-md bg-gray-100 py-2 font-semibold text-gray-700 transition-colors hover:bg-gray-200'
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         <div className='grid gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
//           {loading ? (
//             <div className='col-span-full flex h-[80vh] items-center justify-center'>
//               <p>Loading...</p>
//             </div>
//           ) : (
//             articles.map((article) => (
//               <div
//                 key={article.id}
//                 className='relative rounded-lg border bg-white p-4 shadow transition-all hover:scale-[1.03]'
//               >
//                 <div className='absolute right-4 top-4 flex space-x-2'>
//                   <button
//                     onClick={() => {
//                       setEditingArticle(article)
//                       setIsModalOpen(true)
//                     }}
//                     className='flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
//                   >
//                     <FaPen />
//                   </button>
//                 </div>
//                 <h2 className='mb-2 mt-4 line-clamp-2 text-lg font-bold'>
//                   {article.title}
//                 </h2>
//                 <p className='text-sm text-gray-600'>
//                   Authors: {article.authors}
//                 </p>
//                 <p className='text-sm text-gray-600'>DOI: {article.doi}</p>
//                 {article.pdf && (
//                   <span className='mt-2 block text-xs font-medium text-blue-500'>
//                     PDF Attached
//                   </span>
//                 )}
//               </div>
//             ))
//           )}
//         </div>
//       </Layout.Body>
//     </Layout>
//   )
// }

// export default index

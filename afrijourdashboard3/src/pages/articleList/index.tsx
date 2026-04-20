// import { useEffect, useState } from 'react'
// import { Layout } from '@/components/custom/layout'
// import { BASE_URL } from '../../config'
// import { FaPen, FaTrash } from 'react-icons/fa'
// // import { MdNextPlan } from "react-icons/md";
// import './index.css'
// interface Article {
//   id: number
//   title: string
//   authors: string
//   publisher: string
//   journal_title: string
//   publication_date: string
//   doi: string
//   pdf: string | null
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

// interface AuthTokens {
//   access: string
//   refresh: string
// }

// const index = () => {
//   const [articles, setArticles] = useState<Article[]>([])
//   const [loading, setLoading] = useState(true)

//   const getAuthTokens = (): AuthTokens | null => {
//     const tokens = localStorage.getItem('authTokens')
//     return tokens ? JSON.parse(tokens) : null
//   }

//   const fetchArticles = async () => {
//     try {
//       const authTokens = getAuthTokens()
//       const token = authTokens?.access

//       const response = await fetch(
//         `${BASE_URL}/journal_api/api/user-articles/`,
//         {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       )

//       if (response.ok) {
//         const data = await response.json()
//         setArticles(data.results)
//       } else {
//         console.error('Failed to fetch articles', response.status)
//       }
//     } catch (error) {
//       console.error('Error fetching articles:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchArticles()
//   }, [])

//   const handleDelete = async (id: number) => {
//     const authTokens = getAuthTokens()
//     const token = authTokens?.access

//     if (!token) {
//       alert('You are not authenticated')
//       return
//     }

//     if (!window.confirm('Are you sure you want to delete this article?')) {
//       return
//     }

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
//       } else {
//         console.error('Failed to delete article', response.status)
//         alert('Failed to delete article')
//       }
//     } catch (error) {
//       console.error('Error deleting article:', error)
//       alert('Error deleting article')
//     }
//   }

//   return (
    

//     <Layout>
//       <Layout.Body>
       

//         <div className='grid gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
//           {loading ? (
//             <div className='col-span-full flex h-[80vh] w-full items-center justify-center'>
//               <p className='text-center text-lg text-gray-600'>
//                 Loading articles...
//               </p>
//             </div>
//           ) : articles.length === 0 ? (
            
//              <div className='col-span-full flex h-[80vh] w-full flex-col items-center justify-center'>
//               <div className='mb-4'>
//                 <svg
//                   viewBox='0 0 80 80'
//                   xmlns='http://www.w3.org/2000/svg'
//                   className='animate-disagree h-24 w-24'
//                   fill='none'
//                 >
//                   <path
//                     d='M40.475 70.95C57.3059 70.95 70.95 57.3059 70.95 40.475C70.95 23.6441 57.3059 10 40.475 10C23.6441 10 10 23.6441 10 40.475C10 57.3059 23.6441 70.95 40.475 70.95Z'
//                     fill='url(#paint0_radial)'
//                   />
//                   <path
//                     opacity='0.5'
//                     d='M40.475 70.95C57.3059 70.95 70.95 57.3059 70.95 40.475C70.95 23.6441 57.3059 10 40.475 10C23.6441 10 10 23.6441 10 40.475C10 57.3059 23.6441 70.95 40.475 70.95Z'
//                     fill='url(#paint1_radial)'
//                   />
//                   <path
//                     d='M40.4749 51.7579C49.419 51.7579 52.2822 60.6027 49.5466 59.2136C45.8896 57.3568 43.5791 57.1867 40.4749 57.1867C37.3707 57.1867 35.0603 57.3709 31.4033 59.2136C28.6676 60.6027 31.5309 51.7579 40.4749 51.7579Z'
//                     fill='#643800'
//                   />
//                   <path
//                     d='M28.852 42.2185C28.852 42.2185 34.3517 41.694 35.9534 37.8527C36.0526 37.6118 36.1093 37.3566 36.1235 37.1015C36.1377 36.5912 35.6416 36.0526 34.6494 36.5487C28.5544 39.6245 25.0391 38.5473 22.4027 37.796C21.3679 37.4984 20.4466 38.5898 20.9144 39.3269C23.2815 43.0548 28.852 42.2185 28.852 42.2185Z'
//                     fill='url(#paint2_radial)'
//                   />
//                   <path
//                     d='M21.6371 29.1355C21.552 30.3545 22.8136 31.2049 25.0815 31.375C27.0092 31.5168 31.304 30.7514 34.4933 27.2077C35.0744 26.5557 34.2807 26.1163 33.7279 26.5274C31.8285 27.9165 26.8958 29.5324 23.1821 28.8662C21.6654 28.5827 21.6371 29.1355 21.6371 29.1355Z'
//                     fill='url(#paint3_linear)'
//                   />
//                   <path
//                     d='M35.9535 36.6054C35.7267 36.3503 35.3014 36.2369 34.6636 36.5629C28.5686 39.6387 25.0533 38.5615 22.4169 37.8102C21.8641 37.6543 21.3538 37.8953 21.0562 38.2496C25.2943 41.0845 33.2887 39.9506 35.9535 36.6054Z'
//                     fill='url(#paint4_linear)'
//                   />
//                   <path
//                     d='M40.4749 53.3171C45.7478 53.3171 49.0787 56.2937 50.5387 58.76C50.6237 56.9741 47.3495 51.7579 40.4749 51.7579C33.6144 51.7579 30.326 56.9741 30.411 58.76C31.871 56.2937 35.202 53.3171 40.4749 53.3171Z'
//                     fill='url(#paint5_linear)'
//                   />
//                   <path
//                     d='M52.0838 42.2185C52.0838 42.2185 46.5841 41.694 44.9824 37.8527C44.8832 37.6118 44.8265 37.3566 44.8123 37.1015C44.7981 36.5912 45.2942 36.0526 46.2864 36.5487C52.3814 39.6245 55.8967 38.5473 58.5331 37.796C59.5679 37.4984 60.4892 38.5898 60.0215 39.3269C57.6685 43.0548 52.0838 42.2185 52.0838 42.2185Z'
//                     fill='url(#paint6_radial)'
//                   />
//                   <path
//                     d='M59.3129 29.1355C59.398 30.3545 58.1365 31.2049 55.8686 31.375C53.9408 31.5168 49.646 30.7514 46.4568 27.2077C45.8756 26.5557 46.6694 26.1163 47.2222 26.5274C49.1215 27.9165 54.0542 29.5324 57.7679 28.8662C59.2846 28.5827 59.3129 29.1355 59.3129 29.1355Z'
//                     fill='url(#paint7_linear)'
//                   />
//                   <path
//                     d='M44.9966 36.6054C45.2234 36.3503 45.6486 36.2369 46.2865 36.5629C52.3815 39.6387 55.8967 38.5615 58.5332 37.8102C59.086 37.6543 59.5962 37.8953 59.8939 38.2496C55.6558 41.0845 47.6472 39.9506 44.9966 36.6054Z'
//                     fill='url(#paint8_linear)'
//                   />
//                   <defs>
//                     <radialGradient
//                       id='paint0_radial'
//                       cx='0'
//                       cy='0'
//                       r='1'
//                       gradientUnits='userSpaceOnUse'
//                       gradientTransform='translate(34.479 28.1245) scale(36.7641)'
//                     >
//                       <stop stopColor='#FFDF30' />
//                       <stop offset='1' stopColor='#FFB82E' />
//                     </radialGradient>
//                     <radialGradient
//                       id='paint1_radial'
//                       cx='0'
//                       cy='0'
//                       r='1'
//                       gradientUnits='userSpaceOnUse'
//                       gradientTransform='translate(34.479 28.1245) scale(28.924)'
//                     >
//                       <stop stopColor='#FFE95F' />
//                       <stop offset='1' stopColor='#FFBB47' stopOpacity='0' />
//                     </radialGradient>
//                     <radialGradient
//                       id='paint2_radial'
//                       cx='0'
//                       cy='0'
//                       r='1'
//                       gradientUnits='userSpaceOnUse'
//                       gradientTransform='translate(28.5837 39.6331) rotate(-5.56162) scale(5.89043 2.61753)'
//                     >
//                       <stop offset='0.00132565' stopColor='#7A4400' />
//                       <stop offset='1' stopColor='#643800' />
//                     </radialGradient>
//                     <linearGradient
//                       id='paint3_linear'
//                       x1='27.6175'
//                       y1='33.233'
//                       x2='28.0462'
//                       y2='29.0953'
//                       gradientUnits='userSpaceOnUse'
//                     >
//                       <stop offset='0.00132565' stopColor='#3C2200' />
//                       <stop offset='1' stopColor='#7A4400' />
//                     </linearGradient>
//                     <linearGradient
//                       id='paint4_linear'
//                       x1='28.3979'
//                       y1='35.8144'
//                       x2='28.6879'
//                       y2='40.8502'
//                       gradientUnits='userSpaceOnUse'
//                     >
//                       <stop offset='0.00132565' stopColor='#3C2200' />
//                       <stop offset='1' stopColor='#512D00' />
//                     </linearGradient>
//                     <linearGradient
//                       id='paint5_linear'
//                       x1='40.4745'
//                       y1='49.4458'
//                       x2='40.4745'
//                       y2='56.4978'
//                       gradientUnits='userSpaceOnUse'
//                     >
//                       <stop offset='0.00132565' stopColor='#3C2200' />
//                       <stop offset='1' stopColor='#512D00' />
//                     </linearGradient>
//                     <radialGradient
//                       id='paint6_radial'
//                       cx='0'
//                       cy='0'
//                       r='1'
//                       gradientUnits='userSpaceOnUse'
//                       gradientTransform='translate(52.3638 39.6331) rotate(-174.438) scale(5.89043 2.61753)'
//                     >
//                       <stop offset='0.00132565' stopColor='#7A4400' />
//                       <stop offset='1' stopColor='#643800' />
//                     </radialGradient>
//                     <linearGradient
//                       id='paint7_linear'
//                       x1='53.3302'
//                       y1='33.234'
//                       x2='52.9015'
//                       y2='29.0963'
//                       gradientUnits='userSpaceOnUse'
//                     >
//                       <stop offset='0.00132565' stopColor='#3C2200' />
//                       <stop offset='1' stopColor='#7A4400' />
//                     </linearGradient>
//                     <linearGradient
//                       id='paint8_linear'
//                       x1='52.5496'
//                       y1='35.8133'
//                       x2='52.2596'
//                       y2='40.849'
//                       gradientUnits='userSpaceOnUse'
//                     >
//                       <stop offset='0.00132565' stopColor='#3C2200' />
//                       <stop offset='1' stopColor='#512D00' />
//                     </linearGradient>
//                   </defs>
//                 </svg>
//               </div>

//               <p className='text-center text-lg text-gray-600'>
//                 No Article Found.
//               </p>
//             </div>
//           ) : (
//             articles.map((article) => (
//               <div
//                 key={article.id}
//                 className='relative rounded-lg border bg-white p-4 shadow transition-all hover:scale-[1.03] hover:shadow-md'
//               >
//                 {/* Action buttons */}
//                 <div className='absolute right-4 top-4 flex space-x-2'>
//                   <button
//                     type='button'
//                     className='flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400'
//                     // onClick={() => handleEdit(article.id)}
//                   >
//                     <FaPen className='h-4 w-4 text-yellow-600' />
//                     {/* <MdNextPlan className='h-4 w-4 text-green-600'/> */}
//                   </button>
//                   <button
//                     type='button'
//                     onClick={() => handleDelete(article.id)}
//                     className='flex h-8 w-8 items-center justify-center rounded-full bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-400'
//                   >
//                     <FaTrash className='h-4 w-4 text-red-600' />
//                   </button>
//                 </div>

//                 <h2 className='mb-2 text-lg font-bold'>{article.title}</h2>
//                 <p className='text-sm text-gray-600'>
//                   Journal: {article.journal_title}
//                 </p>
//                 <p className='text-sm text-gray-600'>
//                   Authors: {article.authors}
//                 </p>
//                 <p className='text-sm text-gray-600'>
//                   Publisher: {article.publisher}
//                 </p>
//                 <p className='text-sm text-gray-600'>
//                   Date: {article.publication_date}
//                 </p>

//                 {article.pdf ? (
//                   <a
//                     href={article.pdf}
//                     target='_blank'
//                     rel='noopener noreferrer'
//                     className='mt-2 inline-block text-blue-600 hover:underline'
//                   >
//                     View PDF
//                   </a>
//                 ) : (
//                   <p className='mt-2 text-sm text-red-500'>No PDF uploaded</p>
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






import { useEffect, useState } from 'react'
import { Layout } from '@/components/custom/layout'
import { BASE_URL } from '../../config'
import { FaPen, FaTrash, FaTimes } from 'react-icons/fa'
import './index.css'

interface Article {
  id: number
  journal: number
  volume: number
  title: string
  authors: string
  publisher: string
  journal_title: string
  publication_date: string
  doi: string
  license_url: string
  electronic_issn: string
  print_issn: string
  article_type: string
  pdf: string | File | null
  volume_number: string
  volume_issue_number: string
  volume_year: string
  country: string
  language: string
  thematic_area: string
  reference_count: number
  citation_count: number
  abstract: string | null
}

const index = () => {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingArticle, setEditingArticle] = useState<Article | null>(null)
  const [newPdf, setNewPdf] = useState<File | null>(null)

  const getAuthTokens = () => {
    const tokens = localStorage.getItem('authTokens')
    return tokens ? JSON.parse(tokens) : null
  }

  const fetchArticles = async () => {
    try {
      const token = getAuthTokens()?.access
      const response = await fetch(`${BASE_URL}/journal_api/api/user-articles/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        const data = await response.json()
        setArticles(data.results)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingArticle) return

    const token = getAuthTokens()?.access

    const formData = new FormData()
    formData.append('journal', String(editingArticle.journal))
    formData.append('volume', String(editingArticle.volume))
    formData.append('title', editingArticle.title)
    formData.append('authors', editingArticle.authors)
    formData.append('publisher', editingArticle.publisher)
    formData.append('publication_date', editingArticle.publication_date)
    formData.append('doi', editingArticle.doi)
    formData.append('license_url', editingArticle.license_url || '')
    formData.append('electronic_issn', editingArticle.electronic_issn || '')
    formData.append('print_issn', editingArticle.print_issn || '')
    formData.append('article_type', editingArticle.article_type || '')
    formData.append('abstract', editingArticle.abstract || '')

    if (newPdf) {
      formData.append('pdf', newPdf)
    }

    try {
      const response = await fetch(
        `${BASE_URL}/journal_api/api/user-articles/${editingArticle.id}/`,
        {
          method: 'PUT',
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      )

      if (response.ok) {
        const updatedData = await response.json()
        setArticles((prev) =>
          prev.map((a) => (a.id === updatedData.id ? updatedData : a))
        )
        setIsModalOpen(false)
        setNewPdf(null)
        alert('Article updated successfully')
      } else {
        alert('Failed to update article')
      }
    } catch (error) {
      alert('Error updating article')
    }
  }

  const handleDelete = async (id: number) => {
    const token = getAuthTokens()?.access
    if (!token || !window.confirm('Are you sure you want to delete this article?')) return

    try {
      const response = await fetch(`${BASE_URL}/journal_api/api/user-articles/${id}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (response.ok || response.status === 204) {
        setArticles((prev) => prev.filter((article) => article.id !== id))
        alert('Article deleted successfully')
      }
    } catch (error) {
      alert('Error deleting article')
    }
  }

  return (
    <Layout>
      <Layout.Body>
        {/* Modal Logic remains the same as your provided code */}
        {isModalOpen && editingArticle && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm'>
            <div className='max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-6 shadow-2xl'>
              <div className='mb-4 flex items-center justify-between border-b pb-3'>
                <h3 className='text-xl font-bold'>Edit Article Details</h3>
                <button onClick={() => setIsModalOpen(false)}>
                  <FaTimes className='text-gray-400' />
                </button>
              </div>

              <form onSubmit={handleUpdate} className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div className='md:col-span-2'>
                  <label className='block text-xs font-bold uppercase text-gray-500'>Title</label>
                  <input type='text' className='w-full rounded border p-2' value={editingArticle.title} onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })} required />
                </div>
                <div>
                  <label className='block text-xs font-bold uppercase text-gray-500'>Authors</label>
                  <input type='text' className='w-full rounded border p-2' value={editingArticle.authors} onChange={(e) => setEditingArticle({ ...editingArticle, authors: e.target.value })} />
                </div>
                <div>
                  <label className='block text-xs font-bold uppercase text-gray-500'>DOI</label>
                  <input type='text' className='w-full rounded border p-2' value={editingArticle.doi} onChange={(e) => setEditingArticle({ ...editingArticle, doi: e.target.value })} />
                </div>
                <div>
                  <label className='block text-xs font-bold uppercase text-gray-500'>License URL</label>
                  <input type='text' className='w-full rounded border p-2' value={editingArticle.license_url} onChange={(e) => setEditingArticle({ ...editingArticle, license_url: e.target.value })} />
                </div>
                <div>
                  <label className='block text-xs font-bold uppercase text-gray-500'>Electronic ISSN</label>
                  <input type='text' className='w-full rounded border p-2' value={editingArticle.electronic_issn} onChange={(e) => setEditingArticle({ ...editingArticle, electronic_issn: e.target.value })} />
                </div>
                <div>
                  <label className='block text-xs font-bold uppercase text-gray-500'>Print ISSN</label>
                  <input type='text' className='w-full rounded border p-2' value={editingArticle.print_issn} onChange={(e) => setEditingArticle({ ...editingArticle, print_issn: e.target.value })} />
                </div>
                <div>
                  <label className='block text-xs font-bold uppercase text-gray-500'>Article Type</label>
                  <input type='text' className='w-full rounded border p-2' value={editingArticle.article_type} onChange={(e) => setEditingArticle({ ...editingArticle, article_type: e.target.value })} />
                </div>
                <div>
                  <label className='block text-xs font-bold uppercase text-gray-500'>Publication Date</label>
                  <input type='date' className='w-full rounded border p-2' value={editingArticle.publication_date} onChange={(e) => setEditingArticle({ ...editingArticle, publication_date: e.target.value })} />
                </div>

                <div className='border-t pt-4 md:col-span-2'>
                  <label className='mb-2 block text-xs font-bold uppercase text-gray-500'>Article PDF</label>
                  <input type='file' accept='application/pdf' className='w-full text-sm' onChange={(e) => setNewPdf(e.target.files ? e.target.files[0] : null)} />
                  {editingArticle.pdf && !newPdf && <p className='mt-1 text-xs text-green-600 font-medium'>Current File: {String(editingArticle.pdf).split('/').pop()}</p>}
                </div>

                <div className='md:col-span-2'>
                  <label className='block text-xs font-bold uppercase text-gray-500'>Abstract</label>
                  <textarea className='h-24 w-full rounded border p-2' value={editingArticle.abstract || ''} onChange={(e) => setEditingArticle({ ...editingArticle, abstract: e.target.value })} />
                </div>

                <div className='flex gap-3 border-t pt-4 md:col-span-2'>
                  <button type='submit' className='flex-1 rounded-md bg-blue-600 py-2 font-semibold text-white transition-colors hover:bg-blue-700'>Save Changes</button>
                  <button type='button' onClick={() => setIsModalOpen(false)} className='flex-1 rounded-md bg-gray-100 py-2 font-semibold text-gray-700 transition-colors hover:bg-gray-200'>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className='grid gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {loading ? (
            <div className='col-span-full flex h-[80vh] items-center justify-center'><p>Loading...</p></div>
          ) : articles.length === 0 ? (
             <div className='col-span-full flex h-[80vh] flex-col items-center justify-center'>
               <p className='text-center text-lg text-gray-600 font-medium'>No Articles Found.</p>
             </div>
          ) : (
            articles.map((article) => (
              <div key={article.id} className='relative rounded-lg border bg-white p-4 shadow transition-all hover:scale-[1.03]'>
                <div className='absolute right-4 top-4 flex space-x-2'>
                  <button onClick={() => { setEditingArticle(article); setIsModalOpen(true); }} className='flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-200 focus:outline-none'>
                    <FaPen className='h-3.5 w-3.5' />
                  </button>
                  <button onClick={() => handleDelete(article.id)} className='flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200 focus:outline-none'>
                    <FaTrash className='h-3.5 w-3.5' />
                  </button>
                </div>
                <h2 className='mb-2 mt-4 line-clamp-2 text-lg font-bold'>{article.title}</h2>
                <p className='text-sm text-gray-600'>Authors: {article.authors}</p>
                <p className='text-sm text-gray-600 italic'>Journal: {article.journal_title}</p>
                {article.pdf && <span className='mt-2 block text-xs font-semibold text-blue-500'>PDF Document Attached</span>}
              </div>
            ))
          )}
        </div>
      </Layout.Body>
    </Layout>
  )
}

export default index
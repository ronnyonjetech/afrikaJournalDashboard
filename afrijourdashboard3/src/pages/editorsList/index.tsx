// import React from 'react'

// const index = () => {
//   return (
//     <div>Editor's List</div>
//   )
// }

// export default index







// import React from 'react'
// import { Layout } from '@/components/custom/layout'
// import { TopNav } from '@/components/top-nav'
// import { UserNav } from '@/components/user-nav'
// const index = () => {
//      const topNav = [
//     {
//       title: 'Editors Queue',
//       href: '#',
//       isActive: true,
//     },
//   ]
//   return (
//     <Layout>
//           <Layout.Header>
//             <TopNav links={topNav} />
//             <div className="ml-auto flex items-center space-x-4">
//               <UserNav />
//             </div>
//           </Layout.Header>
    
//           {/* IMPORTANT: overflow fix for scrolling */}
//           <Layout.Body className="h-[calc(100vh-80px)] overflow-y-auto p-6">
//     <div>Editors List</div>
//     </Layout.Body>
//     </Layout>
//   )
// }

// export default index



import { useEffect, useState } from 'react'
import { Layout } from '@/components/custom/layout'
import { TopNav } from '@/components/top-nav'
import { UserNav } from '@/components/user-nav'
import { BASE_URL } from '@/config'
import { useNavigate } from 'react-router-dom'
interface Manuscript {
  id: number
  journal: number
  journal_title: string
  title: string
  abstract: string
  file: string
  authors: string
  author: string
  status: string
  created_at: string
}

const Index = () => {
  const [queue, setQueue] = useState<Manuscript[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const topNav = [
    { title: 'Editors Queue', href: '#', isActive: true },
  ]

  const getToken = () => {
    const tokens = localStorage.getItem('authTokens')
    return tokens ? JSON.parse(tokens).access : null
  }

  useEffect(() => {
    const fetchQueue = async () => {
      try {
        setLoading(true)
        const token = getToken()

        const res = await fetch(`${BASE_URL}/journal_api/api/editor/queue/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!res.ok) throw new Error('Failed to fetch queue')

        const data = await res.json()
        setQueue(data || [])
      } catch (err: any) {
        setError(err.message || 'Error loading queue')
      } finally {
        setLoading(false)
      }
    }

    fetchQueue()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-yellow-100 text-yellow-700'
      case 'under_review':
        return 'bg-blue-100 text-blue-700'
      case 'revision':
        return 'bg-orange-100 text-orange-700'
      case 'accepted':
        return 'bg-green-100 text-green-700'
      case 'rejected':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  return (
    <Layout>
      <Layout.Header>
        <TopNav links={topNav} />
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body className="h-[calc(100vh-80px)] overflow-y-auto p-6 bg-gray-50">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Editor Manuscript Queue</h1>
          <p className="text-sm text-gray-500">
            Review, assign reviewers, and manage submissions
          </p>
        </div>

        {/* STATES */}
        {loading && (
          <p className="text-gray-500">Loading manuscripts...</p>
        )}

        {error && (
          <p className="text-red-500">{error}</p>
        )}

        {/* GRID */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

            {queue.map((item) => (
              <div
                key={item.id}
                className="bg-white border rounded-xl shadow-sm hover:shadow-md transition p-5 flex flex-col"
              >

                {/* TOP */}
                <div className="flex justify-between items-start gap-3">
                  <h2 className="font-semibold text-lg leading-tight">
                    {item.title}
                  </h2>

                  <span
                    className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </div>

                <p className="text-xs text-gray-500 mt-1">
                  Journal: {item.journal_title}
                </p>

                <p className="text-xs text-gray-500">
                  Authors: {item.authors}
                </p>

                {/* ABSTRACT */}
                <p className="text-sm text-gray-600 mt-3 line-clamp-4">
                  {item.abstract}
                </p>

                {/* META */}
                <div className="mt-3 text-xs text-gray-400">
                  Submitted: {new Date(item.created_at).toLocaleString()}
                </div>

                {/* ACTIONS */}
                <div className="mt-auto pt-4 flex gap-2">

                  <a
                    href={`${BASE_URL}${item.file}`}
                    target="_blank"
                    className="flex-1 text-center text-sm bg-gray-100 hover:bg-gray-200 py-2 rounded"
                  >
                    View File
                  </a>

                  <button 
                  onClick={() => navigate(`/editors_manuscript/${item.id}`)}
                  className="flex-1 text-sm bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Open
                  </button>

                </div>
              </div>
            ))}

          </div>
        )}

        {!loading && queue.length === 0 && (
          <p className="text-gray-500">No manuscripts in queue</p>
        )}

      </Layout.Body>
    </Layout>
  )
}

export default Index
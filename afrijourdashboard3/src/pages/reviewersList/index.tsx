// import React from 'react'
// import { Layout } from '@/components/custom/layout'
// import { TopNav } from "@/components/top-nav";
// import { UserNav } from "@/components/user-nav";

// const index = () => {
//    const topNav = [
//   {
//     title: " ",
//     href: " ",
//     isActive: true,
//   },
// ];
//   return (
//     <Layout>
//         <Layout.Header>
//             <TopNav links={topNav} />
//               <div className="ml-auto flex items-center space-x-4">
//                 <UserNav />
//               </div>
//               </Layout.Header>
//     <Layout.Body>
//     <div>Reviewers List</div>
//     </Layout.Body>
//     </Layout>
//   )
// }

// export default index




import  { useEffect, useState } from 'react'
import { Layout } from '@/components/custom/layout'
import { TopNav } from '@/components/top-nav'
import { UserNav } from '@/components/user-nav'
import { BASE_URL } from '@/config'

interface ReviewItem {
  id: number
  journal: number
  journal_title: string
  volume: number | null
  title: string
  abstract: string
  file: string
  authors: string
  corresponding_author: number
  author: string
  status: string
  created_at: string
}

const Index = () => {
  const [items, setItems] = useState<ReviewItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const topNav = [
    {
      title: 'Reviewer Queue',
      href: '#',
      isActive: true,
    },
  ]

  useEffect(() => {
    const fetchQueue = async () => {
      try {
        const storedTokens = localStorage.getItem('authTokens')

        if (!storedTokens) {
          setError('You are not authenticated')
          setLoading(false)
          return
        }

        const { access } = JSON.parse(storedTokens)

        const response = await fetch(
          `${BASE_URL}/journal_api/api/reviewer/queue/`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${access}`,
              'Content-Type': 'application/json',
            },
          }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch reviewer queue')
        }

        const data = await response.json()

        setItems(data || [])
      } catch (err) {
        console.error(err)
        setError('Unable to load reviewer queue')
      } finally {
        setLoading(false)
      }
    }

    fetchQueue()
  }, [])

  return (
    <Layout>
      <Layout.Header>
        <TopNav links={topNav} />
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </Layout.Header>

      {/* IMPORTANT: overflow fix for scrolling */}
      <Layout.Body className="h-[calc(100vh-80px)] overflow-y-auto p-6">

        <h1 className="mb-6 text-2xl font-bold">
          Reviewer Queue
        </h1>

        {loading && <p>Loading review items...</p>}

        {error && (
          <p className="text-red-500 font-medium">
            {error}
          </p>
        )}

        {!loading && !error && items.length === 0 && (
          <p>No manuscripts in review queue.</p>
        )}

        <div className="grid grid-cols-1 gap-6 pb-10 lg:grid-cols-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border bg-white p-6 shadow-sm"
            >
              {/* Header */}
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  {item.title}
                </h2>

                <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                  {item.status}
                </span>
              </div>

              {/* Meta */}
              <p className="text-sm text-gray-600">
                <strong>Journal:</strong> {item.journal_title}
              </p>

              <p className="text-sm text-gray-600">
                <strong>Authors:</strong> {item.authors}
              </p>

              <p className="text-sm text-gray-600">
                <strong>Submitted By:</strong> {item.author}
              </p>

              <p className="text-sm text-gray-600">
                <strong>Date:</strong>{' '}
                {new Date(item.created_at).toLocaleString()}
              </p>

              {/* Abstract */}
              <div className="mt-3">
                <p className="mb-1 font-medium">Abstract</p>
                <p className="line-clamp-4 text-sm text-gray-700">
                  {item.abstract}
                </p>
              </div>

              {/* File */}
              <a
                href={item.file}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Open Manuscript
              </a>
            </div>
          ))}
        </div>
      </Layout.Body>
    </Layout>
  )
}

export default Index
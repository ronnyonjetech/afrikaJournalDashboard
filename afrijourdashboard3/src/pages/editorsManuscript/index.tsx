import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Layout } from '@/components/custom/layout'
import { TopNav } from '@/components/top-nav'
import { UserNav } from '@/components/user-nav'
import { BASE_URL } from '@/config'

interface Manuscript {
  id: number
  journal_title: string
  title: string
  abstract: string
  authors: string
  author: string
  file: string
  status: string
  created_at: string
}

interface Review {
  id: number
  reviewer_name: string
  recommendation: string
  comments: string
  score: number
  created_at: string
}

interface Assignment {
  id: number
  reviewer_name: string
  assigned_at: string
  is_completed: boolean
}

const Index = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [manuscript, setManuscript] = useState<Manuscript | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [assignments, setAssignments] = useState<Assignment[]>([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [reviewers, setReviewers] = useState<any[]>([])
  const [selectedReviewer, setSelectedReviewer] = useState<number | ''>('')
  const [assigning, setAssigning] = useState(false)

  const [decision, setDecision] = useState<'accept' | 'reject' | ''>('')
  const [deciding, setDeciding] = useState(false)

  const topNav = [
    {
      title: 'Editors Manuscript',
      href: '#',
      isActive: true,
    },
  ]

  const getToken = () => {
    const tokens = localStorage.getItem('authTokens')
    return tokens ? JSON.parse(tokens).access : null
  }

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true)

        const token = getToken()

        const res = await fetch(
          `${BASE_URL}/journal_api/api/editor/manuscript/${id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (!res.ok) {
          throw new Error('Failed to load manuscript')
        }

        const data = await res.json()

        setManuscript(data.manuscript)
        setReviews(data.reviews || [])
        setAssignments(data.assignments || [])
      } catch (err: any) {
        setError(err.message || 'Failed to load manuscript')
      } finally {
        setLoading(false)
      }
    }

    fetchDetails()
  }, [id])


  useEffect(() => {
  const fetchReviewers = async () => {
    try {
      const token = getToken()

      const res = await fetch(
        `${BASE_URL}/journal_api/journal_api/api/editor/reviewers/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await res.json()
      setReviewers(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Failed to fetch reviewers', err)
    }
  }

  fetchReviewers()
}, [])

const assignReviewer = async () => {
  if (!selectedReviewer || !id) return

  try {
    setAssigning(true)

    const token = getToken()

    const res = await fetch(
      `${BASE_URL}/journal_api/api/manuscripts/${id}/assign-reviewer/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          reviewer: selectedReviewer,
        }),
      }
    )

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.error || 'Failed to assign reviewer')
    }

    // refresh assignments instead of guessing structure
    setAssignments((prev) => [
      ...prev,
      {
        id: data.id || Date.now(),
        reviewer_name:
          reviewers.find((r) => r.id === selectedReviewer)?.name || '',
        assigned_at: new Date().toISOString(),
        is_completed: false,
      },
    ])

    setSelectedReviewer('')
  } catch (err: any) {
    alert(err.message)
  } finally {
    setAssigning(false)
  }
}


const makeDecision = async () => {
  if (!decision || !id) return

  try {
    setDeciding(true)

    const token = getToken()

    const res = await fetch(
      `${BASE_URL}/journal_api/api/editor/manuscript/${id}/decision/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          decision: decision,
        }),
      }
    )

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.error || 'Failed to submit decision')
    }

    // update manuscript status locally
    setManuscript((prev) =>
      prev ? { ...prev, status: decision } : prev
    )

    setDecision('')

    alert('Decision submitted successfully')
  } catch (err: any) {
    alert(err.message)
  } finally {
    setDeciding(false)
  }
}

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
        return 'bg-gray-100 text-gray-700'
    }
  }

  const formatRecommendation = (rec: string) => {
    switch (rec) {
      case 'accept':
        return 'Accept'

      case 'minor':
        return 'Minor Revision'

      case 'major':
        return 'Major Revision'

      case 'reject':
        return 'Reject'

      default:
        return rec
    }
  }

  return (
    <Layout>
      <Layout.Header>
        <TopNav links={topNav} />

        <div className='ml-auto flex items-center space-x-4'>
          <UserNav />
        </div>
      </Layout.Header>

      {/* ✅ FIXED LAYOUT CONTAINER */}
      <Layout.Body className='flex h-[calc(100vh-80px)] min-h-0 flex-col bg-gray-50'>
        {/* ✅ SCROLLABLE AREA */}
        <div className='flex-1 overflow-y-auto p-6'>
          {loading && <p className='text-gray-500'>Loading manuscript...</p>}

          {error && <p className='text-red-500'>{error}</p>}

          {!loading && manuscript && (
            <div className='space-y-6 pb-10'>
              {/* Manuscript */}
              <div className='rounded-xl border bg-white p-6 shadow-sm'>
                <div className='flex flex-wrap items-start justify-between gap-4'>
                  <div>
                    <h1 className='text-2xl font-semibold'>
                      {manuscript.title}
                    </h1>

                    <p className='mt-1 text-sm text-gray-500'>
                      Journal: {manuscript.journal_title}
                    </p>

                    <p className='text-sm text-gray-500'>
                      Authors: {manuscript.authors}
                    </p>

                    <p className='text-sm text-gray-500'>
                      Submitted by: {manuscript.author}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(
                      manuscript.status
                    )}`}
                  >
                    {manuscript.status}
                  </span>
                </div>

                <div className='mt-6'>
                  <h2 className='mb-2 font-medium'>Abstract</h2>

                  <div className='rounded-lg bg-gray-50 p-4 text-sm leading-relaxed text-gray-700'>
                    {manuscript.abstract}
                  </div>
                </div>

                <div className='mt-6 flex flex-wrap gap-3'>
                  <a
                    href={`${BASE_URL}${manuscript.file}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='rounded bg-gray-100 px-4 py-2 hover:bg-gray-200'
                  >
                    View Manuscript
                  </a>

                  <button
                    onClick={() => navigate('/editors_list')}
                    className='rounded border px-4 py-2 hover:bg-gray-50'
                  >
                    Back to Queue
                  </button>
                </div>
              </div>

              {/* Reviewer Assignments */}
              <div className='rounded-xl border bg-white p-6 shadow-sm'>
                <h2 className='mb-4 text-lg font-semibold'>
                  Reviewer Assignments
                </h2>

                {assignments.length === 0 ? (
                  <p className='text-gray-500'>No reviewers assigned.</p>
                ) : (
                  <div className='space-y-3'>
                    {assignments.map((assignment) => (
                      <div
                        key={assignment.id}
                        className='flex items-center justify-between rounded-lg border p-4'
                      >
                        <div>
                          <p className='font-medium'>
                            {assignment.reviewer_name}
                          </p>

                          <p className='text-xs text-gray-500'>
                            Assigned:{' '}
                            {new Date(assignment.assigned_at).toLocaleString()}
                          </p>
                        </div>

                        <span
                          className={`rounded-full px-2 py-1 text-xs ${
                            assignment.is_completed
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {assignment.is_completed ? 'Completed' : 'Pending'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Reviews */}
              <div className='rounded-xl border bg-white p-6 shadow-sm'>
                <h2 className='mb-4 text-lg font-semibold'>Reviewer Reports</h2>

                {reviews.length === 0 ? (
                  <p className='text-gray-500'>No reviews submitted yet.</p>
                ) : (
                  <div className='space-y-4'>
                    {reviews.map((review) => (
                      <div key={review.id} className='rounded-lg border p-5'>
                        <div className='flex flex-wrap justify-between gap-3'>
                          <div>
                            <p className='font-medium'>
                              {review.reviewer_name}
                            </p>

                            <p className='text-xs text-gray-500'>
                              {new Date(review.created_at).toLocaleString()}
                            </p>
                          </div>

                          <div className='text-right'>
                            <p className='font-semibold'>
                              {formatRecommendation(review.recommendation)}
                            </p>

                            <p className='text-sm text-gray-500'>
                              Score: {review.score}/10
                            </p>
                          </div>
                        </div>

                        <div className='mt-4 rounded-lg bg-gray-50 p-4 text-sm text-gray-700'>
                          {review.comments}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Editorial Actions */}
              {/* <div className='rounded-xl border bg-white p-6 shadow-sm'>
                <h2 className='mb-4 text-lg font-semibold'>
                  Editorial Actions
                </h2>

                <div className='flex flex-wrap gap-3'>
                  <button className='rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'>
                    Assign Reviewer
                  </button>

                  <button className='rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700'>
                    Make Decision
                  </button>
                </div>
              </div> */}
              {/* Editorial Actions */}
<div className='rounded-xl border bg-white p-6 shadow-sm'>
  <h2 className='mb-4 text-lg font-semibold'>Editorial Actions</h2>

  <div className='flex flex-wrap items-center gap-3'>

    {/* Reviewer Dropdown */}
    <select
      className='rounded border px-3 py-2'
      value={selectedReviewer}
      onChange={(e) =>
        setSelectedReviewer(e.target.value ? Number(e.target.value) : '')
      }
    >
      <option value=''>Select Reviewer</option>

      {reviewers.map((r) => (
        <option key={r.id} value={r.id}>
          {r.name} ({r.email})
        </option>
      ))}
    </select>

    {/* Assign Button */}
    <button
      onClick={assignReviewer}
      disabled={!selectedReviewer || assigning}
      className='rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50'
    >
      {assigning ? 'Assigning...' : 'Assign Reviewer'}
    </button>

    {/* Decision Button (unchanged) */}
    {/* <button className='rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700'>
      Make Decision
    </button> */}
    <div className='flex flex-wrap items-center gap-3'>
  <select
    className='rounded border px-3 py-2'
    value={decision}
    onChange={(e) =>
      setDecision(e.target.value as 'accept' | 'reject' | '')
    }
  >
    <option value=''>Select Decision</option>
    <option value='accept'>Accept</option>
    <option value='reject'>Reject</option>
  </select>

  <button
    onClick={makeDecision}
    disabled={!decision || deciding}
    className='rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50'
  >
    {deciding ? 'Submitting...' : 'Submit Decision'}
  </button>
</div>
  </div>
</div>

            </div>
          )}
        </div>
      </Layout.Body>
    </Layout>
  )
}

export default Index

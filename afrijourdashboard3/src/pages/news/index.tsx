// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Search } from 'lucide-react';
// import { Input } from '@/components/ui/input';
// // import { ScrollArea } from '@/components/ui/scroll-area';
// import { Layout } from '@/components/custom/layout';
// import { NewsCard } from '@/components/custom/NewsCard';
// import { CategoryTabs } from '@/components/custom/CategoryTabs';

// type Article = {
//   id: number;
//   title: string;
//   summary: string;
//   date: string;
//   link: string;
//   category: string;
//   imageUrl?: string;
// };

// const mockArticles: Article[] = [
//   {
//     id: 7,
//     title: "Early-career funding ",
//     summary: "Awards are set at a maximum of between £20,000 and £30,000. Funding must be used in the direct delivery of the workshops, and can cover travel and related expenses, subsistence costs, clerical assistance and consumables, childcare support (including for participants), networking, meeting and/or conference costs.",
//     date: "2025.01.29-2025.09.10",
//     link: "https://www.demography.ox.ac.uk/early-career-funding",
//     category: "funding",
//     imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80"
//   },
//   {
//     id: 6,
//     title: "Apply for Microgrants from the Foundation Emanuele Antola ",
//     summary: "Micro-donations (USD 1000 to USD 2000)",
//     date: "No deadline",
//     link: "https://emanueleantola.org/",
//     category: "funding",
//     imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80"
//   },
//   {
//     id: 5,
//     title: "Agri-SME Evidence Fund",
//     summary: "The Agri-SME Evidence Fund offers grants of up to £100,000 for research on agriculture, finance, and SMEs Priority countries are Kenya, Rwanda, Tanzania, Uganda, and Zambia (and other LMICs in some cases)",
//     date: "2025-02-2",
//     link: "https://www.efdinitiative.org/events/agri-sme-evidence-fund-call-proposals",
//     category: "funding",
//     imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80"
//   },
//   {
//     id: 4,
//     title: "The GEF Small Grants Programme, Nigeria is calling for Strategic Proposals",
//     summary: "Funding: $150,000",
//     date: "2025-01-25",
//     link: "https://sgpnigeria.org/",
//     category: "funding",
//     imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80"
//   },
//   {
//     id: 1,
//     title: "Funding Opportunity: Play Learn Thrive (Canada)",
//     summary: "We are offering Proof of Concept (POC) funding of up to $250,000 CAD for a maximum of 24 months",
//     date: "2025-04-24",
//     link: "https://www.grandchallenges.ca/funding-opportunities/",
//     category: "funding",
//     imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80"
//   },
//   {
//     id: 3,
//     title: "New Research Funding Initiative for African Scholars",
//     summary: "A major foundation announces $10M in research grants specifically for African journal publications and academic research projects.",
//     date: "2024-01-15",
//     link: "#",
//     category: "funding",
//     imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80"
//   },
//   {
//     id: 2,
//     title: "Digital Transformation in African Academic Publishing",
//     summary: "How African journals are embracing digital technologies to increase global visibility and impact.",
//     date: "2024-01-14",
//     link: "#",
//     category: "blog",
//     imageUrl: "https://images.unsplash.com/photo-1553484771-371a605b060b?auto=format&fit=crop&q=80"
//   }
// ];

// export default function NewsUpdates() {
//   const [articles, setArticles] = useState<Article[]>(mockArticles);
//   const [activeCategory, setActiveCategory] = useState('all');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchArticles = async () => {
//       setIsLoading(true);
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       setArticles(mockArticles);
//       setIsLoading(false);
//     };

//     fetchArticles();
//   }, []);

//   const filteredArticles = articles.filter(article => {
//     const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
//     const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          article.summary.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   return (
//     <Layout>
//       <Layout.Header className="relative min-h-[25vh] flex items-center justify-center">
//         <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 -z-10 bg-[#AFEEEE]" />
//         <div className="max-w-7xl mx-auto px-4 py-12 space-y-6 bg-gray-{shade}">
//           <div className="max-w-4xl mx-auto text-center space-y-4">
//             <motion.h1
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="text-5xl font-bold bg-gradient-to-r from-[#412c9e] to-[#080808] font-bold bg-clip-text text-transparent leading-tight"
//             >
//               Afrika Journals News & Updates
//             </motion.h1>
//             <motion.p
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 }}
//               className="text-black font-bold text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
//             >
//               Stay informed with the latest developments in African academic publishing,
//               research opportunities, and scholarly achievements.
//             </motion.p>
//           </div>
//         </div>
//       </Layout.Header>

//       <Layout.Body className="max-w-7xl mx-auto px-4 py-12">
//         <div className="space-y-12">
//           <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
//             <CategoryTabs
//               activeCategory={activeCategory}
//               onCategoryChange={setActiveCategory}
//             />
//             <div className="relative w-full md:w-72">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
//               <Input
//                 placeholder="Search updates..."
//                 className="pl-10"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//           </div>

//             {/* <AnimatePresence mode="wait">
//               {isLoading ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                   {[1, 2, 3].map((n) => (
//                     <div key={n} className="h-[400px] bg-muted animate-pulse rounded-lg" />
//                   ))}
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                   {filteredArticles.map((article, index) => (
//                     <NewsCard key={article.id} article={article} index={index} />
//                   ))}
//                 </div>
//               )}
//             </AnimatePresence> */}

//         </div>
//       </Layout.Body>
//     </Layout>
//   );
// }

import { useState, useEffect } from 'react'
// import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Layout } from '@/components/custom/layout'
import { CategoryTabs } from '@/components/custom/CategoryTabs'
import CarouselComponent from './CarouselComponent'
type Article = {
  id: number
  title: string
  summary: string
  date: string
  link: string
  category: string
  imageUrl?: string
}

type Funding = {
  id: number
  funding_title: string
  organization: string
  theme: string
  country: string
  description: string
  elligibility: string
  currency: string
  grant_amount: string
  status: string
  application_link: string
  deadline: string
  is_active: boolean
  grant_amount_lower:number
  grant_amount_upper:number


}

const mockArticles: Article[] = [
  {
    id: 2,
    title: 'Digital Transformation in African Academic Publishing',
    summary:
      'How African journals are embracing digital technologies to increase global visibility and impact.',
    date: '2024-01-14',
    link: '#',
    category: 'blog',
    imageUrl:
      'https://images.unsplash.com/photo-1553484771-371a605b060b?auto=format&fit=crop&q=80',
  },
]

export default function NewsUpdates() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [fundingData, setFundingData] = useState<Funding[]>([])
  const [articles] = useState<Article[]>(mockArticles)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchFundingData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('https://backend.afrikajournals.org/funding/api/')
        const data = await response.json()
        setFundingData(data)
      } catch (error) {
        console.error('Error fetching funding data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (activeCategory === 'funding' || activeCategory === 'all') {
      fetchFundingData()
    }
  }, [activeCategory])

  const formatAmount = (amount: number | null) => {
    if (!amount) return null
    if (amount >= 1_000_000_000) return `${amount / 1_000_000_000}B` // Billions
    if (amount >= 1_000_000) return `${amount / 1_000_000}M` // Millions
    if (amount >= 1_000) return `${amount / 1_000}K` // Thousands
    return amount.toString()
  }

  return (
    <Layout>
      <Layout.Header className='relative flex min-h-[25vh] items-center justify-center'>
        <CarouselComponent />
      </Layout.Header>

      <Layout.Body className='mx-auto max-w-7xl px-4 py-32'>
        <div className='space-y-12'>
          <div className='flex flex-col items-center justify-between gap-6 md:flex-row'>
            <CategoryTabs
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
            <div className='relative w-full md:w-72'>
              <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground' />
              <Input
                placeholder='Search updates...'
                className='pl-10'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Articles Section */}
          {activeCategory !== 'funding' && (
            <div className='mt-6 w-full'>
              {isLoading ? (
                <div className='h-[400px] animate-pulse rounded-lg bg-muted'></div>
              ) : (
                articles
                  .filter(
                    (article) =>
                      activeCategory === 'all' ||
                      article.category === activeCategory
                  )
                  .map((article) => (
                    <div
                      key={article.id}
                      className='mb-4 w-full rounded-lg border p-4 shadow-md'
                    >
                      <h3 className='text-lg font-bold'>{article.title}</h3>
                      <p className='text-sm'>{article.summary}</p>
                      <p className='mt-2 text-sm'>{article.date}</p>
                      <a
                        href={article.link}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='mt-4 inline-block text-blue-500'
                      >
                        Read more
                      </a>
                    </div>
                  ))
              )}
            </div>
          )}

          {/* Funding Section */}
          {activeCategory === 'all' || activeCategory === 'funding' ? (
            <div className='mt-12 space-y-6'>
              {isLoading ? (
                <div className='h-[400px] animate-pulse rounded-lg bg-muted'></div>
              ) : (
                fundingData.map((funding) => (
                  <div
                    key={funding.id}
                    className='w-full rounded-lg border bg-white p-6 shadow-md'
                  >
                    <h3 className='text-lg font-bold'>
                      {funding.funding_title}
                    </h3>
                    <p className='text-sm'>
                      Organization: {funding.organization}
                    </p>
                    <p className='text-sm italic'>Theme: {funding.theme}</p>
                    <p className='text-sm'>Country: {funding.country}</p>
                    <p className='mt-4 text-sm leading-relaxed text-gray-700'>
                      <span className='font-semibold text-gray-900'>
                        Description:
                      </span>{' '}
                      {funding.description}
                    </p>

                    {/* <p className="text-sm font-semibold">Eligibility: {funding.elligibility}</p> */}
                    {/* Eligibility Section as Bulleted List */}
                    <p className='text-sm font-semibold'>Eligibility</p>
                    <ul className='list-disc pl-5'>
                      {funding.elligibility
                        .split('.') // Split the eligibility string by periods
                        .filter((eligibility) => eligibility.trim() !== '') // Filter out empty strings
                        .map((eligibility, index) => (
                          <li key={index} className='text-sm'>
                            {eligibility.trim()}
                          </li> // Trim spaces if any
                        ))}
                    </ul>

                    {/* <p className='text-sm font-bold'>
                      Grant Amount: {funding.currency} {funding.grant_amount}
                    </p> */}
                    {(funding.grant_amount_lower ||
                      funding.grant_amount_upper) && (
                      <p className='text-sm font-bold'>
                        Grant Amount: {funding.currency}
                        {funding.grant_amount_lower &&
                        funding.grant_amount_upper
                          ? `${formatAmount(funding.grant_amount_lower)} - ${formatAmount(funding.grant_amount_upper)}`
                          : formatAmount(
                              funding.grant_amount_lower ||
                                funding.grant_amount_upper
                            )}
                      </p>
                    )}

                    <p className='text-sm text-gray-500'>
                      Deadline: {funding.deadline}
                    </p>
                    <p className='text-sm text-gray-500'>
                      Status: {funding.status}
                    </p>

                    <a
                      href={funding.application_link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='mt-4 inline-block text-blue-500'
                    >
                      Apply Now
                    </a>
                  </div>
                ))
              )}
            </div>
          ) : null}
        </div>
      </Layout.Body>
    </Layout>
  )
}

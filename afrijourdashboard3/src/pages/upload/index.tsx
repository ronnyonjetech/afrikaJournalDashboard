// import { Layout } from '@/components/custom/layout'
// import { TopNav } from '@/components/top-nav'
// import { UserNav } from '@/components/user-nav'
// import { useState, useEffect, useContext } from 'react'
// import AuthContext from '../../AuthContext'
// import { LanguagePiechart } from './components/langauage-piechart'
// import { RadialChart } from './components/radial-chart'
// import Journals from './components/journal'
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card'
// // import  StepperWithContent  from './components/StepperWithContent'

// interface Platform {
//   id: string // or number, depending on your API response
//   platform: string
// }
// interface Country {
//   id: string // or number, based on your API response
//   country: string
// }
// interface Language {
//   id: string // or number, based on your API response
//   language: string
// }
// interface ThematicArea {
//   id: string // or number, based on your API response
//   thematic_area: string
// }

// export default function Upload() {
//   const authContext = useContext(AuthContext)
//   if (!authContext) {
//     return <div> Loading...</div>
//   }
//   // Now it's safe to access loginUser method from authContext
//   const { user,updateTokensIfNeeded } = authContext
//   // console.log(user)

//   useEffect(() => {
//     (async () => {
//         await updateTokensIfNeeded();
//         // setLoading(false);
//         console.log("Checking please wait");
//     })();
//     }, []);

//   useEffect(() => {
//     const authTokens = localStorage.getItem('authTokens')

//     // If authTokens are missing, redirect to the sign-in page
//     if (!authTokens) {
//       window.location.href = '/sign-in' // Using React Router's navigation
//     }
//   }) // Run this effect when the component mounts

//   const [formData, setFormData] = useState({
//     journal_title: '',
//     platform: '',
//     country: '',
//     publishers_name: '',
//     language: '',
//     thematic_area: '',
//     issn_number: '',
//     link: '',
//     aim_identifier: false,
//     medline: false,
//     summary: '',
//     user: user.user_id,
//   })
//   const initialFormData = {
//     journal_title: '',
//     platform: '',
//     country: '',
//     publishers_name: '',
//     language: '',
//     thematic_area: '',
//     issn_number: '',
//     link: '',
//     aim_identifier: false,
//     medline: false,
//     summary: '',
//     user: '',
//     // Add other fields here...
//   }
//   const [isFormVisible, setIsFormVisible] = useState(false) // State to control form visibility
//   //const [platforms, setPlatforms] = useState([]);  // To store platform options
//   const [platforms, setPlatforms] = useState<Platform[]>([])
//   //const [countries, setCountries] = useState([]);  // To store country options
//   const [countries, setCountries] = useState<Country[]>([])
//   // const [languages,setLanguages]=useState([])
//   const [languages, setLanguages] = useState<Language[]>([])

//   // const[thematic,setThematic]=useState([])
//   const [thematic, setThematic] = useState<ThematicArea[]>([])
//   // Empty dependency array ensures it runs once when the component mounts
//   //http://127.0.0.1:8000/journal_api/api/languages/
//   //https://aphrc.site/journal_api/api/languages/
//   useEffect(() => {
//     fetch('https://aphrc.site/journal_api/api/languages/')
//       .then((response) => response.json())
//       .then((data) => setLanguages(data))
//       .catch((error) => console.error('Error fetching languages:', error))
//   }, [])

//   // useEffect(() => {
//   //   console.log('Updated languages:', languages) // This will log whenever languages state updates
//   // }, [languages])

//   useEffect(() => {
//     fetch('https://aphrc.site/journal_api/api/country/')
//       .then((response) => response.json())
//       .then((data) => setCountries(data))
//       .catch((error) => console.error('Error fetching languages:', error))
//   }, [])

//   // useEffect(() => {
//   //   console.log('Updated countries:', countries) // This will log whenever countries state updates
//   // }, [countries])

//   useEffect(() => {
//     fetch('https://aphrc.site/journal_api/api/platform/')
//       .then((response) => response.json())
//       .then((data) => setPlatforms(data))
//       .catch((error) => console.error('Error fetching languages:', error))
//   }, [])

//   // useEffect(() => {
//   //   console.log('Updated platforms:', platforms) // This will log whenever countries state updates
//   // }, [platforms])

//   useEffect(() => {
//     fetch('https://aphrc.site/journal_api/api/thematic/')
//       .then((response) => response.json())
//       .then((data) => setThematic(data))
//       .catch((error) => console.error('Error fetching languages:', error))
//   }, [])

//   // useEffect(() => {
//   //   console.log('Updated Thematic:', thematic) // This will log whenever countries state updates
//   // }, [thematic])

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value, type } = e.target

//     // Check if the input is a checkbox
//     const newValue =
//       type === 'checkbox' ? (e.target as HTMLInputElement).checked : value

//     setFormData({
//       ...formData,
//       [name]: newValue,
//     })
//   }
//   //https://aphrc.site/
//   //http://127.0.0.1:8000/journal_api/api/journalcreate/
//   //https://aphrc.site/journal_api/api/journalcreate/
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     try {
//       const response = await fetch(
//         'https://aphrc.site/journal_api/api/journalcreate/',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(formData),
//         }
//       )

//       if (response.ok) {
//         const result = await response.json()
//         console.log('Success:', result)
//         alert('Journal Added Successfully')
//         setFormData(initialFormData)
//       } else {
//         console.error('Error:', response.statusText)
//         alert('OOps! An Error occured try again later')
//       }
//     } catch (error) {
//       console.error('Error submitting form:', error)
//     }
//   }

//   const toggleFormVisibility = () => {
//     setIsFormVisible(!isFormVisible) // Toggle the form visibility
//   }

//   return (
//     <Layout>
//       {/* ===== Top Heading ===== */}
//       <Layout.Header>
//         <TopNav links={topNav} />
//         <div className='ml-auto flex items-center space-x-4'>
//           {/* <Search />
//           <ThemeSwitch /> */}
//           <UserNav />
//         </div>
//       </Layout.Header>

//       {/* ===== Main ===== */}
//       <Layout.Body>
//         <h1>Welcome {user.user_name},</h1>
//         <br></br>
//         <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
//           <Card className='col-span-1 lg:col-span-2'>
//             <CardHeader>
//               <CardTitle>Journal Language Distribution</CardTitle>
//               <CardDescription>Languages.</CardDescription>
//             </CardHeader>
//             <CardContent>

//               <LanguagePiechart />
//             </CardContent>
//           </Card>
//           <Card className='col-span-1 lg:col-span-2'>
//             <CardHeader>
//               <CardTitle>Journals Disciplines Distribution</CardTitle>
//               <CardDescription>Disciplines/Thematic Area.</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <RadialChart />
//             </CardContent>
//           </Card>
//         </div>
//         <br></br>
//         <br></br>
//         {/* <p className='cursor-pointer font-medium text-blue-500 hover:text-blue-700'>
//           Submit Journals To Reviewers
//         </p> */}
//         <p className='cursor-pointer font-medium text-blue-500 hover:text-blue-700'>
//           List of added Journals
//         </p>
//         <Journals />

//         <p
//           onClick={toggleFormVisibility}
//           className='cursor-pointer font-medium text-blue-500 hover:text-blue-700'
//         >
//           Add Journal Manually
//         </p>

//         {isFormVisible && (

//         <form
//         onSubmit={handleSubmit}
//         className="p-10 bg-white shadow-xl rounded-lg mt-8 mx-auto"
//         style={{
//          // maxWidth: "3600px",
//           padding: "40px",
//           marginRight: "20px",
//           width: "100%",
//           height: "auto"
//         }}
//       >
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

//           <div className="col-span-3 lg:col-span-1 space-y-4">
//             <label className="block text-gray-700 font-medium">Journal Title</label>
//             <input
//               type="text"
//               name="journal_title"
//               value={formData.journal_title}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
//             />
//           </div>

//           <div className="col-span-3 lg:col-span-1 space-y-4">
//             <label className="block text-gray-700 font-medium">Platform</label>
//             <select
//               name="platform"
//               value={formData.platform}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
//             >
//               <option value="">Select a Platform</option>
//               {platforms.map((platform) => (
//                 <option key={platform.id} value={platform.id}>
//                   {platform.platform}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="col-span-3 lg:col-span-1 space-y-4">
//             <label className="block text-gray-700 font-medium">Countries</label>
//             <select
//               name="country"
//               value={formData.country}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
//             >
//               <option value="">Select a Country</option>
//               {countries.map((country) => (
//                 <option key={country.id} value={country.id}>
//                   {country.country}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="col-span-3 lg:col-span-1 space-y-4">
//             <label className="block text-gray-700 font-medium">Publisher's Name</label>
//             <input
//               type="text"
//               name="publishers_name"
//               value={formData.publishers_name}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
//             />
//           </div>

//           <div className="col-span-3 lg:col-span-1 space-y-4">
//             <label className="block text-gray-700 font-medium">Language</label>
//             <select
//               name="language"
//               value={formData.language}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
//             >
//               <option value="">Select a Language</option>
//               {languages.map((lang) => (
//                 <option key={lang.id} value={lang.id}>
//                   {lang.language}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="col-span-3 lg:col-span-1 space-y-4">
//             <label className="block text-gray-700 font-medium">Thematic Area</label>
//             <select
//               name="thematic_area"
//               value={formData.thematic_area}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
//             >
//               <option value="">Select a thematic area</option>
//               {thematic.map((themat) => (
//                 <option key={themat.id} value={themat.id}>
//                   {themat.thematic_area}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="col-span-3 lg:col-span-1 space-y-4">
//             <label className="block text-gray-700 font-medium">ISSN Number</label>
//             <input
//               type="text"
//               name="issn_number"
//               value={formData.issn_number}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
//             />
//           </div>

//           <div className="col-span-3 lg:col-span-2 space-y-4">
//             <label className="block text-gray-700 font-medium">Link</label>
//             <textarea
//               name="link"
//               value={formData.link}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
//             />
//           </div>

//           <div className="col-span-3 lg:col-span-1 space-y-4">
//             <div className="flex items-center">
//               <label className="block text-gray-700 font-medium">African Index Medicus Identifier</label>
//               <input
//                 type="checkbox"
//                 name="aim_identifier"
//                 checked={formData.aim_identifier}
//                 onChange={handleChange}
//                 className="ml-2 leading-tight"
//               />
//             </div>
//           </div>

//           <div className="col-span-3 lg:col-span-1 space-y-4">
//             <div className="flex items-center">
//               <label className="block text-gray-700 font-medium">Medicine and Health Journal</label>
//               <input
//                 type="checkbox"
//                 name="medline"
//                 checked={formData.medline}
//                 onChange={handleChange}
//                 className="ml-2 leading-tight"
//               />
//             </div>
//           </div>

//           <div className="col-span-3 space-y-4">
//             <label className="block text-gray-700 font-medium">Abtract</label>
//             <textarea
//               name="summary"
//               value={formData.summary}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
//             />
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           style={{ width: "auto", margin: "20px auto", display: "block" }}
//         >
//           Add Journal
//         </button>

//       </form>

//       )}

//         {/* <h1>Multistep Form</h1> */}
//         {/* <StepperWithContent /> */}
//       </Layout.Body>
//     </Layout>
//   )
// }

// const topNav = [
//   {
//     title: 'Back ',
//     href: '/',
//     isActive: true,
//   },
// ]

import { useState, useEffect, useContext } from 'react'
import { Layout } from '@/components/custom/layout'
import { TopNav } from '@/components/top-nav'
import { UserNav } from '@/components/user-nav'
import Journals from './components/journal'
import { LanguagePiechart } from './components/langauage-piechart'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookOpen, Newspaper, Award } from 'lucide-react'
import { RadialChart } from './components/radial-chart'
import AuthContext from '../../AuthContext'

interface Platform {
  id: string // or number, depending on your API response
  platform: string
}
interface Country {
  id: string // or number, based on your API response
  country: string
}
interface Language {
  id: string // or number, based on your API response
  language: string
}
interface ThematicArea {
  id: string // or number, based on your API response
  thematic_area: string
}

export default function Upload() {
  const [activeTab, setActiveTab] = useState<string>('overview')
  const authContext = useContext(AuthContext)
  if (!authContext) {
    return <div> Loading...</div>
  }
  // Now it's safe to access loginUser method from authContext
  const { user, updateTokensIfNeeded } = authContext
  console.log(user)
  // useEffect(() => {
  //   ;(async () => {
  //     await updateTokensIfNeeded()
  //     // setLoading(false);
  //     console.log('Checking please wait')
  //   })()
  // }, [])

  useEffect(() => {
    const checkTokens = async () => {
      try {
        console.log('Checking please wait');
        await updateTokensIfNeeded();
        // Uncomment if loading state is needed
        // setLoading(false);
      } catch (error) {
        console.error('Error updating tokens:', error);
      }
    };
  
    checkTokens();
  }, []);
  

  useEffect(() => {
    const authTokens = localStorage.getItem('authTokens')

    // If authTokens are missing, redirect to the sign-in page
    if (!authTokens) {
      window.location.href = '/sign-in' // Using React Router's navigation
    }
  }) // Run this effect when the component mounts

  const [formData, setFormData] = useState({
    journal_title: '',
    platform: '',
    country: '',
    publishers_name: '',
    language: '',
    thematic_area: '',
    issn_number: '',
    link: '',
    aim_identifier: false,
    medline: false,
    summary: '',
    user: user.user_id,
  })
  const initialFormData = {
    journal_title: '',
    platform: '',
    country: '',
    publishers_name: '',
    language: '',
    thematic_area: '',
    issn_number: '',
    link: '',
    aim_identifier: false,
    medline: false,
    summary: '',
    user: '',
    // Add other fields here...
  }
  // const [isFormVisible, setIsFormVisible] = useState(false) // State to control form visibility
  //const [platforms, setPlatforms] = useState([]);  // To store platform options
  const [platforms, setPlatforms] = useState<Platform[]>([])
  //const [countries, setCountries] = useState([]);  // To store country options
  const [countries, setCountries] = useState<Country[]>([])
  // const [languages,setLanguages]=useState([])
  const [languages, setLanguages] = useState<Language[]>([])

  // const[thematic,setThematic]=useState([])
  const [thematic, setThematic] = useState<ThematicArea[]>([])
  // Empty dependency array ensures it runs once when the component mounts
  //http://127.0.0.1:8000/journal_api/api/languages/
  //https://aphrc.site/journal_api/api/languages/
  useEffect(() => {
    fetch('https://aphrc.site/journal_api/api/languages/')
      .then((response) => response.json())
      .then((data) => setLanguages(data))
      .catch((error) => console.error('Error fetching languages:', error))
  }, [])

  // useEffect(() => {
  //   console.log('Updated languages:', languages) // This will log whenever languages state updates
  // }, [languages])

  useEffect(() => {
    fetch('https://aphrc.site/journal_api/api/country/')
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error('Error fetching languages:', error))
  }, [])

  // useEffect(() => {
  //   console.log('Updated countries:', countries) // This will log whenever countries state updates
  // }, [countries])

  useEffect(() => {
    fetch('https://aphrc.site/journal_api/api/platform/')
      .then((response) => response.json())
      .then((data) => setPlatforms(data))
      .catch((error) => console.error('Error fetching languages:', error))
  }, [])

  // useEffect(() => {
  //   console.log('Updated platforms:', platforms) // This will log whenever countries state updates
  // }, [platforms])

  useEffect(() => {
    fetch('https://aphrc.site/journal_api/api/thematic/')
      .then((response) => response.json())
      .then((data) => setThematic(data))
      .catch((error) => console.error('Error fetching languages:', error))
  }, [])

  // useEffect(() => {
  //   console.log('Updated Thematic:', thematic) // This will log whenever countries state updates
  // }, [thematic])

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target

    // Check if the input is a checkbox
    const newValue =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : value

    setFormData({
      ...formData,
      [name]: newValue,
    })
  }
  //https://aphrc.site/
  //http://127.0.0.1:8000/journal_api/api/journalcreate/
  //https://aphrc.site/journal_api/api/journalcreate/
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(
        'https://aphrc.site/journal_api/api/journalcreate/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      )

      if (response.ok) {
        const result = await response.json()
        console.log('Success:', result)
        alert('Journal Added Successfully')
        setFormData(initialFormData)
      } else {
        console.error('Error:', response.statusText)
        alert('OOps! An Error occured try again later')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  // const toggleFormVisibility = () => {
  //   setIsFormVisible(!isFormVisible) // Toggle the form visibility
  // }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div>
            <h1 className='text-2xl font-bold'>Welcome {user.user_name},</h1>
            <p className='mt-2 text-gray-600'>
              Explore your journal statistics and general information here.
            </p>
            <div className='mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2'>
              <Card>
                <CardHeader>
                  <CardTitle>Journal Language Distribution</CardTitle>
                  <CardDescription>Languages</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* <div>Language Pie Chart Here</div> */}
                  <LanguagePiechart />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Journals Disciplines Distribution</CardTitle>
                  <CardDescription>Disciplines/Thematic Area</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* <div>Radial Chart Here</div> */}
                  <RadialChart />
                </CardContent>
              </Card>
            </div>
          </div>
        )
      case 'addJournal':
        return (
          <div>
            <h2 className='mb-4 text-xl font-semibold'>Add a New Journal</h2>
            {/* <form className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Journal Title
                </label>
                <input
                  type="text"
                  name="journal_title"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Add Journal
              </button>
            </form> */}

            <form
              onSubmit={handleSubmit}
              className='mx-auto mt-8 rounded-lg bg-white p-10 shadow-xl'
              style={{
                // maxWidth: "3600px",
                padding: '40px',
                marginRight: '20px',
                width: '100%',
                height: 'auto',
              }}
            >
              <div className='grid grid-cols-1 gap-12 lg:grid-cols-3'>
                <div className='col-span-3 space-y-4 lg:col-span-1'>
                  <label className='block font-medium text-gray-700'>
                    Journal Title
                  </label>
                  <input
                    type='text'
                    name='journal_title'
                    value={formData.journal_title}
                    onChange={handleChange}
                    required
                    className='w-full rounded-md border px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300'
                  />
                </div>

                <div className='col-span-3 space-y-4 lg:col-span-1'>
                  <label className='block font-medium text-gray-700'>
                    Platform
                  </label>
                  <select
                    name='platform'
                    value={formData.platform}
                    onChange={handleChange}
                    className='w-full rounded-md border px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300'
                  >
                    <option value=''>Select a Platform</option>
                    {platforms.map((platform) => (
                      <option key={platform.id} value={platform.id}>
                        {platform.platform}
                      </option>
                    ))}
                  </select>
                </div>

                <div className='col-span-3 space-y-4 lg:col-span-1'>
                  <label className='block font-medium text-gray-700'>
                    Countries
                  </label>
                  <select
                    name='country'
                    value={formData.country}
                    onChange={handleChange}
                    className='w-full rounded-md border px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300'
                  >
                    <option value=''>Select a Country</option>
                    {countries.map((country) => (
                      <option key={country.id} value={country.id}>
                        {country.country}
                      </option>
                    ))}
                  </select>
                </div>

                <div className='col-span-3 space-y-4 lg:col-span-1'>
                  <label className='block font-medium text-gray-700'>
                    Publisher's Name
                  </label>
                  <input
                    type='text'
                    name='publishers_name'
                    value={formData.publishers_name}
                    onChange={handleChange}
                    className='w-full rounded-md border px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300'
                  />
                </div>

                <div className='col-span-3 space-y-4 lg:col-span-1'>
                  <label className='block font-medium text-gray-700'>
                    Language
                  </label>
                  <select
                    name='language'
                    value={formData.language}
                    onChange={handleChange}
                    className='w-full rounded-md border px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300'
                  >
                    <option value=''>Select a Language</option>
                    {languages.map((lang) => (
                      <option key={lang.id} value={lang.id}>
                        {lang.language}
                      </option>
                    ))}
                  </select>
                </div>

                <div className='col-span-3 space-y-4 lg:col-span-1'>
                  <label className='block font-medium text-gray-700'>
                    Thematic Area
                  </label>
                  <select
                    name='thematic_area'
                    value={formData.thematic_area}
                    onChange={handleChange}
                    className='w-full rounded-md border px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300'
                  >
                    <option value=''>Select a thematic area</option>
                    {thematic.map((themat) => (
                      <option key={themat.id} value={themat.id}>
                        {themat.thematic_area}
                      </option>
                    ))}
                  </select>
                </div>

                <div className='col-span-3 space-y-4 lg:col-span-1'>
                  <label className='block font-medium text-gray-700'>
                    ISSN Number
                  </label>
                  <input
                    type='text'
                    name='issn_number'
                    value={formData.issn_number}
                    onChange={handleChange}
                    className='w-full rounded-md border px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300'
                  />
                </div>

                <div className='col-span-3 space-y-4 lg:col-span-2'>
                  <label className='block font-medium text-gray-700'>
                    Link
                  </label>
                  <textarea
                    name='link'
                    value={formData.link}
                    onChange={handleChange}
                    className='w-full rounded-md border px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300'
                  />
                </div>

                <div className='col-span-3 space-y-4 lg:col-span-1'>
                  <div className='flex items-center'>
                    <label className='block font-medium text-gray-700'>
                      African Index Medicus Identifier
                    </label>
                    <input
                      type='checkbox'
                      name='aim_identifier'
                      checked={formData.aim_identifier}
                      onChange={handleChange}
                      className='ml-2 leading-tight'
                    />
                  </div>
                </div>

                <div className='col-span-3 space-y-4 lg:col-span-1'>
                  <div className='flex items-center'>
                    <label className='block font-medium text-gray-700'>
                      Medicine and Health Journal
                    </label>
                    <input
                      type='checkbox'
                      name='medline'
                      checked={formData.medline}
                      onChange={handleChange}
                      className='ml-2 leading-tight'
                    />
                  </div>
                </div>

                <div className='col-span-3 space-y-4'>
                  <label className='block font-medium text-gray-700'>
                    Abtract
                  </label>
                  <textarea
                    name='summary'
                    value={formData.summary}
                    onChange={handleChange}
                    className='w-full rounded-md border px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300'
                  />
                </div>
              </div>

              <button
                type='submit'
                className='rounded-md bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400'
                style={{ width: 'auto', margin: '20px auto', display: 'block' }}
              >
                Add Journal
              </button>
            </form>
          </div>
        )
      case 'journalList':
        return (
          <div>
            <h2 className='mb-4 text-xl font-semibold'>
              List of Added Journals
            </h2>
            <Journals />
          </div>
        )
      default:
        return null
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

      <Layout.Body>
        <div className='mt-4'>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className='mx-auto w-full max-w-3xl'
          >
            <TabsList className='grid h-14 w-full grid-cols-3'>
              <TabsTrigger value='overview' className='flex items-center gap-2'>
                <Newspaper className='h-4 w-4' />
                Overview
              </TabsTrigger>
              <TabsTrigger
                value='addJournal'
                className='flex items-center gap-2'
              >
                <BookOpen className='h-4 w-4' />
                Add Journal
              </TabsTrigger>
              <TabsTrigger
                value='journalList'
                className='flex items-center gap-2'
              >
                <Award className='h-4 w-4' />
                Your Journal List
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className='mt-6'>{renderTabContent()}</div>
        </div>
      </Layout.Body>
    </Layout>
  )
}

const topNav = [
  {
    title: 'Back',
    href: '/',
    isActive: true,
  },
]

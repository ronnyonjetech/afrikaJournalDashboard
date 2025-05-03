// import React, { useState } from 'react'

// type Volume = {
//   id: number
//   volume_number: number
//   issue_number: number
//   year: number
// }

// type ArticleData = {
//   title: string
//   authors: string
//   keywords: string
//   publication_date: string
//   pdf: File | null
//   doi: string
//   url: string
//   license_url: string
//   subjects: string
//   article_type: string
//   issn: string
//   publisher: string
//   publisher_location: string
//   volume: number // Volume is kept
//   abstract: string
// }

// interface ArticleFormProps {
//   journalId: number | null
//   volumes: Volume[]
// }

// const ArticleForm: React.FC<ArticleFormProps> = ({ journalId, volumes }) => {
//   const [articleData, setArticleData] = useState<ArticleData>({
//     title: '',
//     authors: '',
//     keywords: '',
//     publication_date: '',
//     pdf: null,
//     doi: '',
//     url: '',
//     license_url: '',
//     subjects: '',
//     article_type: '',
//     issn: '',
//     publisher: '',
//     publisher_location: 'Nairobi',
//     volume: volumes.length > 0 ? volumes[0].id : 1, // Initialize with volume ID
//     abstract: '',
//   })

//   const [error, setError] = useState<string>('')
//   const [loading, setLoading] = useState(false)

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target
//     setArticleData((prevData) => ({ ...prevData, [name]: value }))
//   }

//   const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const { name, value } = e.target
//     setArticleData((prevData) => ({ ...prevData, [name]: parseInt(value) }))
//   }

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files ? e.target.files[0] : null
//     setArticleData((prevData) => ({ ...prevData, pdf: file }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)

//     const requiredFields = [
//       'title',
//       'authors',
//       'keywords',
//       'publication_date',
//       'doi',
//       'url',
//       'article_type',
//       'license_url',
//       'subjects',
//       'issn',
//       'publisher',
//       'abstract',
//       'publisher_location',
//       'volume',
//     ]

//     for (let field of requiredFields) {
//       if (!articleData[field as keyof ArticleData]) {
//         setError(`${field.replace('_', ' ')} is required.`)
//         setLoading(false)
//         return
//       }
//     }

//     try {
//       const formData = new FormData()

//       // Add the journalId to the formData
//       if (journalId) {
//         formData.append('journal', journalId.toString())
//       }

//       // Object.keys(articleData).forEach((key) => {
//       //   const value = articleData[key as keyof ArticleData];
//       //   if (key !== "pdf") {
//       //     formData.append(key, typeof value === "number" ? value.toString() : value);
//       //   }
//       // });

//       Object.entries(articleData).forEach(([key, value]) => {
//         if (key !== 'pdf' && value !== null && value !== undefined) {
//           formData.append(key, String(value))
//         }
//       })

//       // Append the 'pdf' field conditionally (only if it's not null)
//       if (articleData.pdf) {
//         formData.append('pdf', articleData.pdf as Blob | string)
//       }
//       // http://192.168.100.8:5173/
//       // https://backend.afrikajournals.org/journal_api/api/article/
//       console.log('form data', formData)
//       const response = await fetch(
//         'http://192.168.100.8:8000/journal_api/api/article/',
//         {
//           method: 'POST',
//           body: formData,
//         }
//       )

//       if (response.ok) {
//         alert('Article submitted successfully!')
//         setArticleData({
//           title: '',
//           authors: '',
//           keywords: '',
//           publication_date: '',
//           pdf: null,
//           doi: '',
//           url: '',
//           license_url: '',
//           subjects: '',
//           article_type: '',
//           issn: '',
//           publisher: '',
//           publisher_location: 'Nairobi',
//           volume: 1, // Reset to default volume
//           abstract: '',
//         })
//       } else {
//         setError('Failed to submit article.')
//       }
//     } catch {
//       setError('An error occurred while submitting the article.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className='mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-lg'>
//       <h2 className='mb-4 text-center text-2xl font-semibold text-blue-600'>
//         Create Article
//       </h2>
//       <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-4'>
//         {[
//           'title',
//           'authors',
//           'keywords',
//           'publication_date',
//           'doi',
//           'url',
//           'license_url',
//           'subjects',
//           'article_type',
//           'issn',
//           'publisher',
//         ].map((field) => (
//           <div key={field}>
//             <label className='block text-sm font-medium text-gray-700'>
//               {field.replace('_', ' ')}
//             </label>
//             {/* <input
//               type={field === 'publication_date' ? 'date' : 'text'}
//               name={field}
//               value={articleData[field as keyof ArticleData]}
//               onChange={handleInputChange}
//               required
//               className='mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500'
//             /> */}
//             <input
//               type={field === 'publication_date' ? 'date' : 'text'}
//               name={field}
//               value={
//                 articleData[field as keyof ArticleData] != null && // Ensure it's not null or undefined
//                 typeof articleData[field as keyof ArticleData] !== 'object' // Prevent File objects
//                   ? String(articleData[field as keyof ArticleData]) // Convert to string safely
//                   : ''
//               }
//               onChange={handleInputChange}
//               required
//               className='mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500'
//             />
//           </div>
//         ))}
//         {/* Publisher Location */}
//         <div className='col-span-2'>
//           <label className='block text-sm font-medium text-gray-700'>
//             Publisher Location
//           </label>
//           <input
//             type='text'
//             name='publisher_location'
//             value={articleData.publisher_location}
//             onChange={handleInputChange}
//             required
//             className='mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500'
//           />
//         </div>

//         {/* Volume dropdown */}
//         <div className='col-span-2'>
//           <label className='block text-sm font-medium text-gray-700'>
//             Volume
//           </label>
//           <select
//             name='volume'
//             value={articleData.volume}
//             onChange={handleSelectChange}
//             required
//             className='mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500'
//           >
//             {volumes.map((volume) => (
//               <option key={volume.id} value={volume.id}>
//                 Volume {volume.volume_number}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Abstract */}
//         <div className='col-span-2'>
//           <label className='block text-sm font-medium text-gray-700'>
//             Abstract
//           </label>
//           <textarea
//             name='abstract'
//             value={articleData.abstract}
//             onChange={handleInputChange}
//             required
//             className='mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500'
//             rows={4}
//           />
//         </div>

//         {/* Upload PDF */}
//         <div className='col-span-2'>
//           <label className='block text-sm font-medium text-gray-700'>
//             Upload PDF
//           </label>
//           <input
//             type='file'
//             className='mt-1 w-full p-2'
//             accept='.pdf'
//             onChange={handleFileChange}
//           />
//         </div>

//         <div className='col-span-2 text-center'>
//           <button
//             type='submit'
//             disabled={loading}
//             className='rounded-md bg-blue-600 px-6 py-2 text-white'
//           >
//             {loading ? 'Submitting...' : 'Submit Article'}
//           </button>
//         </div>
//         {error && (
//           <p className='col-span-2 text-center text-red-500'>{error}</p>
//         )}
//       </form>
//     </div>
//   )
// }

// export default ArticleForm

import { BASE_URL } from '../../config';
import React, { useState } from 'react'

interface Volume {
  id: number;
  journal_id: number;
  volume_number: number;
}

interface ArticleFormProps {
  journalId: number | null; 
  volumes: Volume[];
}

const ArticleForm: React.FC<ArticleFormProps> = ({ journalId, volumes }) => {
  const [articleData, setArticleData] = useState({
    title: '', authors: '', keywords: '', publication_date: '', pdf: null,
    doi: '', url: '', license_url: '', subjects: '', article_type: '',
    issn: '', publisher: '', publisher_location: 'Nairobi',
    volume: volumes.length > 0 ? volumes[0].id : 1, abstract: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  console.log("volumes",volumes)
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setArticleData(prev => ({
      ...prev, [name]: type === 'file' ? files[0] || null : value
    }));
    console.log(`Updated ${name}:`, type === 'file' ? files[0] : value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const requiredFields = ['title', 'authors', 'keywords', 'publication_date',
      'doi', 'url', 'article_type', 'license_url', 'subjects', 'issn',
      'publisher', 'abstract', 'publisher_location', 'volume'];

    if (requiredFields.some(field => !articleData[field])) {
      const missingField = requiredFields.find(field => !articleData[field]);
      setError(`${missingField.replace('_', ' ')} is required.`);
      console.log(`Missing field: ${missingField}`);
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      if (journalId) formData.append('journal', journalId.toString());
      Object.entries(articleData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, key === 'pdf' ? value : String(value));
        }
      });
      console.log('Submitting FormData:', [...formData.entries()]);
      
      const response = await fetch(`${BASE_URL}/journal_api/api/article/`, {
        method: 'POST', body: formData
      });

      if (response.ok) {
        alert('Article submitted successfully!');
        setArticleData({
          title: '', authors: '', keywords: '', publication_date: '', pdf: null,
          doi: '', url: '', license_url: '', subjects: '', article_type: '',
          issn: '', publisher: '', publisher_location: 'Nairobi', volume: 1, abstract: ''
        });
      } else {
        setError('Failed to submit article.');
        console.log('Submission failed:', response.status, await response.text());
      }
    } catch (error) {
      setError('An error occurred while submitting the article.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-lg'>
      <h2 className='mb-4 text-center text-2xl font-semibold text-blue-600'>Create Article</h2>
      <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-4'>
        {[ 'title', 'authors', 'keywords', 'publication_date', 'doi', 'url',
           'license_url', 'subjects', 'article_type', 'issn', 'publisher']
          .map(field => (
            <div key={field}>
              <label className='block text-sm font-medium text-gray-700'>{field.replace('_', ' ')}</label>
              <input type={field === 'publication_date' ? 'date' : 'text'} name={field} value={articleData[field]}
                onChange={handleChange} required className='mt-1 w-full rounded-md border border-gray-300 p-2' />
            </div>
          ))}
        <div className='col-span-2'>
          <label className='block text-sm font-medium text-gray-700'>Publisher Location</label>
          <input type='text' name='publisher_location' value={articleData.publisher_location}
            onChange={handleChange} required className='mt-1 w-full rounded-md border border-gray-300 p-2' />
        </div>
        <div className='col-span-2'>
          <label className='block text-sm font-medium text-gray-700'>Volume</label>
          <select name='volume' value={articleData.volume} onChange={handleChange} required
            className='mt-1 w-full rounded-md border border-gray-300 p-2'>
            {volumes.map(vol => <option key={vol.id} value={vol.id}>Volume {vol.volume_number}</option>)}
          </select>
        </div>
        <div className='col-span-2'>
          <label className='block text-sm font-medium text-gray-700'>Abstract</label>
          <textarea name='abstract' value={articleData.abstract} onChange={handleChange} required
            className='mt-1 w-full rounded-md border border-gray-300 p-2' rows={4} />
        </div>
        <div className='col-span-2'>
          <label className='block text-sm font-medium text-gray-700'>Upload PDF</label>
          <input type='file' className='mt-1 w-full p-2' accept='.pdf' onChange={handleChange} />
        </div>
        <div className='col-span-2 text-center'>
          <button type='submit' disabled={loading} className='rounded-md bg-blue-600 px-6 py-2 text-white'>
            {loading ? 'Submitting...' : 'Submit Article'}
          </button>
        </div>
        {error && <p className='col-span-2 text-center text-red-500'>{error}</p>}
      </form>
    </div>
  );
};

export default ArticleForm;

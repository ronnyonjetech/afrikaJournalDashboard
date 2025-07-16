

// import { BASE_URL } from '../../config';
// import React, { useState } from 'react'

// interface Volume {
//   id: number;
//   journal_id: number;
//   volume_number: number;
// }

// interface ArticleFormProps {
//   journalId: number | null; 
//   volumes: Volume[];
// }

// const ArticleForm: React.FC<ArticleFormProps> = ({ journalId, volumes }) => {
//   const [articleData, setArticleData] = useState({
//     title: '', authors: '', keywords: '', publication_date: '', pdf: null,
//     doi: '', url: '', license_url: '', subjects: '', article_type: '',
//     issn: '', publisher: '', publisher_location: 'Nairobi',
//     volume: volumes.length > 0 ? volumes[0].id : 1, abstract: ''
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   console.log("volumes",volumes)
//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
//     setArticleData(prev => ({
//       ...prev, [name]: type === 'file' ? files[0] || null : value
//     }));
//     console.log(`Updated ${name}:`, type === 'file' ? files[0] : value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const requiredFields = ['title', 'authors', 'keywords', 'publication_date',
//       'doi', 'url', 'article_type', 'license_url', 'subjects', 'issn',
//       'publisher', 'abstract', 'publisher_location', 'volume'];

//     if (requiredFields.some(field => !articleData[field])) {
//       const missingField = requiredFields.find(field => !articleData[field]);
//       setError(`${missingField.replace('_', ' ')} is required.`);
//       console.log(`Missing field: ${missingField}`);
//       setLoading(false);
//       return;
//     }

//     try {
//       const formData = new FormData();
//       if (journalId) formData.append('journal', journalId.toString());
//       Object.entries(articleData).forEach(([key, value]) => {
//         if (value !== null && value !== undefined) {
//           formData.append(key, key === 'pdf' ? value : String(value));
//         }
//       });
//       console.log('Submitting FormData:', [...formData.entries()]);
      
//       const response = await fetch(`${BASE_URL}/journal_api/api/article/`, {
//         method: 'POST', body: formData
//       });

//       if (response.ok) {
//         alert('Article submitted successfully!');
//         setArticleData({
//           title: '', authors: '', keywords: '', publication_date: '', pdf: null,
//           doi: '', url: '', license_url: '', subjects: '', article_type: '',
//           issn: '', publisher: '', publisher_location: 'Nairobi', volume: 1, abstract: ''
//         });
//       } else {
//         setError('Failed to submit article.');
//         console.log('Submission failed:', response.status, await response.text());
//       }
//     } catch (error) {
//       setError('An error occurred while submitting the article.');
//       console.error('Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className='mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-lg'>
//       <h2 className='mb-4 text-center text-2xl font-semibold text-blue-600'>Create Article</h2>
//       <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-4'>
//         {[ 'title', 'authors', 'keywords', 'publication_date', 'doi', 'url',
//            'license_url', 'subjects', 'article_type', 'issn', 'publisher']
//           .map(field => (
//             <div key={field}>
//               <label className='block text-sm font-medium text-gray-700'>{field.replace('_', ' ')}</label>
//               <input type={field === 'publication_date' ? 'date' : 'text'} name={field} value={articleData[field]}
//                 onChange={handleChange} required className='mt-1 w-full rounded-md border border-gray-300 p-2' />
//             </div>
//           ))}
//         <div className='col-span-2'>
//           <label className='block text-sm font-medium text-gray-700'>Publisher Location</label>
//           <input type='text' name='publisher_location' value={articleData.publisher_location}
//             onChange={handleChange} required className='mt-1 w-full rounded-md border border-gray-300 p-2' />
//         </div>
//         <div className='col-span-2'>
//           <label className='block text-sm font-medium text-gray-700'>Volume</label>
//           <select name='volume' value={articleData.volume} onChange={handleChange} required
//             className='mt-1 w-full rounded-md border border-gray-300 p-2'>
//             {volumes.map(vol => <option key={vol.id} value={vol.id}>Volume {vol.volume_number}</option>)}
//           </select>
//         </div>
//         <div className='col-span-2'>
//           <label className='block text-sm font-medium text-gray-700'>Abstract</label>
//           <textarea name='abstract' value={articleData.abstract} onChange={handleChange} required
//             className='mt-1 w-full rounded-md border border-gray-300 p-2' rows={4} />
//         </div>
//         <div className='col-span-2'>
//           <label className='block text-sm font-medium text-gray-700'>Upload PDF</label>
//           <input type='file' className='mt-1 w-full p-2' accept='.pdf' onChange={handleChange} />
//         </div>
//         <div className='col-span-2 text-center'>
//           <button type='submit' disabled={loading} className='rounded-md bg-blue-600 px-6 py-2 text-white'>
//             {loading ? 'Submitting...' : 'Submit Article'}
//           </button>
//         </div>
//         {error && <p className='col-span-2 text-center text-red-500'>{error}</p>}
//       </form>
//     </div>
//   );
// };

// export default ArticleForm;

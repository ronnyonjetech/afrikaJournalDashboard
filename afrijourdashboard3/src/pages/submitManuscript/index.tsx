// import React, { useEffect, useState } from 'react';

// const SubmitManuscripts = () => {
//   const [title, setTitle] = useState('');
//   const [abstract, setAbstract] = useState('');
//   const [authors, setAuthors] = useState('');
//   const [journal, setJournal] = useState('');
//   const [file, setFile] = useState<File | null>(null);

//   const [journals, setJournals] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   const getToken = () => {
//     const tokens = localStorage.getItem('authTokens');
//     return tokens ? JSON.parse(tokens).access : null;
//   };

//   useEffect(() => {
//     const fetchJournals = async () => {
//       const token = getToken();

//       const res = await fetch(
//         'http://localhost:8000/journal_api/api/journals/',
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       const data = await res.json();
//       setJournals(data);
//     };

//     fetchJournals();
//   }, []);

//   const handleSubmit = async () => {
//     if (!title || !abstract || !authors || !journal || !file) {
//       setMessage('Please fill all fields and attach a file.');
//       return;
//     }

//     setLoading(true);
//     setMessage('');

//     const token = getToken();

//     try {
//       const formData = new FormData();
//       formData.append('title', title);
//       formData.append('abstract', abstract);
//       formData.append('authors', authors);
//       formData.append('journal', journal);
//       formData.append('file', file);

//       const res = await fetch(
//         'http://localhost:8000/journal_api/api/manuscripts/submit/',
//         {
//           method: 'POST',
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           body: formData,
//         }
//       );

//       const data = await res.json();

//       if (res.ok) {
//         setMessage('✅ Manuscript submitted successfully');

//         setTitle('');
//         setAbstract('');
//         setAuthors('');
//         setJournal('');
//         setFile(null);
//       } else {
//         setMessage(data?.error || 'Submission failed');
//       }
//     } catch {
//       setMessage('Network error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen p-6 bg-gray-50 overflow-y-auto">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-2xl font-bold mb-6">
//           Submit Manuscript
//         </h1>

//         {/* GRID LAYOUT */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//           {/* LEFT COLUMN */}
//           <div className="space-y-5">

//             <div>
//               <label className="font-medium">Title</label>
//               <input
//                 className="w-full border p-2 rounded mt-1"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 placeholder="Enter manuscript title"
//               />
//             </div>

//             <div>
//               <label className="font-medium">Authors</label>
//               <input
//                 className="w-full border p-2 rounded mt-1"
//                 value={authors}
//                 onChange={(e) => setAuthors(e.target.value)}
//                 placeholder="e.g. John Doe, Jane Smith"
//               />
//             </div>

//             <div>
//               <label className="font-medium">Select Journal</label>
//               <select
//                 className="w-full border p-2 rounded mt-1"
//                 value={journal}
//                 onChange={(e) => setJournal(e.target.value)}
//               >
//                 <option value="">-- Select Journal --</option>
//                 {journals.map((j) => (
//                   <option key={j.id} value={j.id}>
//                     {j.title}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="font-medium">Upload File</label>
//               <input
//                 type="file"
//                 className="w-full border p-2 rounded mt-1"
//                 onChange={(e) =>
//                   setFile(e.target.files ? e.target.files[0] : null)
//                 }
//               />

//               {file && (
//                 <p className="text-sm text-gray-600 mt-1">
//                   Selected: {file.name}
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* RIGHT COLUMN */}
//           <div className="space-y-5">

//             <div>
//               <label className="font-medium">Abstract</label>
//               <textarea
//                 className="w-full border p-2 rounded h-72 mt-1"
//                 value={abstract}
//                 onChange={(e) => setAbstract(e.target.value)}
//                 placeholder="Write your abstract..."
//               />
//             </div>

//             {/* SUBMIT AREA */}
//             <div className="pt-2">
//               <button
//                 onClick={handleSubmit}
//                 disabled={loading}
//                 className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
//               >
//                 {loading ? 'Submitting...' : 'Submit Manuscript'}
//               </button>

//               {message && (
//                 <p className="mt-3 text-sm font-medium">
//                   {message}
//                 </p>
//               )}
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubmitManuscripts;







import { Layout } from '@/components/custom/layout'
import { TopNav } from "@/components/top-nav";
import { UserNav } from "@/components/user-nav";
import { useState } from 'react';
import { BASE_URL } from '@/config'
const SubmitManuscripts = () => {
  // User-entered fields
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [authors, setAuthors] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Static FK values
  const journalId = 6015;
  const journalTitle = 'Test1';
  const correspondingAuthorId = 4;

  const getToken = () => {
    const tokens = localStorage.getItem('authTokens');

    if (!tokens) return null;

    return JSON.parse(tokens).access;
  };

  const handleSubmit = async () => {
    if (!title || !abstract || !authors || !file) {
      setMessage('Please complete all required fields.');
      return;
    }

    const token = getToken();

    if (!token) {
      setMessage('Authentication token not found.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const formData = new FormData();

      // Static FK values
      formData.append('journal', String(journalId));
      formData.append(
        'corresponding_author',
        String(correspondingAuthorId)
      );

      // User-entered values
      formData.append('title', title);
      formData.append('abstract', abstract);
      formData.append('authors', authors);
      formData.append('file', file);

      const response = await fetch(
         `${BASE_URL}/journal_api/api/manuscripts/submit/`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage('✅ Manuscript submitted successfully.');

        setTitle('');
        setAbstract('');
        setAuthors('');
        setFile(null);
      } else {
        setMessage(
          data.detail ||
          data.error ||
          JSON.stringify(data)
        );
      }
    } catch (error) {
      console.error(error);
      setMessage('Submission failed.');
    } finally {
      setLoading(false);
    }
  };

  const topNav = [
  {
    title: " ",
    href: " ",
    isActive: true,
  },
];

  return (
    <Layout>
       <Layout.Header>
                      <TopNav links={topNav} />
                      <div className="ml-auto flex items-center space-x-4">
                        <UserNav />
                      </div>
      </Layout.Header> 
       <Layout.Body>
    <div className="p-6">
      <div className="bg-white rounded-lg shadow p-6 max-w-6xl mx-auto">

        <h2 className="text-2xl font-bold mb-6">
          Submit Manuscript
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* LEFT */}
          <div className="space-y-4">

            <div>
              <label className="block font-medium mb-1">
                Journal
              </label>

              <input
                value={`${journalTitle} (ID: ${journalId})`}
                readOnly
                className="w-full border rounded p-3 bg-gray-100"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">
                Corresponding Author ID
              </label>

              <input
                value={correspondingAuthorId}
                readOnly
                className="w-full border rounded p-3 bg-gray-100"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">
                Manuscript Title
              </label>

              <input
                className="w-full border rounded p-3"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                placeholder="Enter title"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">
                Authors
              </label>

              <input
                className="w-full border rounded p-3"
                value={authors}
                onChange={(e) =>
                  setAuthors(e.target.value)
                }
                placeholder="John Doe, Jane Smith"
              />
            </div>

          </div>

          {/* RIGHT */}
          <div className="space-y-4">

            <div>
              <label className="block font-medium mb-1">
                Abstract
              </label>

              <textarea
                className="w-full border rounded p-3 h-56"
                value={abstract}
                onChange={(e) =>
                  setAbstract(e.target.value)
                }
                placeholder="Write abstract..."
              />
            </div>

            <div>
              <label className="block font-medium mb-1">
                Manuscript File
              </label>

              <input
                type="file"
                className="w-full border rounded p-3"
                onChange={(e) =>
                  setFile(
                    e.target.files?.[0] || null
                  )
                }
              />

              {file && (
                <p className="text-sm text-gray-600 mt-2">
                  Selected: {file.name}
                </p>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
            >
              {loading
                ? 'Submitting...'
                : 'Submit Manuscript'}
            </button>

            {message && (
              <div className="p-3 rounded bg-gray-100">
                {message}
              </div>
            )}

          </div>

        </div>
      </div>
    </div> </Layout.Body>
    </Layout>
  );
};

export default SubmitManuscripts;
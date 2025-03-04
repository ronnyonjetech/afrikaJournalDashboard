


// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Layout } from '@/components/custom/layout';
// import ArticleForm from "./Article";

// interface UploadDetail {
//   id: number;
//   journal_title: string;
//   description: string;
//   journal_id: number;
//   volumes: Volume[];
// }

// interface Volume {
//   id: number;
//   journal_id: number;
//   volume_number: number;
//   issue_number: number;
//   year: number;
// }

// const UploadDetailPage: React.FC = () => {
//   const { uploadId } = useParams<{ uploadId: string }>();
//   const [upload, setUpload] = useState<UploadDetail | null>(null);
//   const [journalId, setJournalId] = useState<number | null>(null);
//   const [showForm, setShowForm] = useState<boolean>(false);
//   const [error, setError] = useState<string>("");

//   useEffect(() => {
//     if (!uploadId) {
//       console.error("Upload ID is missing");
//       return;
//     }

//     const fetchUploadDetail = async () => {
//       try {
//         const response = await fetch(
//           `https://aphrc.site/journal_api/api/journals/${uploadId}`
//         );
//         if (response.ok) {
//           const data: UploadDetail = await response.json();
//           console.log("Fetched journal data:", data);
//           console.log("Fetched journal volumes:", data.volumes);
//           setUpload(data);
//           setJournalId(data.id);
//         } else {
//           console.error("Failed to fetch upload details", response.status);
//         }
//       } catch (error) {
//         console.error("Error fetching upload details:", error);
//       }
//     };

//     fetchUploadDetail();
//   }, [uploadId]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const formData = new FormData(e.target as HTMLFormElement);

//     const newVolume = {
//       journal_id: journalId,
//       volume_number: parseInt(formData.get("volume_number") as string, 10) || 0,
//       issue_number: parseInt(formData.get("issue_number") as string, 10) || 0,
//       year: parseInt(formData.get("year") as string, 10) || 2022,
//     };

//     if (!newVolume.volume_number || !newVolume.issue_number || !newVolume.year || !journalId) {
//       setError("All fields are required.");
//       console.error("Form submission failed: Missing fields");
//       return;
//     }

//     console.log("Submitting volume data:", newVolume);

//     try {
//       const response = await fetch(`https://aphrc.site/journal_api/api/volume/`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newVolume),
//       });

//       const responseData = await response.json();
//       console.log("Server response:", responseData);

//       if (response.ok) {
//         console.log("Volume added successfully!");
//         setShowForm(false);
//         setError("");
//       } else {
//         console.error("Failed to add volume", response.status);
//         setError("Failed to add volume");
//       }
//     } catch (error) {
//       console.error("Error adding volume:", error);
//       setError("Error adding volume");
//     }
//   };

//   if (!uploadId) {
//     return <div>Error: Upload ID is missing.</div>;
//   }

//   if (!upload) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Layout>
//       <Layout.Body>
//         <div className="container p-4">
//           <h1>{upload.journal_title}</h1>
//           <p>
//             <strong>Description:</strong> {upload.description}
//           </p>

//           <h2>Existing Volumes</h2>
//           {upload.volumes && upload.volumes.length > 0 ? (
//             <ul>
//               {upload.volumes.map((volume) => (
//                 <li key={volume.id}>
//                   <strong>Volume Number:</strong> {volume.volume_number} <br />
//                   <strong>Issue Number:</strong> {volume.issue_number} <br />
//                   <strong>Year:</strong> {volume.year} <br />
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No volumes found.</p>
//           )}

//           <h1>Add Article</h1>
//           <ArticleForm journalId={journalId} volumes={upload.volumes} />
          
//           <h1>Add Volumes</h1>
//           <button onClick={() => setShowForm(!showForm)} className="bg-blue-500 text-white p-2 rounded mt-4">
//             {showForm ? "Cancel" : "Add Volume"}
//           </button>
          
//           {showForm && (
//             <form onSubmit={handleSubmit} className="mt-4 p-4 border rounded shadow-md">
//               <div>
//                 <label htmlFor="volume_number" className="block mb-2">Volume Number</label>
//                 <input type="number" id="volume_number" name="volume_number" className="w-full p-2 border rounded" required />
//               </div>
//               <div>
//                 <label htmlFor="issue_number" className="block mb-2">Issue Number</label>
//                 <input type="number" id="issue_number" name="issue_number" className="w-full p-2 border rounded" required />
//               </div>
//               <div>
//                 <label htmlFor="year" className="block mb-2">Year</label>
//                 <input type="number" id="year" name="year" className="w-full p-2 border rounded" required />
//               </div>
//               {error && <p className="text-red-500 mt-2">{error}</p>}
//               <button type="submit" className="bg-green-500 text-white p-2 rounded mt-4">Add Volume</button>
//             </form>
//           )}
//         </div>
//       </Layout.Body>
//     </Layout>
//   );
// };

// export default UploadDetailPage;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from '@/components/custom/layout';
import ArticleForm from "./Article";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface UploadDetail {
  id: number;
  journal_title: string;
  description: string;
  journal_id: number;
  volumes: Volume[];
}

interface Volume {
  id: number;
  journal_id: number;
  volume_number: number;
  issue_number: number;
  year: number;
}

const UploadDetailPage: React.FC = () => {
  const { uploadId } = useParams<{ uploadId: string }>();
  const [upload, setUpload] = useState<UploadDetail | null>(null);
  const [journalId, setJournalId] = useState<number | null>(null);
  // const [showForm, setShowForm] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!uploadId) {
      console.error("Upload ID is missing");
      return;
    }

    const fetchUploadDetail = async () => {
      try {
        const response = await fetch(`https://backend.afrikajournals.org/journal_api/api/journals/${uploadId}`);
        if (response.ok) {
          const data: UploadDetail = await response.json();
          setUpload(data);
          setJournalId(data.id);
        } else {
          console.error("Failed to fetch upload details", response.status);
        }
      } catch (error) {
        console.error("Error fetching upload details:", error);
      }
    };

    fetchUploadDetail();
  }, [uploadId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const newVolume = {
      journal_id: journalId,
      volume_number: parseInt(formData.get("volume_number") as string, 10) || 0,
      issue_number: parseInt(formData.get("issue_number") as string, 10) || 0,
      year: parseInt(formData.get("year") as string, 10) || 2022,
    };

    if (!newVolume.volume_number || !newVolume.issue_number || !newVolume.year || !journalId) {
      setError("All fields are required.");
      console.error("Form submission failed: Missing fields");
      return;
    }

    console.log("Submitting volume data:", newVolume);

    try {
      const response = await fetch(`https://backend.afrikajournals.org/journal_api/api/volume/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVolume),
      });

      const responseData = await response.json();
      console.log("Server response:", responseData);

      if (response.ok) {
        console.log("Volume added successfully!");
        // setShowForm(false);
        setError("");
      } else {
        console.error("Failed to add volume", response.status);
        setError("Failed to add volume");
      }
    } catch (error) {
      console.error("Error adding volume:", error);
      setError("Error adding volume");
    }
  };

  if (!uploadId) {
    return <div>Error: Upload ID is missing.</div>;
  }

  if (!upload) {
    return <div>Loading...</div>;
  }


  return (
    <Layout>
      <Layout.Body>
        <div className="container p-8 mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">{upload?.journal_title}</h1>
          <p className="text-lg mb-6">{upload?.description}</p>
          
          <Tabs defaultValue="volumes" className="mx-auto w-full max-w-3xl">
            <TabsList className="grid h-14 w-full grid-cols-3">
              <TabsTrigger value="volumes" className=" flex items-center gap-2">Existing Volumes</TabsTrigger>
              <TabsTrigger value="add-article" className=" flex items-center gap-2">Add Article</TabsTrigger>
              <TabsTrigger value="add-volumes" className=" flex items-center gap-2">Add Volume</TabsTrigger>
            </TabsList>

            <TabsContent value="volumes">
              {upload?.volumes && upload.volumes.length > 0 ? (
                <ul className="mt-4 text-left">
                  {upload.volumes.map((volume) => (
                    <li key={volume.id} className="p-4 border rounded shadow-md mb-4">
                      <strong>Volume:</strong> {volume.volume_number} | <strong>Issue:</strong> {volume.issue_number} | <strong>Year:</strong> {volume.year}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4">No volumes found.</p>
              )}
            </TabsContent>

            <TabsContent value="add-article">
              <ArticleForm journalId={journalId} volumes={upload?.volumes || []} />
            </TabsContent>

            <TabsContent value="add-volumes">
            <form onSubmit={handleSubmit} className="mt-4 p-4 border rounded shadow-md">
              <div>
                <label htmlFor="volume_number" className="block mb-2">Volume Number</label>
                <input type="number" id="volume_number" name="volume_number" className="w-full p-2 border rounded" required />
              </div>
              <div>
                <label htmlFor="issue_number" className="block mb-2">Issue Number</label>
                <input type="number" id="issue_number" name="issue_number" className="w-full p-2 border rounded" required />
              </div>
              <div>
                <label htmlFor="year" className="block mb-2">Year</label>
                <input type="number" id="year" name="year" className="w-full p-2 border rounded" required />
              </div>
              {error && <p className="text-red-500 mt-2">{error}</p>}
              <button type="submit" className="bg-green-500 text-white p-2 rounded mt-4">Add Volume</button>
            </form>
         
            </TabsContent>
          </Tabs>
        </div>
      </Layout.Body>
    </Layout>
  );
};

export default UploadDetailPage;

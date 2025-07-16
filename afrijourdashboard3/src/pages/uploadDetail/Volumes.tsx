// import React, { useEffect, useState } from "react";
// import { BASE_URL } from '../../config';
// interface Article {
//   id: number;
//   title: string;
//   authors: string;
//   publication_date: string;
//   doi: string;
//   url: string | null;
//   pdf: string;
//   electronic_issn: string | null;
//   print_issn: string | null;
//   publisher: string;
// }

// interface Volume {
//   year: number;
//   issue_number: number;
//   articles: Article[];
// }

// interface VolumesProps {
//   journalId: number;
// }

// const Volumes: React.FC<VolumesProps> = ({ journalId }) => {
//   const [volumes, setVolumes] = useState<{ [key: string]: Volume }>({});
//   const [expandedVolume, setExpandedVolume] = useState<string | null>(null);

//   useEffect(() => {
//     fetch(`${BASE_URL}/journal_api/api/journal_volumes/${journalId}/`)
//       .then((response) => response.json())
//       .then((data) => setVolumes(data))
//       .catch((error) => console.error("Error fetching volumes:", error));
//       console.log('volumes->',volumes)
//       console.log('journal_id->',journalId)
//   }, [journalId]);

//   const toggleVolume = (volumeName: string) => {
//     setExpandedVolume(expandedVolume === volumeName ? null : volumeName);
//   };

//   return (
//     <div className="p-4 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Journal Volumes</h1>
//       {Object.entries(volumes).map(([volumeName, volume]) => (
//         <div key={volumeName} className="mb-6 p-4 border rounded-lg shadow-md bg-white">
//           <button 
//             className="w-full text-left text-xl font-semibold flex justify-between items-center p-2 bg-gray-100 rounded-md hover:bg-gray-200"
//             onClick={() => toggleVolume(volumeName)}
//           >
//             {volumeName}
//             <span>{expandedVolume === volumeName ? "▲" : "▼"}</span>
//           </button>
//           <p className="text-gray-600 mt-2">Year: {volume.year}, Issue: {volume.issue_number}</p>
//           {expandedVolume === volumeName && (
//             <div className="mt-2">
//               {volume.articles.length > 0 ? (
//                 <ul className="list-disc pl-5">
//                   {volume.articles.map((article) => (
//                     <li key={article.id} className="mt-2">
//                       <p className="font-medium">{article.title}</p>
//                       <p className="text-gray-500 text-sm">{article.authors} | {article.publication_date}</p>
//                       <p className="text-blue-500 text-sm truncate">DOI: {article.doi}</p>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-gray-500 italic">No articles available.</p>
//               )}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Volumes;

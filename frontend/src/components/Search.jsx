// import React, { useState } from 'react';
// import { Search, User } from 'lucide-react';

// const SearchUsers = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState([]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     // Implement search logic here
//     // For now, we'll use dummy data
    
//     setSearchResults([
//       { id: 1, username: 'john_doe', name: 'John Doe' },
//       { id: 2, username: 'jane_smith', name: 'Jane Smith' },
//     ]);
//   };

//   return (
//     <div className="bg-white shadow-md rounded-lg p-6">
//       <h2 className="text-xl font-semibold text-gray-800 mb-4">Search Users</h2>
//       <form onSubmit={handleSearch} className="mb-4">
//         <div className="relative">
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm pl-10"
//             placeholder="Search users..."
//           />
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Search className="h-5 w-5 text-gray-400" />
//           </div>
//         </div>
//       </form>
//       <div className="space-y-2">
//         {searchResults.map((user) => (
//           <div key={user.id} className="flex items-center p-2 hover:bg-gray-100 rounded-md">
//             <User className="h-6 w-6 text-gray-400 mr-2" />
//             <div>
//               <p className="text-sm font-medium text-gray-800">{user.name}</p>
//               <p className="text-xs text-gray-500">@{user.username}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SearchUsers;


'use client';

import React, { useState, useMemo } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Import useRouter

// Mock user data (now includes additional fields for the details page)
const initialUsers = new Array(35).fill(null).map((_, i) => ({
  id: `user-${i + 1}`,
  name: `Robo Gladiator ${i + 1}`,
  email: `robo${i + 1}@gmail.com`,
  fullName: i % 3 === 0 ? "Jane Cooper" : i % 3 === 1 ? "Mark Johnson" : "Alice Williams", // Added full name
  phone: i % 3 === 0 ? "(319) 555-0115" : i % 3 === 1 ? "(555) 123-4567" : "(987) 654-3210", // Added phone
  accountType: i % 2 === 0 ? 'User' : 'Rider',
  date: `March ${15 + (i % 31)}, 2024`, // Varying date
  registrationDate: `March ${15 + (i % 31)}, 2024`, // Explicit registration date
  avatar: 'https://placehold.co/24x24/cccccc/000000?text=A', // Avatar for table view
  status: 'active', // 'active' or 'blocked'
}));


// UserManagement Component (main component)
const UserManagement = () => {
  const router = useRouter(); // Initialize useRouter
  const [searchTerm, setSearchTerm] = useState('');
  const [currentUsers, setCurrentUsers] = useState(initialUsers); // State to manage user data
  const [currentPage, setCurrentPage] = useState(1); // New state for current page
  const itemsPerPage = 5; // Number of items per page

  // Filter users based on search term
  const filteredUsers = useMemo(() => {
    if (!searchTerm) {
      return currentUsers;
    }
    return currentUsers.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase())
      // Removed accountType from search filter as it's no longer displayed
    );
  }, [searchTerm, currentUsers]);

  // Calculate users for the current page
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsersDisplayed = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Calculate total pages for pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Handle blocking/unblocking a user (kept for potential future use or other views)
  const handleBlockToggle = (userId) => {
    setCurrentUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId
          ? { ...user, status: user.status === 'active' ? 'blocked' : 'active' }
          : user
      )
    );
  };

  // Handle deleting a user (added for the trash icon)
  const handleDelete = (userId) => {
    // Replaced window.confirm with a custom modal or message box for better UX in an iframe environment
    // For this example, we'll simulate a confirmation. In a real app, you'd show a modal.
    console.log(`Attempting to delete user ${userId}. In a real app, a confirmation modal would appear.`);
    // Simulate deletion directly for demonstration purposes
    setCurrentUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    // Also adjust pagination if the last item on a page was deleted
    if (currentPage > Math.ceil((filteredUsers.length - 1) / itemsPerPage)) {
        setCurrentPage(prev => Math.max(1, prev - 1));
    }
  };

  // Handle viewing user details - now navigates to the dynamic page
  const handleViewUser = (userId) => {
    router.push(`/admin/user-management/${userId}`);
  };

  // Function to render page numbers dynamically
  const renderPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      if (currentPage > 3) pageNumbers.push('...');
      if (currentPage > 2) pageNumbers.push(currentPage - 1);
      pageNumbers.push(currentPage);
      if (currentPage < totalPages - 1) pageNumbers.push(currentPage + 1);
      if (currentPage < totalPages - 2) pageNumbers.push('...');
      if (currentPage !== totalPages) pageNumbers.push(totalPages);
    }

    return pageNumbers.map((num, index) => (
      num === '...' ? (
        <span key={index} className="px-2 text-gray-500">.....</span>
      ) : (
        <button
          key={index}
          onClick={() => handlePageChange(num)}
          className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${
            currentPage === num ? 'bg-[#B92921] text-white' : 'hover:bg-gray-100 text-black'
          }`}
        >
          {num}
        </button>
      )
    ));
  };


  return (
    <>
      <div className="bg-white rounded-lg text-black p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">User Management</h2>
          <div className="flex items-center gap-2">
            <div className="flex items-center ">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 bg-gray-100 rounded-tl-[7.04px] rounded-bl-[7.04px] border-[1px] border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
              <button
                onClick={() => setSearchTerm(searchTerm)}
                className=" transition-colors bg-[#C12722] p-[7px] rounded-tr-[7.04px] rounded-br-[7.04px] border-[1px] border-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M11 8.5L20 8.5"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M4 16.5L14 16.5"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <ellipse
                    cx="7"
                    cy="8.5"
                    rx="3"
                    ry="3"
                    transform="rotate(90 7 8.5)"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <ellipse
                    cx="17"
                    cy="16.5"
                    rx="3"
                    ry="3"
                    transform="rotate(90 17 16.5)"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-[#C12722]">
              <tr className="text-sm text-white">
                <th className="py-3 px-4 text-center">User ID</th>
                <th className="py-3 px-4 text-center">Name</th>
                <th className="py-3 px-4 text-center">Email</th>
                {/* Removed Account Type header */}
                <th className="py-3 px-4 text-center">Registration Date</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentUsersDisplayed.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-4 text-center text-gray-600 border-b border-gray-300"> {/* Adjusted colspan */}
                    No users found matching your search.
                  </td>
                </tr>
              ) : (
                currentUsersDisplayed.map((user) => (
                  <tr key={user.id} className="text-sm text-black border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-2 px-4 text-center ">
                      {user.id}
                    </td>
                    <td className="py-2 px-4 text-center ">
                      <div className="flex justify-center items-center gap-2">
                        <img
                          src={user.avatar}
                          alt="avatar"
                          width={24}
                          height={24}
                          className="rounded-full"
                          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/24x24/cccccc/000000?text=A" }}
                        />
                        {user.name}
                      </div>
                    </td>
                    <td className="py-2 px-4 text-center ">
                      {user.email}
                    </td>
                    {/* Removed Account Type data cell */}
                    <td className="py-2 px-4 text-center ">
                      {user.date}
                    </td>
                    <td className="py-2 px-4 text-center ">
                      <div className="flex items-center justify-center gap-2">
                        <Image
                          className="cursor-pointer"
                          src="/icon/trash.svg"
                          alt="Delete"
                          width={26}
                          height={26}
                          onClick={() => handleDelete(user.id)}
                          unoptimized
                        />
                        <Image
                          className="cursor-pointer"
                          src="/icon/eye.svg"
                          alt="View"
                          width={26}
                          height={26}
                          onClick={() => handleViewUser(user.id)}
                          unoptimized
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center mt-6 gap-2 text-sm text-black">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center border border-[#B92921] rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
            <path d="M6.99995 13C6.99995 13 1.00001 8.58107 0.999999 6.99995C0.999986 5.41884 7 1 7 1" stroke="#B92921" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-8 h-8 flex items-center justify-center border border-[#B92921] rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
            <path d="M1.00005 1C1.00005 1 6.99999 5.41893 7 7.00005C7.00001 8.58116 1 13 1 13" stroke="#B92921" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </>
  );
};

export default UserManagement;

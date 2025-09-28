'use client';


import { useRouter } from 'next/navigation';
import React, { useState, useMemo } from 'react';

// Mock user data expanded to better showcase pagination
const initialUsers = new Array(44).fill(null).map((_, i) => {
    const statuses = ['Active', 'Inactive', 'Blocked'];
    return {
        id: `user-${i + 1}`,
        name: ["John Doe", "Alex Carter", "Mia Johnson", "Liam Evans", "Zoe Carter"][i % 5],
        avatar: `https://i.pravatar.cc/40?u=user${i + 1}`,
        role: i % 2 === 0 ? 'ChatterBee User' : 'Caregiver',
        email: `hello${i+1}@example.com`,
        status: statuses[i % 3],
    };
});


// UserList Component (main component)
const UserList = () => {
    const [users, setUsers] = useState(initialUsers);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of items per page

    // Memoize paginated users for performance
    const paginatedUsers = useMemo(() => {
        const indexOfLastUser = currentPage * itemsPerPage;
        const indexOfFirstUser = indexOfLastUser - itemsPerPage;
        return users.slice(indexOfFirstUser, indexOfLastUser);
    }, [users, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(users.length / itemsPerPage);


    const router = useRouter();

    // --- Action Handlers ---
    const handleView = (userId) => {
        console.log(`Navigating to view details for user: ${userId}`);
        // In a real Next.js app, you would use the router to navigate
       router.push(`/admin/user-management/${userId}`);
    };

    const handleBlock = (userId) => {
        console.log(`Block action for user: ${userId}`);
        setUsers(currentUsers =>
            currentUsers.map(user =>
                user.id === userId
                    ? { ...user, status: user.status === 'Blocked' ? 'Active' : 'Blocked' }
                    : user
            )
        );
    };

    // --- Pagination Logic ---
    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5; // To control how many page numbers are visible
        
        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            pageNumbers.push(1);
            if (currentPage > 2) {
                pageNumbers.push('...');
            }
            
            let startPage = Math.max(2, currentPage - 1);
            let endPage = Math.min(totalPages - 1, currentPage + 1);

            if(currentPage === 1) {
                endPage = 3;
            }
             if(currentPage === totalPages) {
                startPage = totalPages - 2;
            }

            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }

            if (currentPage < totalPages - 1) {
                pageNumbers.push('...');
            }
            pageNumbers.push(totalPages);
        }

        // Remove duplicate ellipsis
        const uniquePageNumbers = pageNumbers.filter((item, index) => {
            return item !== '...' || pageNumbers[index-1] !== '...';
        });

        return uniquePageNumbers.map((num, index) =>
            num === '...' ? (
                <span key={`ellipsis-${index}`} className="px-4 py-2 text-gray-500">...</span>
            ) : (
                <button
                    key={num}
                    onClick={() => handlePageChange(num)}
                    className={`px-4 py-2 rounded-md transition-colors text-sm font-medium ${
                        currentPage === num
                            ? 'bg-[#FFD4A0] text-[#D4A12F]'
                            : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                >
                    {num}
                </button>
            )
        );
    };

    // --- Sub-components for Rendering ---
    const StatusBadge = ({ status }) => {
        const styles = {
            Active: 'bg-[#E9F7EF] text-[#2D8A5A]',
            Inactive: 'bg-[#FBEBEE] text-[#B53D4D]',
            Blocked: 'bg-[#FFF8E6] text-[#D4A12F]',
        };
        return (
            <span className={`px-3 py-1 text-xs font-medium rounded-md ${styles[status] || 'bg-gray-200 text-gray-700'}`}>
                {status}
            </span>
        );
    };

    return (
        <div style={{ boxShadow: '0px 4px 14.7px 0px rgba(0, 0, 0, 0.25)' }} className=" rounded-lg min-h-screen p-4 sm:p-8">
            <div className="  mx-auto">
                {/* <header className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">All User</h1>
                </header> */}

                <div className="  ">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-2xl font-semibold text-gray-700">User List</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50 text-gray-500">
                                    <th className="py-3 px-4 font-medium">Name</th>
                                    <th className="py-3 px-4 font-medium">Role</th>
                                    <th className="py-3 px-4 font-medium">Email</th>
                                    <th className="py-3 px-4 font-medium">Status</th>
                                    <th className="py-3 px-4 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedUsers.length > 0 ? (
                                    paginatedUsers.map((user) => (
                                        <tr key={user.id} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={user.avatar}
                                                        alt={`${user.name}'s avatar`}
                                                        className="w-10 h-10 rounded-full object-cover"
                                                        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/40x40/EFEFEF/333?text=??'; }}
                                                    />
                                                    <span className="font-medium text-gray-800">{user.name}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-gray-600">{user.role}</td>
                                            <td className="py-4 px-4 text-gray-600">{user.email}</td>
                                            <td className="py-4 px-4">
                                                <StatusBadge status={user.status} />
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => handleBlock(user.id)}
                                                        className="px-4 py-2 text-sm font-medium rounded-md bg-[#FFF8E6] text-[#D4A12F] hover:bg-opacity-80 transition-colors"
                                                    >
                                                        Block
                                                    </button>
                                                    <button
                                                        onClick={() => handleView(user.id)}
                                                        className=" cursor-pointer px-4 py-2 text-sm font-medium rounded-md bg-[#EBF5FF] text-[#3B82F6] hover:bg-opacity-80 transition-colors"
                                                    >
                                                        View
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-8 text-gray-500">
                                            No users found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Pagination */}
                    <div className="p-4 flex justify-end items-center gap-2">
                         <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                        </button>
                        
                        {renderPageNumbers()}

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                             <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserList;



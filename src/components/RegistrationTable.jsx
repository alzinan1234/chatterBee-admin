"use client"; // This is a client component, necessary for useState and event handlers

import React, { useState } from 'react';

// Dummy data structured to match the design in the image
const initialUsers = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://placehold.co/40x40/EFEFEF/333?text=JD",
    role: "ChatterBee User",
    email: "hello@example.com",
    status: "Active",
  },
  {
    id: 2,
    name: "Alex Carter",
    avatar: "https://placehold.co/40x40/EFEFEF/333?text=AC",
    role: "Caregiver",
    email: "hello@example.com",
    status: "Active",
  },
  {
    id: 3,
    name: "Mia Johnson",
    avatar: "https://placehold.co/40x40/EFEFEF/333?text=MJ",
    role: "ChatterBee User",
    email: "hello@example.com",
    status: "Inactive",
  },
];

// A simple modal component for confirmation
const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
        <p className="text-lg text-gray-800 mb-4">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-600 transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};


export default function UserList() {
  const [users, setUsers] = useState(initialUsers);
  const [userToDelete, setUserToDelete] = useState(null);

  // Handlers for actions
  const handleBlock = (userId) => {
    // In a real app, you'd call an API here.
    // For this example, we'll just log it.
    console.log(`Block action for user ID: ${userId}`);
    // You could also update the user's status in the state if needed
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
  };
  
  const confirmDelete = () => {
    if (userToDelete) {
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userToDelete.id));
      setUserToDelete(null); // Close the modal
    }
  };

  const cancelDelete = () => {
    setUserToDelete(null); // Close the modal
  };


  // Function to render status badge
  const StatusBadge = ({ status }) => {
    const baseClasses = "px-3 py-1 text-xs font-medium rounded-md";
    if (status === "Active") {
      return <span className={`${baseClasses} bg-[#E9F7EF] text-[#2D8A5A]`}>Active</span>;
    }
    return <span className={`${baseClasses} bg-[#FBEBEE] text-[#B53D4D]`}>Inactive</span>;
  };

  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg" style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}>
       {userToDelete && (
        <ConfirmationModal
          message={`Are you sure you want to delete ${userToDelete.name}?`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-gray-800">User List</h1>
        <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-md border border-gray-200 hover:bg-gray-100 transition-colors">
          See More
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-gray-500">
              <th className="py-3 px-4 font-medium">Name</th>
              <th className="py-3 px-4 font-medium">Role</th>
              <th className="py-3 px-4 font-medium">Email</th>
              <th className="py-3 px-4 font-medium">Status</th>
              <th className="py-3 px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
            <tr key={user.id} className="border-b border-gray-200 last:border-b-0">
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
                  onClick={() => handleDeleteClick(user)}
                        className="px-4 py-2 text-sm font-medium rounded-md bg-[#FBEBEE] text-[#B53D4D] hover:bg-opacity-80 transition-colors"
                      >
                        Delete
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
    </div> 
  );
}

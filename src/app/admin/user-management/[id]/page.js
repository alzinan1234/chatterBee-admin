// app/vendor/users/[id]/page.js
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { X } from 'lucide-react';

// Centralized dummy user data (copied from UserManagement for this page's context)
// In a real app, you might fetch this from a centralized API or a shared lib file.
const allUsers = new Array(35).fill(null).map((_, i) => ({
    id: `user-${i + 1}`,
    name: `Robo Gladiator ${i + 1}`,
    email: `robo${i + 1}@gmail.com`,
    fullName: i % 3 === 0 ? "Jane Cooper" : i % 3 === 1 ? "Mark Johnson" : "Alice Williams", // Added full name
    phone: i % 3 === 0 ? "(319) 555-0115" : i % 3 === 1 ? "(555) 123-4567" : "(987) 654-3210", // Added phone
   
    date: `March ${15 + (i % 31)}, 2024`,
    // Using a more suitable user avatar for the details page
    avatar: 'https://placehold.co/100x100/A76241/ffffff?text=User',
    status: 'active',
    registrationDate: `March ${15 + (i % 31)}, 2024` // Added registrationDate for clarity
}));


const UserDetailsPage = ({ params }) => {
    const router = useRouter();
    const { id } = params; // Get the user ID from the URL
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (id) {
            // Find the user from the dummy data array
            // In a real application, you would fetch this from an API: fetch(`/api/users/${id}`)
            const foundUser = allUsers.find(u => u.id === id);
            setUser(foundUser);
        }
    }, [id]);

    const handleClose = () => {
        router.back(); // Go back to the previous page (UserManagement)
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800">
                <p>Loading user details or user not found...</p>
            </div>
        );
    }

    // Determine the user image to display
    const userImage = user.avatar || "/image/default-user.png"; // Fallback if avatar is missing

    return (
        <div className="relative min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
                body {
                    font-family: 'Inter', sans-serif;
                }
            `}</style>
            <div className="relative bg-white rounded-xl shadow-lg p-6 max-w-md w-full sm:p-8">
                {/* Close Button (Red Circle with White X) */}
                <button
                    onClick={handleClose}
                    className="absolute -top-3 -right-3 w-10 h-10 bg-[#B92921] rounded-full flex items-center justify-center shadow-md hover:bg-red-700 transition-colors duration-200"
                >
                    <X className="text-white" size={24} strokeWidth={2} />
                </button>

                <div className="flex flex-col items-center sm:flex-row sm:items-start sm:gap-6 mb-6">
                    {/* User Image */}
                    <div className="flex-shrink-0 mb-4 sm:mb-0">
                        <Image
                            src={userImage}
                            alt="User Avatar"
                            width={100}
                            height={100}
                            className="rounded-lg object-cover border border-gray-200" // Adjusted to rounded-lg as per screenshot
                            onError={(e) => { e.target.onerror = null; e.target.src = "/image/default-user.png"; }} // Fallback image
                            unoptimized // Add unoptimized if image optimization causes issues with external URLs
                        />
                    </div>

                    {/* User Details */}
                    <div className="text-center sm:text-left">
                        <p className="text-gray-800 text-lg font-semibold mb-1">User ID: {user.id.replace('user-', '')}</p> {/* Displaying ID without 'user-' prefix */}
                        <p className="text-gray-600 text-sm mb-1">Full name : {user.fullName}</p>
                        <p className="text-gray-600 text-sm mb-1">Email: {user.email}</p>
                        <p className="text-gray-600 text-sm mb-1">Phone number: {user.phone}</p>
                      
                        <p className="text-gray-600 text-sm">Registration Date: {user.registrationDate}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetailsPage;
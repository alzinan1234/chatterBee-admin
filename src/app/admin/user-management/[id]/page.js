'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

// This is a mock hook. In a real app, you would fetch data based on the id.
// For example, using React Query or a similar library.
const useUser = (id) => {
    // Mock data - in a real app, this would be an API call
    const mockUser = {
        id: id || 'user-1',
        name: "John Doe",
        avatar: "https://i.pravatar.cc/150?u=user-1",
        role: 'ChatterBee User',
        email: `hello@example.com`,
        status: 'Active',
        phone: '(123) 456-7890',
        lastLogin: '2024-09-28 10:30 AM',
        bio: 'Enthusiastic user who enjoys exploring new features and providing feedback. Member since 2023.',
        address: '123 Main Street, Anytown, USA 12345',
        social: {
            twitter: '@johndoe',
            linkedin: 'linkedin.com/in/johndoe'
        }
    };
    
    // Simulate loading state
    const [user, setUser] = React.useState(null);
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setUser(mockUser);
        }, 500); // Simulate network delay
        return () => clearTimeout(timer);
    }, [id]);

    return { data: user, isLoading: !user };
};

const UserDetailsPage = ({ params }) => {
    const { id } = params;
    const { data: user, isLoading } = useUser(id);
    const router = useRouter();

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-slate-100">
                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                 <style jsx>{`
                    .loader {
                        border-top-color: #3498db;
                        animation: spinner 1.5s linear infinite;
                    }
                    @keyframes spinner {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        );
    }
    
    const StatusBadge = ({ status }) => {
        const styles = {
            Active: 'bg-green-500/10 text-green-700',
            Inactive: 'bg-red-500/10 text-red-700',
            Blocked: 'bg-yellow-500/10 text-yellow-700',
        };
        return (
            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
                {status}
            </span>
        );
    };

    return (
        <div className="min-h-screen p-4 sm:p-8 font-sans  text-slate-900">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <header className="mb-6 flex items-center gap-4">
                    <button 
                        onClick={() => router.back()} 
                        aria-label="Go back"
                        className="p-2 -ml-2 rounded-full transition-all duration-200 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <svg className="h-6 w-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    </button>
                    <h1 className="text-3xl font-bold text-slate-800">User Details</h1>
                </header>

                {/* Main Content Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Profile Banner */}
                    <div className="bg-gradient-to-tr from-slate-900 to-slate-700 p-8 sm:p-12 text-white relative"> 
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <img
                                src={user.avatar}
                                alt={`${user.name}'s avatar`}
                                className="w-36 h-36 rounded-full object-cover border-4 border-slate-50 shadow-md"
                            />
                            <div>
                                <h2 className="text-3xl font-extrabold text-white">{user.name}</h2>
                                <p className="text-blue-300 font-medium">{user.role}</p>
                                <div className="mt-2">
                                    <StatusBadge status={user.status} />
                                </div>
                            </div>
                        </div> 
                    </div>

                    {/* User Details Grid */}
                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Contact Information */}
                        <div className="space-y-6">
                            <h3 className="font-semibold text-lg text-slate-700 border-b-2 border-slate-200 pb-2">Contact Information</h3>
                            <div className="flex items-center gap-4">
                                <svg className="w-6 h-6 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                <span className="text-slate-600">{user.email}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <svg className="w-6 h-6 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                <span className="text-slate-600">{user.phone}</span>
                            </div>
                            <div className="flex items-start gap-4">
                                <svg className="w-6 h-6 text-slate-400 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                <span className="text-slate-600">{user.address}</span>
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="space-y-6">
                            <h3 className="font-semibold text-lg text-slate-700 border-b-2 border-slate-200 pb-2">Additional Information</h3>
                            <div className="flex items-center gap-4">
                                <svg className="w-6 h-6 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                <span className="text-slate-600">Last Login: {user.lastLogin}</span>
                            </div>
                            <div className="flex items-start gap-4">
                                <svg className="w-6 h-6 text-slate-400 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <p className="text-slate-600">{user.bio}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetailsPage;
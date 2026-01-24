'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserById, blockUser, unblockUser, deleteUser, restoreUser, transformUsersForDisplay } from '../../../../components/lib/userManagementApiClient';

// Toast Component
const Toast = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const bgColor = {
        success: 'bg-green-50 border-green-200 text-green-700',
        error: 'bg-red-50 border-red-200 text-red-700',
        info: 'bg-blue-50 border-blue-200 text-blue-700',
    };

    const iconColor = {
        success: 'text-green-600',
        error: 'text-red-600',
        info: 'text-blue-600',
    };

    const icons = {
        success: (
            <svg className={`w-5 h-5 ${iconColor.success}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
        ),
        error: (
            <svg className={`w-5 h-5 ${iconColor.error}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
        ),
        info: (
            <svg className={`w-5 h-5 ${iconColor.info}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
        ),
    };

    return (
        <div className={`fixed top-4 right-4 p-4 rounded-lg border shadow-lg flex items-center gap-3 ${bgColor[type]} z-50 animate-slide-in`}>
            {icons[type]}
            <p className="font-medium">{message}</p>
            <style jsx>{`
                @keyframes slide-in {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                .animate-slide-in {
                    animation: slide-in 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

const UserDetailsPage = ({ params }) => {
    const { id } = params;
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [actionLoading, setActionLoading] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [toast, setToast] = useState(null);
    const router = useRouter();

    // Show toast message
    const showToast = (message, type = 'success') => {
        setToast({ message, type });
    };

    // Fetch user details
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await getUserById(id);
                
                if (response && response.data) {
                    const transformed = transformUsersForDisplay([response.data]);
                    setUser(transformed[0]);
                } else {
                    setError("Failed to load user details");
                }
            } catch (err) {
                console.error("Error fetching user:", err);
                setError(err.message || "Failed to load user details");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    const handleBlockToggle = async () => {
        if (!user) return;
        
        setActionLoading('block');
        try {
            if (user.status === 'Blocked') {
                await unblockUser(user.email);
                setUser({ ...user, status: 'Active', is_blocked: false });
                showToast('User unblocked successfully', 'success');
            } else {
                await blockUser(user.email);
                setUser({ ...user, status: 'Blocked', is_blocked: true });
                showToast('User blocked successfully', 'success');
            }
            setError(null);
        } catch (err) {
            console.error("Block/Unblock error:", err);
            
            let errorMsg = 'Failed to update user status';
            
            // Handle validation errors with field-specific messages
            if (err.response?.data?.errors) {
                const errors = err.response.data.errors;
                const errorMessages = [];
                
                Object.keys(errors).forEach(field => {
                    if (Array.isArray(errors[field])) {
                        errorMessages.push(errors[field][0]);
                    } else {
                        errorMessages.push(errors[field]);
                    }
                });
                
                errorMsg = errorMessages.join(' • ');
            } else if (err.response?.data?.message) {
                errorMsg = err.response.data.message;
            } else if (err.message) {
                errorMsg = err.message;
            }
            
            setError(errorMsg);
        } finally {
            setActionLoading(null);
        }
    };

    const handleDelete = async () => {
        if (!user) return;
        
        setActionLoading('delete');
        try {
            await deleteUser(user.email);
            setShowDeleteModal(false);
            showToast('User deleted successfully', 'success');
            setTimeout(() => {
                router.push('/admin/user-management');
            }, 1500);
        } catch (err) {
            console.error("Delete error:", err);
            
            let errorMsg = 'Failed to delete user';
            
            // Handle validation errors with field-specific messages
            if (err.response?.data?.errors) {
                const errors = err.response.data.errors;
                const errorMessages = [];
                
                Object.keys(errors).forEach(field => {
                    if (Array.isArray(errors[field])) {
                        errorMessages.push(errors[field][0]);
                    } else {
                        errorMessages.push(errors[field]);
                    }
                });
                
                errorMsg = errorMessages.join(' • ');
            } else if (err.response?.data?.message) {
                errorMsg = err.response.data.message;
            } else if (err.message) {
                errorMsg = err.message;
            }
            
            showToast(errorMsg, 'error');
        } finally {
            setActionLoading(null);
        }
    };

    const handleRestore = async () => {
        if (!user) return;
        
        setActionLoading('restore');
        try {
            await restoreUser(user.email);
            setUser({ ...user, is_deleted: false });
            showToast('User restored successfully', 'success');
        } catch (err) {
            console.error("Restore error:", err);
            
            let errorMsg = 'Failed to restore user';
            
            // Handle validation errors with field-specific messages
            if (err.response?.data?.errors) {
                const errors = err.response.data.errors;
                const errorMessages = [];
                
                Object.keys(errors).forEach(field => {
                    if (Array.isArray(errors[field])) {
                        errorMessages.push(errors[field][0]);
                    } else {
                        errorMessages.push(errors[field]);
                    }
                });
                
                errorMsg = errorMessages.join(' • ');
            } else if (err.response?.data?.message) {
                errorMsg = err.response.data.message;
            } else if (err.message) {
                errorMsg = err.message;
            }
            
            showToast(errorMsg, 'error');
        } finally {
            setActionLoading(null);
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-slate-100">
                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                <p className="text-gray-600">Loading user details...</p>
                <style jsx>{`
                    .loader {
                        border-top-color: #FFD4A0;
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

    if (error || !user) {
        return (
            <div className="min-h-screen p-4 sm:p-8 font-sans text-slate-900">
                <div className="max-w-4xl mx-auto">
                    <button 
                        onClick={() => router.back()} 
                        className="p-2 -ml-2 rounded-full transition-all duration-200 hover:bg-slate-200 mb-6"
                    >
                        <svg className="h-6 w-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    </button>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                        <p className="text-red-700 font-semibold">{error || "User not found"}</p>
                    </div>
                </div>
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
        <div className="min-h-screen p-4 sm:p-8 font-sans text-slate-900">
            {/* Toast Notification */}
            {toast && (
                <Toast 
                    message={toast.message} 
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}

            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <header className="mb-6 flex items-center gap-4">
                    <button 
                        onClick={() => router.back()} 
                        aria-label="Go back"
                        className="p-2 -ml-2 rounded-full transition-all duration-200 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FFD4A0]"
                    >
                        <svg className="h-6 w-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    </button>
                    <h1 className="text-3xl font-bold text-slate-800">User Details</h1>
                </header>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                        {error}
                    </div>
                )}

                {/* Main Content Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Profile Banner */}
                    <div className="bg-gradient-to-tr from-[#D4A12F] to-[#E8B86B] p-8 sm:p-12 text-white relative"> 
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <img
                                src={user.avatar}
                                alt={`${user.name}'s avatar`}
                                className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-md"
                                onError={(e) => { e.target.src = 'https://i.pravatar.cc/150?u=' + user.email; }}
                            />
                            <div className="text-center sm:text-left">
                                <h2 className="text-3xl font-extrabold text-white">{user.name}</h2>
                                <p className="text-yellow-100 font-medium">{user.role}</p>
                                <div className="mt-4 flex gap-3 flex-wrap">
                                    <StatusBadge status={user.status} />
                                    {user.is_deleted && (
                                        <span className="px-3 py-1 text-sm font-semibold bg-red-500/10 text-red-700 rounded-full">
                                            Deleted
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div> 
                    </div>

                    {/* User Details Grid */}
                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Contact Information */}
                        <div className="space-y-6">
                            <h3 className="font-semibold text-lg text-slate-700 border-b-2 border-[#FFD4A0] pb-2">Contact Information</h3>
                            <div className="flex items-center gap-4">
                                <svg className="w-6 h-6 text-[#FFD4A0] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                <span className="text-slate-600">{user.email}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <svg className="w-6 h-6 text-[#FFD4A0] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                <span className="text-slate-600">{user.phone}</span>
                            </div>
                            <div className="flex items-start gap-4">
                                <svg className="w-6 h-6 text-[#FFD4A0] mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                <span className="text-slate-600">{user.address}</span>
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="space-y-6">
                            <h3 className="font-semibold text-lg text-slate-700 border-b-2 border-[#FFD4A0] pb-2">Additional Information</h3>
                            <div className="flex items-center gap-4">
                                <svg className="w-6 h-6 text-[#FFD4A0] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                <span className="text-slate-600">Joined: {new Date(user.created_at).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <svg className="w-6 h-6 text-[#FFD4A0] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <span className="text-slate-600">Last Login: {user.last_login ? new Date(user.last_login).toLocaleDateString() : 'Never'}</span>
                            </div>
                            <div className="flex items-start gap-4">
                                <svg className="w-6 h-6 text-[#FFD4A0] mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <p className="text-slate-600">{user.bio}</p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="p-8 border-t border-gray-200 flex flex-wrap gap-4">
                        <button
                            onClick={handleBlockToggle}
                            disabled={actionLoading === 'block'}
                            className="px-6 py-2.5 rounded-lg font-medium transition-colors bg-[#FFF8E6] text-[#D4A12F] hover:bg-opacity-80 disabled:opacity-50"
                        >
                            {actionLoading === 'block' ? 'Processing...' : user.status === 'Blocked' ? 'Unblock User' : 'Block User'}
                        </button>
                        
                        {user.is_deleted ? (
                            <button
                                onClick={handleRestore}
                                disabled={actionLoading === 'restore'}
                                className="px-6 py-2.5 rounded-lg font-medium transition-colors bg-green-100 text-green-700 hover:bg-opacity-80 disabled:opacity-50"
                            >
                                {actionLoading === 'restore' ? 'Restoring...' : 'Restore User'}
                            </button>
                        ) : (
                            <button
                                onClick={() => setShowDeleteModal(true)}
                                className="px-6 py-2.5 rounded-lg font-medium transition-colors bg-red-100 text-red-700 hover:bg-opacity-80"
                            >
                                Delete User
                            </button>
                        )}
                    </div>
                </div>

                {/* Delete Confirmation Modal */}
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Delete User</h3>
                            <p className="text-gray-600 mb-6">Are you sure you want to delete this user? This action cannot be undone.</p>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300 font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    disabled={actionLoading === 'delete'}
                                    className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 disabled:opacity-50"
                                >
                                    {actionLoading === 'delete' ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDetailsPage;
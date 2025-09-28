// app/admin/withdrawal-requests/[id]/page.js
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { X } from 'lucide-react'; // For the close button icon

// Centralized dummy data for Withdrawal Requests (must match/extend data in WithdrawalRequests.js)
const allWithdrawalRequestsDetails = [
    {
        id: 'WR001',
        submittedBy: 'Haus & Herz',
        fullName: 'Jane Cooper', // From image
        email: 'abc@example.com', // From image
        phone: '(319) 555-0115', // From image
        avatar: 'https://placehold.co/100x100/A76241/ffffff?text=User', // Larger avatar for details
        accountType: 'User',
        dateSubmitted: 'May 7, 2025',
        amount: '€150.00',
        paymentMethod: 'Bank Transfer',
        status: 'Pending',
        description: 'Requested withdrawal of €150.00 to associated bank account ending in **** **** 1234. Waiting for approval.',
        // Transaction Details (from Screenshot (1).png) - Added to WR001 for demonstration
        transactionId: '12345678',
        accountHolderName: 'Wade Warren',
        accountNumber: '**** **** *456',
        receivedAmount: '$500',
        detectPercentage: '$100',
        finalAmount: '$400',
    },
    {
        id: 'WR002',
        submittedBy: 'Studio Pixel',
        fullName: 'John Smith',
        email: 'john.smith@example.com',
        phone: '(111) 222-3333',
        avatar: 'https://placehold.co/100x100/A76241/ffffff?text=User',
        accountType: 'Rider',
        dateSubmitted: 'May 6, 2025',
        amount: '€500.00',
        paymentMethod: 'PayPal',
        status: 'Approved',
        description: 'Withdrawal of €500.00 approved and processed via PayPal.',
        transactionId: '87654321',
        accountHolderName: 'Jane Doe',
        accountNumber: '**** **** *789',
        receivedAmount: '$600',
        detectPercentage: '$100',
        finalAmount: '$500',
    },
    {
        id: 'WR003',
        submittedBy: 'Creative Designs',
        fullName: 'Alice Johnson',
        email: 'alice.j@example.com',
        phone: '(555) 123-4567',
        avatar: 'https://placehold.co/100x100/A76241/ffffff?text=User',
        accountType: 'User',
        dateSubmitted: 'May 5, 2025',
        amount: '€75.50',
        paymentMethod: 'Credit Card',
        status: 'Rejected',
        description: 'Withdrawal rejected due to insufficient funds/verification issues.',
        transactionId: '12312312',
        accountHolderName: 'Bob Brown',
        accountNumber: '**** **** *111',
        receivedAmount: '$100',
        detectPercentage: '$20',
        finalAmount: '$80',
    },
    // ... add more detailed entries for other dummy data if needed
];

const WithdrawalDetailsPage = ({ params }) => {
    const router = useRouter();
    const { id } = params; // Get the withdrawal ID from the URL
    const [withdrawalRequest, setWithdrawalRequest] = useState(null);

    useEffect(() => {
        if (id) {
            // In a real application, you would fetch this from an API
            const foundRequest = allWithdrawalRequestsDetails.find(req => req.id === id);
            setWithdrawalRequest(foundRequest);
        }
    }, [id]);

    const handleClose = () => {
        router.back(); // Go back to the previous page (WithdrawalRequests)
    };

    if (!withdrawalRequest) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800">
                <p>Loading withdrawal request details or request not found...</p>
            </div>
        );
    }

    // Determine the user image to display
    const userAvatar = withdrawalRequest.avatar || "https://placehold.co/100x100/A76241/ffffff?text=User"; // Fallback if avatar is missing

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
                            src={userAvatar}
                            alt="User Avatar"
                            width={100}
                            height={100}
                            className="rounded-lg object-cover border border-gray-200"
                            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x100/A76241/ffffff?text=User"; }} // Fallback image
                            unoptimized
                        />
                    </div>

                    {/* User Details */}
                    <div className="text-center sm:text-left">
                        {withdrawalRequest.fullName && (
                            <p className="text-gray-800 text-lg font-semibold mb-1">Full name : {withdrawalRequest.fullName}</p>
                        )}
                        {withdrawalRequest.email && (
                            <p className="text-gray-600 text-sm mb-1">Email: {withdrawalRequest.email}</p>
                        )}
                        {withdrawalRequest.phone && (
                            <p className="text-gray-600 text-sm mb-1">Phone number: {withdrawalRequest.phone}</p>
                        )}
                        {withdrawalRequest.dateSubmitted && (
                             <p className="text-gray-600 text-sm mb-1">Request Date: {withdrawalRequest.dateSubmitted}</p>
                        )}
                        {withdrawalRequest.amount && (
                            <p className="text-gray-600 text-sm mb-1">Amount: {withdrawalRequest.amount}</p>
                        )}
                        {withdrawalRequest.paymentMethod && (
                            <p className="text-gray-600 text-sm">Payment Method: {withdrawalRequest.paymentMethod}</p>
                        )}
                    </div>
                </div>

                {/* Transaction Details (if available) */}
                {withdrawalRequest.transactionId && (
                    <div className="mt-6 pt-4 border-t border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Transaction Details :</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-gray-700 text-sm">
                                <span>Transaction ID :</span>
                                <span className="font-medium">{withdrawalRequest.transactionId}</span>
                            </div>
                            <div className="flex justify-between items-center text-gray-700 text-sm">
                                <span>A/C holder name:</span>
                                <span className="font-medium">{withdrawalRequest.accountHolderName}</span>
                            </div>
                            <div className="flex justify-between items-center text-gray-700 text-sm">
                                <span>A/C number:</span>
                                <span className="font-medium">{withdrawalRequest.accountNumber}</span>
                            </div>
                            <div className="flex justify-between items-center text-gray-700 text-sm">
                                <span>Received amount:</span>
                                <span className="font-medium">{withdrawalRequest.receivedAmount}</span>
                            </div>
                            <div className="flex justify-between items-center text-gray-700 text-sm">
                                <span>Detect Percentage:</span>
                                <span className="font-medium">{withdrawalRequest.detectPercentage}</span>
                            </div>
                            <div className="flex justify-between items-center text-gray-700 text-sm">
                                <span>Final Amount:</span>
                                <span className="font-medium">{withdrawalRequest.finalAmount}</span>
                            </div>
                        </div>
                    </div>
                )}
                {/* Action Buttons for Pending Status (from download (8).png) */}
                {withdrawalRequest.status === 'Pending' && (
                    <div className="flex justify-center gap-4 mt-6 pt-4 border-t border-gray-200">
                        <button
                            onClick={() => console.log(`Approved ${withdrawalRequest.id}`)}
                            className="flex items-center justify-center p-3 rounded-xl bg-[#E6F5EC] text-[#29CC7A] border border-[#29CC7A] hover:bg-[#D4EDDA] transition-colors duration-200 flex-grow"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                        </button>
                        <button
                            onClick={() => console.log(`Rejected ${withdrawalRequest.id}`)}
                            className="flex items-center justify-center p-3 rounded-xl bg-[#FDE7E7] text-[#EF4444] border border-[#EF4444] hover:bg-[#FCD2D2] transition-colors duration-200 flex-grow"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WithdrawalDetailsPage;
// app/admin/manage-registrations/[id]/page.js
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { X } from 'lucide-react'; // For the close button icon

// Centralized dummy data for registrations (copied for this page's context)
// In a real app, you would fetch this from an API or a shared data file.
const allRegistrations = [
    {
        id: "reg-001",
        membershipId: "1234",
        name: "Robo Gladiators",
        fullName: "Jane Cooper", // Added for details page
        email: "robo.g@gmail.com",
        phone: "(319) 555-0115", // Added for details page
        registrationDate: "March 15, 2024",
        registeredDate: "12 Jun 2025", // As per screenshot
        avatar: "https://placehold.co/100x100/A76241/ffffff?text=User", // Larger avatar for details
        validIdUrl: "https://placehold.co/100x100/cccccc/000000?text=Valid+ID",
        driversLicenseUrl: "https://placehold.co/100x100/cccccc/000000?text=Driver%27s+License",
        profilePhotoUrl: "https://placehold.co/100x100/cccccc/000000?text=Profile+Photo",
        proofOfAddressUrl: "https://placehold.co/100x100/cccccc/000000?text=Proof+of+Address",
        liabilityInsuranceUrl: "https://placehold.co/100x100/cccccc/000000?text=Liability+Insurance",
    },
    {
        id: "reg-002",
        membershipId: "1235",
        name: "Tech Titans",
        fullName: "John Doe",
        email: "titans.tech@gmail.com",
        phone: "(123) 456-7890",
        registrationDate: "March 16, 2024",
        registeredDate: "15 Jul 2025",
        avatar: "https://placehold.co/100x100/A76241/ffffff?text=User",
        validIdUrl: "https://placehold.co/100x100/cccccc/000000?text=Valid+ID",
        driversLicenseUrl: "https://placehold.co/100x100/cccccc/000000?text=Driver%27s+License",
        profilePhotoUrl: "https://placehold.co/100x100/cccccc/000000?text=Profile+Photo",
        proofOfAddressUrl: "https://placehold.co/100x100/cccccc/000000?text=Proof+of+Address",
        liabilityInsuranceUrl: "https://placehold.co/100x100/cccccc/000000?text=Liability+Insurance",
    },
    {
        id: "reg-003",
        membershipId: "1236",
        name: "Circuit Breakers",
        fullName: "Alice Smith",
        email: "circuit.breakers@gmail.com",
        phone: "(987) 654-3210",
        registrationDate: "March 17, 2024",
        registeredDate: "20 Aug 2025",
        avatar: "https://placehold.co/100x100/A76241/ffffff?text=User",
        validIdUrl: "https://placehold.co/100x100/cccccc/000000?text=Valid+ID",
        driversLicenseUrl: "https://placehold.co/100x100/cccccc/000000?text=Driver%27s+License",
        profilePhotoUrl: "https://placehold.co/100x100/cccccc/000000?text=Profile+Photo",
        proofOfAddressUrl: "https://placehold.co/100x100/cccccc/000000?text=Proof+of+Address",
        liabilityInsuranceUrl: "https://placehold.co/100x100/cccccc/000000?text=Liability+Insurance",
    },
    {
        id: "reg-004",
        membershipId: "1237",
        name: "Voltage Vipers",
        fullName: "Bob Johnson",
        email: "vipers@gmail.com",
        phone: "(111) 222-3333",
        registrationDate: "March 18, 2024",
        registeredDate: "25 Sep 2025",
        avatar: "https://placehold.co/100x100/A76241/ffffff?text=User",
        validIdUrl: "https://placehold.co/100x100/cccccc/000000?text=Valid+ID",
        driversLicenseUrl: "https://placehold.co/100x100/cccccc/000000?text=Driver%27s+License",
        profilePhotoUrl: "https://placehold.co/100x100/cccccc/000000?text=Profile+Photo",
        proofOfAddressUrl: "https://placehold.co/100x100/cccccc/000000?text=Proof+of+Address",
        liabilityInsuranceUrl: "https://placehold.co/100x100/cccccc/000000?text=Liability+Insurance",
    },
];

const RegistrationDetailsPage = ({ params }) => {
    const router = useRouter();
    const { id } = params; // Get the registration ID from the URL
    const [registration, setRegistration] = useState(null);

    useEffect(() => {
        if (id) {
            // In a real application, you would fetch this from an API
            const foundRegistration = allRegistrations.find(r => r.id === id);
            setRegistration(foundRegistration);
        }
    }, [id]);

    const handleClose = () => {
        router.back(); // Go back to the previous page (ManageRegistration)
    };

    if (!registration) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800">
                <p>Loading registration details or registration not found...</p>
            </div>
        );
    }

    // Determine the user image to display
    const userAvatar = registration.avatar || "https://placehold.co/100x100/A76241/ffffff?text=User"; // Fallback if avatar is missing

    // Helper function to render document links/icons
    const renderDocument = (url, label) => (
        <div className="flex flex-col items-center text-center">
            <p className="text-gray-600 text-sm mb-1">{label}:</p>
            {url ? (
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                    <Image
                        src="https://www.svgrepo.com/show/508216/document.svg" // Generic document icon
                        alt={label}
                        width={40}
                        height={40}
                        className="cursor-pointer"
                        unoptimized
                    />
                </a>
            ) : (
                <span className="text-gray-400">N/A</span>
            )}
        </div>
    );

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
                        <p className="text-gray-800 text-lg font-semibold mb-1">Full name : {registration.fullName}</p>
                        <p className="text-gray-600 text-sm mb-1">Email: {registration.email}</p>
                        <p className="text-gray-600 text-sm mb-1">Phone number: {registration.phone}</p>
                        <p className="text-gray-600 text-sm">Registered Date: {registration.registeredDate}</p>
                    </div>
                </div>

                {/* Document Section */}
                <div className="grid grid-cols-2 gap-y-6 gap-x-4 mt-6">
                    {renderDocument(registration.validIdUrl, "Valid ID")}
                    {renderDocument(registration.driversLicenseUrl, "Driver's License")}
                    {renderDocument(registration.profilePhotoUrl, "Profile Photo")}
                    {renderDocument(registration.proofOfAddressUrl, "Proof of Address")}
                    {renderDocument(registration.liabilityInsuranceUrl, "Liability Insurance")}
                </div>
            </div>
        </div>
    );
};

export default RegistrationDetailsPage;
// pages/admin/rider-management/[id].jsx
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';

// Mock detailed rider data
const detailedRiders = [
  {
    id: 'rider-1',
    fullName: 'Jane Cooper',
    email: 'abc@example.com',
    phoneNumber: '(319) 555-0115',
    registeredDate: '12 Jun 2025',
    profileImage: 'https://placehold.co/100x100/ADD8E6/000000?text=JP', // Placeholder for profile image
    validIdType: 'Driver\'s License',
    validIdDocument: 'https://placehold.co/50x50/cccccc/000000?text=ID', // Placeholder for document icon
    driverLicenseDocument: 'https://placehold.co/50x50/cccccc/000000?text=DL', // Placeholder for document icon
    profilePhotoDocument: 'https://placehold.co/50x50/cccccc/000000?text=PP', // Placeholder for document icon
    proofOfAddressDocument: 'https://placehold.co/50x50/cccccc/000000?text=PA', // Placeholder for document icon
    liabilityInsuranceDocument: 'https://placehold.co/50x50/cccccc/000000?text=LI', // Placeholder for document icon
  },
  {
    id: 'rider-2',
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phoneNumber: '(123) 456-7890',
    registeredDate: '01 May 2025',
    profileImage: 'https://placehold.co/100x100/90EE90/000000?text=JD',
    validIdType: 'Passport',
    validIdDocument: 'https://placehold.co/50x50/cccccc/000000?text=ID',
    driverLicenseDocument: 'https://placehold.co/50x50/cccccc/000000?text=DL',
    profilePhotoDocument: 'https://placehold.co/50x50/cccccc/000000?text=PP',
    proofOfAddressDocument: 'https://placehold.co/50x50/cccccc/000000?text=PA',
    liabilityInsuranceDocument: 'https://placehold.co/50x50/cccccc/000000?text=LI',
  },
  {
    id: 'rider-3',
    fullName: 'Alice Williams',
    email: 'alice.w@example.com',
    phoneNumber: '(987) 654-3210',
    registeredDate: '20 Apr 2025',
    profileImage: 'https://placehold.co/100x100/DDA0DD/000000?text=AW',
    validIdType: 'State ID',
    validIdDocument: 'https://placehold.co/50x50/cccccc/000000?text=ID',
    driverLicenseDocument: 'https://placehold.co/50x50/cccccc/000000?text=DL',
    profilePhotoDocument: 'https://placehold.co/50x50/cccccc/000000?text=PP',
    proofOfAddressDocument: 'https://placehold.co/50x50/cccccc/000000?text=PA',
    liabilityInsuranceDocument: 'https://placehold.co/50x50/cccccc/000000?text=LI',
  },
  // Add more mock riders as needed
];

const RiderDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params; // Get the dynamic ID from the URL

  const [rider, setRider] = useState(null);

  useEffect(() => {
    // Simulate fetching data based on the ID
    const foundRider = detailedRiders.find(r => r.id === id);
    setRider(foundRider);
  }, [id]);

  if (!rider) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-gray-700">Loading rider details or rider not found...</p>
      </div>
    );
  }

  return (
    <div className=" min-h-screen bg-gray-100 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 relative w-full max-w-md shadow-lg text-black">
        {/* Close Button */}
        <button
          onClick={() => router.back()}
          className="absolute -top-3 -right-3 w-10 h-10 bg-[#B92921] text-[#FFF] rounded-full flex items-center justify-center shadow-md hover:bg-red-700 transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-[#FFF] "
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex items-start gap-4 mb-6">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <Image
              src={rider.profileImage}
              alt="Rider Profile"
              width={100}
              height={100}
              className="rounded-lg object-cover"
              unoptimized // For placeholder images
            />
          </div>

          {/* Rider Basic Info */}
          <div className="flex-grow">
            <p className="text-lg font-semibold text-gray-900 mb-1">Full name : {rider.fullName}</p>
            <p className="text-sm text-gray-700 mb-1">Email: {rider.email}</p>
            <p className="text-sm text-gray-700 mb-1">Phone number: {rider.phoneNumber}</p>
            <p className="text-sm text-gray-700">Registered Date: {rider.registeredDate}</p>
          </div>
        </div>

        {/* Documents Section */}
        <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
          {/* Valid ID */}
          <div>
            <p className="font-medium text-gray-800 mb-1">Valid ID :</p>
            <div className="flex items-center gap-2 text-blue-600">
              <Image
                src={rider.validIdDocument}
                alt="Valid ID"
                width={24}
                height={24}
                unoptimized
              />
              <span className="text-gray-700">{rider.validIdType}</span>
            </div>
          </div>

          {/* Driver's License */}
          <div>
            <p className="font-medium text-gray-800 mb-1">Drivers License :</p>
            <div className="flex items-center gap-2 text-blue-600">
              <Image
                src={rider.driverLicenseDocument}
                alt="Driver's License"
                width={24}
                height={24}
                unoptimized
              />
              <span className="text-gray-700">Document</span>
            </div>
          </div>

          {/* Profile Photo */}
          <div>
            <p className="font-medium text-gray-800 mb-1">Profile Photo:</p>
            <div className="flex items-center gap-2 text-blue-600">
              <Image
                src={rider.profilePhotoDocument}
                alt="Profile Photo"
                width={24}
                height={24}
                unoptimized
              />
              <span className="text-gray-700">Document</span>
            </div>
          </div>

          {/* Proof of Address */}
          <div>
            <p className="font-medium text-gray-800 mb-1">Proof of Address:</p>
            <div className="flex items-center gap-2 text-blue-600">
              <Image
                src={rider.proofOfAddressDocument}
                alt="Proof of Address"
                width={24}
                height={24}
                unoptimized
              />
              <span className="text-gray-700">Document</span>
            </div>
          </div>

          {/* Liability Insurance */}
          <div className="col-span-2"> {/* Span across two columns */}
            <p className="font-medium text-gray-800 mb-1">Liability Insurance:</p>
            <div className="flex items-center gap-2 text-blue-600">
              <Image
                src={rider.liabilityInsuranceDocument}
                alt="Liability Insurance"
                width={24}
                height={24}
                unoptimized
              />
              <span className="text-gray-700">Document</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderDetailsPage;

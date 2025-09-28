// pages/admin/support/[id].js
"use client";

import Image from "next/image";
import { useRouter, useParams } from "next/navigation"; // Import useParams
import React, { useState } from "react"; // Import useState

const SupportDetailsPage = () => {
  const router = useRouter();
  const params = useParams(); // Use useParams to get dynamic route parameters
  const { id } = params; // Extract the 'id' from params

  // State for the compensation type dropdown
  const [compensationType, setCompensationType] = useState("Free Delivery");

  // In a real application, you would fetch data here using the 'id'
  // For now, we'll simulate fetching by checking if the id matches.
  // This is a very basic dummy data setup.
  // In a real app, you'd likely have a function like `getTicketById(id)`
  // that fetches from an API or a local data source.
  const allDummyTickets = [
    {
      id: "TKT001",
      submittedBy: "John Doe",
      avatar: "https://placehold.co/96x96/cccccc/000000?text=JD", // Placeholder avatar
      dateSubmitted: "May 6, 2025",
      issueTitle: "Login Issue",
      userDescription:
        "I cannot log in to my account. I have tried resetting my password multiple times, but it doesn't work.",
      picture: "https://placehold.co/256x150/FF6347/FFFFFF?text=Issue+Image+1", // Example picture
    },
    {
      id: "TKT002",
      submittedBy: "Haus & Herz",
      avatar: "https://placehold.co/96x96/ADD8E6/000000?text=HH", // Placeholder avatar
      dateSubmitted: "May 7, 2025",
      issueTitle: "Payment Not Reflected", // Corrected title
      userDescription:
        "I made a payment using my card, but the order is not showing in my purchase history. I've also not received a confirmation email. Please look into it.",
      picture: "https://placehold.co/256x150/90EE90/000000?text=Issue+Image+2", // Replace with an actual path to the image you want to display
    },
    {
      id: "TKT003",
      submittedBy: "Jane Smith",
      avatar: "https://placehold.co/96x96/DDA0DD/000000?text=JS", // Placeholder avatar
      dateSubmitted: "May 8, 2025",
      issueTitle: "Product Delivery Delay",
      userDescription:
        "My recent order (ORD12345) has been delayed for over a week. The tracking information hasn't updated. Could you please provide an update?",
      picture: "", // No picture for this dummy ticket
    },
  ];

  // Find the ticket details based on the dynamic 'id'
  const ticketDetails = allDummyTickets.find((ticket) => ticket.id === id);

  if (!ticketDetails) {
    // You might want a better loading state or a "Ticket not found" message
    return <p>Loading or Ticket not found...</p>;
  }

  return (
    <div className="bg-white text-black p-6 sm:p-6 lg:p-8 rounded shadow min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => router.back()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          <h1 className="text-xl font-semibold">Support Details</h1>
        </div>

        {/* Select Compensation Type Dropdown */}
        <div className="flex items-center gap-2">
          <label
            htmlFor="compensationType"
            className="text-sm font-medium text-gray-700 whitespace-nowrap"
          >
            Select Compensation Type
          </label>
          <div className="relative">
            <select
              id="compensationType"
              name="compensationType"
              value={compensationType}
              onChange={(e) => setCompensationType(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50 text-gray-900 appearance-none pr-8"
            >
              <option value="Free Delivery">Free Delivery</option>
              <option value="Discount">Discount</option>
              <option value="Refund">Refund</option>
              <option value="Store Credit">Store Credit</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center mb-6">
        <div className="flex-shrink-0 h-24 w-24 rounded-full overflow-hidden border border-gray-300 mb-4">
          <Image
            src={ticketDetails.avatar}
            alt="User Avatar"
            width={96}
            height={96}
            className="h-full w-full object-cover"
            unoptimized // Added unoptimized for local/placeholder images
          />
        </div>
        <p className="text-xl font-semibold text-gray-900">
          {ticketDetails.submittedBy}
        </p>
        <p className="text-sm text-gray-500">
          Date Submitted: {ticketDetails.dateSubmitted}
        </p>
        {/* Checkmark and Cross Icons */}
        <div className="flex items-center gap-4 mt-2">
          <button className=" rounded-full   hover:bg-green-200 w-[26px] h-[26px] flex items-center justify-center border border-[#0053B2]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 12 9"
              fill="none"
            >
              <path
                d="M1.3335 5.66699C1.3335 5.66699 2.3335 5.66699 3.66683 8.00033C3.66683 8.00033 7.37271 1.88921 10.6668 0.666992"
                stroke="#0053B2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button className="  rounded-full  text-red-600 hover:bg-red-200 border border-[#FF0000] w-[26px] h-[26px] flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M10.6668 1.33301L1.3335 10.6663M1.3335 1.33301L10.6668 10.6663"
                stroke="#FF0000"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:w-[800px] items-center justify-center mx-auto">
        <div>
          <label
            htmlFor="issueTitle"
            className="block text-sm font-medium text-gray-700"
          >
            Issue Title
          </label>
          <input
            type="text"
            id="issueTitle"
            readOnly
            value={ticketDetails.issueTitle}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50 text-gray-900"
          />
        </div>

        <div>
          <label
            htmlFor="userDescription"
            className="block text-sm font-medium text-gray-700"
          >
            User Description
          </label>
          <textarea
            id="userDescription"
            readOnly
            rows="5"
            value={ticketDetails.userDescription}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50 text-gray-900 resize-none"
          ></textarea>
        </div>

        {ticketDetails.picture && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Picture
            </label>
            <div className="mt-1 w-full max-w-md h-auto border border-gray-300 rounded-md overflow-hidden ">
              {" "}
              {/* Adjusted width and added mx-auto for centering */}
              <Image
                src={ticketDetails.picture}
                alt="Issue Picture"
                width={256}
                height={150} // Adjust height as needed
                layout="responsive"
                objectFit="cover"
                unoptimized // Added unoptimized for local/placeholder images
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportDetailsPage;

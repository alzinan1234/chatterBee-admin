// components/PromotionApproval.js
"use client"; // This is a client component, necessary for useState and event handlers

import Image from "next/image";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

// Assuming these icons are in your public/icon directory
import eye from "../../../public/icon/eye.svg";

const dummyPromotions = [
  {
    id: "promo-001",
    submittedBy: "Pizzeria Bella",
    type: "Restaurant",
    title: "20% Off Friday",
    status: "Pending", // Can be 'Pending', 'Approved', 'Rejected'
    dateSubmitted: "Aug. 15, 2025",
    description: "Enjoy a fantastic 20% off on all pizzas and pasta every Friday! Perfect for a family dinner or a quick bite.",
    availability: "Friday only, 5 PM - 10 PM",
  },
  {
    id: "promo-002",
    submittedBy: "The Coffee Spot",
    type: "Bar/Restaurant",
    title: "Happy Hour Deals",
    status: "Approved",
    dateSubmitted: "July 20, 2025",
    description: "Unwind with our happy hour specials! Get discounted coffees, teas, and pastries. Enjoy the cozy ambiance.",
    availability: "Monday to Friday, 3 PM - 6 PM",
  },
  {
    id: "promo-003",
    submittedBy: "Burger Joint",
    type: "Restaurant",
    title: "Buy One Get One",
    status: "Rejected",
    dateSubmitted: "Aug. 01, 2025",
    description: "Our classic buy one get one free offer on all burgers. A perfect deal for sharing or doubling up!",
    availability: "Daily, 11 AM - 9 PM",
  },
  {
    id: "promo-004",
    submittedBy: "Brew & Bites",
    type: "Bar/Restaurant",
    title: "Live Music Saturdays",
    status: "Pending",
    dateSubmitted: "Sep. 01, 2025",
    description: "Experience the best local bands live every Saturday night. Great food, great drinks, great music!",
    availability: "Every Saturday, 8 PM - 11 PM",
  },
];

export default function PromotionApproval() {
  const router = useRouter(); // Initialize useRouter
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPromotions, setFilteredPromotions] = useState(dummyPromotions);

  // Function to handle search input changes
  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const newFilteredPromotions = dummyPromotions.filter(
      (promo) =>
        promo.submittedBy.toLowerCase().includes(term) ||
        promo.type.toLowerCase().includes(term) ||
        promo.title.toLowerCase().includes(term) ||
        promo.status.toLowerCase().includes(term) ||
        promo.dateSubmitted.toLowerCase().includes(term)
    );
    setFilteredPromotions(newFilteredPromotions);
  };

  // Action handlers
  const handleApprove = (promoId) => {
    setFilteredPromotions(prev =>
      prev.map(promo =>
        promo.id === promoId ? { ...promo, status: "Approved" } : promo
      )
    );
    // In a real application, you'd make an API call here.
    console.log(`Approved promotion: ${promoId}`);
  };

  const handleReject = (promoId) => {
    setFilteredPromotions(prev =>
      prev.map(promo =>
        promo.id === promoId ? { ...promo, status: "Rejected" } : promo
      )
    );
    // In a real application, you'd make an API call here.
    console.log(`Rejected promotion: ${promoId}`);
  };

  const handleView = (promoId) => {
    // Navigate to the dynamic promotion details page
    router.push(`/admin/promotion-approval/${promoId}`);
  };

  const handleFilterClick = () => {
    console.log("Filter button clicked! (Implement your filter modal/logic here)");
  };

  return (
    <div className="bg-[#343434] p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          {/* Back arrow icon - will navigate back using router.back() */}
       
          <h2 className="text-[20px] font-semibold text-white">
            Promotion Approval
          </h2>
        </div>

        {/* Search Input Field and Filter Button */}
        <div className="flex items-center">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 bg-[#F3FAFA1A] rounded-tl-[7.04px] rounded-bl-[7.04px] border-[1px] border-[#0000001A] text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-white"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <button
            onClick={handleFilterClick}
            className="hover:bg-gray-700 transition-colors bg-[#2A2A2A] p-[5px] rounded-tr-[7.04px] rounded-br-[7.04px]"
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

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-white bg-[#00C1C980] border-b border-gray-700">
              <th className="py-2 px-4 font-[700] text-[14px] text-center">
                Submitted By
              </th>
              <th className="py-2 px-4 font-[700] text-[14px] text-center">
                Type (Bar/Restaurant)
              </th>
              <th className="py-2 px-4 font-[700] text-[14px] text-center">
                Title
              </th>
              <th className="py-2 px-4 font-[700] text-[14px] text-center">
                Status
              </th>
              <th className="py-2 px-4 font-[700] text-[14px] text-center">
                Date Submitted
              </th>
              <th className="py-2 px-4 font-[700] text-[14px] text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredPromotions.length > 0 ? (
              filteredPromotions.map((promo) => (
                <tr key={promo.id} className="border-b border-gray-700 text-white">
                  <td className="py-2 px-4 text-center">{promo.submittedBy}</td>
                  <td className="py-2 px-4 text-center">{promo.type}</td>
                  <td className="py-2 px-4 text-center">{promo.title}</td>
                  <td className="py-2 px-4 text-center">
                    <span
                      className={`font-medium ${
                        promo.status === "Pending"
                          ? "text-[#FFC107]" // Yellow for Pending
                          : promo.status === "Approved"
                          ? "text-[#4CAF50]" // Green for Approved
                          : "text-[#F44336]" // Red for Rejected
                      }`}
                    >
                      {promo.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 text-center">{promo.dateSubmitted}</td>
                  <td className="py-2 px-4">
                    <div className="flex items-center justify-center gap-2">
                      {/* Approve (Green Check) */}
                      <button
                        onClick={() => handleApprove(promo.id)}
                        className="p-1 rounded-full text-[#73D100] border border-[#73D100] hover:bg-green-900 transition-colors duration-200"
                        style={{ backgroundColor: '#0053B200' }}
                        title="Approve"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </button>

                      {/* Reject (Red X) */}
                      <button
                        onClick={() => handleReject(promo.id)}
                        className="p-1 rounded-full text-[#FF0000] border border-[#FF0000] hover:bg-red-900 transition-colors duration-200"
                        style={{ backgroundColor: '' }}
                        title="Reject"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>

                      {/* View (Purple Eye) */}
                      <button
                        onClick={() => handleView(promo.id)} // Pass promo.id to navigate
                        className="p-1 rounded-full text-[#9900FF]  hover:bg-purple-900 transition-colors duration-200"
                        title="View Details"
                      >
                        <Image
                          src={eye}
                          alt="View"
                          width={28}
                          height={30}
                          className="inline"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-400">
                  No matching promotions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
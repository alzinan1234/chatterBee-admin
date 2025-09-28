// components/SupportTable.js
"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { EyeIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

const ITEMS_PER_PAGE = 10;
const PAGE_RANGE = 2;

// --- DUMMY DATA FUNCTION ---
// In a real application, this data would come from an API or database.
const getAllTicketsDummy = () => {
  return [
    {
      id: "TKT001",
      submittedBy: "Alice Johnson",
      avatar: "/image/userImage.png", // Ensure this path is correct or replace with a generic placeholder
      title: "Unable to reset password",
      dateSubmitted: "2025-07-15",
      description:
        "I tried to reset my password multiple times, but I keep getting an error message. Please help me access my account.",
      picture: null,
    },
    {
      id: "TKT002",
      submittedBy: "Haus & Herz",
      avatar: "/image/userImage.png", // Ensure this path is correct
      title: "Payment not reflecting in history",
      dateSubmitted: "2025-07-16",
      description:
        "I made a payment using my card, but the order is not showing in my purchase history. I've also not received a confirmation email. Please look into it.",
      picture: "/image/fast-food.jpeg", // Ensure this path is correct or replace with a generic placeholder
    },
    {
      id: "TKT003",
      submittedBy: "Bob Williams",
      avatar: "/image/userImage.png",
      title: "Product delivery delay",
      dateSubmitted: "2025-07-17",
      description:
        "My recent order (ORD12345) has been delayed for over a week. The tracking information hasn't updated. Could you please provide an update?",
      picture: null,
    },
  ];
};
// --- END DUMMY DATA FUNCTION ---

const SupportTable = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [allTickets, setAllTickets] = useState([]);
  const [displayedTickets, setDisplayedTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Fetch and filter tickets
  useEffect(() => {
    // Now calling the dummy data function
    const fetchedTickets = getAllTicketsDummy();
    const filtered = fetchedTickets.filter(
      (ticket) =>
        ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.submittedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setAllTickets(filtered);
    setCurrentPage(1);
  }, [searchTerm, refreshTrigger]);

  // Update displayed tickets based on current page and allTickets
  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setDisplayedTickets(allTickets.slice(startIndex, endIndex));
  }, [currentPage, allTickets]);

  const totalPages = Math.ceil(allTickets.length / ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleViewDetails = (ticketId) => {
    router.push(`/admin/support/${ticketId}`);
  };

  const pageNumbers = useMemo(() => {
    const pages = [];
    const maxPageButtons = PAGE_RANGE * 2 + 1;

    if (totalPages <= maxPageButtons + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const leftBound = Math.max(1, currentPage - PAGE_RANGE);
      const rightBound = Math.min(totalPages, currentPage + PAGE_RANGE);

      if (currentPage > PAGE_RANGE + 1 && totalPages > maxPageButtons + 2) {
        pages.push(1);
      }

      if (leftBound > 2) {
        pages.push("...");
      }

      for (let i = leftBound; i <= rightBound; i++) {
        if (i !== 1 || pages.includes(1)) {
          if (i === totalPages && pages.includes(totalPages)) {
            // Skip if totalPages is already added
          } else {
            pages.push(i);
          }
        }
      }

      if (rightBound < totalPages - 1) {
        pages.push("...");
      }

      if (totalPages !== 1 && !pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }
    return [...new Set(pages)].sort((a, b) => {
      if (a === "...") return 1;
      if (b === "...") return -1;
      return a - b;
    });
  }, [currentPage, totalPages]);

  return (
    <>
      <div className="bg-white text-black p-6 sm:p-6 lg:p-8 rounded shadow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-[20px] sm:text-3xl font-semibold">Support</h1>
          <div className="flex items-center">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 bg-gray-50 rounded-tl-[7.04px] rounded-bl-[7.04px] border-[1px] border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className=" transition-colors bg-[#B92921] text-white p-[5px] rounded-tr-[7.04px] rounded-br-[7.04px] border-[1px] border-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <path
                  d="M11 8.5L20 8.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M4 16.5L14 16.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <ellipse
                  cx="7"
                  cy="8.5"
                  rx="3"
                  ry="3"
                  transform="rotate(90 7 8.5)"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <ellipse
                  cx="17"
                  cy="16.5"
                  rx="3"
                  ry="3"
                  transform="rotate(90 17 16.5)"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="border-b border-gray-200 rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-red-600">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-semibold text-white tracking-wider"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-semibold text-white tracking-wider"
                >
                  Submitted By
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-semibold text-white tracking-wider"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-semibold text-white tracking-wider"
                >
                  Date Submitted
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-semibold text-white tracking-wider"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {displayedTickets.length > 0 ? (
                displayedTickets.map((ticket) => (
                  <tr key={ticket.id} className="bg-white hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                      {ticket.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                      <div className="flex items-center justify-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full overflow-hidden border border-gray-300">
                          <Image
                            src={ticket.avatar}
                            alt="User Avatar"
                            width={32}
                            height={32}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {ticket.submittedBy}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                      {ticket.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-center">
                      {ticket.dateSubmitted}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                      <div className="flex justify-center space-x-2">

                           <Image
                        className="cursor-pointer"
                        src="/icon/right.svg" // Assuming this is your edit icon
                        alt="Edit"
                        width={26}
                        height={26}
                        onClick={() => handleEdit(row.id)}
                        unoptimized
                      />
                      <Image
                        className="cursor-pointer"
                        src="/icon/trash.svg"
                        alt="Delete"
                        width={26}
                        height={26}
                        onClick={() => handleDelete(row.id)}
                        unoptimized
                      />
                        <button
                          onClick={() => handleViewDetails(ticket.id)}
                          className="text-purple-600 cursor-pointer border border-[#9900FF] hover:text-purple-800 w-[26px] h-[26px] flex items-center justify-center rounded-full hover:bg-purple-100 transition-colors duration-200"
                          aria-label="View details"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="11"
                            viewBox="0 0 16 11"
                            fill="none"
                          >
                            <path
                              d="M14.3628 4.97335C14.5655 5.25756 14.6668 5.39967 14.6668 5.61003C14.6668 5.82038 14.5655 5.96249 14.3628 6.2467C13.4521 7.52373 11.1263 10.2767 8.00016 10.2767C4.87402 10.2767 2.54823 7.52373 1.63752 6.2467C1.43484 5.96249 1.3335 5.82038 1.3335 5.61003C1.3335 5.39967 1.43484 5.25756 1.63752 4.97335C2.54823 3.69632 4.87402 0.943359 8.00016 0.943359C11.1263 0.943359 13.4521 3.69632 14.3628 4.97335Z"
                              stroke="#9900FF"
                            />
                            <path
                              d="M10 5.61035C10 4.50578 9.10457 3.61035 8 3.61035C6.89543 3.61035 6 4.50578 6 5.61035C6 6.71492 6.89543 7.61035 8 7.61035C9.10457 7.61035 10 6.71492 10 5.61035Z"
                              stroke="#9900FF"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-sm text-gray-600"
                  >
                    No support tickets found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-end items-center mt-8 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-full bg-gray-100 border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          {pageNumbers.map((page, index) =>
            page === "..." ? (
              <span
                key={`ellipsis-${index}`}
                className="px-4 py-2 text-gray-700"
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                } transition-colors duration-200`}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full bg-gray-100 border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5 15.75 12l-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default SupportTable;

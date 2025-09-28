// components/BannerApproval.js
"use client"; // This is a client component, necessary for useState and event handlers

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation"; // Import useRouter

// Extended dummy banner data to include details for the BannerCard
const initialDummyBanners = [
  {
    id: "banner-001",
    submittedBy: "Pizzeria Bella",
    type: "Restaurant",
    title: "20% Off Friday Banner",
    status: "Pending",
    dateSubmitted: "Aug. 15, 2025",
    imageUrl: "https://via.placeholder.com/600x400/FF5733/FFFFFF?text=Pizza+Offer",
    description: "Get 20% off all pizzas every Friday! Limited time offer.",
    startDate: "2025-08-15",
    startTime: "11:00 AM",
    endTime: "10:00 PM",
    location: "Main Street Branch",
  },
  {
    id: "banner-002",
    submittedBy: "The Coffee Spot",
    type: "Bar/Restaurant",
    title: "New Coffee Flavor Banner",
    status: "Approved",
    dateSubmitted: "July 20, 2025",
    imageUrl: "https://via.placeholder.com/600x400/33A0FF/FFFFFF?text=New+Coffee",
    description: "Experience our delicious new seasonal coffee flavor, 'Autumn Spice Latte'.",
    startDate: "2025-07-20",
    startTime: "07:00 AM",
    endTime: "06:00 PM",
    location: "City Center Cafe",
  },
  {
    id: "banner-003",
    submittedBy: "Fashion Outlet",
    type: "Retail",
    title: "Summer Sale Banner",
    status: "Rejected",
    dateSubmitted: "Aug. 01, 2025",
    imageUrl: "https://via.placeholder.com/600x400/FF33E9/FFFFFF?text=Summer+Sale",
    description: "Up to 50% off on all summer collections! Don't miss out.",
    startDate: "2025-08-01",
    startTime: "09:00 AM",
    endTime: "09:00 PM",
    location: "Fashion Avenue Mall",
  },
  {
    id: "banner-004",
    submittedBy: "Tech Gadgets Inc.",
    type: "Electronics",
    title: "New Arrivals Banner",
    status: "Pending",
    dateSubmitted: "Sep. 01, 2025",
    imageUrl: "https://via.placeholder.com/600x400/33FF8A/FFFFFF?text=New+Gadgets",
    description: "Check out our latest innovations in consumer electronics.",
    startDate: "2025-09-01",
    startTime: "09:00 AM",
    endTime: "07:00 PM",
    location: "Online Store & Showroom",
  },
  {
    id: "banner-005",
    submittedBy: "Game Zone",
    type: "Entertainment",
    title: "Winter Tournament Banner",
    status: "Approved",
    dateSubmitted: "Oct. 10, 2025",
    imageUrl: "https://via.placeholder.com/600x400/334EFF/FFFFFF?text=Gaming+Event",
    description: "Compete in our annual Winter Gaming Tournament for grand prizes!",
    startDate: "2025-10-10",
    startTime: "01:00 PM",
    endTime: "09:00 PM",
    location: "Game Zone Arena",
  },
  {
    id: "banner-006",
    submittedBy: "Healthy Bites",
    type: "Restaurant",
    title: "Vegan Menu Launch Banner",
    status: "Pending",
    dateSubmitted: "Oct. 25, 2025",
    imageUrl: "https://via.placeholder.com/600x400/8AFF33/FFFFFF?text=Vegan+Menu",
    description: "Discover our new delicious and wholesome vegan menu options.",
    startDate: "2025-10-25",
    startTime: "12:00 PM",
    endTime: "09:00 PM",
    location: "Green Leaf Eatery",
  },
  {
    id: "banner-007",
    submittedBy: "Book Nook",
    type: "Retail",
    title: "Holiday Reading List Banner",
    status: "Pending",
    dateSubmitted: "Nov. 05, 2025",
    imageUrl: "https://via.placeholder.com/600x400/E9FF33/FFFFFF?text=Books",
    description: "Find your next great read with our curated holiday reading list.",
    startDate: "2025-11-05",
    startTime: "10:00 AM",
    endTime: "08:00 PM",
    location: "Cozy Corner Bookstore",
  },
  {
    id: "banner-008",
    submittedBy: "Auto Repair Pro",
    type: "Service",
    title: "Fall Maintenance Banner",
    status: "Approved",
    dateSubmitted: "Sep. 15, 2025",
    imageUrl: "https://via.placeholder.com/600x400/FF3333/FFFFFF?text=Car+Service",
    description: "Get your vehicle ready for winter with our comprehensive fall maintenance.",
    startDate: "2025-09-15",
    startTime: "08:00 AM",
    endTime: "05:00 PM",
    location: "Industrial Park Garage",
  },
  {
    id: "banner-009",
    submittedBy: "Local Gym",
    type: "Fitness",
    title: "New Year Resolution Banner",
    status: "Pending",
    dateSubmitted: "Dec. 01, 2025",
    imageUrl: "https://via.placeholder.com/600x400/33D4FF/FFFFFF?text=Fitness",
    description: "Achieve your fitness goals with our exclusive New Year membership deals.",
    startDate: "2025-12-01",
    startTime: "06:00 AM",
    endTime: "10:00 PM",
    location: "Downtown Fitness Center",
  },
  {
    id: "banner-010",
    submittedBy: "Art Gallery",
    type: "Arts",
    title: "Exhibition Opening Banner",
    status: "Rejected",
    dateSubmitted: "Aug. 20, 2025",
    imageUrl: "https://via.placeholder.com/600x400/FF8A33/FFFFFF?text=Art+Exhibition",
    description: "Join us for the grand opening of 'Modern Visions' art exhibition.",
    startDate: "2025-08-20",
    startTime: "07:00 PM",
    endTime: "10:00 PM",
    location: "Cultural Arts Centre",
  },
  // Example for 'Taco Tuesday' from your image
  {
    id: "banner-011",
    submittedBy: "Luna Lounge",
    type: "Bar/Restaurant",
    title: "Celebrate Taco Tuesday!",
    status: "Approved",
    dateSubmitted: "May 10, 2025",
    imageUrl: "https://via.placeholder.com/600x400/B8255F/FFFFFF?text=Taco+Tuesday",
    description: "Buy 1 Get 1 Free on Tacos from 5–9 PM",
    startDate: "2025-05-10",
    startTime: "08:00 PM",
    endTime: "01:00 AM",
    location: "Luna Lounge, Downtown LA",
  },
  {
    id: "banner-012",
    submittedBy: "The Coffee Spot",
    type: "Bar/Restaurant",
    title: "Loyalty Program Banner",
    status: "Pending",
    dateSubmitted: "June 10, 2025",
    imageUrl: "https://via.placeholder.com/600x400/33FF57/FFFFFF?text=Loyalty",
    description: "Join our loyalty program and get exclusive discounts and freebies.",
    startDate: "2025-06-10",
    startTime: "07:00 AM",
    endTime: "06:00 PM",
    location: "All Coffee Spot Branches",
  },
  {
    id: "banner-013",
    submittedBy: "Fashion Outlet",
    type: "Retail",
    title: "Clearance Sale Banner",
    status: "Approved",
    dateSubmitted: "May 20, 2025",
    imageUrl: "https://via.placeholder.com/600x400/5733FF/FFFFFF?text=Clearance",
    description: "Final clearance sale on last season's styles. Shop now!",
    startDate: "2025-05-20",
    startTime: "09:00 AM",
    endTime: "09:00 PM",
    location: "Fashion Outlet Store",
  },
];


const itemsPerPage = 10; // Define items per page

export default function BannerApproval() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [allBanners, setAllBanners] = useState(initialDummyBanners); // State for modifiable banner list
  const router = useRouter(); // Initialize router

  // Filter banners based on search term
  const filteredBanners = useMemo(() => {
    return allBanners.filter(
      (banner) =>
        banner.submittedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
        banner.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        banner.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        banner.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        banner.dateSubmitted.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, allBanners]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredBanners.length / itemsPerPage);

  // Get banners for the current page
  const paginatedBanners = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredBanners.slice(startIndex, endIndex);
  }, [currentPage, filteredBanners]);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Generate pagination numbers with ellipses
  const pageNumbers = useMemo(() => {
    const pages = [];
    const maxPagesToShow = 5; // e.g., 1, 2, 3, ..., N

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) {
        pages.push("...");
      }

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        end = maxPagesToShow - 1;
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - (maxPagesToShow - 2);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }
      pages.push(totalPages);
    }
    return pages;
  }, [currentPage, totalPages]);


  // Action handlers
  const handleApprove = (bannerId) => {
    setAllBanners(prevBanners =>
      prevBanners.map(banner =>
        banner.id === bannerId ? { ...banner, status: "Approved" } : banner
      )
    );
    alert(`Approved banner: ${bannerId}`);
  };

  const handleReject = (bannerId) => {
    setAllBanners(prevBanners =>
      prevBanners.map(banner =>
        banner.id === bannerId ? { ...banner, status: "Rejected" } : banner
      )
    );
    alert(`Rejected banner: ${bannerId}`);
  };

  const handleView = (banner) => {
    // Navigate to the dynamic banner details page
    router.push(`/admin/banner-approval/${banner.id}`);
  };

  const handleFilterClick = () => {
    alert("Filter button clicked! (Implement your filter modal/logic here)");
  };

  return (
   <div>
     <div className="bg-[#343434] p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          {/* Back arrow icon */}
          
          <h2 className="text-[20px] font-semibold text-white">
            Banner Approval
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
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
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
            {paginatedBanners.length > 0 ? (
              paginatedBanners.map((banner) => (
                <tr
                  key={banner.id}
                  className="border-b border-gray-700 text-white"
                >
                  <td className="py-2 px-4 text-center">
                    {banner.submittedBy}
                  </td>
                  <td className="py-2 px-4 text-center">{banner.type}</td>
                  <td className="py-2 px-4 text-center">{banner.title}</td>
                  <td className="py-2 px-4 text-center">
                    <span
                      className={`font-medium ${
                        banner.status === "Pending"
                          ? "text-[#FFC107]" // Yellow for Pending
                          : banner.status === "Approved"
                          ? "text-[#4CAF50]" // Green for Approved
                          : "text-[#F44336]" // Red for Rejected
                      }`}
                    >
                      {banner.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 text-center">
                    {banner.dateSubmitted}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-2">
                      {/* Approve (Green Check) */}
                      <button
                        onClick={() => handleApprove(banner.id)}
                        className=" w-[26px] h-[26px] flex items-center justify-center rounded-full border border-[#73D100]"
                        title="Approve"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="10"
                          viewBox="0 0 12 10"
                          fill="none"
                        >
                          <path
                            d="M1.33301 6.27637C1.33301 6.27637 2.33301 6.27637 3.66634 8.6097C3.66634 8.6097 7.37222 2.49859 10.6663 1.27637"
                            stroke="#73D100"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>

                      {/* Reject (Red X) */}
                      <button
                        onClick={() => handleReject(banner.id)}
                        className="w-[26px] h-[26px] flex items-center justify-center rounded-full border border-[#FF0000]"
                        title="Reject"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="11"
                          viewBox="0 0 12 11"
                          fill="none"
                        >
                          <path
                            d="M10.6663 0.943359L1.33301 10.2767M1.33301 0.943359L10.6663 10.2767"
                            stroke="#FF0000"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>

                      {/* View (Purple Eye) */}
                      <button
                        onClick={() => handleView(banner)}
                        className="w-[26px] h-[26px] flex items-center justify-center rounded-[30px] border border-[#C267FF]"
                        title="View Details"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="11"
                          viewBox="0 0 16 11"
                          fill="none"
                        >
                          <path
                            d="M14.3623 4.97335C14.565 5.25756 14.6663 5.39967 14.6663 5.61003C14.6663 5.82038 14.565 5.96249 14.3623 6.2467C13.4516 7.52373 11.1258 10.2767 7.99967 10.2767C4.87353 10.2767 2.54774 7.52373 1.63704 6.2467C1.43435 5.96249 1.33301 5.82038 1.33301 5.61003C1.33301 5.39967 1.43435 5.25756 1.63703 4.97335C2.54774 3.69632 4.87353 0.943359 7.99967 0.943359C11.1258 0.943359 13.4516 3.69632 14.3623 4.97335Z"
                            stroke="#C267FF"
                          />
                          <path
                            d="M10 5.60986C10 4.50529 9.10457 3.60986 8 3.60986C6.89543 3.60986 6 4.50529 6 5.60986C6 6.71443 6.89543 7.60986 8 7.60986C9.10457 7.60986 10 6.71443 10 5.60986Z"
                            stroke="#C267FF"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-400">
                  No matching banners found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

     
    </div>
     {/* Pagination */}
      <div className="flex justify-end items-center mt-8 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-full bg-[#262626] border border-[#404040] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#404040] transition-colors duration-200"
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
            <span key={`ellipsis-${index}`} className="px-4 py-2 text-white">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded ${
                currentPage === page
                  ? "bg-[#21F6FF] text-black"
                  : "text-white hover:bg-[#404040]"
              } transition-colors duration-200`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-full bg-[#262626] border border-[#404040] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#404040] transition-colors duration-200"
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
   </div>
  );
}
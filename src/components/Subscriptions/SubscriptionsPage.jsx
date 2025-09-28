"use client";
import { useState, useMemo } from "react"; // Import useMemo for performance optimization
import CreateSubscriptionModal from "./CreateSubscriptionModal";
import ViewCategoryModal from "./ViewCategoryModal";
import CreateCategoryModal from "./CreateCategoryModal";

// Define items per page for pagination
const ITEMS_PER_PAGE = 3; // Based on your screenshot, 3 subscriptions are displayed horizontally

export default function SubscriptionsPage() {
  const [showCreateSubscriptionModal, setShowCreateSubscriptionModal] =
    useState(false);
  const [showViewCategoryModal, setShowViewCategoryModal] = useState(false);
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // State for current pagination page
  const [selectedFilter, setSelectedFilter] = useState("All"); // State for the filter dropdown

  // Sample subscription data (now mutable with useState)
  // I've added a 'targetAudience' field for filtering purposes, as 'Type' wasn't present
  const [subscriptions, setSubscriptions] = useState([
    {
      id: 1,
      title: "Premium Membership",
      frequency: "Monthly",
      price: "₦2,000",
      features: [
        "Get Unlimited Dear Diary Entries",
        "Get Full Check-In",
        "Exclusive Discounts on Safety Store Products",
        "20% off all therapy session",
        "Can add up to 5 contact",
      ],
      targetAudience: "Service Provider", // Added for filtering
    },
    {
      id: 2,
      title: "Pro Plan",
      frequency: "Annually",
      price: "₦20,000",
      features: [
        "All Premium Membership features",
        "Priority Support",
        "Early access to new features",
        "Customizable reports",
        "Can add up to 10 contacts",
      ],
      targetAudience: "User", // Added for filtering
    },
    {
      id: 3,
      title: "Basic Plan",
      frequency: "Quarterly",
      price: "₦5,000",
      features: [
        "Limited Dear Diary Entries (10 per month)",
        "Basic Check-In",
        "10% off selected Safety Store Products",
        "10% off all therapy session",
        "Can add up to 2 contacts",
      ],
      targetAudience: "Vendor", // Added for filtering
    },
    {
      id: 4,
      title: "Enterprise Plan",
      frequency: "Monthly",
      price: "₦50,000",
      features: [
        "Unlimited Dear Diary Entries",
        "Full Check-In",
        "Exclusive Discounts on Safety Store Products",
        "30% off all therapy session",
        "Can add up to 20 contacts",
        "Dedicated Account Manager",
      ],
      targetAudience: "Service Provider", // Added for filtering
    },
    {
      id: 5,
      title: "Starter Plan",
      frequency: "Annually",
      price: "₦10,000",
      features: [
        "Limited Dear Diary Entries (20 per month)",
        "Full Check-In",
        "5% off selected Safety Store Products",
        "No therapy session discount",
        "Can add up to 3 contacts",
      ],
      targetAudience: "User", // Added for filtering
    },
    {
      id: 6,
      title: "Partnership Plan",
      frequency: "Quarterly",
      price: "₦15,000",
      features: [
        "All Basic Plan features",
        "Joint Marketing Opportunities",
        "Access to Partner Portal",
        "Can add up to 7 contacts",
      ],
      targetAudience: "Vendor", // Added for filtering
    },
  ]);

  // Filter subscriptions based on selectedFilter
  const filteredSubscriptions = useMemo(() => {
    if (selectedFilter === "All") {
      return subscriptions;
    }
    return subscriptions.filter((sub) => sub.targetAudience === selectedFilter);
  }, [subscriptions, selectedFilter]);

  // Calculate total pages for filtered subscriptions
  const totalPages = Math.ceil(filteredSubscriptions.length / ITEMS_PER_PAGE);

  // Get subscriptions for the current page
  const paginatedSubscriptions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredSubscriptions.slice(startIndex, endIndex);
  }, [currentPage, filteredSubscriptions]);

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

  const openCreateSubscriptionModal = () => {
    setEditingSubscription(null); // Ensure we're in 'create' mode
    setShowCreateSubscriptionModal(true);
  };
  const closeCreateSubscriptionModal = () =>
    setShowCreateSubscriptionModal(false);

  const openViewCategoryModal = () => setShowViewCategoryModal(true);
  const closeViewCategoryModal = () => setShowViewCategoryModal(false);

  const openCreateCategoryModal = () => setShowCreateCategoryModal(true);
  const closeCreateCategoryModal = () => setShowCreateCategoryModal(false);

  const handleAddSubscription = (newSubscription) => {
    setSubscriptions((prevSubscriptions) => [
      ...prevSubscriptions,
      { ...newSubscription, id: prevSubscriptions.length + 1 }, // Simple ID generation
    ]);
    setShowCreateSubscriptionModal(false);
  };

  const handleUpdateSubscription = (updatedSubscription) => {
    setSubscriptions((prevSubscriptions) =>
      prevSubscriptions.map((sub) =>
        sub.id === updatedSubscription.id ? updatedSubscription : sub
      )
    );
    setEditingSubscription(null); // Clear editing state
    setShowCreateSubscriptionModal(false);
  };

  const handleDeleteSubscription = (id) => {
    if (window.confirm("Are you sure you want to delete this subscription?")) {
      setSubscriptions((prevSubscriptions) =>
        prevSubscriptions.filter((sub) => sub.id !== id)
      );
    }
  };

  const handleEditClick = (subscription) => {
    setEditingSubscription(subscription);
    setShowCreateSubscriptionModal(true);
  };

  return (
    <div>
      <div className="bg-[#2E2E2E] min-h-screen text-white p-8 rounded">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-[20px] font-semibold">Subscriptions</h1>
          <div className="flex items-center gap-4">
            {/* For Service Providers Dropdown */}
            <div className="relative">
              <select
                value={selectedFilter}
                onChange={(e) => {
                  setSelectedFilter(e.target.value);
                  setCurrentPage(1); // Reset to first page on filter change
                }}
                className="appearance-none bg-transparent border border-[#404040] text-white py-2 pl-4 pr-8 rounded-[18px] focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                style={{
                  background:
                    "url(\"data:image/svg+xml;utf8,<svg fill='white' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>\") no-repeat right 8px center",
                  backgroundSize: "20px",
                }}
              >
                <option value="All" className="bg-[#2E2E2E]">
                  All
                </option>
                <option value="Service Provider" className="bg-[#2E2E2E]">
                  For Service Providers
                </option>
                <option value="User" className="bg-[#2E2E2E]">
                  For Users
                </option>
                <option value="Vendor" className="bg-[#2E2E2E]">
                  For Vendors
                </option>
              </select>
            </div>

            {/* Create Subscriptions Button */}
            <button
              onClick={openCreateSubscriptionModal}
              className="flex items-center gap-2 pl-[2px] pr-[13px] py-1"
              style={{
                borderRadius: "22px",
                background: "rgba(255,255,255,0.10)",
              }}
            >
              <span className="w-[27px] h-[27px] flex items-center justify-center text-black rounded-full bg-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 27 27"
                  fill="none"
                >
                  <path
                    d="M13.49 6.75L13.49 20.25"
                    stroke="#6A6A6A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M20.24 13.5L6.73999 13.5"
                    stroke="#6A6A6A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="text-white font-medium text-[12px]">
                Create Subscriptions
              </span>
            </button>
          </div>
        </div>

        <div className="md:flex gap-[26px] flex-wrap">
          {" "}
          {/* Added flex-wrap for responsiveness */}
          {paginatedSubscriptions.length > 0 ? (
            paginatedSubscriptions.map((subscription) => (
              <div
                key={subscription.id}
                className="border border-[#E4E4E4] rounded-lg p-6 shadow-lg w-[338px] h-auto mb-6" // Added mb-6 for vertical spacing on wrap
              >
                <h2 className="text-[24px] text-[#BBBBBB] font-semibold mb-2">
                  {subscription.title}
                </h2>
                <p className="text-[30px] font-semibold mb-4 bg-gradient-to-b from-[#FFFFFF] to-[#686868] text-transparent bg-clip-text">
                  {subscription.frequency}
                </p>
                <p className="text-5xl font-semibold mb-6 bg-gradient-to-b from-[#FFFFFF] to-[#686868] text-transparent bg-clip-text">
                  {subscription.price}
                </p>

                <ul className="space-y-3 mb-6 text-[#595959]">
                  {subscription.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg
                        className="w-7 h-5 text-[#595959] mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditClick(subscription)}
                    className="text-gray-400 hover:text-white border p-[10px] border-[#FFFFFF1A] rounded-full"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      ></path>
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteSubscription(subscription.id)}
                    className="text-red-500 hover:text-red-400 border rounded-full border-[#FF000033] p-[10px]"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full text-center py-8 text-gray-400">
              No subscriptions found for the selected filter.
            </div>
          )}
        </div>

       

        {showCreateSubscriptionModal && (
          <CreateSubscriptionModal
            onClose={closeCreateSubscriptionModal}
            onViewCategory={openViewCategoryModal}
            onCreateCategory={openCreateCategoryModal}
            initialData={editingSubscription}
            onSave={
              editingSubscription
                ? handleUpdateSubscription
                : handleAddSubscription
            }
          />
        )}
        {showViewCategoryModal && (
          <ViewCategoryModal onClose={closeViewCategoryModal} />
        )}
        {showCreateCategoryModal && (
          <CreateCategoryModal onClose={closeCreateCategoryModal} />
        )}
      </div>
       {/* Pagination Section */}
        {totalPages > 1 && ( // Only show pagination if there's more than 1 page
          <div className="flex justify-end items-center mt-6 gap-2 text-sm">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center rounded-full border hover:bg-[#2d2d2d] text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
              >
                <path
                  d="M6.99995 13C6.99995 13 1.00001 8.58107 0.999999 6.99995C0.999986 5.41884 7 1 7 1"
                  stroke="#E2E2E2"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>

            {pageNumbers.map((page, index) =>
              page === "..." ? (
                <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-8 h-8 flex items-center justify-center rounded ${
                    currentPage === page
                      ? "bg-[#21F6FF] text-white"
                      : "hover:bg-[#2d2d2d] text-gray-400"
                  }`}
                >
                  {page}
                </button>
              )
            )}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-full border hover:bg-[#2d2d2d] text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
              >
                <path
                  d="M1.00005 1C1.00005 1 6.99999 5.41893 7 7.00005C7.00001 8.58116 1 13 1 13"
                  stroke="#C8C8C8"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        )}
    </div>
  );
}

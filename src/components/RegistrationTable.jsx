// components/RegistrationTable.js
"use client"; // This is a client component, necessary for useState and event handlers

import Image from "next/image";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter

// Assuming 'eye.svg' is in your public/icon directory
import eyeIcon from "../../public/icon/eye.svg";

// Dummy data updated to match the new table structure
const dummyRows = [
  {
    id: "reg-001",
    membershipId: "1234",
    name: "Robo Gladiators",
    avatar: "/path/to/avatar.png", // Add a path to a placeholder or real avatar
    email: "robo.g@gmail.com",
    registrationDate: "March 15, 2024",
  },
  {
    id: "reg-002",
    membershipId: "1235",
    name: "Tech Titans",
    avatar: "/path/to/avatar.png",
    email: "titans.tech@gmail.com",
    registrationDate: "March 16, 2024",
  },
  {
    id: "reg-003",
    membershipId: "1236",
    name: "Circuit Breakers",
    avatar: "/path/to/avatar.png",
    email: "circuit.breakers@gmail.com",
    registrationDate: "March 17, 2024",
  },
  {
    id: "reg-004",
    membershipId: "1237",
    name: "Voltage Vipers",
    avatar: "/path/to/avatar.png",
    email: "vipers@gmail.com",
    registrationDate: "March 18, 2024",
  },
];

export default function RiderRegistration() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRows, setFilteredRows] = useState(dummyRows);
  const router = useRouter(); // Initialize useRouter

  // Function to handle search input changes
  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const newFilteredRows = dummyRows.filter(
      (row) =>
        row.membershipId.toLowerCase().includes(term) || // Search by Membership ID
        row.name.toLowerCase().includes(term) ||
        row.email.toLowerCase().includes(term) ||
        row.registrationDate.toLowerCase().includes(term)
    );
    setFilteredRows(newFilteredRows);
  };

  // Original Action handlers
  const handleView = (rowId) => {
    router.push(`/admin/rider-registrations/${rowId}`); // Navigate to the dynamic details page
  };

  const handleDelete = (rowId) => {
    if (confirm(`Are you sure you want to delete ${rowId}?`)) {
      alert(`Deleting: ${rowId}`);
      // Implement actual deletion logic, e.g., update state or call API
      setFilteredRows((prevRows) => prevRows.filter((row) => row.id !== rowId));
    }
  };

  const handleEdit = (rowId) => {
    alert(`Editing: ${rowId}`);
    // Implement edit form/modal logic here
  };


  const handleFilterClick = () => {
    alert("Filter button clicked! (Implement your filter modal/logic here)");
  };

  return (
    <div style={{ boxShadow: '0px 4px 14.7px 0px rgba(0, 0, 0, 0.25)' }} className="bg-white p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[20px] font-semibold text-black">
          Rider Registrations
        </h2>

        {/* Search Input Field and Filter Button */}
        <div className="flex items-center">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#A4A4A4]" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 text-[#0f0f0f] rounded-tl-[7.04px] rounded-bl-[7.04px] border-[1px] border-[#0000001A] text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <button
            onClick={handleFilterClick}
            className="hover:bg-gray-700 transition-colors bg-[#C12722] p-[5px] rounded-tr-[7.04px] rounded-br-[7.04px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
            >
              <path d="M11 8.5L20 8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M4 16.5L14 16.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              <ellipse cx="7" cy="8.5" rx="3" ry="3" transform="rotate(90 7 8.5)" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              <ellipse cx="17" cy="16.5" rx="3" ry="3" transform="rotate(90 17 16.5)" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-white bg-[#C12722] border-b border-gray-700 ">
              <th className="py-3 px-4 font-bold text-[14px] text-center">Membership ID</th>
              <th className="py-3 px-4 font-bold text-[14px] text-center">Name</th>
              <th className="py-3 px-4 font-bold text-[14px] text-center">Email</th>
              <th className="py-3 px-4 font-bold text-[14px] text-center">Registration Date</th>
              <th className="py-3 px-4 font-bold text-[14px] text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.length > 0 ? (
              filteredRows.map((row) => (
                <tr key={row.id} className="border-b border-gray-200 text-black hover:bg-gray-50">
                  <td className="py-3 px-4 text-center">{row.membershipId}</td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                         {/* This shows the first letter of the name as a fallback avatar */}
                        <span className="text-sm font-semibold text-gray-600">
                          {row.name.charAt(0)}
                        </span>
                      </div>
                      <span>{row.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">{row.email}</td>
                  <td className="py-3 px-4 text-center">{row.registrationDate}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-2">
                      {/* Original Action Icons Restored */}
                      <Image
                        className="cursor-pointer"
                        src="/icon/right.svg" // Assuming this is your edit icon
                        alt="Edit"
                        width={26}
                        height={26}
                        onClick={() => handleEdit(row.id)}
                      />
                      <Image
                        className="cursor-pointer"
                        src="/icon/trash.svg"
                        alt="Delete"
                        width={26}
                        height={26}
                        onClick={() => handleDelete(row.id)}
                      />
                      <Image
                        className="cursor-pointer"
                        src={eyeIcon}
                        alt="View"
                        width={26}
                        height={26}
                        onClick={() => handleView(row.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-400">
                  No matching registrations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
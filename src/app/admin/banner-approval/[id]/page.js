
// app/banners/[id]/page.js
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Make sure Image is imported
import BannerCard from "@/components/BannerManagement/BannerCard";
 // Adjust path as necessary

// Re-declare the dummy data or import it from a shared utility/constant file
// For this example, I'm duplicating it for simplicity, but for a larger app,
// you'd typically have a `data.js` or `api` endpoint.
const initialDummyBanners = [
  {
    id: "banner-001",
    submittedBy: "Pizzeria Bella",
    type: "Restaurant",
    title: "20% Off Friday Banner",
    status: "Pending",
    dateSubmitted: "Aug. 15, 2025",
    imageUrl: "/bannerImage/Art-Exhibition.jpg",
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
    imageUrl: "/bannerImage/Art-Exhibition.jpg",
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
    imageUrl: "/bannerImage/Food-Truck.jpg",
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
    imageUrl: "/bannerImage/Photography.jpg",
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
    imageUrl: "/bannerImage/Art-Exhibition.jpg",
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
    imageUrl: "/bannerImage/Art-Exhibition.jpg",
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
    imageUrl: "/bannerImage/Art-Exhibition.jpg",
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
    imageUrl: "/bannerImage/Art-Exhibition.jpg",
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
    imageUrl: "/bannerImage/Art-Exhibition.jpg",
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
    imageUrl: "/bannerImage/Art-Exhibition.jpg",
    description: "Join us for the grand opening of 'Modern Visions' art exhibition.",
    startDate: "2025-08-20",
    startTime: "07:00 PM",
    endTime: "10:00 PM",
    location: "Cultural Arts Centre",
  },
  {
    id: "banner-011",
    submittedBy: "Luna Lounge",
    type: "Bar/Restaurant",
    title: "Celebrate Taco Tuesday!",
    status: "Approved",
    dateSubmitted: "May 10, 2025",
    imageUrl: "/bannerImage/Art-Exhibition.jpg",
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
    imageUrl: "/bannerImage/Art-Exhibition.jpg",
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
    imageUrl: "/bannerImage/Art-Exhibition.jpg",
    description: "Final clearance sale on last season's styles. Shop now!",
    startDate: "2025-05-20",
    startTime: "09:00 AM",
    endTime: "09:00 PM",
    location: "Fashion Outlet Store",
  },
];


// This component will be the dynamic details page
export default function BannerDetailsPage({ params }) {
  const router = useRouter();
  const { id } = params; // Get the dynamic ID from the URL

  // Find the banner details based on the ID
  const banner = initialDummyBanners.find((b) => b.id === id);

  if (!banner) {
    // Handle case where banner is not found (e.g., show a 404 message or redirect)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#343434] text-white">
        <p className="text-xl">Banner not found!</p>
        <button
          onClick={() => router.back()}
          className="ml-4 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 "
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center  max-w-md rounded-lg bg-[#343434] p-4">
      {/* Close Button (X icon) */}
      <button
        onClick={() => router.back()} // Go back to the previous page
        className="absolute top-1 right-1 text-white  text-3xl font-bold hover:text-gray-300 focus:outline-none z-10"
        aria-label="Close"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* BannerCard component to display details */}
      <BannerCard banner={banner} />
    </div>
  );
}
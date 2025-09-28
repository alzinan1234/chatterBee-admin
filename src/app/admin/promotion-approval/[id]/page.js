'use client';

import { useRouter, useParams } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import CalendarIcon from '@heroicons/react/24/outline/CalendarDaysIcon';

const getPromotionById = (id) => {
  const dummyPromotions = [
    {
      id: 'promo-001',
      submittedBy: 'Pizzeria Bella',
      type: 'Restaurant',
      title: '20% Off Friday',
      status: 'Pending',
      dateSubmitted: 'Aug. 15, 2025',
      description:
        'Enjoy a fantastic 20% off on all pizzas and pasta every Friday! Perfect for a family dinner or a quick bite. Our pizzas are made with fresh, locally sourced ingredients and baked to perfection in our wood-fired oven. Come and experience authentic Italian flavors!',
      availability: 'Friday only, 5 PM - 10 PM',
      imageUrl:
        '/image/Restaurant-img.jpg',
    },
    {
      id: 'promo-002',
      submittedBy: 'The Coffee Spot',
      type: 'Bar/Restaurant',
      title: 'Happy Hour Deals',
      status: 'Approved',
      dateSubmitted: 'July 20, 2025',
      description:
        'Unwind with our happy hour specials! Get discounted coffees, teas, and pastries. Enjoy the cozy ambiance and free Wi-Fi. It\'s the perfect spot for work or relaxation.',
      availability: 'Monday to Friday, 3 PM - 6 PM',
      imageUrl:
        '/image/Restaurant-img.jpg',
    },
    {
      id: 'promo-003',
      submittedBy: 'Burger Joint',
      type: 'Restaurant',
      title: 'Buy One Get One',
      status: 'Rejected',
      dateSubmitted: 'Aug. 01, 2025',
      description:
        'Our classic buy one get one free offer on all burgers. A perfect deal for sharing or doubling up! Choose from a variety of gourmet burgers, made with 100% beef patties and fresh toppings.',
      availability: 'Daily, 11 AM - 9 PM',
      imageUrl:
        '/image/Restaurant-img.jpg',
    },
    {
      id: 'promo-004',
      submittedBy: 'Brew & Bites',
      type: 'Bar/Restaurant',
      title: 'Live Music Saturdays',
      status: 'Pending',
      dateSubmitted: 'Sep. 01, 2025',
      description:
        'Experience the best local bands live every Saturday night. Great food, great drinks, great music! Enjoy our wide selection of craft beers and delicious appetizers.',
      availability: 'Every Saturday, 8 PM - 11 PM',
      imageUrl:
        '/image/Restaurant-img.jpg',
    },
  ];
  return dummyPromotions.find((promo) => promo.id === id);
};

const PromotionDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const promotion = id ? getPromotionById(id) : null;

  if (!promotion) {
    return (
      <div className="min-h-screen bg-[#2A2A2A] text-white flex items-center justify-center">
        <p className="text-lg">Loading or Promotion not found...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#2A2A2A]">
      <div className="relative bg-[#343434] text-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <button
          onClick={() => router.back()}
          className="absolute top-4 right-4 text-gray-400 hover:text-white rounded-full p-1 bg-[#404040]"
          aria-label="Close details"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-4">
          {promotion.imageUrl && (
            <Image
              src={promotion.imageUrl}
              alt={promotion.title}
              width={400}
              height={200}
              className="rounded-lg mb-4 object-cover w-full h-auto"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  'https://placehold.co/400x200/CCCCCC/000000?text=Image+Not+Found';
              }}
            />
          )}
          <h2 className="text-xl font-semibold mb-2">{promotion.title}</h2>
          <p className="text-gray-300 text-sm mb-4">{promotion.description}</p>

          <div className="flex items-center text-gray-400 text-sm">
            <CalendarIcon className="h-5 w-5 mr-2" />
            <span>{promotion.availability}</span>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-4 mt-4 space-y-2">
          <p className="flex justify-between text-sm">
            <span className="text-gray-400">Submitted By:</span>
            <span className="font-medium">{promotion.submittedBy}</span>
          </p>
          <p className="flex justify-between text-sm">
            <span className="text-gray-400">Type:</span>
            <span className="font-medium">{promotion.type}</span>
          </p>
          <p className="flex justify-between text-sm">
            <span className="text-gray-400">Date Submitted:</span>
            <span className="font-medium">{promotion.dateSubmitted}</span>
          </p>
          <p className="flex justify-between text-sm">
            <span className="text-gray-400">Status:</span>
            <span
              className={`font-medium ${
                promotion.status === 'Pending'
                  ? 'text-[#FFC107]'
                  : promotion.status === 'Approved'
                  ? 'text-[#4CAF50]'
                  : 'text-[#F44336]'
              }`}
            >
              {promotion.status}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PromotionDetailsPage;

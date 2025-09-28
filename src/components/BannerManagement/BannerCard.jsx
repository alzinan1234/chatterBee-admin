// components/BannerCard.js
"use client";

import React from "react";
import Image from "next/image";

const BannerCard = ({ banner }) => {
  return (
    <div className="relative w-full max-w-sm h-[249px] rounded-[42px] overflow-hidden shadow-lg text-white">
      {/* Background Image */}
      {/* The `fill` prop makes the image fill the parent. Parent must be relative and have dimensions. */}
      <Image
        src={banner.imageUrl || "https://via.placeholder.com/400x200"}
        alt={banner.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Optimize image loading
        style={{ objectFit: "cover" }} // Cover the entire space of the parent
        priority // Consider if this image is above the fold
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#00000080] p-4 flex flex-col justify-end rounded-2xl">
        <div className="mb-auto"> {/* Use mb-auto to push content to the bottom */}
          <h3 className="text-lg font-semibold ">{banner.title}</h3>
          <p className="text-sm text-white">{banner.description}</p>

          <div className="flex items-center text-sm text-white mt-2 space-x-4">
            {/* Date */}
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{new Date(banner.startDate).toLocaleDateString()}</span>
            </div>

            {/* Time */}
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>
                {banner.startTime} - {banner.endTime}
              </span>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center text-sm text-white mt-2">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{banner.location}</span>
        </div>

        {/* Optional Link (Uncomment if needed) */}
        {/* {banner.link && (
          <a
            href={banner.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-300 hover:underline text-sm mt-2"
          >
            Learn More
          </a>
        )} */}
      </div>
    </div>
  );
};

export default BannerCard;
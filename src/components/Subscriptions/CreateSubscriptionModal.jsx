"use client"
import { ChevronDownIcon } from '@heroicons/react/20/solid';

import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import Image from "next/image";

export default function CreateSubscriptionModal({
  onClose,
  onViewCategory,
  onCreateCategory,
}) {
  const [title, setTitle] = useState("");
  const [billingCycle, setBillingCycle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send data to an API)
    console.log({ title, billingCycle, description, price });
    onClose(); // Close modal after submission
  };

  return (

     <ModalWrapper title="Add New Subscriptions" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4 px-10 py-2">
        <div className="flex justify-between">
          <div>
            <button
              type="button"
              onClick={onCreateCategory}
              className="border  text-white font-semibold text-[12px] py-2 px-4 rounded  flex gap-2 items-center justify-center cursor-pointer"
            >
              <span>
                <Image
                  src="/icon/Create-Category.svg"
                  alt="Create Category Icon"
                  width={24}
                  height={24}
                />
              </span>
              Create Category
            </button>
          </div>
       <div className="">
           <button
            type="button"
            onClick={onViewCategory}
            className="  cursor-pointer border text-white font-semibold py-2 px-4 rounded text-[12px] flex gap-2 items-center justify-center"
          >
            <span>
                <Image
                  src="/icon/View_alt.svg"
                  alt="Create Category Icon"
                  width={24}
                  height={24}
                />
              </span>
            View Category
          </button>
       </div>
        </div>

        <div>
          <label
            htmlFor="title"
            className="block text-white text-sm font-bold mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border border-[#929292] rounded w-full py-2 px-3  text-white leading-tight focus:outline-none focus:shadow-outline"
            placeholder="e.g., Premium Membership"
            required
          />
        </div>
<div className="relative">
  <label
    htmlFor="billingCycle"
    className="block text-white text-sm font-bold mb-2"
  >
    Billing cycle
  </label>

  <div className="relative">
    <select
      id="billingCycle"
      value={billingCycle}
      onChange={(e) => setBillingCycle(e.target.value)}
      className="shadow appearance-none border border-[#929292] rounded w-full py-2 px-3 pr-10 text-white  leading-tight focus:outline-none focus:shadow-outline"
      required
    >
      <option className=" bg-black" value="">Select a cycle</option>
      <option className="bg-gray-500" value="monthly">Monthly</option>
      <option className="bg-gray-500" value="annually">Annually</option>
      <option className="bg-gray-500" value="quarterly">Quarterly</option>
    </select>

    {/* Custom arrow icon */}
    <ChevronDownIcon className="w-5 h-5 text-white absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
  </div>
</div>

        <div>
          <label
            htmlFor="description"
            className="block text-white text-sm font-bold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="shadow appearance-none border border-[#929292] rounded w-full py-2 px-3  text-white leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter subscription description"
          ></textarea>
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-white text-sm font-bold mb-2"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="shadow appearance-none border border-[#929292] rounded w-full py-2 px-3  text-white leading-tight focus:outline-none focus:shadow-outline"
            placeholder="e.g., 2000"
            required
          />
        </div>

        <div className="col-span-full mt-[160px]">
              <button
            type="submit"
            className="w-full mx-auto flex justify-center items-center  rounded-full bg-cyan-400 hover:bg-cyan-300 text-white py-2 font-medium  border-b-4 border-lime-400"
          >
            Save
          </button>
          </div>
      </form>
    </ModalWrapper>

  );
}

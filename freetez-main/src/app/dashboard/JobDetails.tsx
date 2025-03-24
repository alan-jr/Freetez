"use client";

import React, { useState } from "react";
import { FaArrowLeft, FaBriefcase, FaMoneyBillWave, FaClock, FaSpinner } from "react-icons/fa";
import Image from "next/image";
import NegotiationPage from "./NegotiationPage";

type Job = {
  id: number;
  title: string;
  description: string;
  image: string;
  fullDescription?: string;
  requirements?: string[];
  salary?: string;
  duration?: string;
  location?: string;
};

const JobDetails: React.FC<{ 
  job: Job; 
  onBack: () => void;
}> = ({ job, onBack }) => {
  const [negotiating, setNegotiating] = useState(false);

  const handleNegotiate = () => {
    setNegotiating(true);
  };

  if (negotiating) {
    return <NegotiationPage onBack={() => setNegotiating(false)} />;
  }

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-8 shadow-lg w-full max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="mb-6 flex items-center text-purple-400 hover:text-purple-300 transition"
      >
        <FaArrowLeft className="mr-2" /> Back to Jobs
      </button>

      <div className="relative w-full h-96 mb-8">
        <Image
          src={job.image}
          alt={job.title}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-lg"
        />
      </div>

      <h2 className="text-3xl font-bold mb-4">{job.title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="flex items-center">
          <FaBriefcase className="text-purple-400 mr-2" />
          <span>{job.duration || "Full-time"}</span>
        </div>
        <div className="flex items-center">
          <FaMoneyBillWave className="text-purple-400 mr-2" />
          <span>{job.salary || "$50,000 - $80,000"}</span>
        </div>
        <div className="flex items-center">
          <FaClock className="text-purple-400 mr-2" />
          <span>{job.duration || "Long-term"}</span>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Freelancer's Description</h3>
        <p className="text-gray-300 leading-relaxed">
          As a freelancer, I have extensive experience in {job.title}. I have worked on numerous projects that required {job.description}. 
          My skills include {job.requirements?.join(", ") || "various relevant skills"}.
          I am confident that my expertise and dedication will contribute significantly to the success of this project.
        </p>
      </div>

      <button
        onClick={handleNegotiate}
        className="w-full py-4 rounded-lg font-semibold transition bg-purple-600 hover:bg-purple-700 text-white"
      >
        Negotiate
      </button>
    </div>
  );
};

export default JobDetails;
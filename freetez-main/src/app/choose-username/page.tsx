"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUser, FaCog, FaHome, FaInfoCircle, FaCheckCircle, FaSpinner, FaWallet } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import crypto from "crypto";
import WalletAuth from "./WalletAuth";
import JobDetails from "./JobDetails";

// Types
type User = {
  name: string;
  role: string;
  password: string;
};

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

// Updated fetchJobs function with more details
const fetchJobs = (): Job[] => {
  const jobData = [
    {
      id: 1,
      title: "UI/UX Designer",
      description: "Design user interfaces and user experiences.",
      image: "/job1.jpg",
      salary: "$60,000 - $90,000",
      duration: "Full-time",
      requirements: [
        "3+ years of UI/UX design experience",
        "Proficiency in Figma and Adobe Creative Suite",
        "Strong portfolio showcasing web and mobile designs",
        "Experience with user research and testing"
      ]
    },
    {
      id: 2,
      title: "Fullstack Developer",
      description: "Develop both frontend and backend of web applications.",
      image: "/job2.jpg",
      salary: "$80,000 - $120,000",
      duration: "Full-time",
      requirements: [
        "5+ years of full-stack development experience",
        "Expertise in React, Node.js, and TypeScript",
        "Experience with cloud platforms (AWS/GCP)",
        "Strong understanding of database design"
      ]
    },
    {
      id: 3,
      title: "Typewritist",
      description: "Type documents and manuscripts.",
      image: "/job3.jpg",
      salary: "$45,000 - $65,000",
      duration: "Full-time",
      requirements: [
        "2+ years of typing experience",
        "Excellent typing speed and accuracy",
        "Proficiency in Microsoft Word",
        "Attention to detail"
      ]
    },
    {
      id: 9,
      title: "Artist",
      description: "Create artistic works and illustrations.",
      image: "/job9.jpg",
      salary: "$50,000 - $70,000",
      duration: "Full-time",
      requirements: [
        "3+ years of experience as an artist",
        "Strong portfolio of artistic works",
        "Proficiency in digital art software",
        "Creative and innovative mindset"
      ]
    },
    // ... (add similar detailed entries for the remaining jobs)
    {
      id: 4,
      title: "Data Scientist",
      description: "Analyze and interpret complex data.",
      image: "/job4.jpg"
    },
    {
      id: 5,
      title: "Graphic Designer",
      description: "Create visual concepts to communicate ideas.",
      image: "/job5.jpg"
    },
    {
      id: 6,
      title: "Video Editor",
      description: "Edit and produce video content.",
      image: "/job6.jpg"
    },
    {
      id: 7,
      title: "Photographer",
      description: "Capture and edit photographs.",
      image: "/job7.jpg"
    },
    {
      id: 8,
      title: "Game Developer",
      description: "Develop and design video games.",
      image: "/job8.jpg"
    },
  ];

  return jobData;
};

// Updated HomePage Component
const HomePage: React.FC = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [balance, setBalance] = useState(1000);
  const [escrow, setEscrow] = useState(0);
  const [hireAmount, setHireAmount] = useState("");
  const [transactions, setTransactions] = useState<{ amount: number; type: string }[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [workSubmitted, setWorkSubmitted] = useState(false);
  const [workApproved, setWorkApproved] = useState(false);
  const [freelancerWithdrawn, setFreelancerWithdrawn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    async function fetchUser() {
      const response = await fetch("http://localhost:5000/api/profile/user", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const data = await response.json();
        console.error(data.message || "Failed to fetch user details");
        return;
      }

      const data = await response.json();
      setUser(data);
    }

    fetchUser();
    const jobData = fetchJobs();
    setJobs(jobData);
  }, []);

  const handleConnect = (account: string | null) => {
    if (account) {
      setWalletConnected(true);
      setIsConnected(true);
      localStorage.setItem("walletConnected", "true");
    } else {
      setWalletConnected(false);
      setIsConnected(false);
      localStorage.removeItem("walletConnected");
    }
  };

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToJobs = () => {
    setSelectedJob(null);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center overflow-y-auto p-4">
      <Image
        src="/bg.jpg"
        alt="Background"
        fill
        style={{ objectFit: "cover" }}
        className="absolute inset-0 w-full h-full z-0"
      />

      <div className="absolute inset-0 bg-black bg-opacity-60 z-1"></div>

      {!selectedJob && (
        <div className="absolute top-20 w-full z-10 p-4">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-4 shadow-lg">
            <Slider {...sliderSettings}>
              <div className="relative w-full h-96">
                <Image src="/slide1.png" alt="Slide 1" fill style={{ objectFit: "cover" }} />
              </div>
              <div className="relative w-full h-96">
                <Image src="/slide2.png" alt="Slide 2" fill style={{ objectFit: "cover" }} />
              </div>
              <div className="relative w-full h-96">
                <Image src="/slide3.png" alt="Slide 3" fill style={{ objectFit: "cover" }} />
              </div>
            </Slider>
          </div>
        </div>
      )}

      <motion.header
        className="relative w-full bg-transparent p-6 flex justify-between items-center z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-purple-400">FreeTezz</h1>
        <nav className="flex space-x-6">
          <Link href="/dashboard" className="hover:text-purple-400 transition">
            Home
          </Link>
          <Link href="/settings" className="hover:text-purple-400 transition">
            Settings
          </Link>
          <Link href="/about" className="hover:text-purple-400 transition">
            About Us
          </Link>
        </nav>
        <WalletAuth onConnect={handleConnect} />
      </motion.header>

      <motion.main
        className="relative flex-1 p-10 flex flex-col items-center justify-center text-center z-10 mt-96"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {selectedJob ? (
          <JobDetails 
            job={selectedJob} 
            onBack={handleBackToJobs}
            walletConnected={walletConnected}
          />
        ) : (
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <motion.div
                key={job.id}
                className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-4 shadow-lg cursor-pointer transform transition hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: job.id * 0.1 }}
                onClick={() => handleJobClick(job)}
              >
                <div className="relative w-full h-48">
                  <Image src={job.image} alt={job.title} layout="fill" objectFit="cover" className="rounded-lg" />
                </div>
                <h3 className="text-xl font-bold mt-4">{job.title}</h3>
                <p className="mt-2">{job.description}</p>
                <button className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition">
                  View Details
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </motion.main>
    </div>
  );
};

export default HomePage;
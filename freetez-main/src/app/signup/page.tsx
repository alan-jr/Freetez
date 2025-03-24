"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [signupMessage, setSignupMessage] = useState("");
  // const [showPopup, setShowPopup] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateName = (name: string) => {
    return name.trim().length > 0;
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{6,}$/;
    return passwordRegex.test(password);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    if (!validateName(value)) {
      setNameError("Name is required");
    } else {
      setNameError("");
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (!validateEmail(value)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (!validatePassword(value)) {
      setPasswordError("Password must be at least 6 characters long, contain an uppercase letter, a lowercase letter, and a special symbol");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (value !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setSignupMessage("User registered successfully!");
        setTimeout(() => {
          window.location.href = '/role-selection';
        }, 1500);
      }

      if (response.ok) {
        setSignupMessage("User registered successfully!");

        // Store signup information
        const signupResponse = await fetch('http://localhost:5000/api/auth/store-signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, signupTime: new Date().toISOString() }),
        });

        if (!signupResponse.ok) {
          throw new Error("Failed to store signup information");
        }

        // Show success message without navigation
        setSignupMessage("User registered successfully!");
      } else {
        setSignupMessage(data.message);
      }
    } catch (error) {
      console.error("Signup Error:", error);
      setSignupMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      {/* Background Image */}
      <Image
        src="/bg.jpg"
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 w-full h-full"
      />

      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Logo */}
      <motion.div
        className="absolute top-8 left-8"
        initial={{ opacity: 0, x: -50, y: -50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/logo.png"
          alt="Logo"
          width={200}
          height={200}
          className="mb-8"
        />
      </motion.div>

      {/* Signup Box */}
      <motion.div
        className="relative z-10 bg-gray-900 bg-opacity-80 p-8 md:p-10 rounded-2xl shadow-2xl text-center w-full max-w-md"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-white mb-4">Create an Account</h1>
        <p className="text-gray-300 mb-6">
          Sign up to access <span className="text-purple-400 font-semibold">FreeTez</span> and start working securely.
        </p>

        {/* Name Input */}
        <motion.input
          type="text"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          className="w-full px-4 py-3 text-white bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
          whileFocus={{ scale: 1.05 }}
        />
        {nameError && <p className="text-red-500 text-sm">{nameError}</p>}

        {/* Email Input */}
        <motion.input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          className="w-full px-4 py-3 text-white bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
          whileFocus={{ scale: 1.05 }}
        />
        {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

        {/* Password Input */}
        <div className="relative w-full">
          <motion.input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full px-4 py-3 text-white bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
            whileFocus={{ scale: 1.05 }}
          />
          <div
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer"
            onClick={togglePasswordVisibility}
            style={{ top: '40%', transform: 'translateY(-60%)' }} // Adjusted position
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
        {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}

        {/* Confirm Password Input */}
        <div className="relative w-full">
          <motion.input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="w-full px-4 py-3 text-white bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-6"
            whileFocus={{ scale: 1.05 }}
          />
          <div
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer"
            onClick={togglePasswordVisibility}
            style={{ top: '40%', transform: 'translateY(-60%)' }} // Adjusted position
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
        {confirmPasswordError && <p className="text-red-500 text-sm">{confirmPasswordError}</p>}

        {/* Signup Button */}
        <motion.button
          className="w-full py-3 text-lg font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-all shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSignup}
        >
          Next
        </motion.button>

        {/* Signup Message */}
        {signupMessage && <p className="mt-4 text-lg text-white">{signupMessage}</p>}

        {/* Links */}
        <div className="mt-4 flex flex-col gap-3 text-sm text-gray-400">
          <Link href="/login" className="hover:underline">
            Already have an account? <span className="text-purple-400">Log In</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
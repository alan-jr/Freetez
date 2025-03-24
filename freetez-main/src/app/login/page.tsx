"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(""); // State for login success message
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  };

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      setEmailError("Invalid email address");
      return;
    } else {
      setEmailError("");
    }

    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 6 characters long, contain an uppercase letter, a lowercase letter, and a special symbol");
      return;
    } else {
      setPasswordError("");
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to login");
      }

      const data = await response.json();
      setMessage("✅ Login Successful! Storing login information...");

      localStorage.setItem("token", data.token); // Store JWT token in local storage
      // Store login information
      const loginResponse = await fetch("http://localhost:5000/api/auth/store-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, loginTime: new Date().toISOString() }),
      });

      if (!loginResponse.ok) {
        const loginData = await loginResponse.json();
        throw new Error(loginData.message || "Failed to store login information");
      }

      setMessage("✅ Login Successful! Redirecting...");
      setTimeout(() => {
        window.location.href = "/dashboard"; // Redirect to dashboard after success
      }, 2000);
    } catch (error) {
      console.error("Login Error:", error);
      setMessage("⚠ Something went wrong. Please try again.");
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

      {/* Login Box */}
      <motion.div
        className="relative z-10 bg-gray-900 bg-opacity-80 p-8 md:p-10 rounded-2xl shadow-2xl text-center w-full max-w-md"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-white mb-4">Welcome Back!</h1>
        <p className="text-gray-300 mb-6">
          Login to access <span className="text-purple-400 font-semibold">FreeTez</span> and start working securely.
        </p>

        {/* Email Input */}
        <motion.input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
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
        {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}

        {/* Login Button */}
        <motion.button
          className="w-full py-3 text-lg font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-all shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogin}
        >
          Login
        </motion.button>

        {/* Success/Error Message */}
        {message && <p className="mt-4 text-sm font-semibold text-gray-300">{message}</p>}

        {/* Sign Up Link */}
        <div className="mt-4 text-sm text-gray-400">
          <Link href="/signup" className="hover:underline">
            Don't have an account? <span className="text-purple-400">Sign Up</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
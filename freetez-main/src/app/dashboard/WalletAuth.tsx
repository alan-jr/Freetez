"use client";
import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaSpinner, FaWallet } from "react-icons/fa";
import crypto from "crypto";

const WalletAuth: React.FC<{ onConnect: (account: string | null) => void }> = ({ onConnect }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [showFullAddress, setShowFullAddress] = useState(false);

  useEffect(() => {
    const storedAccount = sessionStorage.getItem("walletAddress");
    if (storedAccount) {
      setAccount(storedAccount);
      onConnect(storedAccount);
    }
  }, [onConnect]);

  const generateWalletAddress = () => {
    const prefixes = ["tz1", "tz2", "tz3"];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const hash = crypto.createHash("sha256").update(Date.now().toString()).digest("hex");
    return prefix + hash.substring(0, 33);
  };

  const verifySignature = async (address: string) => {
    await new Promise((res) => setTimeout(res, 1500)); 
    const isValid = address.startsWith("tz1") || address.startsWith("tz2") || address.startsWith("tz3");
    const randomCheck = Math.random() > 0.1; 
    return isValid && randomCheck && true; 
  };

  const connectWallet = async () => {
    setLoading(true);
    console.log("Requesting wallet connection...");
    await new Promise((res) => setTimeout(res, 2000)); 

    try {
      const address = generateWalletAddress();
      console.log("Fetching wallet session...");
      const verified = await verifySignature(address);

      if (!verified) throw new Error("Signature verification failed");

      sessionStorage.setItem("walletAddress", address);
      setAccount(address);
      onConnect(address);
      console.log(`Signature verification passed for: ${address}`);
      console.log("Wallet successfully connected.");
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }

    setLoading(false);
  };

  const disconnectWallet = () => {
    sessionStorage.removeItem("walletAddress");
    setAccount(null);
    onConnect(null);
  };

  const toggleAddressDisplay = () => {
    setShowFullAddress(!showFullAddress);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-800 bg-opacity-75 rounded-lg shadow-lg">
      {account ? (
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2">
            <FaCheckCircle className="text-green-500" />
            <p
              className="text-green-500 font-bold cursor-pointer"
              onClick={toggleAddressDisplay}
              title={showFullAddress ? account : ""}
            >
              Connected as: {showFullAddress ? account : `${account?.slice(0, 3)}...`}
            </p>
          </div>
          <button
            onClick={disconnectWallet}
            className="mt-2 px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          disabled={loading}
          className={`px-4 py-2 text-white font-semibold rounded transition ${
            loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? (
            <div className="flex items-center space-x-2">
              <FaSpinner className="animate-spin" />
              <span>{verifying ? "Verifying Wallet..." : "Searching for active session..."}</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <FaWallet />
              <span>Connect Wallet</span>
            </div>
          )}
        </button>
      )}
    </div>
  );
};

export default WalletAuth;
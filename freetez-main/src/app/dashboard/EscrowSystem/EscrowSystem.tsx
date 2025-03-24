"use client";

import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaPaperPlane, FaLock } from "react-icons/fa";
import { useRouter } from "next/navigation";

type Message = {
  sender: "client" | "freelancer";
  text: string;
};

const clientMessages = [
  "Hello! I'm looking for a freelancer for a project. Are you available?",
  "I need a mobile app for booking trainers, with user authentication and a scheduling system.",
  "I can offer $800.",
  "How about $900?",
  "I need it done in 10 days.",
  "Let's sign the contract and I'll add the funds to escrow."
];

const freelancerMessages = [
  "Hi! Yes, I'm available. I'd love to hear more about your project. Could you share the details?",
  "That sounds like a great project! What budget do you have in mind for this?",
  "Thank you for sharing! Based on the features, I'd suggest a budget of around $1000 to ensure top quality. Would you be open to adjusting it?",
  "That sounds reasonable. We can proceed with $900 while ensuring top-notch quality!",
  "I can deliver in 10 days while maintaining high standards. Let's finalize the agreement!",
  "Perfect! I'll prepare the contract. Once you've signed and funded the escrow, we can begin right away."
];

const NegotiationPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [input, setInput] = useState(clientMessages[0]);
  const [showEscrowButton, setShowEscrowButton] = useState(false);
  const router = useRouter();

  // Initialize first message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ sender: "client", text: clientMessages[0] }]);
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: "freelancer", text: freelancerMessages[0] }]);
        setInput(clientMessages[1]);
        setCurrentStep(1);
      }, 1500);
    }
  }, []);

  const handleSendMessage = () => {
    if (currentStep >= clientMessages.length) return;

    // Add client message
    setMessages(prev => [...prev, { sender: "client", text: input }]);

    // Set up next step
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);

    // Add freelancer response after delay
    setTimeout(() => {
      if (nextStep < freelancerMessages.length) {
        setMessages(prev => [...prev, { sender: "freelancer", text: freelancerMessages[nextStep] }]);
        
        // Set next client message if available
        if (nextStep < clientMessages.length - 1) {
          setInput(clientMessages[nextStep + 1]);
        } else {
          setInput("");
        }

        // Show escrow button after final message
        if (nextStep === freelancerMessages.length - 1) {
          setShowEscrowButton(true);
        }
      }
    }, 1500);
  };

  const handleEscrow = () => {
    router.push("/dashboard/escrow");
  };

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-8 shadow-lg w-full max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="mb-6 flex items-center text-purple-400 hover:text-purple-300 transition"
      >
        <FaArrowLeft className="mr-2" /> Back to Job Details
      </button>

      <div className="h-96 overflow-y-auto mb-4 p-4 bg-gray-800 rounded-lg">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 p-4 rounded-lg ${
              message.sender === "client"
                ? "bg-purple-600 text-white ml-auto max-w-[80%]"
                : "bg-gray-700 text-gray-300 mr-auto max-w-[80%]"
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 flex items-center">
          <input
            type="text"
            value={input}
            readOnly
            className="flex-1 p-2 rounded-lg bg-gray-700 text-white"
            placeholder="Type your message..."
          />
          <button 
            onClick={handleSendMessage}
            disabled={currentStep >= clientMessages.length}
            className={`ml-4 p-2 rounded-lg ${
              currentStep >= clientMessages.length
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            } text-white`}
          >
            <FaPaperPlane />
          </button>
        </div>
        
        {showEscrowButton && (
          <button
            onClick={handleEscrow}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center"
          >
            <FaLock className="mr-2" />
            Fund Escrow
          </button>
        )}
      </div>
    </div>
  );
};

export default NegotiationPage;
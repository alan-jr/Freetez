"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IntroPage from "./IntroPage";
import BackgroundMusic from "../components/BackgroundMusic";  // Correct import path

export default function VideoIntro() {
    const [showIntro, setShowIntro] = useState(true);
    const videoRef = useRef(null);

    useEffect(() => {
        // Attempt to play with sound immediately
        if (videoRef.current) {
            videoRef.current.play().catch(e => {
                console.log("Autoplay with sound failed:", e);
                // If autoplay with sound fails, you might want to fall back to muted autoplay
                if (videoRef.current) {
                    videoRef.current.muted = true;
                    videoRef.current.play();
                }
            });
        }
    }, []);

    const handleVideoEnd = () => {
        setShowIntro(false);
    };

    const handleVideoError = () => {
        console.error("Error loading video");
        setShowIntro(false);
    };

    return (
        <AnimatePresence>
            {showIntro ? (
                <motion.div
                    className="relative w-full h-screen bg-black flex items-center justify-center"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                >
                    {/* Video Background */}
                    <video
                        ref={videoRef}
                        src="/intro.mp4" // Ensure this file is inside public/
                        autoPlay
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                        onEnded={handleVideoEnd}
                        onError={handleVideoError}
                    >
                        Your browser does not support the video tag.
                    </video>
                    <BackgroundMusic />
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <IntroPage />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
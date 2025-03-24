"use client";
import { useState, useRef } from "react";

const BackgroundMusic = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (audioRef.current?.paused) {
            audioRef.current?.play();
            setIsPlaying(true);
        } else {
            audioRef.current?.pause();
            setIsPlaying(false);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <audio
                ref={audioRef}
                src="/music.mp3"
                loop
            />
            <button
                onClick={togglePlay}
                className="bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all"
            >
                {isPlaying ? (
                    <span className="sr-only">Pause Music</span>
                ) : (
                    <span className="sr-only">Play Music</span>
                )}
                {isPlaying ? "🔊" : "🔇"}
            </button>
        </div>
    );
};

export default BackgroundMusic;
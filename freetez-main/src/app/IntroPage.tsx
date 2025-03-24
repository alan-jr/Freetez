"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";

export default function IntroPage() {
  const router = useRouter();

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <Image
        src="/bg.jpg"
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 w-full h-full"
      />

      {/* Overlay for better contrast */}
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

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center h-full px-6 text-center">
        {/* App Name Animation */}
        <motion.h1
          className="text-6xl md:text-8xl font-extrabold text-white drop-shadow-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          whileHover={{ scale: 1.1 }}
        >
          FreeTez
        </motion.h1>

        {/* Key Points */}
        <motion.ul
          className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          <motion.li whileHover={{ scale: 1.05 }}>
            <span className="text-gradient">Decentralized</span> - Built on the Tezos blockchain.
          </motion.li>
          <motion.li whileHover={{ scale: 1.05 }}>
            <span className="text-gradient">Fair</span> - Empowering freelancers and clients.
          </motion.li>
          <motion.li whileHover={{ scale: 1.05 }}>
            <span className="text-gradient">Secure</span> - Hassle-free contracts with no scams.
          </motion.li>
          <motion.li whileHover={{ scale: 1.05 }}>
            The future of <span className="text-gradient">Freelancing</span> starts here...
          </motion.li>
        </motion.ul>

        {/* Call-to-Action Button with Navigation */}
        <motion.button
          className="mt-8 px-6 py-3 text-lg font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-xl transition-all shadow-lg flex items-center gap-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
          whileHover={{ scale: 1.1, backgroundColor: "#6B46C1" }}
          onClick={() => router.push("/login")}
        >
          Get Started <FaArrowRight />
        </motion.button>
      </div>

      <style jsx>{`
        .text-gradient {
          background: linear-gradient(90deg, #7f00ff, #e100ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <div className="relative">
          <div className="w-24 h-24 border-4 border-gray-200 rounded-full"></div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-24 h-24 border-4 border-t-caribbean-500 border-r-caribbean-500 border-b-transparent border-l-transparent rounded-full"
          ></motion.div>
        </div>
        <h2 className="mt-6 text-2xl font-bold text-gray-900">IKABAY</h2>
        <p className="text-gray-600">Chargement en cours...</p>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
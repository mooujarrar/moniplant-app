import React from "react";
import { motion } from "framer-motion";

function PlantInfoCard() {
  return (
    <motion.div
      animate={{
        scale: [1, 1.2, 1.2, 1, 1],
        rotate: [0, 0, 180, 180, 0],
        borderRadius: ["8px", "8px", "30%", "20%", "8px"],
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
      }}
      className='font-sans max-w-xl mx-auto bg-opacity-75 bg-green-200 rounded-lg overflow-hidden shadow-xl'
    >
      <div className='px-8 py-6'>
        <div className='font-bold text-2xl mb-4'>Plant Information</div>
        <div className='mb-4'>
          <span className='text-gray-700'>Plant Type:</span>{" "}
          <span className='text-gray-900'>Rose</span>
        </div>
        <div className='mb-4'>
          <span className='text-gray-700'>Humidity:</span>{" "}
          <span className='text-gray-900'>65%</span>
        </div>
        <div className='mb-4'>
          <span className='text-gray-700'>Temperature:</span>{" "}
          <span className='text-gray-900'>25°C</span>
        </div>
        <div>
          <span className='text-gray-700'>Soil Moisture:</span>{" "}
          <span className='text-gray-900'>Medium</span>
        </div>
      </div>
    </motion.div>
  );
}

export default PlantInfoCard;

import React from 'react';
import { motion } from 'framer-motion';

interface InfoCardProps {
    // Add any additional props if needed
}

const InfoCard: React.FC<InfoCardProps> = () => {
    return (
        <div className="info-card bg-green-500 text-white p-6 w-full h-full overflow-auto">
            <h2 className="text-4xl font-bold mb-4">Plant Information</h2>
            <div className="flex flex-col mb-4">
                <motion.div
                    className="bg-white text-green-700 rounded-md p-4 mb-2 shadow-lg"
                    style={{ width: '50%' }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    <p className="text-2xl font-semibold mb-1">Moisture</p>
                    {/* Add your icon here */}
                    <span role="img" aria-label="moisture-icon" style={{ fontSize: '3em', display: 'block', textAlign: 'center' }}>
                        💧
                    </span>
                    <p className="text-2xl">75%</p>
                </motion.div>
            </div>
            <div className='flex flex-row justify-end'>
                <div className="flex flex-col mb-4" style={{ width: '50%' }}>
                    <motion.div
                        className="bg-white text-green-700 rounded-md p-4 mb-2 shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        <p className="text-2xl font-semibold mb-1">Temperature</p>
                        {/* Add your icon here */}
                        <span role="img" aria-label="temperature-icon" style={{ fontSize: '3em', display: 'block', textAlign: 'center' }}>
                            🌡️
                        </span>
                        <p className="text-2xl">24°C</p>
                    </motion.div>
                </div>
            </div>

            <div className="flex flex-col mb-4">
                <motion.div
                    className="bg-white text-green-700 rounded-md p-4 mb-2 shadow-lg"
                    style={{ width: '50%' }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    <p className="text-2xl font-semibold mb-1">Humidity</p>
                    {/* Add your icon here */}
                    <span role="img" aria-label="humidity-icon" style={{ fontSize: '3em', display: 'block', textAlign: 'center' }}>
                        💦
                    </span>
                    <p className="text-2xl">60%</p>
                </motion.div>
            </div>
            <div className="flex flex-col">
                <div className="bg-white text-green-700 rounded-md p-4 shadow-lg" style={{ width: '100%' }}>
                    <p className="text-2xl font-semibold mb-1">Moisture Development</p>
                    {/* Replace the following div with your actual graph component */}
                    <div className="bg-green-600 h-32 w-full"></div>
                </div>
            </div>
        </div>
    );
};

export default InfoCard;

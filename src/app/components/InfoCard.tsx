// InfoCard.tsx
import React from 'react';

interface InfoCardProps {
    // Add any additional props if needed
}

const InfoCard: React.FC<InfoCardProps> = () => {
    return (
        <div className="info-card bg-green-700 text-white p-6 w-full h-full overflow-auto">
            <h2 className="text-4xl font-bold mb-4">Plant Information</h2>
            <div className="flex flex-col mb-4">
                <div className="bg-white text-green-700 rounded-md p-4 mb-2" style={{ width: '50%' }}>
                    <p className="text-lg font-semibold mb-1">Moisture</p>
                    {/* Add your icon here */}
                    <span role="img" aria-label="moisture-icon" style={{ fontSize: '3em', display: 'block', textAlign: 'center' }}>
                        💧
                    </span>
                    <p className="text-lg">75%</p>
                </div>
            </div>
            <div className='flex flex-row justify-end'>
                <div className="flex flex-col mb-4" style={{ width: '50%' }}>
                    <div className="bg-white text-green-700 rounded-md p-4 mb-2">
                        <p className="text-lg font-semibold mb-1">Temperature</p>
                        {/* Add your icon here */}
                        <span role="img" aria-label="temperature-icon" style={{ fontSize: '3em', display: 'block', textAlign: 'center' }}>
                            🌡️
                        </span>
                        <p className="text-lg">24°C</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col mb-4">
                <div className="bg-white text-green-700 rounded-md p-4 mb-2" style={{ width: '50%' }}>
                    <p className="text-lg font-semibold mb-1">Humidity</p>
                    {/* Add your icon here */}
                    <span role="img" aria-label="humidity-icon" style={{ fontSize: '3em', display: 'block', textAlign: 'center' }}>
                        💦
                    </span>
                    <p className="text-lg">60%</p>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="bg-white text-green-700 rounded-md p-4" style={{ width: '100%' }}>
                    <p className="text-lg font-semibold mb-1">Moisture Development</p>
                    {/* Replace the following div with your actual graph component */}
                    <div className="bg-green-600 h-32 w-full"></div>
                </div>
            </div>
        </div>
    );
};

export default InfoCard;
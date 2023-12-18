// OverlayButtons.tsx
import React from 'react';
import { EPage, useActivePageStore } from './state-management/activePage';

const OverlayButtons: React.FC = () => {
  const { activePage, setActivePage } = useActivePageStore();

  return (
    <div className="fixed inset-0 flex items-end justify-center bg-opacity-0 p-4 pb-8 select-none">
      {activePage !== EPage.HOME && (
        <div className="relativeDiv">
          <button
            className="bg-gray-500 text-white p-4 rounded-full mr-4"
            onClick={() => setActivePage(EPage.HOME)}
          >
            🏠 {/* Home Emoji */}
            <span className="tooltip">Home</span>
          </button>
        </div>
      )}
      {activePage === EPage.HOME && (
        <div className="bg-transparent flex space-x-4">
          <button
            className="bg-green-500 text-white p-4 rounded-full"
            onClick={() => setActivePage(EPage.CONFIG)}
          >
            Configuration
          </button>
          <button
            className="bg-blue-500 text-white p-4 rounded-full"
            onClick={() => setActivePage(EPage.MONITOR)}
          >
            Monitor
          </button>
        </div>
      )}
    </div>
  );
};

export default OverlayButtons;

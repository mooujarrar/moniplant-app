// OverlayButtons.tsx
import React from 'react';
import { EPage, useActivePageStore } from '../state-management/activePage';
import { usePortalStore } from '../state-management/activePortal';

const OverlayButtons: React.FC = () => {
  const { activePage, setActivePage } = useActivePageStore();
  const { activePortal } = usePortalStore();

  return (
    <>
      {activePortal === null && (
        <div className='absolute bottom-0 z-10 flex w-full select-none items-end justify-center bg-opacity-0 p-4 pb-8'>
          {activePage !== EPage.HOME && (
            <div className='relativeDiv'>
              <button
                className='mr-4 rounded-full bg-gray-500 p-4 text-white'
                onClick={() => setActivePage(EPage.HOME)}
              >
                🏠 {/* Home Emoji */}
                <span className='tooltip'>Home</span>
              </button>
            </div>
          )}
          {activePage === EPage.HOME && (
            <div className='flex space-x-4 bg-transparent'>
              <button
                className='rounded-full bg-green-500 p-4 text-white'
                onClick={() => setActivePage(EPage.CONFIG)}
              >
                Configuration
              </button>
              <button
                className='rounded-full bg-blue-500 p-4 text-white'
                onClick={() => setActivePage(EPage.MONITOR)}
              >
                Monitor
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default OverlayButtons;

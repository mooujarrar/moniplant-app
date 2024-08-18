import React from 'react';
import { EPage, useActivePageStore } from '../../state-management/activePage';

export default function Configurator() {
  const { activePage } = useActivePageStore();

  return (
    <>
      {activePage === EPage.CONFIG && (
        <div className='absolute top-0 z-10 flex w-full h-5/6 items-center justify-center bg-opacity-0 p-4 pb-8'>
          Configuration Page
        </div>
      )}
    </>
  );
}

'use client';
import React from 'react';
import preloaderImage from '../../../public/pre.gif';
import Image from 'next/image';

const Preloader = () => {
  return (
    <div className="h-[90vh] w-[100vw] flex justify-center items-center bg-white" style={{height:"90dvh"}}>
      <Image
        src={preloaderImage}
        alt="Loading..."
        className="w-[150px] h-[150px]  lg:w-[200px] lg:h-[200px]  2xl:w-auto 2xl:h-auto max-w-[1200px] max-h-[1200px] bg-white"
        priority
      />
    </div>
  );
};

export default Preloader;

import { motion } from 'framer-motion';
import React from 'react';

function Marquee() {
  let marqueeElem = Array.from({ length: 4 }).map((ele, index) => (
    <motion.h1 
      initial={{ x: 0 }} 
      animate={{ x: "-100%" }} 
      transition={{ ease: "linear", repeat: Infinity, duration: 10 }} 
      key={index} 
      className='md:text-[20vw] text-[30vw] font-title pr-10 uppercase tracking-tight'
    >
      We Are from TaskHive
    </motion.h1>
  ));

  return (
    <div data-scroll data-scroll-section data-scroll-speed=".1" className='w-full md:py-16 py-10 bg-blue-500 md:rounded-t-3xl rounded-[1rem] mt-[-30px]'>
      <div className='h-fit border-b-2 border-t-2 border-blue-300 overflow-hidden text-white flex items-center whitespace-nowrap leading-none'>
        {marqueeElem}
      </div>
    </div>
  );
}

export default Marquee;

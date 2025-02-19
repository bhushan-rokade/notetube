import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import Navbar from './Navbar';

export default function Home() {
  const comp = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const t1 = gsap.timeline();

      t1.from('.main-div', {
        scale: 20,
        duration: 1,
        delay: 0.1,
      })
        .to('.main-div', {
          height: '100vh',
          width: '100vw',
        })
        .from('.logo-div', {
          height: 0,
          duration: 2,
        });
    }, comp);

    return () => ctx.revert(); // ✅ Cleanup GSAP animations on unmount
  }, []);

  // ✅ FIX: Use `onComplete` instead of `.then()`
  const handleButton = () => {
    gsap.to('.main-div', {
      y: -2000,
      duration: 1,
      onComplete: () => {
        window.location.href = '/main'; // ✅ Redirect AFTER animation
      },
    });
  };

  return (
    <div className='relative' ref={comp}>
      <div className='flex flex-col h-full w-screen main-div bg-mainColor position-relative'>
        <Navbar />
        <div className='flex h-full flex-col gap-10 items-center justify-center'>
          <h2 className='font-mplus1p text-5xl w-25 max-[600px]:text-3xl h-22 text-center logo-div overflow-y-hidden text-white'>
            Summarize the YouTube Video Of Your Choice In One Go
          </h2>
          <button
            className='bg-white w-36 h-10 rounded-3xl border-gray-600 hover:border-2 font-mplus1p'
            onClick={handleButton}>
            Try Now
          </button>
        </div>
      </div>
    </div>
  );
}

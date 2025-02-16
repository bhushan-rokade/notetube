import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import Navbar from './Navbar';

export default function Home() {
  const comp = useRef(null);
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const t1 = gsap.timeline();
      t1.from('.main-div', {
        scale: '20',
        duration: 1.5,
        delay: 0.1,
      }).to('.main-div', {
        height: '100vh',
        width: '100vw',
      });
    }, comp);
    return () => ctx.revert();
  }, []);
  const handleButton = () => {
    gsap
      .to(comp.current, {
        y: -2000,
        duration: 1,
      })
      .then(() => {
        location.href = '/main';
      });
  };
  return (
    <div className='relative' ref={comp}>
      <div className='flex flex-col h-screen w-screen main-div bg-mainColor position-relative'>
        <Navbar />
        <div className='flex h-full flex-col gap-10 items-center justify-center'>
          <h2 className='font-mplus1p text-5xl w-25 max-[600px]:text-3xl text-center text-white'>
            Summarize the Youtube Video Of Your Choice In One Go
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

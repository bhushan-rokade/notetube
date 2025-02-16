import React, { useLayoutEffect, useRef } from 'react';
import Navbar from '../Home/Navbar';
import gsap from 'gsap';

export default function Main() {
  const mdiv = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const t1 = gsap.timeline();
      t1.from('.main-div', {
        yPercent: '300',
        duration: 1,
        delay: 0,
      }).to('.main-div', {
        xPercent: '0',
      });
    }, mdiv);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={mdiv}>
      <div className='flex flex-col h-screen w-screen main-div bg-mainColor'>
        <div className='max-sm:mt-10 mt-10'>
          <Navbar />
        </div>
        <div className='h-full flex max-sm:flex-col items-center'>
          <div className='w-1/2 h-full max-sm:mt-7 max-sm:w-full bg-mainColor'>
            <form className='w-4/5 justify-self-center max-sm:w-full h-3/5 flex flex-col items-center'>
              <div className='flex flex-col items-start w-2/3 mt-5'>
                <label className='text-white font-mplus1p'>
                  Enter Youtube URL
                </label>
                <input className='w-full h-8 rounded-lg' />
              </div>
              <div className='flex flex-col items-start w-2/3 mt-5'>
                <label className='text-white font-mplus1p'>
                  Enter Description
                </label>
                <textarea className='w-full h-36 rounded-lg' />
              </div>
              <div className='flex flex-col justify-center items-center w-2/3 mt-5'>
                <button className='bg-white w-36 h-10 rounded-3xl border-gray-600 hover:border-2 font-mplus1p'>
                  Submit
                </button>
              </div>
            </form>

            <div className=' w-full h-2/5 flex items-center justify-center max-sm:mt-10 max-sm:px-7'>
              <iframe
                className='w-1/2 h-64 max-sm:w-full'
                src='https://www.youtube.com/embed/0-S5a0eXPoc?si=sAeIJc-urOwaxNhW'
                title='YouTube video player'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              />
            </div>
          </div>

          <div className='h-full my-16 max-sm:min-h-screen flex-col w-1/2 flex max-sm:flex-col max-sm:w-full max-sm:mt-24 items-center'>
            <div className='bg-white h-full mb-4 rounded-lg w-4/5 max-sm:w-11/12'>
              <div className='flex flex-row h-8 items-center justify-between gap-3 px-4'>
                <h2 className='self-start font-mplus1p text-lg align-self-start'>
                  Notes
                </h2>
                <div>
                  <button className='flex-col gap-5 w-16'>
                    <i className='bi bi-download text-black stroke-4'></i>
                  </button>
                  <button>
                    <i className='bi bi-clipboard2'></i>
                  </button>
                </div>
              </div>
              <hr className='w-full border-1 border-gray-700' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

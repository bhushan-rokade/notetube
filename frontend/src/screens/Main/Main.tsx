import React, { useLayoutEffect, useRef, useState } from 'react';
import Navbar from '../Home/Navbar';
import gsap from 'gsap';
import axios from 'axios';
import { apis, BASE_URL } from '../../Utils';
import MarkdownViewer from './MarkdownViewer';
import { useReactToPrint } from 'react-to-print';
import Loading from './Loading';

export default function Main() {
  const ref = useRef<HTMLDivElement | null>(null);
  const mdiv = useRef(null);
  const [url, setURL] = useState('');
  const [status, setStatus] = useState<
    'none' | 'loading' | 'success' | 'error'
  >('none');
  const [desc, setDesc] = useState('');
  const [resMD, setResMD] = useState<string | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.main-div', { yPercent: 300, duration: 1 });
    }, mdiv);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return alert('Enter a valid YouTube URL');

    setStatus('loading');
    setResMD(null);

    try {
      const { data } = await axios.post(BASE_URL + apis.GETNOTES, {
        youtubeURL: url,
        message: desc,
      });

      setResMD(data.response);
      setStatus('success');
    } catch (error) {
      setStatus('error');
      setResMD('Error fetching notes. Please try again.');
    }
  };

  // ✅ Correct usage of `useReactToPrint`
  const handlePrint = useReactToPrint({
    contentRef: ref,
    documentTitle: 'Markdown_Document',
    onAfterPrint: () => console.log('✅ PDF has been printed!'),
  });

  return (
    <div ref={mdiv}>
      <div className='flex flex-col h-screen w-screen main-div bg-mainColor'>
        <div className='mt-10'>
          <Navbar />
        </div>

        <div className='h-perfectHeight max-sm:flex-col flex'>
          {/* Left Side - Form */}
          <div className='w-1/2 h-perfectHeight max-sm:mt-7 max-sm:w-full bg-mainColor'>
            <form
              className='w-4/5 max-sm:w-full h-3/5 mt-5 flex flex-col items-center'
              onSubmit={handleSubmit}>
              <div className='flex flex-col items-start w-4/5 mt-5'>
                <label className='text-white font-mplus1p'>
                  Enter YouTube URL
                </label>
                <input
                  className='w-full h-9 px-4 rounded-lg border border-gray-300 text-black'
                  placeholder='Enter YouTube URL'
                  value={url}
                  onChange={(e) => setURL(e.target.value)}
                />
              </div>
              <div className='flex flex-col items-start w-4/5 mt-5'>
                <label className='text-white font-mplus1p'>
                  Enter Description
                </label>
                <textarea
                  className='w-full h-36 p-2 rounded-lg border border-gray-300 text-black'
                  placeholder='Provide additional details...'
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>
              <div className='flex flex-col justify-center items-center w-2/3 mt-5'>
                <button
                  type='submit'
                  className={`bg-white w-36 h-10 rounded-3xl border-gray-600 hover:border-2 font-mplus1p ${
                    status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={status === 'loading'}>
                  {status === 'loading' ? 'Loading...' : 'Submit'}
                </button>
              </div>
              {status === 'success' && url && (
                <div className='w-full h-auto flex items-center justify-center max-sm:mt-10 mt-20 max-sm:px-7'>
                  <iframe
                    className='w-4/5 h-60 max-sm:w-full'
                    src={`https://www.youtube.com/embed/${getYouTubeID(url)}`}
                    title='YouTube video player'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  />
                </div>
              )}
            </form>
          </div>

          {/* Right Side - Notes */}
          <div
            className='h-perfectHeight max-sm:h-screen flex flex-col w-1/2 max-sm:w-full max-sm:mt-20 items-center'
            id='notes'>
            <div className='bg-white max-h-perfectHeight h-halfScreen max-sm:h-halfScreen mb-4 rounded-lg w-4/5 max-sm:w-11/12 p-4 shadow-lg overflow-auto no-scrollbar'>
              {status == 'success' && (
                <>
                  <div className='flex flex-row h-8 items-center justify-between'>
                    <h2 className='font-mplus1p text-lg'>Notes</h2>
                    {status == 'success' && (
                      <button
                        className='mr-5'
                        onClick={(e) => {
                          e.preventDefault();
                          handlePrint();
                        }}>
                        <i className='bi bi-download'></i>
                      </button>
                    )}
                  </div>
                  <hr className='border-gray-700' />

                  {/* Markdown Viewer */}
                  <div
                    className='mt-4 text-black px-5 scroll-smooth overflow-auto print-container no-scrollbar'
                    ref={ref}>
                    {resMD && <MarkdownViewer content={resMD} />}
                  </div>
                </>
              )}
              {status == 'loading' && <Loading />}
              {status == 'none' && (
                <div className='flex items-center justify-center h-full w-full'>
                  <h1 className='font-mplus1p '>Response Section</h1>
                </div>
              )}
              {status == 'error' && (
                <div className='h-full w-full flex items-center justify-center'>
                  <h1 className='font-mplus1p text-red-700 text-2xl'>
                    Internal Error
                  </h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Extracts YouTube Video ID
const getYouTubeID = (url: string): string => {
  const match = url.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|live\/)|youtu\.be\/)([^&?/]+)/
  );
  return match ? match[1] : '';
};

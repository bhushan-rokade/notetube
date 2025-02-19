export default function Navbar() {
  return (
    <div className=' container-fluid px-12 inline-flex items-center flex max-[600px]:justify-center w-dvw h-1/6'>
      <h2
        onClick={() => {
          location.href = '/';
        }}
        className='font-mplus1p text-4xl text-white font-bold logo-div'>
        NoteTube
      </h2>
    </div>
  );
}

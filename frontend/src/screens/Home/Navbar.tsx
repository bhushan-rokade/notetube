import logo from './../../assets/logo.png';
export default function Navbar() {
  return (
    <div className=' container-fluid px-16 inline-flex items-center flex max-[600px]:justify-center w-dvw h-1/6'>
      <img
        onClick={() => {
          location.href = '/';
        }}
        className='h-12'
        src={logo}
      />
    </div>
  );
}

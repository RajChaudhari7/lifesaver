import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();

  // Assume isLoggedIn is a function or a state variable that checks if the user is logged in
  const isLoggedIn = () => {
    // Implement your logic to check if the user is logged in
    // For example, check if there's a token in localStorage
    return !!localStorage.getItem('token');
  };

  const handleButtonClick = () => {
    if (isLoggedIn()) {
      navigate('/doctors'); // Navigate to the doctors page if logged in
    } else {
      navigate('/login'); // Navigate to the login page if not logged in
    }
    window.scrollTo(0, 0);
  };

  return (
    <div className='flex bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10'>
      {/* ------Left Side ------ */}
      <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
        <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'>
          <p>Book Appointment</p>
          <p className='mt-4'>With 100+ Trusted Doctors</p>
        </div>
        <button
          onClick={handleButtonClick}
          className='bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all'
        >
          {isLoggedIn() ? 'Book Appointment' : 'Create Account'}
        </button>
      </div>

      {/* ------ Right Side------ */}
      <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
        <img className='w-full absolute bottom-0 right-0 max-w-md' src={assets.appointment_img} alt="" />
      </div>
    </div>
  );
};

export default Banner;

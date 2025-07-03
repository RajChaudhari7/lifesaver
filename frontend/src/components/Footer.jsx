import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div className='md:mx-10'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

                {/* ---- Left section ---- */}
                <div>
                    <img className='mb-5 w-40' src={assets.logo} alt="" />
                    <p className='w-full md:w-2/3 text-gray-600 leading-6'>At <b className='text-black'>Life Saver,</b> we are committed to making healthcare more accessible and stress-free. Our platform helps you easily book hospital appointments, manage your health records, and stay connected with trusted doctors — all in one place. <br />
                        With fast, reliable, and user-friendly services, Life Saver ensures that taking care of your health is always simple and convenient. Whether it's scheduling your next check-up or finding the right specialist, we are here to support you every step of the way. <br /> <b className='text-red-600 text-lg'>Your health, our priority — Life Saver.</b>
                    </p>
                </div>

                {/* ---- Center section ---- */}
                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li><a href="/">Home</a></li>
                        <li><a href="/doctors">All Doctors</a></li>
                        <li><a href="/about">About us</a></li>
                        <li><a href="/contact">Contact Us</a></li>

                    </ul>
                </div>

                {/* ---- Right section ---- */}
                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>8600412566</li>
                        <li>lifesaver@gmail.com</li>
                    </ul>
                </div>

            </div>
            {/* ------ CopuRight text ----- */}
            <div>
                <hr />
                <p className='py-5 text-sm text-center'>Copyright @{new Date().getFullYear()} LifeSaver - All Rights Reserved.</p>
            </div>
        </div>
    )
}

export default Footer
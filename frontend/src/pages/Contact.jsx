import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router for navigation
import { assets } from '../assets/assets';
import { toast, ToastContainer } from 'react-toastify'; // For toast notifications
import 'react-toastify/dist/ReactToastify.css';

const Contact = ({ isLoggedIn }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      navigate('/login'); // Redirect to login page if not logged in
      return;
    }

    // Simulate sending the message
    console.log('Form submitted:', formData);

    // Show toast notification
    toast.success('Message sent successfully!');

    // Reset form
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-4">
      <div className="text-center text-3xl pt-12 text-gray-600">
        <h1>CONTACT <span className="text-gray-800 font-bold">US</span></h1>
      </div>

      <div className="my-10 flex flex-col md:flex-row justify-center items-center gap-10 w-full max-w-4xl">
        <div className="w-full md:w-1/2">
          <img className="w-full rounded-lg shadow-lg" src={assets.contact_image} alt="Contact us" />
        </div>

        <div className="flex flex-col justify-center items-start gap-6 w-full md:w-1/2">
          <div className="mt-6 w-full">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Contact;

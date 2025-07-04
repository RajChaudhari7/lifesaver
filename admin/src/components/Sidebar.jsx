import React, { useState, useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { Menu, X } from 'lucide-react'

const Sidebar = () => {

    const { aToken } = useContext(AdminContext)
    const { dToken } = useContext(DoctorContext)

    const [isOpen, setIsOpen] = useState(false)

    const toggleSidebar = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            {/* Mobile Navbar */}
            <div className='md:hidden flex justify-between items-center p-4 bg-white border-b'>
                <button onClick={toggleSidebar}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
                <h1 className='text-lg font-semibold'>Dashboard</h1>
            </div>

            {/* Sidebar Overlay for Mobile */}
            {isOpen && <div className='fixed inset-0 bg-black opacity-50 z-40' onClick={toggleSidebar}></div>}

            {/* Sidebar */}
            <div className={`fixed top-0 left-0 h-full bg-white w-64 z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:block`}>
                <ul className='text-[#515151] mt-5'>

                    {aToken && (
                        <>
                            <SidebarLink to="/admin-dashboard" icon={assets.home_icon} label="Dashboard" />
                            <SidebarLink to="/all-appointments" icon={assets.appointment_icon} label="Appointments" />
                            <SidebarLink to="/add-doctor" icon={assets.add_icon} label="Add Doctor" />
                            <SidebarLink to="/doctor-list" icon={assets.people_icon} label="Doctors List" />
                            <SidebarLink to="/patient" icon={assets.people_icon} label="Patients" />
                        </>
                    )}

                    {dToken && (
                        <>
                            <SidebarLink to="/doctor-dashboard" icon={assets.home_icon} label="Dashboard" />
                            <SidebarLink to="/doctor-appointments" icon={assets.appointment_icon} label="Appointments" />
                            <SidebarLink to="/doctor-profile" icon={assets.people_icon} label="Profile" />
                        </>
                    )}

                </ul>
            </div>
        </>
    )
}

const SidebarLink = ({ to, icon, label }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            `flex items-center gap-4 py-3.5 px-4 md:px-9 cursor-pointer 
            ${isActive ? 'bg-[#F2F3FF] border-r-2 border-primary' : ''}`
        }
    >
        <img src={icon} alt={label} className='w-5 h-5 object-contain' />
        <p className='text-base'>{label}</p>
    </NavLink>
)

export default Sidebar

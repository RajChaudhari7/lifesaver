import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointments = () => {

    const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext)
    const { calculateAge, currency } = useContext(AppContext)

    const [selectedDate, setSelectedDate] = useState('')

    useEffect(() => {
        if (dToken) {
            getAppointments()
        }
    }, [dToken])

    // ✅ Convert slotDate from "4_7_2025, 10:00" to "2025-07-04"
    const convertSlotDateToYYYYMMDD = (slotDate) => {
        try {
            if (!slotDate || typeof slotDate !== 'string') return ''

            const [datePart] = slotDate.split(',')
            if (!datePart) return ''

            let [day, month, year] = datePart.trim().split('_')
            if (!day || !month || !year) return ''

            if (day.length === 1) day = '0' + day
            if (month.length === 1) month = '0' + month

            return `${year}-${month}-${day}` // yyyy-mm-dd
        } catch (error) {
            console.error('Date Conversion Error:', error)
            return ''
        }
    }

    const filteredAppointments = selectedDate
        ? appointments.filter(item => convertSlotDateToYYYYMMDD(item.slotDate) === selectedDate)
        : appointments

    return (
        <div className='w-full max-w-6xl m-5'>

            <div className='flex flex-wrap items-center justify-between mb-3'>
                <p className='text-lg font-medium'>All Appointments</p>
                <div className='flex items-center gap-2'>
                    <input
                        type="date"
                        className='border px-3 py-1 rounded'
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />
                    <button
                        className='bg-red-500 text-white px-3 py-1 rounded'
                        onClick={() => setSelectedDate('')}
                    >
                        Reset
                    </button>
                </div>
            </div>

            <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll '>

                <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
                    <p>#</p>
                    <p>Patient</p>
                    <p>Payment</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Fees</p>
                    <p>Action</p>
                </div>

                {filteredAppointments.length > 0 ? (
                    filteredAppointments.slice().reverse().map((item, index) => (
                        <div className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3  px-6 border-b hover:bg-gray-50 ' key={index}>
                            <p className='max-sm:hidden'>{index + 1}</p>
                            <div className='flex items-center gap-2'>
                                <img className='w-16 rounded-full' src={item.userData.image} alt="" /><p>{item.userData.name}</p>
                            </div>
                            <div>
                                <p className='text-sm inline border border-primary px-2 rounded-full'>
                                    {item.payment ? 'ONLINE' : 'CASH'}
                                </p>
                            </div>
                            <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
                            <p>{item.slotDate} , {item.slotTime}</p>
                            <p>{currency} {item.amount}</p>
                            {
                                item.cancelled
                                    ? <p className='text-red-400 text-sm font-medium'>Cancelled</p>
                                    : item.isCompleted
                                        ? <p className='text-green-500 text-sm font-medium'>Completed</p>
                                        : <div className='flex'>
                                            <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                                            <img onClick={() => completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
                                        </div>
                            }
                        </div>
                    ))
                ) : (
                    <p className='text-center py-4 text-gray-400'>No Appointments Found</p>
                )}

            </div>
        </div>
    )
}

export default DoctorAppointments

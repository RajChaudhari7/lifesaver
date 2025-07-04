import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const PatientsList = () => {
  const { patients, aToken, getAllPatients, deletePatient } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllPatients();
    }
  }, [aToken]);

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Patients</h1>
      <div className='flex flex-wrap w-full gap-4 mt-5 gap-y-6'>
        {patients.map((patient, index) => (
          <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
            <img className='bg-indigo-50 group-hover:bg-primary transition-all duration-500' src={patient.image} alt={patient.name} />
            <div className='p-4'>
              <p className='text-neutral-800 text-lg font-medium'>{patient.name}</p>
              <p className='text-zinc-600 text-sm'>{patient.email}</p>
              <p className='text-zinc-600 text-sm'>Phone: {patient.phone}</p>
              <p className='text-zinc-600 text-sm'>Age: {patient.age}</p>
              <div className='mt-2'>
                <h6 className='text-sm font-medium'>Appointments:</h6>
                {patient.doctors && patient.doctors.length > 0 ? (
                  <ul>
                    {patient.doctors.map((appointment, idx) => (
                      <li key={idx} className='text-zinc-600 text-xs'>
                         {appointment.doctorName} - {appointment.appointmentDate} at {appointment.appointmentTime}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className='text-zinc-600 text-xs'>No appointments</p>
                )}
              </div>
              <button
                onClick={() => deletePatient(patient._id)}
                className='mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded'
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientsList;

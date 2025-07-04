import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'
import userModel from '../models/userModel.js'

// api for adding doctor
const addDoctor = async (req, res) => {

    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
        const imageFile = req.file

        // checking for all data to add doctor

        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing details" })
        }

        // validating email format

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please Enter valid email" })
        }

        // validating password format

        if (password.length < 7) {
            return res.json({ success: false, message: "Please Enter strong password " })
        }

        // hashing doctor password

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // upload image to cloudinary

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        res.json({ success: true, message: "Doctor Added" })


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }

}
// api for admin login 
const loginAdmin = async (req, res) => {
    try {

        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })

        } else {
            res.json({ success: false, message: "Invalid Credentials" })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Api to get all doctors list for admin panel

const allDoctors = async (req, res) => {
    try {

        const doctors = await doctorModel.find({}).select('-password')
        res.json({ success: true, doctors })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Api to get all apointments list

const appointmentsAdmin = async (req, res) => {

    try {

        const appointments = await appointmentModel.find({})
        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// api to cancel the appoiuntment

const appointmentCancel = async (req, res) => {

    try {

        const { appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        // releasing doctors slot

        const { docId, slotDate, slotTime } = appointmentData

        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: "Appointment Cancelled" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// api to get dashboard data for admin pannel 

const adminDashboard = async (req, res) => {

    try {

        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }

        res.json({success:true, dashData})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to delete a doctor
const deleteDoctor = async (req, res) => {
    try {
        const { docId } = req.body;

        if (!docId) {
            return res.json({ success: false, message: "Doctor ID is required" });
        }

        // Find the doctor by ID and delete it
        const deletedDoctor = await doctorModel.findByIdAndDelete(docId);

        if (!deletedDoctor) {
            return res.json({ success: false, message: "Doctor not found" });
        }

        res.json({ success: true, message: "Doctor deleted successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Function to calculate age from date of birth
const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

// Get all patients
const getAllPatients = async (req, res) => {
  try {
    const users = await userModel.find().select('-password');

    const usersWithAgeAndAppointments = await Promise.all(users.map(async (user) => {
      const age = user.dob && user.dob !== "Not Selected" ? calculateAge(user.dob) : null;

      // Fetch appointments for the current user
      const appointments = await appointmentModel.find({ userId: user._id });

      // Extract doctor information from the appointments
      const doctors = appointments.map(appointment => ({
        doctorName: appointment.docData.name,
        appointmentDate: appointment.slotDate,
        appointmentTime: appointment.slotTime
      }));

      return {
        ...user.toObject(),
        age,
        doctors
      };
    }));

    res.json({ success: true, patients: usersWithAgeAndAppointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a patient
const deletePatient = async (req, res) => {
  try {
    const { patientId } = req.body;

    // Delete the patient
    await userModel.findByIdAndDelete(patientId);

    // Optionally, you can also delete related appointments
    await appointmentModel.deleteMany({ userId: patientId });

    res.json({ success: true, message: "Patient deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addDoctor, loginAdmin, allDoctors, appointmentsAdmin, appointmentCancel, adminDashboard, deleteDoctor, deletePatient, getAllPatients }
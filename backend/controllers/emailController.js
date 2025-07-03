// controllers/emailController.js
import nodemailer from 'nodemailer';
import validator from 'validator'

// Configure the transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send email
export const sendEmail = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Validate request body
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "Missing details" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Enter a valid email" });
    }

    const mailOptions = {
      from: email,
      to: 'rj480036@gmail.com', // The email address you want to send to
      subject: `New message from ${name}`,
      text: message,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error sending email" });
  }
};


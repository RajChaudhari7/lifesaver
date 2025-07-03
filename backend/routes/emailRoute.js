// routes/emailRoute.js
import express from 'express';
import { sendEmail } from '../controllers/emailController.js';

const emailRouter = express.Router();

// Route to send email
emailRouter.post('/send-email', sendEmail);

export default emailRouter;


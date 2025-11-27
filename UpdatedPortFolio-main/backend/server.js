// import express from 'express';
// import mongoose from 'mongoose';
// import nodemailer from 'nodemailer';
// import { Contact } from './model/userData.model.js';
// import cors from 'cors';

// const app = express();
// app.use(cors());
// app.use(express.json());

// // MongoDB connection
// const Mongo_url = 'mongodb+srv://portfolio:portfolio@cluster0.ol3q5k4.mongodb.net/Portfolio?retryWrites=true&w=majority&appName=Cluster0';
// mongoose.connect(Mongo_url)
//     .then(() => console.log("✅ DB Connected..."))
//     .catch((err) => console.error("❌ MongoDB Error:", err));

// // Nodemailer setup
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'mihiraval2005@gmail.com',
//         pass: 'pwcy xgjl atgw asek'  
//     }
// });

// // Contact form API
// app.post('/api/contact', async (req, res) => {
//     try {
//         const { name, email, phonenumber, message } = req.body;

//         console.log("📩 Incoming request:", req.body);

//         if (!name || !email || !message) {
//             return res.status(400).json({ message: "Name, email, and message are required!" });
//         }

//         // Step 1: Save to DB
//         console.log("💾 Saving to DB...");
//         const existing = await Contact.findOne({ email });
//         if (existing) {
//             console.log("⚠️ Email already exists");
//             return res.status(409).json({ message: 'Email already submitted' });
//         }

//         const newContact = new Contact({ name, email, phonenumber, message });
//         await newContact.save();
//         console.log("✅ Saved in DB");

//         // Step 2: Send mail to you
//         console.log("📤 Sending mail to owner...");
//         await transporter.sendMail({
//             from: `"Portfolio Contact" <mihiraval2005@gmail.com>`,
//             to: "mihiraval2005@gmail.com",
//             subject: "New Contact Form Submission",
//             html: `
//                 <h3>New Contact Message</h3>
//                 <p><strong>Name:</strong> ${name}</p>
//                 <p><strong>Email:</strong> ${email}</p>
//                 <p><strong>Phone:</strong> ${phonenumber}</p>
//                 <p><strong>Message:</strong> ${message}</p>
//             `
//         });
//         console.log("✅ Mail sent to owner");

//         // Step 3: Send confirmation mail to client
//         console.log("📤 Sending confirmation mail...");
//         await transporter.sendMail({
//             from: `"Mihir Raval" <mihiraval2005@gmail.com>`,
//             to: email,
//             subject: "Thanks for contacting!",
//             html: `
//                 <p>Hi ${name},</p>
//                 <p>Thanks for reaching out. I’ll get back to you shortly!</p>
//                 <p>Regards,<br/>Mihir Raval</p>
//             `
//         });
//         console.log("✅ Confirmation mail sent");

//         res.status(200).json({ message: "Message received & email sent!" });
//     } catch (error) {
//         console.error("❌ Server Error:", error);
//         res.status(500).json({ error: error.message, stack: error.stack });
//     }
// });

// // Server start
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//     console.log(`🚀 Server running on port ${PORT}`);
// });
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB connection
connectDB();

// Routes
app.use("/api", contactRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

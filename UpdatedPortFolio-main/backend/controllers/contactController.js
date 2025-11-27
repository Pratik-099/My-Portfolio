import { Contact } from "../models/Contact.js";
import transporter from "../config/mailer.js";

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, phonenumber, message } = req.body;
    console.log("📩 Incoming request:", req.body);

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email, and message are required!" });
    }

    // Save in DB
    const existing = await Contact.findOne({ email });
    if (existing) {
      console.log("⚠️ Email already exists");
      return res.status(409).json({ message: "Email already submitted" });
    }

    const newContact = new Contact({ name, email, phonenumber, message });
    await newContact.save();
    console.log("✅ Saved in DB");

    // Send mail to you
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "New Contact Form Submission",
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phonenumber}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });
    console.log("✅ Mail sent to owner");

    // Confirmation mail to client
    await transporter.sendMail({
      from: `"Mihir Raval" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thanks for contacting!",
      html: `
        <p>Hi ${name},</p>
        <p>Thanks for reaching out. I’ll get back to you shortly!</p>
        <p>Regards,<br/>Mihir Raval</p>
      `,
    });
    console.log("✅ Confirmation mail sent");

    res.status(200).json({ message: "Message received & email sent!" });
  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ error: error.message });
  }
};

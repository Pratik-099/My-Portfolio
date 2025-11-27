import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
     user: 'mihiraval2005@gmail.com',
     pass: 'pwcy xgjl atgw asek'  
  },
});

export default transporter;

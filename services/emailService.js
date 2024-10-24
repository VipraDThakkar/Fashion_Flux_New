import nodemailer from 'nodemailer';
// console.log('Email:', process.env.EMAILFROM_USER);
// console.log('Password:', process.env.EMAIL_PASS); 

const sendOrderConfirmationEmail = async (userEmail, orderDetails) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your email service
    auth: {
      user:process.env.EMAILFROM_USER, // Make sure to set these in your environment variables
      pass:process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from:process.env.EMAILFROM_USER, // Use the email from environment variables
    to:process.env.EMAILTO_USER,
    subject: 'Order Confirmation',
    text: `Hello, your order has been confirmed. Order Details: ${orderDetails}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export default sendOrderConfirmationEmail;

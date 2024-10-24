import sendOrderConfirmationEmail from '../services/emailService.js'; // Adjust the path if needed

export const confirmOrder = async (req, res) => {
  // Logic for confirming the order
  const userEmail = req.body.email; // or however you get the user's email
  const orderId = '12345'; // Example order ID
  const orderTotal = '$100'; // Example total amount

  // Call the email function
  await sendOrderConfirmationEmail(userEmail, `Order ID: ${orderId}, Total: ${orderTotal}`);

  res.status(200).json({ success: true, message: 'Order confirmed and email sent' });
};

import axios from 'axios';

export const checkCaptcha = async (req, res, next) => {
  const { token } = req.body;

  try {
    // Sending secret key and response token to Google Recaptcha API for authentication.
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${token}`
    );

    // Check response status and send back to the client-side
    if (response.data.success) {
      next();
    } else {
      return res.status(501).json({ msg: 'Robot 🤖' });
    }
  } catch (error) {
    // Handle any errors that occur during the reCAPTCHA verification process
    console.error(error);
    res.status(500).send('Error verifying reCAPTCHA');
  }
};

import axios from "axios";

export const checkCaptcha = async (req, res, next) => {
  let token = req.header("Authorization");
  if (!token) {
    return res.status(403).send("Access Denied");
  }
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length).trimLeft();
  }

  try {
    // Sending secret key and response token to Google Recaptcha API for authentication.
    // console.log(process.env.SECRET_KEY);
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${token}`,
      {},
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    // Check response status and send back to the client-side
    if (response.data.success) {
      next();
    } else {
      return res.status(501).json({
        error: response.data["error-codes"]
          ? response.data["error-codes"][0]
          : "Robot Caught! 🤖",
      });
    }
  } catch (error) {
    // Handle any errors that occur during the reCAPTCHA verification process
    console.error(error);
    res.status(500).send("Error verifying reCAPTCHA");
  }
};

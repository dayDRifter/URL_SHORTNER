import { Otp } from "../../models/otp.model.js";
import { User } from "../../models/user.model.js";
import ApiResponse from "../../utils/ApiResponse.js";
import bcrypt from "bcrypt";

export const forgotPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Required fields missing."));
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res
        .status(404)
        .send(
          new ApiResponse(
            404,
            null,
            "User with the provided details does not exist."
          )
        );
    }

    const existingOtp = await Otp.findOne({ email });

    if (!existingOtp) {
      return res
        .status(404)
        .send(
          new ApiResponse(
            404,
            null,
            "Kindly request for an OTP before trying to verify."
          )
        );
    }

    if (parseInt(otp) !== parseInt(existingOtp.code)) {
      return res.status(400).send(new ApiResponse(400, null, "Invalid OTP."));
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    existingUser.password = hashed;
    await existingUser.save();
    await existingOtp.deleteOne();

    res
      .status(200)
      .send(new ApiResponse(200, null, "Password updated successfully."));
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new ApiResponse(500, error, "Failed to verify user OTP."));
  }
};

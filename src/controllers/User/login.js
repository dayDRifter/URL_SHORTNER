import { User } from "../../models/user.model.js";
import ApiResponse from "../../utils/Apiresponse.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userLogin = async (req, res) => {
  try {
    const { password, email } = req.body;
    if (!password || !email) {
      return res
        .status(400)
        .status(new ApiResponse(400, null, "Fields is missing"));
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(400)
        .status(new ApiResponse(400, null, "User not in our database"));
    }

    const isCredsTrue = await bcrypt.compare(password, existingUser.password);

    if (!isCredsTrue) {
      return res.status(400).send(new ApiResponse(400, null, "Invalid creds"));
    }

    const token = jwt.sign(
      {
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    res
      .status(200)
      .send(new ApiResponse(200, { token }, "Logged in successfully."));
  } catch (error) {
    console.log(error);
    res.status(500).send(new ApiResponse(500, null, "Cannot find the user"));
  }
};
export { userLogin };

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiResponse from "../../utils/Apiresponse.js";
import { User } from "../../models/user.model.js";

const userRegister = async (req, res) => {
  try {
    // destructuring
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      return res
        .status(404)
        .send(new ApiResponse(404, null, "Some details is missing"));
    }
    const hashPassword = await bcrypt.hash(password, 10); //hashpassword-> encrypted password

    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
    });
    res.status(201).send(new ApiResponse(201, newUser, "Sucessfully created"));
  } catch (error) {
    console.log(error);
    res.status(500).send(new ApiResponse(500, null, "Soemthing is missing"));
  }
};

export { userRegister };

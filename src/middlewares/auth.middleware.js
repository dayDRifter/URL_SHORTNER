import ApiResponse from "../utils/Apiresponse.js";
import jwt from "jsonwebtoken";

export const checkIsLoggedIn = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    return res
      .status(400)
      .send(new ApiResponse(400, null, "Missing bearer Authorization"));
  }
  const token = bearer.split(" ")[1];

  // console.log(token);

  if (!token) {
    return res.status(400).send(new ApiResponse(400, null, "Missing token"));
  }

  const decodedInformation = jwt.verify(token, process.env.TOKEN_SECRET);

  if (!decodedInformation) {
    res.status(400).send(new ApiResponse(400, null, "Invalid Token"));
  }

  req.user = decodedInformation;
  next();
};

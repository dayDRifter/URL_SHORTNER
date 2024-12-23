import { userLogin } from "./User/login.js";
import { userRegister } from "./User/register.js";
import {forgotPassword} from "./User/forgot.js";
import {resetPassword} from "./User/reset.js";

const userController = {
  register: userRegister,
  login: userLogin,
  reset: resetPassword,
  forgot: forgotPassword,
};

export default userController;

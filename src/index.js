import "dotenv/config";
import http from "http";
import app from "./app.js";
import { connectTODB } from "./db/db.connect.js";
import { config, sendMail } from "./utils/mailers.utils.js";

const server = http.createServer(app);

const PORT = process.env.PORT;
await config(
  process.env.USER_EMAIL,
  process.env.APP_PASSWORD,
  process.env.SMTP_HOST,
  process.env.SMTP_PORT
);
// await sendMail(
//   "daydrifterhassh@gmail.com",
//   "Kya haal hai bhai",
//   "Yor otp is: 6254"
// );
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectTODB();
});

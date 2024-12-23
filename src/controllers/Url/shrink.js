import { Url } from "../../models/url.model.js";
import ApiResponse from "../../utils/Apiresponse.js";
import crypto from "crypto";

const urlShrink = async (req, res) => {
  try {
    //DESTRUCTURING
    const { original } = req.body;

    if (!original) {
      res.status(400).send(new ApiResponse(400, null, "Url not be empty"));
    }
    // const key = crypto.randomBytes(2).toString("hex");
    let key;
    let isKeyUnique = false;

    while (!isKeyUnique) {
      key = crypto.randomBytes(3).toString("hex"); // Generate 6-character key
      const existingKey = await Url.findOne({ short: key });
      if (!existingKey) {
        isKeyUnique = true;
      }
    }

    // Save the shortened URL in the database
    const newUrl = await Url.create({
      original,
      shortid: key,
      createdBy: req.user._id,
    });

    // Respond with the shortened URL
    res
      .status(201)
      .send(new ApiResponse(201, newUrl, "URL shortened successfully"));
  } catch (error) {
    console.log(error);
    res.send(500).send(new ApiResponse(500, null, "Failed to shrink"));
  }
};
export { urlShrink };

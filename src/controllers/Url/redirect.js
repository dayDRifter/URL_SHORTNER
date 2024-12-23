import { Url } from "../../models/url.model.js";
import ApiResponse from "../../utils/Apiresponse.js";

const urlRedirect = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);

    const existingUrl = await Url.findOne({ shortid: id });
    // console.log(existingxsUrl);

    if (!existingUrl) {
      return res.status(404).send(new ApiResponse(404, null, "Url not found"));
    }
    existingUrl.clicks += 1;
    await existingUrl.save();
    res.status(200).redirect(existingUrl.original);
    // res.send("Hi");
  } catch (error) {
    console.log(error);
    res.status(500).send(new ApiResponse(500, null, "Failed to redirect"));
  }
};

export { urlRedirect };

import { Url } from "../../models/url.model.js";
import ApiResponse from "../../utils/Apiresponse.js";

const urlViews = async (req, res) => {
  try {
    const { id } = req.params;
    const existingUrl = await Url.findOne({ shortid: id });

    if (!existingUrl) {
      return res.status(404).send(new ApiResponse(404, null, "Url not found"));
    }
    res.status(200).send(
      new ApiResponse(
        200,
        {
          views: existingUrl.clicks,
        },
        "URL views fetched successfully"
      )
    );
  } catch (error) {
    console.log(error);
    res.status(500).send(new ApiResponse(500, null, "Failure occur"));
  }
};

export { urlViews };

import { urlRedirect } from "./Url/redirect.js";
import { urlShrink } from "./Url/shrink.js";
import { urlViews } from "./Url/views.js";

const urlController = {
  shrink: urlShrink,
  views: urlViews,
  redirect: urlRedirect,
};

export default urlController;

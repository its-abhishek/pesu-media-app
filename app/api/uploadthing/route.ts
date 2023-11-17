// pages/api/upload.js

import { createNextRouteHandler } from "uploadthing/next";
import { ourFileRouter, OurFileRouter } from "./core";

export const { GET, POST } = createNextRouteHandler<OurFileRouter>({
  router: ourFileRouter,
});

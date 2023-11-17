import { generateComponents } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

// Assuming generateComponents is compatible with your router type
export const {
  UploadButton,
  UploadDropzone,
  Uploader
} = generateComponents<OurFileRouter>();

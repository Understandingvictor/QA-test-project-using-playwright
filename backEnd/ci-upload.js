// backEnd/ci-upload.js
import "dotenv/config"
import { sendCallback } from "./ci-callBack.js";

import { videoPicsResult } from "./helpers/videoPicResults.helper.js";
//import {cloudinaryUploader, cloudinaryUploaderVideo} from "./helpers/cloudinary.helper.js";
import { v2 as cloudinary } from "cloudinary";

//Configure Cloudinary using environment variables from GitHub Actions
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
        const cloudinaryUploader = async (pathToFile, Folder) => {
          try {
            const result = await cloudinary.uploader.upload(pathToFile, {
              folder: Folder,
              public_id: "latest-image", // same ID every time
              overwrite: true,
            });
            //await fs.unlink(pathToFile);
            return result;
          } catch (error) {
            //await fs.unlink(pathToFile);
            console.log("something happened in cloudinary endpoint");
            console.log(error.message);
            throw new Error(error.message);
          }
        };

        const cloudinaryUploaderVideo = async (pathToFile, Folder) => {
          try {
            const result = await cloudinary.uploader.upload(pathToFile, {
              resource_type: "video",
              public_id: "latest-video",
              overwrite: true, // ensures replacement
              folder: Folder,
            });
            //await fs.unlink(pathToFile);
            return result;
          } catch (error) {
            // await fs.unlink(pathToFile);
            console.log("something happened in cloudinary video endpoint");
            console.log(error.message);
            throw new Error(error.message);
          }
        };

async function uploadResults() {
  let uploadedVideoUrl = null;
  let uploadedScreenshotUrl = null;
  let success = false;
  let ciError = null;
  
  try {
    console.log("Starting CI file upload...");

    // This function should now successfully find the files created by the 'npx playwright test' step
    const files = videoPicsResult();

    console.log(`Found video: ${files.videoPathAbsolute}`);
    console.log(`Found screenshot: ${files.screenshotPathAbsolute}`);

    // Upload Video
    const uploadedVideo = await cloudinaryUploaderVideo(
      files.videoPathAbsolute,
      "playwright-results"
    );
    console.log(`Video uploaded: ${uploadedVideo.secure_url}`);

    // Upload Screenshot
    const uploadedScreenshot = await cloudinaryUploader(
      files.screenshotPathAbsolute,
      "playwright-results"
    );
    console.log(`Screenshot uploaded: ${uploadedScreenshot.secure_url}`);
    success = true;
    // OPTIONAL: Save these URLs to a database or a file that the Render app can read
    // For a simple portfolio, you can just log the URLs and update your frontend manually or use a simple JSON file.
  } catch (error) {
    console.error("❌ Error during CI upload process:", error.message);
    // Fail the CI job if the upload fails
    //process.exit(1);
  }

  // 4. Send final status back to the API Server
  if (success) {
    await sendCallback({
      videoUrl: uploadedVideoUrl,
      screenshotUrl: uploadedScreenshotUrl,
    });
  } else {
    await sendCallback({ error: ciError });
    // If the upload/testing failed, ensure the CI pipeline visually fails
    process.exit(1);
  }
}

uploadResults();

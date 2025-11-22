import { exec } from "child_process";
import { videoPicsResult, reportUrl } from "../helpers/videoPicResults.helper.js";
import { cloudinaryUploader, cloudinaryUploaderVideo } from "../helpers/cloudinary.helper.js";
import throwErrorMessage from "../helpers/errorHandler.helpers.js";





export const ecommerceE2E = async (req, res, next) => {
  console.log("executing");

  exec("npx playwright test", { timeout: 120000 }, async (error) => {
    try {
      const files = videoPicsResult();
      const urlPath = reportUrl();

      const uploadedVideo = await cloudinaryUploaderVideo(
        files.videoPathAbsolute,
        "playwright-results"
      );
      const uploadedScreenshot = await cloudinaryUploader(
        files.screenshotPathAbsolute,
        "playwright-results"
      );
      if (error) {
        //gather video and picture url here
        const files = videoPicsResult();

        return res.json({
          status: "failed",
          urlPath,
          message: error.message,
          videoUrl: files.videoPathAbsolute,
          pictureUrl: files.screenshotPathAbsolute,
        });
      }

      return res.json({
        status: "passed",
        urlPath,
        videoUrl: uploadedVideo.secure_url,
        screenshotUrl: uploadedScreenshot.secure_url,
      });
    } catch (error) {
      console.error(error.message, "is the error happened at e2e endpoint");
      throw error;
    }

    //   //gather video and picture url here
    //   const files = videoPicsResult();
    // const urlPath = reportUrl();
    //       const response = await cloudinaryUploader(i.path, "Product-Images"); //uploader
    // if (!response) {
    //   await fs.unlink(i.path);
    //   throw new Error("upload not successful");
    // }
    //   res.json({ status: "passed", videoUrl: files.videoPath, pictureUrl: files.screenshotPath });
  });
};

export const testing = async (req, res, next) => {
      const files = videoPicsResult();
    return res
        .json({ message: "i went successfully", files });
}
import { exec } from "child_process";
import "dotenv/config";
import { videoPicsResult, reportUrl } from "../helpers/videoPicResults.helper.js";
import { cloudinaryUploader, cloudinaryUploaderVideo } from "../helpers/cloudinary.helper.js";
import throwErrorMessage from "../helpers/errorHandler.helpers.js"
import { setLatestResults, getLatestResults } from "../helpers/resultsStore.js";
import fetch from "node-fetch"; // Ensure 'node-fetch' is installed



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

  });
};


// 1. PUBLIC: Trigger Test (Endpoint for the employer's click)
export const triggerE2E = async (req, res, next) => {
    // 1. Immediately update status to 'processing'
    setLatestResults({ status: 'processing', timestamp: new Date().toISOString() });

    // 2. Respond instantly so the frontend doesn't time out (HTTP 202 Accepted)
    res.status(202).json({ status: "processing", message: "Test queued." });
  
    // 3. Send the command to GitHub Actions to start the workflow
    try {
        await fetch(`https://api.github.com/repos/Understandingvictor/QA-test-project-using-playwright
/dispatches`, {
            method: 'POST',
            headers: {
              'Authorization': `token ${process.env.GITHUB_PAT}`, // GitHub PAT secret
               'Accept': 'application/vnd.github.v3+json',
              
            },
            body: JSON.stringify({ event_type: 'run_e2e_test' })
        });
    } catch (error) {
      console.error("GitHub Dispatch Error:", error.message);
           setLatestResults({
             status: "failed",
             errorMessage: `Failed to dispatch to GitHub: ${error.message}. Check GITHUB_PAT and repo details.`,
           });
         }
    }

//endpoint which github actions will send results to
export const callbackE2E = async (req, res, next) => {
  try {
    const { videoUrl, screenshotUrl, apiSecret, error } = req.body;
    console.log(videoUrl, screenshotUrl,"was returned from actions");
    if (apiSecret !== process.env.GITHUB_ACTIONS_SECRET) {
      console.error("Callback failed: Invalid API_UPDATE_SECRET provided.");
       return res.status(403).json({ message: "Unauthorized callback request." });
        throwErrorMessage("bad request", 400);
    }
    else if (error) {
      // Handle failure reported by the CI script
          setLatestResults({
            status: "failed",
            timestamp: new Date().toISOString(),
            errorMessage: error,
            videoUrl: null,
            screenshotUrl: null,
          });
          return res.status(200).json({ status: "failure acknowledged" });
            throwErrorMessage("something went wrong", 500);
    }
    
      // Success case: Update the state with the secure URLs
      setLatestResults({
        status: "complete",
        timestamp: new Date().toISOString(),
        videoUrl: videoUrl,
        screenshotUrl: screenshotUrl,
        errorMessage: null,
      });
    //Update the ui
    return res.json({ screenshotUrl, videoUrl, "message":"returned successfully" });
  } catch (error) {
    console.log(error.message, "error happened on callbackE2E");
    next(error);
  }
}

// --- 1. Endpoint for the Employer's UI to poll (GET /getLatestStatus) ---
export const getLatestStatus = (req, res, next) => {
  // Returns the current state object (status, URLs, error message)
  res.status(200).json(getLatestResults());
};

export const testing = async (req, res, next) => {
      const files = videoPicsResult();
    return res  
        .json({ message: "i went successfully", files });
}
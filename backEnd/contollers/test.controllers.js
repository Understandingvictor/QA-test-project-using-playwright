import { exec } from "child_process";
import "dotenv/config";
import { videoPicsResult, reportUrl } from "../helpers/videoPicResults.helper.js";
import { cloudinaryUploader, cloudinaryUploaderVideo } from "../helpers/cloudinary.helper.js";
import throwErrorMessage from "../helpers/errorHandler.helpers.js"
import { setLatestResults, getLatestResults } from "../helpers/resultsStore.js";
import fetch from "node-fetch"; // Ensure 'node-fetch' is installed
import {getCurrentSocketId} from "../helpers/resultsStore.js";
import { GETIO } from "../helpers/socket.js";

let socketIdRetrieved;



// 1. PUBLIC: Trigger Test (Endpoint for the employer's click)
export const triggerE2E = async (req, res, next) => {
  const { socketId } = req.body;
  //socketIdRetrieved = socketId;


  console.log(socketId, "is the socket ID at trigger");
  //console.log(socketIdRetrieved, "is the global socket id");

    // 1. Immediately update status to 'processing'
    setLatestResults({ status: 'processing',  socketId: socketId});

    //Retrieve the Socket ID from the store
    const socketIdToEmit = getCurrentSocketId();
    console.log("socketIdToEmit is", socketIdToEmit);


    // 2. Respond instantly so the frontend doesn't time out (HTTP 202 Accepted)
    res.status(202).json({ status: "processing", message: "Test queued." });
  
    // 3. Send the command to GitHub Actions to start the workflow
    console.log("dispatched and starting in github");
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
      console.log("GitHub Dispatch Error:", error.message);
           setLatestResults({
             status: "failed",
             errorMessage: `Failed to dispatch to GitHub: ${error.message}. Check GITHUB_PAT and repo details.`,
           });
         }
    }



//endpoint which github actions will send results to
export const callbackE2E = async (req, res, next) => {
  //Update the ui
    let io = GETIO();

    //Retrieve the Socket ID from the store
    const socketIdToEmit = getCurrentSocketId();
    console.log(socketIdToEmit, "this is from callbacke2e endpoint");
  try {
    const { videoUrl, screenshotUrl, apiSecret, error } = req.body;
    console.log(videoUrl, screenshotUrl, "are what was retrieved");
    if (apiSecret !== process.env.GITHUB_ACTIONS_SECRET) {
      console.error("Callback failed: Invalid API_UPDATE_SECRET provided.");
       return res.status(403).json({ message: "Unauthorized callback request." });
        throwErrorMessage("bad request", 400);
    }
    else if (error) {
      // Handle failure reported by the CI script
          // setLatestResults({
          //   status: "failed",
          //   timestamp: new Date().toISOString(),
          //   errorMessage: error,
          //   videoUrl: null,
          //   screenshotUrl: null,
          // });
           console.log(socketIdToEmit, "is the socket id in the callback function error path")
        io.to(socketIdToEmit).emit("privateMessage", {
          status: error.message,
          timestamp: new Date().toISOString(),
          errorMessage: error.message,
          videoUrl: null,
          screenshotUrl: null,
        });
          return res.status(200).json({ status: "failure acknowledged" });
            throwErrorMessage("something went wrong", 500);
    }
    
      // Success case: Update the state with the secure URLs
      // setLatestResults("privateMessage", {
      //   status: "complete",
      //   timestamp: new Date().toISOString(),
      //   videoUrl: videoUrl,
      //   screenshotUrl: screenshotUrl,
      //   errorMessage: null,
      // });
    console.log(socketIdToEmit, "is the socket id in the callback function")
    io.to(socketIdToEmit).emit("privateMessage", {message:"i succeeded"});

    // io.to(socketIdRetrieved).emit("privateMessage",{
    //   status: "complete",
    //   timestamp: new Date().toISOString(),
    //   videoUrl: videoUrl,
    //   screenshotUrl: screenshotUrl,
    //   errorMessage: null,
    // });
    //return res.json({ screenshotUrl, videoUrl, "message":"returned successfully" });
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
  try {
    const { socketIdRetrieved } = req.body
    console.log(socketIdRetrieved, "is the socket retrieved");
    //const files = videoPicsResult();
    
    const io = GETIO();
    io.to(socketIdRetrieved).emit("privateMessage", {
      status: "complete",
      timestamp: new Date().toISOString(),
      errorMessage: null,
    });
    console.log("entered here at the backend");
    return res.status(200).json({ message: "i went successfully" });
  } catch (error) {
    console.log(error.message, "is the error message")
    next(error)
  }
}
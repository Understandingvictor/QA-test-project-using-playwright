import { exec } from "child_process";
import { videoPicsResult, reportUrl } from "../helpers/videoPicResults.helper.js";



export const ecommerceE2E = async (req, res, next) => {
    console.log("executing")
    
    
    exec("npx playwright test",{ timeout: 120000 }, (error, stdout) => {
        if (error) {
          //gather video and picture url here
          const files = videoPicsResult();
          const urlPath = reportUrl();
          return res.json({
            status: "failed",
            message: error.message,
            videoUrl: files.videoPath,
            pictureUrl: files.screenshotPath,
          });
        }
        
        //gather video and picture url here 
        const files = videoPicsResult();
        const urlPath = reportUrl();
        res.json({ status: "passed", videoUrl: files.videoPath, pictureUrl: files.screenshotPath });
    })
}

export const testing = async (req, res, next) => {
    return res
        .json({ message: "i went successfully" });
}
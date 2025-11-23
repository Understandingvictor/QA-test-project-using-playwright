import fs from "fs";
import path from "path";
//import { throwDeprecation } from "process";

 import { fileURLToPath } from "url";

 // recreate __dirname in ESM
 const __filename = fileURLToPath(import.meta.url);
 const __dirname = path.dirname(__filename);


export const videoPicsResult = () => {
  try {
    const dataDir = path.join(__dirname, "..", "playwright-report", "data");
    const files = fs.readdirSync(dataDir);

    const videoFile = files[files.length - 1]; // or use files[files.length-1] for last file
    const screenShot = files[0];

    const videoPathRelative = path.join("playwright-report", "data", videoFile);
    const screenshotPathRelative = path.join("playwright-report", "data", screenShot);

    // Absolute paths (for reading files in Node)
    const videoPathAbsolute = path.resolve(videoPathRelative);
    const screenshotPathAbsolute = path.resolve(screenshotPathRelative);

    return {
      videoPathRelative,
      screenshotPathRelative,
      videoPathAbsolute,
      screenshotPathAbsolute,
    };
  } catch (error) {
    console.log(
      error.message,
      "is the error form video and pics result helper function"
    );
    throw error;
  }
};

export const reportUrl = () => {
  try {
    const dataDir = path.join(__dirname, "..", "playwright-report");

    const files = fs.readdirSync(dataDir);

    const reportFile = files[files.length - 1]; // or use files[files.length-1] for last file

    const reportPath = path.join("playwright-report", reportFile);
    // Absolute paths (for reading files in Node)
    const reportPathAbsolute = path.resolve(reportPath);

    return reportPathAbsolute;
  } catch (error) {
    console.log(error.message, "is the error form report url helper function");
    throw error;
  }
};



export const videoPicsResult2 = () => {
  try {
    const dataDir = path.join(__dirname, "..", "playwright-report", "data");
    const files = fs.readdirSync(dataDir);

    const videoFile = files[files.length - 1]; // or use files[files.length-1] for last file
    const screenShot = files[0];

    const videoPath = path.join(dataDir, videoFile);
    const screenshotPath = path.join(dataDir, screenShot);

    return {
      videoPath,
      screenshotPath,
    };
  } catch (error) {
    console.log(
      error.message,
      "is the error form video and pics result helper function"
    );
    throw error;
  }
};

// backEnd/controllers/results.controller.js
import { setLatestResults, getLatestResults } from "../helpers/resultsStore.js";
//import { setLatestResults, getLatestResults } from "../services/testResults.js";
import fetch from "node-fetch"; // Ensure 'node-fetch' is installed

// --- 1. Endpoint for the Employer's UI to poll (GET /api/v1/results/latest) ---
export const getLatestStatus = (req, res, next) => {
  // Returns the current state object (status, URLs, error message)
  res.status(200).json(getLatestResults());
};

// --- 2. Secured Endpoint for the CI Job to call back (POST /api/v1/results/callback) ---
export const callbackE2E = async (req, res, next) => {
  const { videoUrl, screenshotUrl, apiSecret, error } = req.body;

  // MANDATORY SECURITY CHECK: Verify the secret key sent from the CI
  if (!apiSecret || apiSecret !== process.env.API_UPDATE_SECRET) {
    console.error("Callback failed: Invalid API_UPDATE_SECRET provided.");
    return res.status(403).json({ message: "Unauthorized callback request." });
  }

  if (error) {
    // Handle failure reported by the CI script
    setLatestResults({
      status: "failed",
      timestamp: new Date().toISOString(),
      errorMessage: error,
      videoUrl: null,
      screenshotUrl: null,
    });
    return res.status(200).json({ status: "failure acknowledged" });
  }

  // Success case: Update the state with the secure URLs
  setLatestResults({
    status: "complete",
    timestamp: new Date().toISOString(),
    videoUrl: videoUrl,
    screenshotUrl: screenshotUrl,
    errorMessage: null,
  });

  console.log("✅ Test Results Successfully Received and Saved.");
  res.status(200).json({ status: "success acknowledged" });
};

// --- 3. Endpoint for the UI to trigger the CI (POST /api/v1/tests/trigger) ---
export const triggerE2E = async (req, res, next) => {
  // 1. Immediately update status to 'processing' and clear old results
  setLatestResults({
    status: "processing",
    timestamp: new Date().toISOString(),
    errorMessage: "CI job initiated.",
    videoUrl: null,
    screenshotUrl: null,
  });

  // 2. Respond instantly (HTTP 202 Accepted) - RESPONSE IS SENT HERE
  res
    .status(202)
    .json({
      status: "processing",
      message: "Test queued successfully on GitHub Actions.",
    });

  // 3. Send the command to GitHub Actions (This runs in the background)
  try {
    // Using your provided repo path
    const OWNER = "Understandingvictor";
    const REPO = "QA-test-project-using-playwright";

    await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/dispatches`, {
      method: "POST",
      headers: {
        Authorization: `token ${process.env.GITHUB_PAT}`, // Use your GitHub PAT secret
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ event_type: "run_e2e_test" }), // Must match event_type in YAML
    });
    console.log("Successfully dispatched GitHub Action workflow.");
  } catch (error) {
    // If an error occurs here (after the response was sent), we DO NOT throw.
    // We handle the failure by updating the internal state so the client polling finds it.
    console.error("GitHub Dispatch Error:", error.message);
    setLatestResults({
      status: "failed",
      errorMessage: `Failed to dispatch to GitHub: ${error.message}. Check GITHUB_PAT and repo details.`,
    });
  }
};

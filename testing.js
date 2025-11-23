async function sendCallback(data) {
  if (!RENDER_BASE_URL) {
    console.error("❌ RENDER_EXTERNAL_URL is not set. Cannot send callback.");
    return;
  }

  const payload = {
    apiSecret: process.env.API_UPDATE_SECRET, // The key for server verification
    ...data,
  };

  try {
    const response = await fetch(CALLBACK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error(
        `❌ Callback failed with status ${
          response.status
        }: ${await response.text()}`
      );
    } else {
      console.log("✅ Results successfully posted to API server.");
    }
  } catch (error) {
    console.error("❌ Failed to reach callback API endpoint:", error.message);
  }
}

async function runCiJob() {
  let uploadedVideoUrl = null;
  let uploadedScreenshotUrl = null;
  let success = false;
  let ciError = null;

  try {
    console.log("Starting CI file upload...");

    // 1. Find the test result files (Ensure this helper works in CI environment)
    // NOTE: You must ensure videoPicsResult() and other helper functions are correctly imported/available
    const files = videoPicsResult();

    // 2. Upload Video
    const uploadedVideo = await cloudinaryUploaderVideo(
      files.videoPathAbsolute,
      "playwright-results"
    );
    uploadedVideoUrl = uploadedVideo.secure_url;

    // 3. Upload Screenshot
    const uploadedScreenshot = await cloudinaryUploader(
      files.screenshotPathAbsolute,
      "playwright-results"
    );
    uploadedScreenshotUrl = uploadedScreenshot.secure_url;

    success = true;
  } catch (error) {
    ciError = `CI Upload Failed: ${error.message}. Check Cloudinary credentials and file paths in the CI runner.`;
    console.error("❌ Error during CI process:", ciError);
    // Note the error but continue to callback
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

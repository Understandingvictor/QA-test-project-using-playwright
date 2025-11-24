/**
 * Sends the final status and URLs back to the Render API endpoint.
 */
import "dotenv/config";

// --- CI CONFIG (Environment variables are passed from the GitHub workflow YAML) ---
//configure in ci on github actions
const RENDER_BASE_URL = process.env.RENDER_EXTERNAL_URL; 
const CALLBACK_ENDPOINT = `/api/v1/results/callbackEndpoint`; // Matches the Express route
const CALLBACK_URL = `${RENDER_BASE_URL}${CALLBACK_ENDPOINT}`;



export async function sendCallback(data) {
  if (!RENDER_BASE_URL) {
    console.error("❌ RENDER_EXTERNAL_URL is not set. Cannot send callback.");
    return;
  }

  const payload = {
    apiSecret: process.env.RENDER_UPDATE_SECRET, // The key for server verification from github secret
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

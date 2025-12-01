let latestResults = {
  status: "initial", // The current state of the test run
  videoUrl: null,
  screenshotUrl: null,
  timestamp: new Date().toISOString(),
  // Add socketId here
  socketId: null, // 🔑 NEW: Store the active socket ID
};

export const setLatestResults = (results) => {
  // Updates the store with new information (e.g., status: 'passed')
  latestResults = { ...latestResults, ...results, timestamp: new Date().toISOString() };
  return latestResults;
};

export const getLatestResults = () => {
  return latestResults;
};

// 🔑 NEW: A function to get the current socket ID
export const getCurrentSocketId = () => {
    return latestResults.socketId;
};
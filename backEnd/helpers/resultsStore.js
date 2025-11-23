let latestResults = {
  status: "initial", // The current state of the test run
  videoUrl: null,
  screenshotUrl: null,
  timestamp: new Date().toISOString(),
};

export const setLatestResults = (results) => {
  // Updates the store with new information (e.g., status: 'passed')
  latestResults = { ...latestResults, ...results };
};

export const getLatestResults = () => {
  return latestResults;
};

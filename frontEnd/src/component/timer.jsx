import React, { useState, useEffect, useRef } from 'react';

const INITIAL_SECONDS = 90; // 2 minutes * 60 seconds

export default function CountdownTimer() {
  // State for time remaining, starting at 120 seconds
  const [timeRemaining, setTimeRemaining] = useState(INITIAL_SECONDS);
  // Ref to hold the interval ID for cleanup
  const intervalRef = useRef(null); 

  /**
   * Formats the total seconds into MM:SS string.
   */
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    // Use padStart to ensure two digits (e.g., 5 -> "05")
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  // --- Effect Hook for Auto-Start Logic ---

  useEffect(() => {
    // 1. Start the timer immediately if time is greater than 0
    if (timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        // Decrease the time by 1 every second
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } 
    
    // 2. Stop the timer when it hits zero
    if (timeRemaining === 0) {
      clearInterval(intervalRef.current);
    }

    // 3. Cleanup function: clear the interval when the component unmounts
    // or before the effect runs again.
    return () => clearInterval(intervalRef.current);

  }, [timeRemaining]); // Dependency: Re-run effect logic whenever timeRemaining changes


  const handleReset = () => {
    // Stop any existing interval and reset the time
    clearInterval(intervalRef.current);
    setTimeRemaining(INITIAL_SECONDS);
  };

  const timeDisplay = formatTime(timeRemaining);
  const isFinished = timeRemaining === 0;

  return (
    <div style={{ textAlign: 'center', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '300px', margin: '20px auto' }}>
      <h2 style={{ 
          fontSize: '4em', 
          margin: '0 0 10px 0', 
          color: isFinished ? 'red' : '#1e90ff' // Dodger Blue for active timer
        }}
      >
        {isFinished ? "Time's Up!" : timeDisplay}
      </h2>
      
      <p style={{ marginTop: '0', color: isFinished ? 'red' : '#333' }}>
        {isFinished ? "fetching new test result..." : "Test running in CI. result to displayed soon"}
      </p>

      {/* Reset Button (only active after finished or while running) 
      <button 
        onClick={handleReset}
        style={{ 
          padding: '10px 20px', 
          margin: '15px 5px 5px', 
          backgroundColor: '#ff9800', // Orange for reset
          color: 'white', 
          border: 'none', 
          cursor: 'pointer',
          borderRadius: '4px'
        }}
      >
        Reset Timer
      </button>*/}
    </div>
  );
}
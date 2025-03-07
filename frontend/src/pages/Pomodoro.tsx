import React, { useState, useEffect } from "react";

const Pomodoro: React.FC = () => {
  const [time, setTime] = useState<number>(1500); // 25 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <h1>Pomodoro Timer</h1>
      <p>Focus for 25 minutes and take a 5-minute break.</p>
      <h2>{Math.floor(time / 60)}:{("0" + (time % 60)).slice(-2)}</h2>
    </div>
  );
};

export default Pomodoro;
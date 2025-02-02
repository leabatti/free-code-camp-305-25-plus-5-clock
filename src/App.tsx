import { useEffect, useState } from "react";
import "./App.css";
import { DisplayState } from "./helpers";
import TimeSetter from "./TimeSetter";
import Display from "./Display";

const defaultBreakTime = 5 * 60;
const defaultSessionTime = 25 * 60;
const min = 60;
const max = 60 * 60;
const interval = 60;

function App() {
  const [breakTime, setBreakTime] = useState(defaultBreakTime);
  const [sessionTime, setSessionTime] = useState(defaultSessionTime);
  const [displayState, setDisplayState] = useState<DisplayState>({
    time: sessionTime,
    timeType: "Session",
    timeRunning: false,
  });

  useEffect(() => {
    let timeID: number;
    if (!displayState.timeRunning) return;

    if (displayState.timeRunning) {
      timeID = window.setInterval(decrementDisplay, 1000);
    }

    return () => {
      window.clearInterval(timeID);
    };
  }, [displayState.timeRunning]);

  useEffect(() => {
    if (displayState.time === 0) {
      const audio = document.getElementById("beep") as HTMLAudioElement;
      audio.play().catch((err) => console.log(err));
      setDisplayState((prev) => ({
        ...prev,
        timeType: prev.timeType === "Session" ? "Break" : "Session",
        time: prev.timeType === "Session" ? breakTime : sessionTime,
      }));
    }
  }, [displayState, breakTime, sessionTime]);

  const reset = () => {
    setBreakTime(defaultBreakTime);
    setSessionTime(defaultSessionTime);
    setDisplayState({
      time: defaultSessionTime,
      timeType: "Session",
      timeRunning: false,
    });
    const audio = document.getElementById("beep") as HTMLAudioElement;
    audio.pause();
  };

  const startStop = () => {
    setDisplayState((prev) => ({
      ...prev,
      timeRunning: !prev.timeRunning,
    }));
  };

  const decrementDisplay = () => {
    setDisplayState((prev) => ({
      ...prev,
      time: prev.time - 1,
    }));
  };

  const changeBreakTime = (time: number) => {
    if (displayState.timeRunning) return;
    setBreakTime(time);
  };

  const changeSessionTime = (time: number) => {
    if (displayState.timeRunning) return;
    setSessionTime(time);
    setDisplayState({
      time: time,
      timeType: "Session",
      timeRunning: false,
    });
  };

  return (
    <div className="clock">
      <div className="setters">
        <div className="break">
          <h3 id="break-label">Break Length</h3>
          <TimeSetter
            time={breakTime}
            setTime={changeBreakTime}
            min={min}
            max={max}
            interval={interval}
            type="break"
          />
        </div>
        <div className="session">
          <h3 id="session-label">Session Length</h3>
          <TimeSetter
            time={sessionTime}
            setTime={changeSessionTime}
            min={min}
            max={max}
            interval={interval}
            type="session"
          />
        </div>
      </div>
      <Display
        displayState={displayState}
        reset={reset}
        startStop={startStop}
      />
      <audio
        id="beep"
        src="https://www.peter-weinberg.com/files/1014/8073/6015/BeepSound.wav"
      />
    </div>
  );
}

export default App;

import { DisplayState, formatTime } from "./helpers";
import { FaPause, FaPlay, FaUndo } from "react-icons/fa";

interface DisplayProps {
  displayState: DisplayState;
  reset: () => void;
  startStop: (displayState: DisplayState) => void;
}

const Display: React.FC<DisplayProps> = ({
  displayState,
  reset,
  startStop,
}) => {
  return (
    <div className="display">
      <h2 id="timer-label">{displayState.timeType}</h2>
      <span
        className="span-time-left"
        id="time-left"
        style={{ color: `${displayState.timeRunning ? "#dc143c" : "white"}` }}
      >
        {formatTime(displayState.time)}
      </span>
      <div>
        <button
          className="btn-start-stop"
          id="start_stop"
          onClick={() => startStop(displayState)}
        >
          {displayState.timeRunning ? <FaPause /> : <FaPlay />}
        </button>
        <button className="btn-reset" id="reset" onClick={reset}>
          <FaUndo />
        </button>
      </div>
    </div>
  );
};

export default Display;

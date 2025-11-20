import { useCountdown } from "./hooks/useCountdown";
import audio1 from "./assets/bg-music.mp3";
import { useRef } from "react";
import Confetti from "react-confetti";
import logo from "./assets/logo.png";

function App() {
  const targetDate = new Date("December 12, 2025 22:00:00 GMT+0600").toISOString();
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  const audioRef = useRef(null);
  const audioRef1 = useRef(null);

  const isFinished = days + hours + minutes + seconds <= 0;

  return (
    <div
      className="bg-hero bg-cover bg-center bg-no-repeat w-screen min-h-screen relative text-white overflow-hidden"
      onClick={() =>
        isFinished ? audioRef1.current?.play() : audioRef.current?.play()
      }
    >
      {/* Confetti when finished */}
      {isFinished && <Confetti width={window.innerWidth} height={window.innerHeight} />}

      {/* Audio */}
      <audio
        ref={isFinished ? audioRef1 : audioRef}
        autoPlay
        loop
        preload="auto"
        className="hidden"
      >
        <source src={audio1} type="audio/mp3" />
      </audio>

      {/* Logo + Title */}
      <div className="absolute top-[120px] left-1/2 -translate-x-1/2 text-center px-4 pointer-events-none">
        <img src={logo} className="w-24 sm:w-32 md:w-40 lg:w-48 mb-4 mx-auto" />
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold drop-shadow-xl">
          Saint Martin Tour
        </h1>
      </div>

      {/* Countdown Card – bottom right */}
      <div className="absolute bottom-6 right-4 sm:bottom-8 sm:right-8">
        <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl shadow-lg p-4 sm:p-6 flex flex-wrap gap-4 sm:gap-6 justify-center items-center min-w-[220px]">
          {["DAYS", "HOURS", "MINUTES", "SECONDS"].map((label, i) => (
            <div key={label} className="flex flex-col items-center min-w-[50px]">
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold">{[days, hours, minutes, seconds][i]}</p>
              <p className="text-xs sm:text-sm md:text-xs tracking-widest mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

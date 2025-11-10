import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

function VideoPlayer({
  height = "100%",
  width = "100%",
  url,
  onUpdateProgress,
  currentLecture,
}) {
  const [played, setPlayed] = useState(null);

  useEffect(() => {
    if (played === 1 && onUpdateProgress && currentLecture) {
      onUpdateProgress({ ...currentLecture, progressValue: 1 });
    }
  }, [played, currentLecture, onUpdateProgress]);

  function handleProgress({ played }) {
    setPlayed(played);
  }

  return (
    <div
      className={`relative rounded-lg bg-slate-900 overflow-hidden shadow-2xl transition-all duration-300 ease-in-out`}
      style={{ height, width }}
    >
      <ReactPlayer
        className="absolute top-0 left-0"
        width="100%"
        height="100%"
        url={url}
        onProgress={handleProgress}
        controls
      ></ReactPlayer>
    </div>
  );
}

export default VideoPlayer;

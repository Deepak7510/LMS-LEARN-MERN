import ReactPlayer from "react-player";

function VideoPlayer({ height = "100%", width = "100%", url }) {
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
        controls
      ></ReactPlayer>
    </div>
  );
}

export default VideoPlayer;

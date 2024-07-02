import "./App.css";
import SnapScroll from "./Feed/SnapScroll";

function App() {
  const videoData = [
    "https://www.w3schools.com/html/mov_bbb.mp4",
    "https://www.w3schools.com/html/movie.mp4",
    "https://www.w3schools.com/html/movie.mp4",
    "https://www.w3schools.com/html/movie.mp4",
    "https://www.w3schools.com/html/movie.mp4",
    "https://www.w3schools.com/html/movie.mp4",
    "https://www.w3schools.com/html/movie.mp4",
    "https://www.w3schools.com/html/movie.mp4",
  ];

  return (
    <SnapScroll
      onLastVideo={() => console.log("onLastVideo Called ")}
      videos={videoData}
    />
  );
}

export default App;

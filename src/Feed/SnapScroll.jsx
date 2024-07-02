import React, { useState, useRef, useCallback, useEffect } from "react";
import { FixedSizeList as List } from "react-window";

const VideoItem = ({ style, video }) => {
  const ref = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const videoRef = ref.current;
    if (!videoRef) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    videoRef.addEventListener("play", handlePlay);
    videoRef.addEventListener("pause", handlePause);
    videoRef.addEventListener("loadeddata", () => setIsLoaded(true));

    return () => {
      videoRef.removeEventListener("play", handlePlay);
      videoRef.removeEventListener("pause", handlePause);
    };
  }, []);

  return (
    <div
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {!isPlaying && (
        <button
          style={{ position: "absolute", zIndex: 1 }}
          onClick={() => ref.current.play()}
        >
          Play
        </button>
      )}
      {!isLoaded && (
        <p style={{ position: "absolute", zIndex: 1 }}>Loading...</p>
      )}
      <video
        src={video}
        ref={ref}
        autoPlay
        style={{ width: "100%", height: "100%" }}
        onEnded={(e) => console.log(e, "Ended")}
        onClick={(e) => {
          ref.current.pause();
          console.log(e, "onClick");
        }}
      />
    </div>
  );
};

const SnapScroll = ({ onLastVideo, videos }) => {
  const listRef = useRef();
  const [isLastVideoVisible, setIsLastVideoVisible] = useState(false);

  const itemCount = videos.length;
  const itemSize = 650; // height of each video item
  const width = 500; // width of each video item

  const handleScroll = useCallback(() => {
    if (!listRef.current) return;

    const { scrollTop, clientHeight } = listRef.current._outerRef;
    const lastItemOffset = itemSize * (itemCount - 1);
    const maxScrollTop = lastItemOffset - clientHeight;

    if (scrollTop >= maxScrollTop) {
      setIsLastVideoVisible(true);
    } else {
      setIsLastVideoVisible(false);
    }
  }, [itemCount, itemSize]);

  useEffect(() => {
    const ref = listRef.current;

    if (ref) {
      ref._outerRef.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (ref) {
        ref._outerRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  useEffect(() => {
    if (isLastVideoVisible) {
      onLastVideo();
    }
  }, [isLastVideoVisible, onLastVideo]);

  return (
    <div>
      <List
        ref={listRef}
        height={itemSize}
        itemCount={itemCount}
        itemSize={itemSize}
        width={width}
        style={{ scrollSnapType: "y mandatory", overflowY: "scroll" }}
      >
        {({ index, style }) => (
          <div
            style={{
              ...style,
              scrollSnapAlign: "start",
              scrollSnapStop: "always",
            }}
          >
            <VideoItem
              index={index}
              style={{ width, height: itemSize }}
              video={videos[index]}
            />
          </div>
        )}
      </List>
      {isLastVideoVisible && <div>Last video is visible</div>}
    </div>
  );
};

export default SnapScroll;

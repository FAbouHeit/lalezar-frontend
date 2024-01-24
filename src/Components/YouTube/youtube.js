import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import Styles from './youtube.module.css';

const YoutubeVideo = ({ videoUrl }) => {
  const [player, setPlayer] = useState(null);
  const [videoId, setVideoId] = useState("");
  const [hasPlayed, setHasPlayed] = useState(false);

  const opts = {
    playerVars: {
      autoplay: 0, // Set autoplay to 0 initially
    },
  };

  const onReady = (event) => {
    setPlayer(event.target);
  };

  const onStateChange = (event) => {
    if (event.data === YouTube.PlayerState.PLAYING && !hasPlayed) {
      setHasPlayed(true);
      // Set autoplay to 1 only on the first play
      player.playVideo();
    }
  };

  useEffect(() => {
    const getYouTubeVideoId = (videoUrl) => {
      const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
      const match = videoUrl.match(regex);
      return match ? match[1] : null;
    };

    // const videoUrl = "https://www.youtube.com/watch?v=magXOsH5QAc";
    const video = getYouTubeVideoId(videoUrl);
    setVideoId(video);

  }, []);

  return (
    <>
    { videoUrl ?
      <section className={Styles.youtubeVideo}>
        <h3 style={{marginBottom:"20px"}}>Check out our video: </h3>
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={onReady}
          onStateChange={onStateChange}
        />
      </section>
      :
      ""
    }
    </>
  );
};

export default YoutubeVideo;

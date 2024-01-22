import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';

const YoutubeVideo = ({videoUrl}) => {
  const [player, setPlayer] = useState(null);
  const [videoId, setVideoId] = useState("");

  const opts = {
    // height: '390',
    // width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  const onReady = (event) => {
    // access to player in all event handlers via event.target
    setPlayer(event.target);
    event.target.pauseVideo();
  };

  useEffect(()=>{
    const getYouTubeVideoId = (videoUrl) => {
      const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
      const match = videoUrl.match(regex);
      return match ? match[1] : null;
    };
    
    // const videoUrl = "https://www.youtube.com/watch?v=magXOsH5QAc";
    const video = getYouTubeVideoId(videoUrl);
    setVideoId(video);
    // console.log(videoId); // Output: magXOsH5QAc
    
  },[])

  return <YouTube videoId={videoId} opts={opts} onReady={onReady} />;
};

export default YoutubeVideo;

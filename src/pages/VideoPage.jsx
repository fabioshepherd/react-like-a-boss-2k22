import { Grid, IconButton } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import PageTitle from '../components/common/PageTitle';
import videoGandalf from '../assets/video.mp4';
import videoCowboy from '../assets/video2.mp4';
import {
  LooksOne,
  LooksTwo,
  PauseCircleOutline,
  PlayCircleOutline,
  RestartAlt,
  VolumeMute,
  VolumeUp,
} from '@mui/icons-material';

const VideoPage = () => {
  const videoRef = useRef();

  const [currentVideoSrc, setCurrentVideoSrc] = useState(videoGandalf);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showFirstVideo, setShowFirstVideo] = useState(true);

  const handlePlay = () => {
    videoRef.current.play();
    setIsPlaying(true);
  };
  const handlePause = () => {
    videoRef.current.pause();
    setIsPlaying(false);
  };
  const handleRestart = () => {
    videoRef.current.currentTime = 0;
  };

  const changeVideo = () => {
    setShowFirstVideo((el) => !el);
  };

  const handleMute = () => {
    setIsMuted((el) => !el);
  };

  useEffect(() => {
    if (showFirstVideo) {
      setCurrentVideoSrc(videoGandalf);
    } else {
      setCurrentVideoSrc(videoCowboy);
    }
    setIsPlaying(false);
  }, [showFirstVideo]);

  return (
    <>
      <PageTitle title={'Video!'} />

      <Grid
        container
        justifyContent='center'
        alignItems='center'
        direction={'column'}
      >
        <Grid item>
          <video
            src={currentVideoSrc}
            ref={videoRef}
            playsInline
            muted={isMuted}
          />
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item>
              <IconButton onClick={changeVideo}>
                {showFirstVideo ? (
                  <LooksTwo fontSize='large' />
                ) : (
                  <LooksOne fontSize='large' />
                )}
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={isPlaying ? handlePause : handlePlay}>
                {isPlaying ? (
                  <PauseCircleOutline fontSize='large' />
                ) : (
                  <PlayCircleOutline fontSize='large' />
                )}
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={handleMute}>
                {isMuted ? (
                  <VolumeMute fontSize='large' />
                ) : (
                  <VolumeUp fontSize='large' />
                )}
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={handleRestart}>
                <RestartAlt fontSize='large' />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default VideoPage;

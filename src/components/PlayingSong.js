import React, { useState, useRef, useEffect } from "react";
import defaultImg from '../static/default_music.jpg'
import {
  TbPlayerSkipBackFilled,
  TbPlayerSkipForwardFilled,
  TbPlayerPauseFilled,
  TbPlayerPlayFilled,
  TbDownload,
  TbMarquee,
} from "react-icons/tb";

function PlayingSong({ song_src, image_src, songName }) {
  const [isPlaying, setPlaying] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef();
  const progressRef = useRef();
  const animationRef = useRef();

  useEffect(() => {
    const seconds = Math.floor(audioRef.current.duration);
    setDuration(seconds);

    progressRef.current.max = seconds;
  }, [[audioRef?.current?.loadedmetadata, audioRef?.current?.readyState]])

  const playSong = (item) => {
    let audio = audioRef.current;
    if (audio) {
      audio.src = item;
      audio.play();
    } else {
      console.error("Audio element not found!");
    }
  };

  const playPauseToggle = () => {
    if (!isPlaying) {
      audioRef.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioRef.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
    setPlaying(!isPlaying);
  };

  const whilePlaying = () => {
    progressRef.current.value = audioRef.current.currentTime;
    changeCurrentTime();

    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const durationCalc = (time) => {
    const minutes = Math.floor(time / 60);
    const retMin = minutes < 10 ? `0${minutes}` : `${minutes}`;

    const sec = Math.floor(time % 60);
    const retSec = sec < 10 ? `0${sec}` : `${sec}`;

    return `${retMin}:${retSec}`;
  };

  const changeProgress = () => {
    audioRef.current.currentTime = progressRef.current.value;
    changeCurrentTime();
  };

  const changeCurrentTime = () => {
    progressRef.current.style.setProperty(
      "--played-width",
      `${(progressRef.current.value / duration) * 100}%`
    );

    setCurrentTime(progressRef.current.value);
  };



  return (
    <div className="music_player">
      <div className="song_image">
        <img src={image_src ? image_src : defaultImg} alt="" />
      </div>
      <div className="song_attributes">
        <audio src={song_src} preload="metadata" ref={audioRef} />
        <div className="top">
          <div className="songName">{songName}</div>
          <div className="left">
            <TbPlayerSkipBackFilled />
          </div>
          <div className="middle" onClick={playPauseToggle}>
            {isPlaying ? <TbPlayerPauseFilled /> : <TbPlayerPlayFilled />}
          </div>
          <div className="right">
            <TbPlayerSkipForwardFilled />
          </div>
          <div className="download">
            <TbDownload />
          </div>
        </div>

        <div className="bottom">
          <div className="currentTime">{durationCalc(currentTime)}</div>/
          <div className="duration">
            {duration && !isNaN(duration) ? durationCalc(duration) : '00:00'}
          </div>
          <input
            type="range"
            className="progressBar"
            ref={progressRef}
            onChange={changeProgress}
            max={duration}
          />
        </div>
      </div>
    </div>
  );
}

export { PlayingSong };


(function (){
  const playerContainer = document.querySelector(".player");
  const playerWrapper = document.querySelector(".player__wrapper");
  const video = document.querySelector(".player__video");
  const playerStart = document.querySelector(".player__start");
  const playerPlayback = document.querySelector(".player__playback");
  const progressBar = document.querySelector(".player__playback-line");
  const playerVideoCircle = document.querySelector(".player__playback-button");
  const playerVolumeIcon = document.querySelector(".player__volume-icon-img");
  const playerVolumeBar = document.querySelector(".player__volume");
  const playerVolumeCircle = document.querySelector(".player__volume-button");
  const playerSplash =  document.querySelector(".player__splash");
  const redVolumeBar = document.querySelector(".player__volume-bar");

  let startVolume = 0;
  let currentVolume;


  //play/pause video

  function handlerStart() {
    if (video.paused) {
      video.play()
      playerSplash.style.display = "none"
    } else {
      video.pause()
      playerSplash.style.display = "block"
    }
  }

  playerStart.addEventListener("click", handlerStart);
  playerWrapper.addEventListener("click", handlerStart);


  //toggle play/pause icon
  video.onplay = () => {
    togglePlayer();
  }
  video.onpause = () => {
    togglePlayer("pause");
    
  }

  function togglePlayer(action = "start") {
    if (action == "start") {
      playerContainer.classList.add("player__active")
    } else {
      playerContainer.classList.remove("player__active")

    }
  }

  //volume bar
  function changeVolume(elem) {
  // const (currentTarget) = elem;
    const currentTarget = elem.currentTarget;

    const left = currentTarget.getBoundingClientRect().left;
    const soundBarWIdth = parseInt(getComputedStyle(currentTarget).width);
    const newPosition = elem.pageX - left;
    const percentValue = (newPosition / soundBarWIdth) * 100;
    const circleWidth = parseInt(getComputedStyle(playerVolumeCircle).width)

    video.volume = percentValue / 100;
    playerVolumeCircle.style.left = `${percentValue}%`;
    redVolumeBar.style.width = `${percentValue - circleWidth}%`;
  }

  function toggleSound() {
    playerVolumeIcon.classList.toggle("muted")
    
    const redVolumeBar = document.querySelector(".player__volume-bar");
    if (video.volume == 0) {
      video.volume = currentVolume;
      playerVolumeCircle.style.left = `${currentVolume * 100}%`
      redVolumeBar.style.width = `${currentVolume * 100}%`
      
    } else {
      currentVolume = video.volume;
      video.volume = startVolume;
      playerVolumeCircle.style.left = `${startVolume}%`
      redVolumeBar.style.width = `${startVolume}%`
    }
  }

  playerVolumeBar.addEventListener("click", changeVolume);
  playerVolumeIcon.addEventListener("click", toggleSound);


  //video 

  function handleDuration(e) {
    const barSize = parseInt(getComputedStyle(playerPlayback).width);
    const circleWidth = parseInt(getComputedStyle(playerVideoCircle).width);
    const offsetX = e.offsetX;
    const newSize = offsetX + circleWidth / 2;
    const newTime = (newSize * video.duration) / barSize;
    video.currentTime = newTime;
  }

  function updateTime() {
    let redBar = video.currentTime / video.duration;
    progressBar.style.width = `${redBar * 100}%`

    if (video.ended) {
      video.currentTime = 0;
    }
  }

  playerPlayback.addEventListener("click", handleDuration);
  video.addEventListener("timeupdate", updateTime);


})();
var currentFrame = document.getElementById("currentFrame");
var video = VideoFrame({
  id: "video",
  frameRate: 25,
  callback: function (frame) {
    currentFrame.innerHTML = frame;
    console.log(frame);
  },
});

document.getElementById("play-pause").addEventListener("click", function (e) {
  if (video.video.paused) {
    video.video.play();
    video.listen("frame");
    e.innerHTML = "Pause";
  } else {
    video.video.pause();
    video.stopListen();
    e.innerHTML = "Play";
  }
});

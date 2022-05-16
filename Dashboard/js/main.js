var currentFrame = document.getElementById("dashboard_video");

    var video = VideoFrame({
      id: "dashboard_video",
      frameRate: 60,
      callback: function (frame) {
        currentFrame.innerHTML = frame;
        console.log(frame);
        document.getElementById('currentframe').innerHTML = frame;
      },
    });

    var playpause = document.getElementById("play-pause");
    playpause.addEventListener("click", function (e) {
        if (video.video.paused) {
          video.video.play();
          video.listen("frame");
          e.target.classList.remove('play');
          e.target.classList.add('pause');
        } else {
          video.video.pause();
          video.stopListen();
          e.target.classList.remove('pause');
          e.target.classList.add('play');
        }
      });

//Reset timer after video ends
function myHandeler(e) {
    video.stopListen();
}




function openCity(evt, cityName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}





// var currentFrame = document.getElementById('dashboard_video');
// var video = VideoFrame({
//     id : 'video',
//     frameRate: 60,
//     callback : function(frame) {
//         currentFrame.html(frame);
//     }
// });

// document.getElementById('play-pause').click(function(){
//     video.video.play();
//     video.listen("frame");
// });







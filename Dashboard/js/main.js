// Get and show frames of video in Dashboard
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
          document.getElementById("icon").classList.remove('play');
          document.getElementById("icon").classList.add('pause');
        } else {
          video.video.pause();
          video.stopListen();
          document.getElementById("icon").classList.remove('pause');
          document.getElementById("icon").classList.add('play');
        }
      });

//Reset timer after video ends
function myHandeler(e) {
    video.stopListen();
}

function openTab(evt, cityName) {
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

// Get current date
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = dd + '/' + mm + '/' + yyyy;



//get json data
fetch("../Overlay%20test/public/json/reservations.json")
  .then((response) => response.json())
  .then((dataGuest) => {
    

    // const urlParams = new URLSearchParams(window.location.search);
    // const reservationId = urlParams.get("reservationId");

    console.log(dataGuest);

    for (var i = 0; i < dataGuest.reservations.length; i++) {
        const reservationdate = dataGuest.reservations[i].date;
        const reservationList = document.getElementById('reservation-container');
        
        console.log('reservation = ' + reservationdate);

        // If the date of reservation is the same as today
        if(reservationdate == today){
            const reservation_ID = dataGuest.reservations[i].id;
            const guest_lastname = dataGuest.reservations[i].guests[0].lastName;

            console.log('guest = ' + guest_lastname);
            console.log('reservation ID = ' + reservation_ID);

            // Create reservation block with data in it
            let reservationHTML = '<div class="left"><h5>' + guest_lastname + '</h5> <div class="reservation-date"><img src="images/eat-icon.svg" alt="eat-icon"/><span class="res-date">30 apr. 2022</span></div>  </div><div class="right"><span class="res-id">ID:' + reservation_ID + '</span> <div class="group"><img src="images/group icon.svg" alt="group-icon"/><span class="group-number">4</span></div> </div>';

            // Creating reservation div around the data
            const reservationDiv = document.createElement("div");
              reservationDiv.setAttribute("id", "reservation-" + i);
              reservationDiv.setAttribute("class", "reservation");
              reservationDiv.innerHTML = reservationHTML;

            reservationList.appendChild(reservationDiv);
         
        } 
    }

   
  });



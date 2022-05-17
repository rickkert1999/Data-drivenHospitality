//get json data
fetch("json/reservations.json")
  .then((response) => response.json())
  .then((dataGuest) => {
    const myVideo = document.getElementById("video");
    const overlay = document.getElementById("overlay");
    const textOverlay = document.getElementById("textOverlay");
    myVideo.addEventListener("ended", myHandeler, false);

    //get the reservationId out of the url
    // ?reservationId=[the reservationId] Add this after link
    const urlParams = new URLSearchParams(window.location.search);
    const reservationId = urlParams.get("reservationId");

    const currentFrame = document.getElementById("video");
    const video = VideoFrame({
      id: "video",
      frameRate: 60,
      callback: function (frame) {
        currentFrame.innerHTML = frame;
        console.log(frame);

        if (frame > 270 && frame < 415) {
          textOverlay.innerHTML =
            "<p id=insertedText>We are preparing everything <br> for your visit!</p>";
        } else if (frame > 590 && frame < 762) {
          if (frame === 591) {
            textOverlay.innerHTML = "";

            //for each guest write down the name
            for (
              let i = 0;
              i < dataGuest.reservations[reservationId].guests.length;
              i++
            ) {
              let guest = dataGuest.reservations[reservationId].guests[i];
              let guestName = guest.firstName + " " + guest.lastName;

              const divName = document.createElement("div");
              divName.setAttribute("id", "guestInfo" + i);
              divName.setAttribute("class", "guestInfo");
              divName.innerHTML = "<p id=name" + i + ">" + guestName + "</p>";

              textOverlay.appendChild(divName);

              //for each guest write down the preferance
              for (let j = 0; j < guest.preferences.length; j++) {
                let preference = guest.preferences[j];

                const paraPreference = document.createElement("p");
                paraPreference.setAttribute("id", "preference" + j);
                paraPreference.innerHTML = preference;

                document
                  .getElementById("guestInfo" + i)
                  .appendChild(paraPreference);
              }
            }
          }
        } else if (frame > 1148 && frame < 1274) {
          textOverlay.innerHTML =
            "<p id=insertedText>" +
            "We are excited to see you <br> at our table " +
            dataGuest.reservations[reservationId].guests[0].firstName +
            "!" +
            "</p>";
        }
        ////////TEST BOARDINGPOS TEST
        else if (frame > 1274 && frame < 1425) {
          if (frame === 1275) {
            textOverlay.innerHTML = "";

            //for each guest write down the name
            for (let i = 0; i < 2; i++) {
              let guest = dataGuest.reservations[reservationId].guests[i];

              let guestName = guest.firstName + " " + guest.lastName;

              const divName = document.createElement("div");
              divName.setAttribute("id", "guestInfoDashboard" + i);
              divName.setAttribute("class", "guestInfoDashboard");
              divName.innerHTML =
                "<p id=name" +
                i +
                ">" +
                guestName +
                "</p>" +
                "<p id=date" +
                i +
                ">" +
                dataGuest.reservations[reservationId].date +
                "</p>" +
                "<p id=time" +
                i +
                ">" +
                dataGuest.reservations[reservationId].time +
                "</p>" +
                "<p id=gate" +
                i +
                ">" +
                dataGuest.reservations[reservationId].gate +
                "</p>" +
                "<p id=seatNbr" +
                i +
                ">" +
                dataGuest.reservations[reservationId].guests[i].seatNbr +
                "</p>";

              textOverlay.appendChild(divName);

              const preferanceDiv = document.createElement("div");
              preferanceDiv.setAttribute("id", "preferanceDiv" + i);
              preferanceDiv.setAttribute("class", "preferanceDiv");

              document
                .getElementById("guestInfoDashboard" + i)
                .appendChild(preferanceDiv);

              //for each guest write down the preferance
              for (let j = 0; j < 2; j++) {
                let preference = guest.preferences[j];

                const paraPreference = document.createElement("p");
                paraPreference.setAttribute("id", "preference" + j);
                paraPreference.innerHTML = preference;

                document
                  .getElementById("preferanceDiv" + i)
                  .appendChild(paraPreference);
              }
            }
          }
        } else {
          textOverlay.innerHTML = "";
        }
      },
    });

    //Start the video when clicked
    document.getElementById("overlay").addEventListener("click", function () {
      //Play video
      video.video.play();
      video.listen("frame");

      //Remove play button
      overlay.classList.add("hide");
    });

    //Pause the video when clicked
    textOverlay.addEventListener("click", function () {
      //Pause video
      video.video.pause();
      video.stopListen();

      //add play button
      overlay.classList.remove("hide");
    });

    //Reset timer after video ends
    function myHandeler(e) {
      video.stopListen();

      //Add play button
      overlay.classList.remove("hide");
    }
  });

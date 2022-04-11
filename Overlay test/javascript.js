//json test data
fetch("reservations.json")
  .then((response) => response.json())
  .then((dataGuest) => {
    const myVideo = document.getElementById("video");
    const overlay = document.getElementById("overlay");
    const textOverlay = document.getElementById("textOverlay");
    myVideo.addEventListener("ended", myHandeler, false);
    let counter = 0;
    let timeout;

    //Id of the reservation
    let reservationId = 0;

    //Count time that video is playing
    function timedCount() {
      counter++;
      console.log(counter);

      timeout = setTimeout(timedCount, 10);

      if (counter > 400 && counter < 600) {
        textOverlay.innerHTML =
          "<p id=insertedText>We are prepairing everything <br> for your visit!</p>";
      } else if (counter > 880 && counter < 1108) {
        //for each guest write down the name
        for (
          var i = 0;
          i < dataGuest.reservations[reservationId].guests.length;
          i++
        ) {
          var guest = dataGuest.reservations[reservationId].guests[i];
          var guestName = guest.firstName + " " + guest.lastName;

          if (counter === 881) {
            const divName = document.createElement("div");
            divName.setAttribute("id", "guestInfo" + i);
            divName.setAttribute("class", "guestInfo");
            divName.innerHTML = "<p id=name" + i + ">" + guestName + "</p>";

            textOverlay.appendChild(divName);
          }

          console.log(guestName);
          //for each guest write down the preferance
          for (var j = 0; j < guest.preferences.length; j++) {
            var preference = guest.preferences[j];

            if (counter === 881) {
              const paraPreference = document.createElement("p");
              paraPreference.setAttribute("id", "preference" + j);
              paraPreference.innerHTML = preference;

              document
                .getElementById("guestInfo" + i)
                .appendChild(paraPreference);
            }
            console.log(preference);
          }
        }
      } else if (counter > 1690 && counter < 1880) {
        textOverlay.innerHTML =
          "<p id=insertedText>" +
          "We are excited to see you <br> at our table " +
          dataGuest.reservations[reservationId].guests[0].firstName +
          "!" +
          "</p>";
      } else {
        textOverlay.innerHTML = "";
      }
    }

    //Start the video when clicked
    document.getElementById("overlay").addEventListener("click", function (e) {
      //Play video
      myVideo.play();

      //Start timer
      timedCount();

      //Remove play button
      overlay.classList.add("hide");
    });

    //Pause the video when clicked
    textOverlay.addEventListener("click", function (e) {
      //Pause video
      myVideo.pause();

      //Pause Timer
      clearTimeout(timeout);

      //add play button
      overlay.classList.remove("hide");
    });

    //Reset timer after video ends
    function myHandeler(e) {
      clearTimeout(timeout);
      counter = 0;

      //Add play button
      overlay.classList.remove("hide");
    }
  });

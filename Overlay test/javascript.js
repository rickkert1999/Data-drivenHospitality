const myVideo = document.getElementById("video");
const overlay = document.getElementById("overlay");
const textOverlay = document.getElementById("textOverlay");
myVideo.addEventListener("ended", myHandeler, false);
let counter = 0;
let timeout;

//Test data
const dataGuest = {
  guests: [
    {
      firstName: "Marc",
      lastName: "Graaf",
      preferences: ["wine", "no fish"],
    },
    {
      firstName: "Anna",
      lastName: "Graaf",
      preferences: ["wine", "no champions", "no union"],
    },
  ],
};

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
    for (var i = 0; i < dataGuest.guests.length; i++) {
      var guest = dataGuest.guests[i];
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

          document.getElementById("guestInfo" + i).appendChild(paraPreference);
        }

        console.log(preference);
      }
    }
  } else if (counter > 1690 && counter < 1880) {
    textOverlay.innerHTML =
      "<p id=insertedText>" +
      "We are excited to see you <br> at our table " +
      dataGuest.guests[0].firstName +
      "!" +
      "</p>";
  } else {
    textOverlay.innerHTML = "";
  }
}

//for each guest write down the name and preferance
// for (var i = 0; i < dataGuest.guests.length; i++) {
//   var guest = dataGuest.guests[i];
//   var guestName = guest.name;
//   console.log(guestName);
//   for (var j = 0; j < guest.preferences.length; j++) {
//     var preference = guest.preferences[j];
//     console.log(preference);
//   }
// }

document.getElementById("overlay").addEventListener("click", function (e) {
  //Play video
  myVideo.play();

  //Start timer
  timedCount();

  // //Change button text
  // e.target.innerHTML = "Pause";

  overlay.classList.add("hide");
});

textOverlay.addEventListener("click", function (e) {
  //Pause video
  myVideo.pause();

  //Pause Timer
  clearTimeout(timeout);

  // //Change button text
  // e.target.innerHTML = "Play";

  overlay.classList.remove("hide");
});

//Reset timer after video ends
function myHandeler(e) {
  clearTimeout(timeout);
  counter = 0;

  // Change button text
  // document.getElementById("startVideo").innerHTML = "Play";

  overlay.classList.remove("hide");
}

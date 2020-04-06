import JSMpeg from "@cycjimmy/jsmpeg-player";

let streams = [1, 2, 3];
var kamerasauPlayers = [];
var foundStreamSource = false;
//
// function streamSuccessfullLoaded(number) {
//   console.log("streamSuccessfullLoaded", number);
//   // var videoWrappers = document.getElementsByClassName("video-wrapper");
//   // Array.prototype.forEach.call(videoWrappers, function(el, i) {
//   //   el.style.opacity = 1;
//   // });
//
//   for (let stream of streams) {
//     if (stream == number) {
//       console.log("stream == number", number);
//       continue;
//     }
//     // if (!foundStreamSource) {
//     //   kamerasauPlayers[stream].destroy();
//     // }
//   }
//   foundStreamSource = true;
// }

for (let stream of streams) {
  setTimeout(function() {
    (function() {
      // Keine Ahnung wieso, aber nur so funktioniert der Stream
      kamerasauPlayers[stream] = new JSMpeg.VideoElement(
        "#videoWrapper" + stream,
        "wss://kamerasau.martin-apps.ch/websocket-" + stream + "/",
        {
          control: false,
          hooks: {
            load: function() {
              document.getElementById("textWrapper").style.display = "none";
              console.log("streamSuccessfullLoaded", stream);
            }
          }
        }
      );
    })();
  }, stream * 2500 - 2500);
}

setTimeout(function() {
  document.getElementById("errorText").style.opacity = 1;
}, 2000);

window.kamerasauPlayers = kamerasauPlayers;

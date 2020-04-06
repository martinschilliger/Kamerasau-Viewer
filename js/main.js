import JSMpeg from "@cycjimmy/jsmpeg-player";

var streams = [1, 2, 3];
var streamsData = [];
var kamerasauPlayers = [];

function readStreamsData() {
  for (let stream of streams) {
    fetch("https://kamerasau.martin-apps.ch/api-" + stream)
      .then(function(response) {
        return response.text();
      })
      .then(function(body) {
        streamsData[stream] = JSON.parse(body);
      });
  }
}
setInterval(function() {
  readStreamsData();
}, 1000);

for (let stream of streams) {
  setTimeout(function() {
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
  }, stream * 2500 - 2500);
}

setTimeout(function() {
  document.getElementById("errorText").style.opacity = 1;
}, 2000);

window.kamerasauPlayers = kamerasauPlayers;
window.streamsData = streamsData;

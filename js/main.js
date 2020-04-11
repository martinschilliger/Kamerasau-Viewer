"use strict";

import JSMpeg from "@cycjimmy/jsmpeg-player";

var streams = [1, 2, 3];
var kamerasauPlayer = {};
var activeStreams;

function playStream(stream) {
  if (
    typeof stream == "undefined" &&
    !kamerasauPlayer.stream &&
    activeStreams.length
  ) {
    stream = activeStreams[0];
  } else if (typeof stream == "undefined") {
    return false;
  }

  if (kamerasauPlayer.stream == stream) {
    return true;
  } else {
    kamerasauPlayer.stream = stream;
  }

  if (kamerasauPlayer.player) {
    kamerasauPlayer.player.destroy();
  }

  (function() {
    kamerasauPlayer.player = new JSMpeg.VideoElement(
      "#videoWrapper",
      "wss://kamerasau.martin-apps.ch/websocket-" + stream + "/",
      {
        control: false,
        hooks: {
          load: function() {
            document.getElementById("textWrapper").style.display = "none";
          },
          destroy: function() {
            document.getElementById("textWrapper").style.display = "";
          }
        }
      },
      {
        disableWebAssembly: true //schneller Wechsel zwischen Streams machte sonst noch mehr Probleme
      }
    );
  })();
}

function watchStreamsData() {
  Promise.all(
    streams.map(x => {
      return fetch("https://kamerasau.martin-apps.ch/api-" + x).then(function(
        response
      ) {
        return response.json();
      });
    })
  ).then(streamsData => {
    var buttonDiv = document.getElementById("streamSwitcher");
    activeStreams = [];

    for (let data of streamsData) {
      (function() {
        var button = document.getElementById("cameraButton" + data.number);
        if (data.stream_active) {
          button.style.display = "inline-block";
          activeStreams.push(data.number);
        } else {
          button.style.display = "";
        }

        if (activeStreams.length > 1) {
          buttonDiv.style.display = "block";
        } else {
          buttonDiv.style.display = "";
        }

        if (activeStreams.length) {
          document.getElementById("errorText").style.opacity = 0;
        } else {
          document.getElementById("errorText").style.opacity = 1;
        }
      })();
    }
    playStream();
  });
}
setInterval(function() {
  watchStreamsData();
}, 1000);

var buttons = document.querySelectorAll("#streamSwitcher .camera-switch");
Array.prototype.forEach.call(buttons, function(button) {
  button.addEventListener("click", function(e) {
    let stream = Number(e.target.id.replace(/\D/g, ""));
    playStream(stream);
  });
});

setTimeout(function() {
  document.getElementById("errorText").style.opacity = 1;
}, 2000);

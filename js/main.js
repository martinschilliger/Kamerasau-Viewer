import JSMpeg from "@cycjimmy/jsmpeg-player";

window.customPlayer = new JSMpeg.VideoElement(
  "#videoWrapper",
  "wss://kamerasau.martin-apps.ch/websocket-2/",
  {
    autoSetWrapperSize: false,
    control: false,
    autoplay: true,
    picMode: true
  },
  {
    onEnded: function() {
      console.log("onEnded");
    },
    onStalled: function() {
      console.log("onStalled");
    },
    onSourceEstablished: function() {
      document.getElementById("videoWrapper").style.opacity = 1;
      document.getElementById("errorText").style.display = "none";
    },
    onSourceCompleted: function() {
      console.log("onSourceCompleted");
    }
  }
);

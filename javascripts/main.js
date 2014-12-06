(function() {
  $(document).ready(function(){
  $('#ans').hide();
  $("#reveal").click(function(){
    $('#ans').text(player.getVideoData().title);
    $('#ans').show();
    $('#player').hide();
  });
  $("#next").click(function(){
    $('#ans').hide();
    $('#player').show();
  });
});

  var i = 0;
  var stopPlayAt = [2, 5, 10], // Stop play at time in seconds
      stopPlayTimer;   // Reference to settimeout call

  // This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement("script");
  tag.src = "//www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // This function creates an <iframe> (and YouTube player)
  // after the API code downloads.
  var player;
  window.onYouTubeIframeAPIReady = function() {
    player = new YT.Player("player", {
      "height": "315",
      "width": "560",
      "videoId": "Aw8Do64bEtU",
      "events": {
        "onReady": onPlayerReady,
        "onStateChange": onPlayerStateChange
      }
    });
  }

  // The API will call this function when the video player is ready.
  // This automatically starts the video playback when the player is loaded.
  function onPlayerReady(event) {
    playVideo();
  }

  // The API calls this function when the player's state changes.
  function onPlayerStateChange(event) {
    var time, stopTime, rate, remainingTime;
    clearTimeout(stopPlayTimer);
    if (event.data == YT.PlayerState.PLAYING) {
      time = player.getCurrentTime();
      stopTime = stopPlayAt[i++];
      // Add .4 of a second to the time in case it's close to the current time
      // (The API kept returning ~9.7 when hitting play after stopping at 10s)
      if (time + .4 < stopTime) {
        rate = player.getPlaybackRate();
        remainingTime = (stopTime - time) / rate;
        stopPlayTimer = setTimeout(pauseVideo, remainingTime * 1000);
      }
    }
  }
  function playVideo() {
    player.playVideo();
    blurElement('#player', 10-parseInt(player.getCurrentTime()));
  }
  function pauseVideo() {
    player.pauseVideo();
    setTimeout(playVideo, 2000);
  }
  function blurElement(element, size){
  var filterVal = 'blur('+size+'px)';
  $(element)
    .css('filter',filterVal)
    .css('webkitFilter',filterVal)
    .css('mozFilter',filterVal)
    .css('oFilter',filterVal)
    .css('msFilter',filterVal);
  }
})();

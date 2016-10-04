var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var currentSoundFile = null;
var currentVolume = 80;
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';
var controls = $('.main-controls .play-pause');

var setVolume = function(volumeValue) {
  if(currentSoundFile){
    currentSoundFile.setVolume(volumeValue);
  }
};

var setSong = function(songNumber){
  if (currentSoundFile) {
    currentSoundFile.stop();
  }
  currentlyPlayingSongNumber = parseInt(songNumber);
  currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
  console.log(currentSoundFile);
  currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
    formats: [ "mp3"],
    preload: true
  });
  setVolume(currentVolume);
}; 

var getSongNumberCell = function(number) {
  return $('.song-item-number[data-song-number="' + number + '"]');
};

var updatePlayerBarSong = function() {
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + ' - ' + currentAlbum.artist);
    $('.main-controls .play-pause').html(playerBarPauseButton);
 };

var createSongRow = function(songNumber, songName, songLength) {
  
  var template =
    '<tr class="album-view-song-item">' +
    '  <td data-song-number="'+ songNumber + '" class="song-item-number">' + songNumber + '</td>' +
    '  <td class="song-item-title">' + songName + '</td>' +
    '  <td class="song-item-titlem-duration">' + songLength + '</td>' +
    '</tr>' 
  ;
 
  var $row = $(template);

  var clickHandler = function() {
    var songNumber = parseInt($(this).attr('data-song-number'));
    if (currentlyPlayingSongNumber !== null) {
      // Revert to song number for currently playing song because user started playing new song.
      var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
      currentlyPlayingCell.html(currentlyPlayingSongNumber);
    } else {
      var currentlyPlayingCell = getSongNumberCell(1);
      currentlyPlayingCell.html(1);
    }

    if (currentlyPlayingSongNumber !== songNumber) {
      setSong(songNumber);
      currentSoundFile.play();
      $(this).html(pauseButtonTemplate);
      updatePlayerBarSong();


    } else if (currentlyPlayingSongNumber === songNumber) {
      console.log(currentSoundFile.isPaused());
      if(currentSoundFile.isPaused()){
        currentSoundFile.play();
        $(this).html(pauseButtonTemplate);
        updatePlayerBarSong();
      } else {
        console.log("Called");
        currentSoundFile.pause();
        $(this).html(playButtonTemplate);
        updatePlayerBarSong();  
      }
    }
  };

  var onHover = function(event){
    //What do we wanna do onHover?
    // Find the element within this that has a class of .song-item-number
    var songNumberCell = $(this).find('.song-item-number');
    songNumber = parseInt(songNumberCell.attr('data-song-number'));
    // console.log('onHover', songNumber);
    if (songNumber !== currentlyPlayingSongNumber) {
      songNumberCell.html(playButtonTemplate);
    }
  };

  var offHover = function(event){
    var songNumberCell = $(this).find('.song-item-number');
    songNumber = parseInt(songNumberCell.attr('data-song-number'));
    // console.log('offHover', songNumber);
    if (songNumber !== currentlyPlayingSongNumber) {
      songNumberCell.html(songNumber);
    }
  };

  $row.find('.song-item-number').click(clickHandler);
  // console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);
  // Find method is similar to query selector
  $row.hover(onHover, offHover);
  return $row;
};

var setCurrentAlbum = function(album) {
  currentAlbum = album;
  var $albumTitle = $('.album-view-title');
  var $albumArtist = $('.album-view-artist');
  var $albumReleaseInfo = $('.album-view-release-info');
  var $albumImage = $('.album-cover-art');
  var $albumSongList = $('.album-view-song-list');

  $albumTitle.text(album.title);
  $albumArtist.text(album.artist);
  $albumReleaseInfo.text(album.year + ' ' + album.label);
  $albumImage.attr('src', album.albumArtUrl);

  $albumSongList.empty();

  for(var i = 0; i < album.songs.length; i++) {
    var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
    $albumSongList.append($newRow);
  }
};

var trackIndex = function(album, song) {
     return album.songs.indexOf(song);
 };

 var nextSong = function() {
    
    var getLastSongNumber = function(index) {
        return index == 0 ? currentAlbum.songs.length : index;
    };
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're _incrementing_ the song here
    currentSongIndex++;
    
    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }
    
    // Set a new current song
     setSong(currentSongIndex + 1);
     currentSoundFile.play();
     updatePlayerBarSong();

    // Update the Player Bar information
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.title);
    $('.main-controls .play-pause').html(playerBarPauseButton);
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
    
    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
    
};

var previousSong = function() {
    // Note the difference between this implementation and the one in
    // nextSong()
    var getLastSongNumber = function(index) {
        return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
    };
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're _decrementing_ the index here
    currentSongIndex--;
    
    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }
    
    // Set a new current song
     setSong(currentSongIndex + 1);
     currentSoundFile.play();
     updatePlayerBarSong();

    // Update the Player Bar information
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.title);
    $('.main-controls .play-pause').html(playerBarPauseButton);
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
    
    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
    
};
       
 var $previousButton = $('.main-controls .previous');
 var $nextButton = $('.main-controls .next');

 var togglePlayFromPlayerBar = function(){
  // if song is paused and play button is pressed
  // if(isPaused(currentSoundFile) && btn is clicked)
    // change songNumberCell to a pause button
    // change playerBarButton to pause button
    // play song
  // if song is playing and pause button is clicked
    // change songNumberCell to a play button
    // change playerBarButton to play button
    // pause song
 };

$(document).ready(function(){
    setCurrentAlbum(albumPicasso);
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
    // controls.click(togglePlayFromPlayerBar());
});


var artist = document.getElementsByClassName("album-view-artist")[0];

var cover = document.getElementsByClassName("album-cover-art")[0];
cover.addEventListener("click", function(){
    if(artist.innerText === 'Pablo Picasso'){ 
        setCurrentAlbum(albumMarconi);
    } else if(artist.innerText === 'Guglielmo Marconi'){
        setCurrentAlbum(albumKymil);     
    } else {
        setCurrentAlbum(albumPicasso);
    }
});
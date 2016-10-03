var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var currentSoundFile = null;
var currentVolume = 80;
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var setSong = function(songNumber){
  if (currentSoundFile) {
    currentSoundFile.stop();
  }
  currentlyPlayingSongNumber = +songNumber;
  currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
  currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
    formats: [ "mp3"],
    preload: true
  });
  setVolume(currentVolume);
}; 

var setVolume = function(volumeValue) {
  console.log(volumeValue);
  if(currentSoundFile){
    console.log(currentSoundFile);
    currentSoundFile.setVolume(volumeValue);
    
  }
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
    songNumber = $(this).attr('data-song-number');
    if (currentlyPlayingSongNumber !== null) {
      // Revert to song number for currently playing song because user started playing new song.
      var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
      parseInt(currentlyPlayingCell.html(currentlyPlayingSongNumber));
      setSong(currentlyPlayingSongNumber);
      currentSoundFile.play();
    } 
    if (currentlyPlayingSongNumber !== songNumber) {
      $(this).html(pauseButtonTemplate);
      currentlyPlayingSongNumber = parseInt(songNumber);
      currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
      updatePlayerBarSong();
      setSong(currentlyPlayingSongNumber);
      currentSoundFile.play();

    } else if (isPaused(currentSoundFile)) {
      $(this).html(playButtonTemplate);
      $('.main-controls .play-pause').html(playerBarPlayButton);
       currentSongFromAlbum = null;
      currentlyPlayingSongNumber = null;
      setSong(currentlyPlayingSongNumber);
      currentSoundFile.play();
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
     return parseInt(album.songs.indexOf(song));
 }

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
    currentlyPlayingSongNumber++;
    currentSongFromAlbum--;

    // Update the Player Bar information
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.title);
    $('.main-controls .play-pause').html(playerBarPauseButton);
    
    var lastSongNumber = parseInt(getLastSongNumber(currentSongIndex));
    var $nextSongNumberCell = parseInt($('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]'));
    var $lastSongNumberCell = parseInt($('.song-item-number[data-song-number="' + lastSongNumber + '"]'));
    
    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
 };

var previousSong = function() {
  var getNextSongNumber = function(index) {
      return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
  };
  
  var currentSongIndex = parseInt(trackIndex(currentAlbum, currentSongFromAlbum));
  // Note that we're _incrementing_ the song here
  currentSongIndex--;
  
  if (currentSongIndex < currentAlbum.songs.length) {
      currentSongIndex = currentAlbum.songs.length - 1;
  }
  
  // Set a new current song
  setSong(currentSongIndex + 1);
  currentSoundFile.play();
  updatePlayerBarSong();
  currentlyPlayingSongNumber++;
  currentSongFromAlbum--;

  // Update the Player Bar information
  $('.currently-playing .song-name').text(currentSongFromAlbum.title);
  $('.currently-playing .artist-name').text(currentAlbum.artist);
  $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.title);
  $('.main-controls .play-pause').html(playerBarPauseButton);
  
  var lastSongNumber = getLastSongNumber(currentSongIndex);
  var $nextSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
  var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');
  
  $nextSongNumberCell.html(pauseButtonTemplate);
  $lastSongNumberCell.html(lastSongNumber);
};


       
 var $previousButton = $('.main-controls .previous');
 var $nextButton = $('.main-controls .next');

$(document).ready(function(){
    setCurrentAlbum(albumKymil);
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
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
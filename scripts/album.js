 var setSong = function(songNumber) {     
    if (currentSoundFile) {
         currentSoundFile.stop();
    }
    currentlyPlayingSongNumber = +songNumber;
    currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
    currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
        formats: [ 'mp3'],
        preload: true
    });
    setVolume(currentVolume);
 }; 

 var setVolume = function(volumeValue) {
    if(currentSoundFile){
        currentSoundFile.setVolume(volumeValue);
    }
 };

 var togglePlayFromPlayerBar = function() {
    // if a song is paused and player bar play button is clicked
    if(currentSoundFile.isPaused()){
      // change song number cell to a pause button
      songNumberCell.html = pauseButtonTemplate;
      // change html of the player bar's play button to a pause button
      playerBarPlayButton.html = playerBarPauseButton;
      // play the song
      currentSoundFile.play();  
      // else if a song is playing and the pause button is clicked
    } else if(currentSoundFile.isPaused() === false) {
      // change the song number cell to a play button
      songNumberCell.html = playButtonTemplate;
      // change html of the player bar's pause button to a play button
      playerBarPauseButton.html = playerBarPlayButton;
      // pause the song
      currentSoundFile.pause();
    }
 };


var getSongNumberCell = function(number) {
    return $('.song-item-number[data-song-number="' + number + '"]');
};

 var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td data-song-number="'+ songNumber + '" class="song-item-number">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
     // return $(template);
     var $row = $(template);

     var clickHandler = function() {
        var songNumber = parseInt($(this).attr('data-song-number'));

        if (currentlyPlayingSongNumber !== null) {
            // Revert to song number for currently playing song because user started playing new song.
           var currentlyPlayingCell = getSongNumberCell(songNumber);
            console.log(currentlyPlayingCell);
            // currentlyPlayingCell.html(currentlyPlayingSongNumber);
            // console.log(currentlyPlayingCell);
        }
        if (currentlyPlayingSongNumber !== songNumber) {
            // Switch from Play -> Pause button to indicate new song is playing.
            $(this).html(pauseButtonTemplate);
            setSong(songNumber);
            // play currentSoundFile
            currentSoundFile.play();
            updatePlayerBarSong();
        } else if (currentlyPlayingSongNumber === songNumber) {

            if(currentSoundFile.isPaused()){
                 // if so start playing currentSoundFile again
                 currentSoundFile.play(); 
                // change icons to pause icon (since it is now playing)
                $(this).html(pauseButtonTemplate);
                $('.main-controls .play-pause').html(playerBarPauseButton );
            } else {
                //we need to pause it 
                currentSoundFile.pause();
                // set the icons to play icon
                $(this).html(playButtonTemplate);
                $('.main-controls .play-pause').html(playerBarPlayButton);
            }               
    }
};

     var onHover = function(event){
        //What do we wanna do onHover?
        // Find the element within this that has a class of .song-item-number
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt($(this).attr('data-song-number'));

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(playButtonTemplate);
        }
     };

     var offHover = function(event){
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt($(this).attr('data-song-number'));
        console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);
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

     for (var i = 0; i < album.songs.length; i++) {
         var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
         $albumSongList.append($newRow);
     }
};

var trackIndex = function(album, song) {
     return album.songs.indexOf(song);
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
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $nextSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');
    
    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
 };

 var previousSong = function() {
    var getNextSongNumber = function(index) {
        return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
    };
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
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
 }

var updatePlayerBarSong = function() {
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + ' - ' + currentAlbum.artist);
    $('.main-controls .play-pause').html(playerBarPauseButton);
 };

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';


 var currentAlbum = null;
 var currentlyPlayingSongNumber = null;
 var currentSongFromAlbum = null;
 var currentSoundFile = null;
       
 var $previousButton = $('.main-controls .previous');
 var $nextButton = $('.main-controls .next');

 var mainControlsPlayPause = $('.main-controls .play-pause');
 mainControlsPlayPause.click();

$(document).ready(function(){
    setCurrentAlbum(albumKymil);
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
    // block with togglePlayFromPlayerBar function



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



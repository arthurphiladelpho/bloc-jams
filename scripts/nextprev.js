var nextPrev = function(bool) {
	//If boolean is true we will run the next function.
	//Else we will run the previous function
	if(bool){
		var getLastSongNumber = function(index) {
        	return index == 0 ? currentAlbum.songs.length : index;
   		};
    
    	var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    	currentSongIndex++;
    
    	if (currentSongIndex >= currentAlbum.songs.length) {
        	currentSongIndex = 0;
    	}
	} else {
		var getNextSongNumber = function(index) {
	        return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
	    };
	    
	    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
	    // Note that we're _incrementing_ the song here
	    currentSongIndex--;
	    
	    if (currentSongIndex < currentAlbum.songs.length) {
	        currentSongIndex = currentAlbum.songs.length - 1;
	    }
	}
	//This remaining part of the function is the same for both
	// Set a new current song
    setSong(currentSongIndex);
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
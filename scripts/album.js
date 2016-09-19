var albumPicasso = {
     title: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [
         { title: 'Blue', duration: '4:26' },
         { title: 'Green', duration: '3:14' },
         { title: 'Red', duration: '5:01' },
         { title: 'Pink', duration: '3:21'},
         { title: 'Magenta', duration: '2:15'}
     ]
 };

 var albumMarconi = {
     title: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'Hello, Operator?', duration: '1:01' },
         { title: 'Ring, ring, ring', duration: '5:01' },
         { title: 'Fits in your pocket', duration: '3:21'},
         { title: 'Can you hear me now?', duration: '3:14' },
         { title: 'Wrong phone number', duration: '2:15'}
     ]
 };

 var albumKymil = {
     title: 'Odd Prophet',
     artist: 'Kymil',
     label: 'Independent',
     year: '2017',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'Funny To Me', duration: '1:01' },
         { title: 'You Talk Big Game', duration: '5:01' },
         { title: 'Shut Up and Work', duration: '3:21'},
         { title: 'Zip Up Yo Face?', duration: '3:14' },
         { title: 'No Excuses', duration: '2:15'}
     ]
 };

 var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td data-song-number="'+ songNumber + '" class="song-item-number">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
     return template;
 };

 var setCurrentAlbum = function(album) {
    var albumTitle = document.getElementsByClassName('album-view-title')[0];
    var albumArtist = document.getElementsByClassName('album-view-artist')[0];
    var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
    var albumImage = document.getElementsByClassName('album-cover-art')[0];
    var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

    albumTitle.firstChild.nodeValue = album.title;
    albumArtist.firstChild.nodeValue = album.artist;
    albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
    albumImage.setAttribute('src', album.albumArtUrl);

     albumSongList.innerHTML = '';

     for (var i = 0; i < album.songs.length; i++) {
         albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
     }
};



// New code goes here :

//When any of the table rows is clicked the number will become an pause icon
    //Where is the pause icon url?

// We can just give the functionality to all the trs in the 
// document, and then check if they have the number attribute.

//Loop over rows
    //Attach a Listener to the button





// Quesion: Since in line 77 we select the first element of the class, how come the code from line 84 - 86 prints out whatever table row element it hovers over?
var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');
// var songNums = document.getElementsByClassName("album-song-button");
//Button Template
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

 // Store state of playing songs
 var currentlyPlayingSong = null;

// findParentByClassName function
function findParentByClassName(element, parentClass) {
    // check if element is true
        if(element){
            var elementParent = element.parentElement;
            // while element has a parent or parent doesn't belong to parentClass
                while(elementParent.className !== parentClass && elementParent.className !== null){
                    // Traverses up parents
                    elementParent = elementParent.parentElement;
                }
                return elementParent;
        } else {
            alert('element doesnt exist');
        }     
}

// Find the element that contains the class of song-item-number.
function getSongItem(element) {
    switch(element.className){
        // ---- WALK THROUGH THIS CODE WITH ZACH -----
        case 'album-song-button':
        case 'ion-play':
        case 'ion-pause':
            return findParentByClassName(element, 'song-item-number');
        case 'album-view-song-item':
            return element.querySelector('.song-item-number');
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case 'song-item-number':
            return element;
        default:
            return;    
    };    
}

 var clickHandler = function(targetElement) {
    var songItem = getSongItem(targetElement);
    if(currentlyPlayingSong === null){
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItem.getAttribute('data-song-number');
     } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
         songItem.innerHTML = playButtonTemplate;
         currentlyPlayingSong = null;
     } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
         var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
         currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
         songItem.innerHTML = pauseButtonTemplate;
         currentlyPlayingSong = songItem.getAttribute('data-song-number');
     }
 };

window.onload = function() {
    setCurrentAlbum(albumKymil);
    songListContainer.addEventListener('mouseover', function(event) {
        if (event.target.parentElement.className === 'album-view-song-item') {
            var songItem = getSongItem(event.target);
            if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
                songItem.innerHTML = playButtonTemplate;
            }
        }
    
    });

    for (var i = 0; i < songRows.length; i++) {
         songRows[i].addEventListener('mouseleave', function(event) {
             var songItem = getSongItem(event.target);
             var songItemNumber = songItem.getAttribute('data-song-number');
             if (songItemNumber !== currentlyPlayingSong) {
                 songItem.innerHTML = songItemNumber;
             }
         });

          songRows[i].addEventListener('click', function(event) {
             clickHandler(event.target);
         });
    };
};


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



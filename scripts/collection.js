 var buildCollectionItemTemplate = function() {
     var template =
     '<div class="collection-album-container column fourth">'
   + '  <img src="assets/images/album_covers/01.png"/>'
   + '  <div class="collection-album-info caption">'
   + '    <p>'
   + '      <a class="album-name" href="album.html"> The Colors </a>'
   + '      <br/>'
   + '      <a href="album.html"> Pablo Picasso </a>'
   + '      <br/>'
   + '      X songs'
   + '      <br/>'
   + '    </p>'
   + '  </div>'
   + '</div>'
     ;
     return $(template);
   };

    $(window).load(function() {
      // Select first element with a class of album-covers
      // var collectionContainer = document.getElementsByClassName('album-covers')[0];
      var $collectionContainer = $('.album-covers');
      // Ensure string is cleared
      // collectionContainer.innerHTML = '';
      $collectionContainer.empty();
      // Create 12 instances of the album cover templates
      for (var i = 0; i < 12; i++){
         // collectionContainer.innerHTML += collectionItemTemplate;
          var $newThumbnail = buildCollectionItemTemplate();
          $collectionContainer.append($newThumbnail);         
      }
   });  
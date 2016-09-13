var points = document.getElementsByClassName('point');

var animatePoints = function() {
    // These revealPoints functions give each of the elements in the points array their original position and size (since we changed the original in the landing.css styles).
    var revealPoints = function (array) {
        for(var i = 0; i < 3; i++){
            array[i].style.opacity = 1;
            array[i].style.transform = "scaleX(1) translateY(0)";
            array[i].style.msTransform = "scaleX(1) translateY(0)";
            array[i].style.WebkitTransform = "scaleX(1) translateY(0)";
        }
    };
    revealPoints(points);
};

// animatePoints();
// Uncomment above or call from console.
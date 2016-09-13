var points = document.getElementsByClassName('point');

var animatePoints = function(pts) {
    // These revealPoints functions give each of the elements in the points array their original position and size (since we changed the original in the landing.css styles).
    // var revealPoints = function (array) {
    //     for(var i = 0; i < 3; i++){
    //         array[i].style.opacity = 1;
    //         array[i].style.transform = "scaleX(1) translateY(0)";
    //         array[i].style.msTransform = "scaleX(1) translateY(0)";
    //         array[i].style.WebkitTransform = "scaleX(1) translateY(0)";
    //     }
    // };
    // revealPoints(points);
    
    forEach(pts, function(item){
        item.style.opacity = 1;
        item.style.transform = "scaleX(1) translateY(0)";
        item.style.msTransform = "scaleX(1) translateY(0)";
        item.style.WebkitTransform = "scaleX(1) translateY(0)";
    })

};

window.onload = function() {
    if (window.innerHeight > 950) {
         animatePoints(pointsArray);
     }
    var sellingPoints = document.getElementsByClassName('point')[0];
    var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;
    window.addEventListener('scroll', function(event){
        if (/*document.documentElement.scrollTop ||*/document.body.scrollTop >= scrollDistance) {
             animatePoints(points);   
         }
    })
}
// animatePoints();
// Uncomment above or call from console.
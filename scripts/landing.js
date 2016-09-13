 var animatePoints = function() {
                // Create an array called points which holds all the elements that belong to the point class.
                 var points = document.getElementsByClassName('point');
                // These revealPoints functions give each of the elements in the points array their original position and size (since we changed the original in the landing.css styles).
                 var revealFirstPoint = function() {
                     points[0].style.opacity = 1;
                     points[0].style.transform = "scaleX(1) translateY(0)";
                     points[0].style.msTransform = "scaleX(1) translateY(0)";
                     points[0].style.WebkitTransform = "scaleX(1) translateY(0)";
                 };
 
                 var revealSecondPoint = function() {
                     points[1].style.opacity = 1;
                     points[1].style.transform = "scaleX(1) translateY(0)";
                     points[1].style.msTransform = "scaleX(1) translateY(0)";
                     points[1].style.WebkitTransform = "scaleX(1) translateY(0)";
                 };
 
                 var revealThirdPoint = function() {
                     points[2].style.opacity = 1;
                     points[2].style.transform = "scaleX(1) translateY(0)";
                     points[2].style.msTransform = "scaleX(1) translateY(0)";
                     points[2].style.WebkitTransform = "scaleX(1) translateY(0)";
                 };
                 //Finally we call the functions declared above.
                 //These will be called when the animatePoints function is called.    
                 revealFirstPoint();
                 revealSecondPoint();
                 revealThirdPoint();
             };

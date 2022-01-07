var slidesArray = document.getElementsByClassName('slide');
var slidesIdArray = [];
for (var i = 0; i < slidesArray.length; i++) {
    slidesIdArray[i] = slidesArray[i].id;
}

var maxSlides = slidesArray.length - 1;

//Collection of elements by class name
var pointsArray = document.querySelectorAll('.slides');
var currentSlide = document.getElementById('slide1');
//console.log(currentSlide);
//console.log(item.href.endsWith('slide1', this.length));
//console.log(window.getComputedStyle(document.getElementById('slide1'), 'target').getPropertyValue('opacity'));

//Change of slide by points from below
pointsArray.forEach(function(item) {
    item.addEventListener('click', function() {
        slidesState();
        //when is slide1, we disabled it
        if (!item.href.endsWith('slide1', this.length)) {
            slideDisable();
        } else {
            slideEnable();
        }
    });
});

//Right arrow
var nextArrow = document.getElementById('next');
nextArrow.addEventListener("click", function() {
    slidesState();
    nextSlide();
}, false);

//Left arrow
var prevArrow = document.getElementById('prev');
prevArrow.addEventListener('click', function() {
    slidesState();
    prevSlide();
}, false);

//Change slides state when we click on the circles or the arrows
function slidesState() {
    var slidesArray = document.getElementsByClassName('slide');
    for (var i = 0; i < slidesArray.length; i++) {
        //console.log(slidesArray[i].id);
        let active = window.getComputedStyle(document.getElementById(slidesArray[i].id), 'target').getPropertyValue('opacity');
        if (active == 1) currentSlide = slidesArray[i]; //Selected slide
    }
}

//Go to next slide
function nextSlide() {

    let position = slideArrayPosition();

    if (position < maxSlides) position++;
    else position = 0;

    slideDisable(currentSlide.id);
    slideEnable(slidesIdArray[position]);

}

//Go to previous slide
function prevSlide() {

    let position = slideArrayPosition();

    if (position > 0) position--;
    else position = maxSlides;
    /*
        console.log(currentSlide);
        console.log(slidesIdArray[position]);
        console.log(maxSlides);
    */
    slideDisable(currentSlide.id);
    slideEnable(slidesIdArray[position]);
}

//Enable the first slide by default or slide designated
function slideEnable(slide = 'slide1') {
    let element = document.getElementById(slide);
    element.style.setProperty('opacity', '1');
}

//Disable the first slide by default or slide designated
function slideDisable(slide = 'slide1') {
    let element = document.getElementById(slide);
    element.style.setProperty('opacity', '0');
}

//Return the position of current slide
function slideArrayPosition() {
    for (var i = 0; i < slidesArray.length; i++) {
        if (currentSlide == slidesArray[i]) return i;
    }
    return 0;
}
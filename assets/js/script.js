function toggleSidebar() {
    var sidebar = document.getElementById("sidebar");
    var sidebarLinks = document.querySelectorAll('.sidebar-link');
    var sidebarSearch = document.getElementById('sidebar-search');
    var toggleIcon = document.getElementById('toggle-icon');

    if (sidebar.style.width === "350px" || sidebar.style.width === "100%") {
        sidebar.style.width = "0";
        sidebarLinks.forEach(function (link) {
            link.style.display = "none";
        });
        sidebarSearch.style.display = 'none';
        toggleIcon.classList.replace('fa-x', 'fa-bars');
    } else {
        sidebar.style.width = window.innerWidth <= 768 ? "100%" : "350px";
        sidebarLinks.forEach(function (link) {
            link.style.display = "block";
        });
        sidebarSearch.style.display = 'block';
        toggleIcon.classList.replace('fa-bars', 'fa-x');
    }
}

window.addEventListener('resize', function () {
    var searchInput = document.querySelector('.search-sidebar input');
    var toggleIcon = document.getElementById('toggle-icon');
    if (window.innerWidth <= 768 && document.activeElement !== searchInput) {
        var sidebar = document.getElementById("sidebar");
        var sidebarLinks = document.querySelectorAll('.sidebar-link');

        sidebar.style.width = "0";
        sidebarLinks.forEach(function (link) {
            link.style.display = "none";
        });
        toggleIcon.classList.replace('fa-x', 'fa-bars');
    }
});

let slideIndex = 0;
let autoSlideInterval;
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;
let currentIndex = 0;

const slides = document.getElementsByClassName("mySlides");

function showSlides() {
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    slides[slideIndex - 1].style.display = "block";

    // Set automatic slide change
    autoSlideInterval = setTimeout(showSlides, 5000); // Change image every 5 seconds
}

// Start the slideshow
showSlides();

// Manual navigation with mouse and touch
const carouselContainer = document.querySelector('.mySlides');

// Disable auto slide when user interacts with carousel
function resetAutoSlide() {
    clearTimeout(autoSlideInterval); // Stop auto slide temporarily
    autoSlideInterval = setTimeout(showSlides, 5000); // Resume after 5 seconds
}

// Dragging logic for mouse and touch
carouselContainer.addEventListener('mousedown', startDrag);
carouselContainer.addEventListener('touchstart', startDrag);

carouselContainer.addEventListener('mouseup', endDrag);
carouselContainer.addEventListener('touchend', endDrag);

carouselContainer.addEventListener('mousemove', drag);
carouselContainer.addEventListener('touchmove', drag);

function startDrag(event) {
    isDragging = true;
    startPos = getPositionX(event);
    animationID = requestAnimationFrame(animation);
    resetAutoSlide();
}

function endDrag() {
    isDragging = false;
    cancelAnimationFrame(animationID);

    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -100 && slideIndex < slides.length) {
        plusSlides(1);
    }

    if (movedBy > 100 && slideIndex > 1) {
        plusSlides(-1);
    }

    setPositionByIndex();
    resetAutoSlide(); // Resume auto slide after interaction
}

function drag(event) {
    if (!isDragging) return;
    const currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startPos;
}

function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function animation() {
    setSliderPosition();
    if (isDragging) requestAnimationFrame(animation);
}

function setSliderPosition() {
    carouselContainer.style.transform = `translateX(${currentTranslate}px)`;
}

function setPositionByIndex() {
    currentTranslate = prevTranslate = -slideIndex * carouselContainer.clientWidth;
    setSliderPosition();
}

// Manual slide function
function plusSlides(n) {
    slideIndex += n;

    if (slideIndex > slides.length) {
        slideIndex = 1;
    } else if (slideIndex < 1) {
        slideIndex = slides.length;
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slideIndex - 1].style.display = "block";
    setPositionByIndex();
}

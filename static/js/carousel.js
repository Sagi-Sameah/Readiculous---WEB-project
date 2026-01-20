document.addEventListener("DOMContentLoaded", () => {
    const carouselTrack = document.querySelector(".carousel-track");
    const slides = Array.from(document.querySelectorAll(".book-slide"));
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
    let currentIndex = 0;
    const slidesToShow = 4; // Number of slides to show at a time
    const totalSlides = slides.length;

    function moveSlide(direction) {
        currentIndex = (currentIndex + direction + totalSlides) % totalSlides;
        const offset = -currentIndex * (100 / slidesToShow);
        carouselTrack.style.transform = `translateX(${offset}%)`;
    }

    prevButton.addEventListener("click", () => {
        moveSlide(-1);
    });

    nextButton.addEventListener("click", () => {
        moveSlide(1);
    });

    carouselTrack.style.width = `${(totalSlides * 100) / slidesToShow}%`;
    carouselTrack.style.display = 'flex';
});

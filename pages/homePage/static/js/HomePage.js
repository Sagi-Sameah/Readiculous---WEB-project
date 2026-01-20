document.addEventListener("DOMContentLoaded", () => {
    const carouselTrack = document.querySelector(".carousel-track");
    const slides = Array.from(document.querySelectorAll(".book-slide"));
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
    let currentIndex = 0;

    const slidesToShow = 3;

    prevButton.addEventListener("click", () => {
        moveSlide(-1);
    });

    nextButton.addEventListener("click", () => {
        moveSlide(1);
    });

    function moveSlide(direction) {
        const totalSlides = slides.length;
        currentIndex = (currentIndex + direction + totalSlides) % totalSlides;

        if (currentIndex < 0) {
            currentIndex = totalSlides - slidesToShow;
        } else if (currentIndex + slidesToShow > totalSlides) {
            currentIndex = 0;
        }

        const offset = -currentIndex * (100 / slidesToShow);
        carouselTrack.style.transform = `translateX(${offset}%)`;
    }

    const filtersForm = document.getElementById("filtersForm");

    filtersForm.addEventListener("submit", (event) => {
        const minPages = document.getElementById("minPages");
        const maxPages = document.getElementById("maxPages");
        const yearMin = document.getElementById("yearMin");
        const yearMax = document.getElementById("yearMax");

        let errorMessage = "";

        if (minPages.value && maxPages.value && parseInt(minPages.value) > parseInt(maxPages.value)) {
            errorMessage += "כמות העמודים המינימלית לא יכולה להיות גבוהה יותר מהמקסימלית\n";
            minPages.classList.add("error");
            maxPages.classList.add("error");
        } else {
            minPages.classList.remove("error");
            maxPages.classList.remove("error");
        }

        if (yearMin.value && yearMax.value && parseInt(yearMin.value) > parseInt(yearMax.value)) {
            errorMessage += "שנת ההוצאה לאור המינימלית לא יכולה להיות גבוהה יותר מהמקסימלית\n";
            yearMin.classList.add("error");
            yearMax.classList.add("error");
        } else {
            yearMin.classList.remove("error");
            yearMax.classList.remove("error");
        }

        if (errorMessage) {
            event.preventDefault();
            alert(errorMessage);
        }
    });
});

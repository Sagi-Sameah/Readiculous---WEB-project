document.addEventListener("DOMContentLoaded", () => {
    const authorsFilter = document.getElementById('authorsFilter');
    const genresFilter = document.getElementById('genresFilter');
    const minPages = document.getElementById('minPages');
    const maxPages = document.getElementById('maxPages');
    const ratingFilter = document.getElementById('ratingFilter');
    const yearMin = document.getElementById('yearMin');
    const yearMax = document.getElementById('yearMax');
    const filtersForm = document.getElementById('filtersForm');

    function populateFilters() {
        const authors = ["מחבר 1", "מחבר 2", "מחבר 3", "מחבר 4", "מחבר 5"];
        const genres = ["רומן", "מדע בדיוני", "מתח"];

        authors.forEach(author => {
            authorsFilter.innerHTML += `<option value="${author}">${author}</option>`;
        });

        genres.forEach(genre => {
            genresFilter.innerHTML += `<option value="${genre}">${genre}</option>`;
        });
    }

    filtersForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (validateFilters()) {
            applyFilters();
        }
    });

    filtersForm.addEventListener('reset', () => {
        // Reset form and apply default filters
        authorsFilter.selectedIndex = -1;
        genresFilter.selectedIndex = -1;
        minPages.value = "";
        maxPages.value = "";
        ratingFilter.selectedIndex = 0;
        yearMin.value = 1900; // Default to minimum year
        yearMax.value = new Date().getFullYear(); // Default to current year
        applyFilters();
    });

    function validateFilters() {
        const minPagesValue = parseInt(minPages.value) || 0;
        const maxPagesValue = parseInt(maxPages.value) || Infinity;
        const yearMinValue = parseInt(yearMin.value) || 1900;
        const yearMaxValue = parseInt(yearMax.value) || new Date().getFullYear();

        if (minPagesValue > maxPagesValue) {
            alert("מספר העמודים המקסימלי חייב להיות שווה או גדול ממספר העמודים המינימלי");
            return false;
        }

        if (yearMinValue > yearMaxValue) {
            alert("שנת ההוצאה לאור המקסימלית חייבת להיות שווה או גדולה משנת ההוצאה לאור המינימלית");
            return false;
        }

        return true;
    }

    function applyFilters() {
        const selectedAuthors = Array.from(authorsFilter.selectedOptions).map(option => option.value);
        const selectedGenres = Array.from(genresFilter.selectedOptions).map(option => option.value);
        const minPagesValue = parseInt(minPages.value) || 0;
        const maxPagesValue = parseInt(maxPages.value) || Infinity;
        const ratingValue = ratingFilter.value;
        const yearMinValue = parseInt(yearMin.value) || 1900;
        const yearMaxValue = parseInt(yearMax.value) || new Date().getFullYear();

        console.log("Selected Authors:", selectedAuthors);
        console.log("Selected Genres:", selectedGenres);
        console.log("Min Pages Value:", minPagesValue);
        console.log("Max Pages Value:", maxPagesValue);
        console.log("Rating Value:", ratingValue);
        console.log("Min Year Value:", yearMinValue);
        console.log("Max Year Value:", yearMaxValue);
    }

    populateFilters();
});

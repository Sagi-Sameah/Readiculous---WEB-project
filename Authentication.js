document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
        const protectedPages = [
            "HomePage.html",
            "Profile.html",
            "books-rated.html",
            "new-books.html"
        ];

        const currentPage = window.location.pathname.split("/").pop();

        if (protectedPages.includes(currentPage)) {
            window.location.href = "Login.html";
        }
    }
});

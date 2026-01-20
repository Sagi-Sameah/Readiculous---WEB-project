document.addEventListener('DOMContentLoaded', () => {
    const genresPopup = document.getElementById('genresPopup');
    const authorsPopup = document.getElementById('authorsPopup');
    const genresOptions = document.getElementById('genresOptions');
    const authorsOptions = document.getElementById('authorsOptions');
    const selectedGenresContainer = document.getElementById('selectedGenresContainer');
    const selectedAuthorsContainer = document.getElementById('selectedAuthorsContainer');
    const genresErrorMsg = document.getElementById('genresErrorMsg');
    const authorsErrorMsg = document.getElementById('authorsErrorMsg');
    const updateGenresButton = document.getElementById('updateGenres');
    const updateAuthorsButton = document.getElementById('updateAuthors');
    const closeGenresPopup = document.getElementById('closeGenresPopup');
    const closeAuthorsPopup = document.getElementById('closeAuthorsPopup');
    const saveGenresButton = document.getElementById('saveGenres');
    const saveAuthorsButton = document.getElementById('saveAuthors');

    const editButton = document.getElementById('editPersonalInfoButton');
    const saveButton = document.getElementById('savePersonalInfoButton');
    const showPasswordCheckbox = document.getElementById('showPassword');
    const showPasswordLabel = document.getElementById('showPasswordLabel');
    const inputFields = document.querySelectorAll('#profileForm input, #profileForm select');

    // Initially disable input fields
    inputFields.forEach(input => {
        input.disabled = true;
    });

    editButton.addEventListener('click', () => {
        inputFields.forEach(input => {
            input.disabled = false;
        });
        editButton.style.display = 'none';
        saveButton.style.display = 'block';
        showPasswordCheckbox.style.display = 'inline';
        showPasswordLabel.style.display = 'inline';
    });

    showPasswordCheckbox.addEventListener('change', () => {
        const passwordField = document.getElementById('password');
        if (showPasswordCheckbox.checked) {
            passwordField.type = 'text';
        } else {
            passwordField.type = 'password';
        }
    });

    const genres = ["פנטזיה", "מתח", "רומנטיקה", "מדע בדיוני", "פילוסופיה", "שפה זרה", "אימה", "ילדים", "פרוזה", "ביוגרפיה"];
    const authors = ["ש\"י עגנון", "דוד גרוסמן", "צרויה שלו", "עמוס עוז", "שגיא שמח", "דניאל נוס", "ג'יי. קיי. רולינד", "חיים שפירא", "אלונה קמחי"];
    const selectedGenres = new Set();
    const selectedAuthors = new Set();

    function populateOptions(container, items, selectedItems, errorMsg) {
        container.innerHTML = '';
        errorMsg.textContent = '';
        const sortedItems = items.sort((a, b) => {
            if (selectedItems.has(a) && !selectedItems.has(b)) return -1;
            if (!selectedItems.has(a) && selectedItems.has(b)) return 1;
            return a.localeCompare(b);
        });

        for (const item of sortedItems) {
            const li = document.createElement('li');
            li.textContent = item;
            if (selectedItems.has(item)) {
                li.classList.add('selected');
            }
            li.addEventListener('click', () => {
                if (selectedItems.has(item)) {
                    selectedItems.delete(item);
                    li.classList.remove('selected');
                } else if (selectedItems.size < 5) {
                    selectedItems.add(item);
                    li.classList.add('selected');
                } else {
                    errorMsg.textContent = "ניתן לבחור עד 5 אפשרויות";
                }
                populateOptions(container, items, selectedItems, errorMsg);
            });
            container.appendChild(li);
        }
    }

    updateGenresButton.addEventListener('click', () => {
        genresPopup.style.display = 'block';
        populateOptions(genresOptions, genres, selectedGenres, genresErrorMsg);
    });

    updateAuthorsButton.addEventListener('click', () => {
        authorsPopup.style.display = 'block';
        populateOptions(authorsOptions, authors, selectedAuthors, authorsErrorMsg);
    });

    closeGenresPopup.addEventListener('click', () => {
        genresPopup.style.display = 'none';
    });

    closeAuthorsPopup.addEventListener('click', () => {
        authorsPopup.style.display = 'none';
    });

    saveGenresButton.addEventListener('click', () => {
        genresPopup.style.display = 'none';
        updateSelectedItemsDisplay(selectedGenresContainer, selectedGenres, "הז'אנרים שלי: ");
        document.getElementById('selectedGenres').value = Array.from(selectedGenres).join(',');
    });

    saveAuthorsButton.addEventListener('click', () => {
        authorsPopup.style.display = 'none';
        updateSelectedItemsDisplay(selectedAuthorsContainer, selectedAuthors, "הסופרים שלי: ");
        document.getElementById('selectedAuthors').value = Array.from(selectedAuthors).join(',');

    });

    function loadSelectedItems(container, itemsString, label) {
        const items = itemsString.split(',');
        items.forEach(item => {
            selectedGenres.add(item);  // or selectedAuthors.add(item) depending on context
        });
        updateSelectedItemsDisplay(container, new Set(items), label);
    }

    window.onclick = function (event) {
        if (event.target === genresPopup) {
            genresPopup.style.display = "none";
        } else if (event.target === authorsPopup) {
            authorsPopup.style.display = "none";
        }
    }

    function updateSelectedItemsDisplay(container, selectedItems, label) {
        container.innerHTML = label + Array.from(selectedItems).map(item => `<span class="selected-item">${item}</span>`).join(', ');
    }
});

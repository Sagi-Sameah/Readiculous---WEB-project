document.addEventListener('DOMContentLoaded', function () {
    const rateButton = document.getElementById('rateButton');
    const modal = document.getElementById('ratingModal');
    const closeModal = document.getElementById('closeRatingModal');
    const stars = document.querySelectorAll('#userRatingStars .star');
    const ratersCount = document.querySelector('#ratersCount');
    const currentRatingElement = document.getElementById('rating');
    const ratingValue = parseFloat(currentRatingElement.textContent);
    let totalRatings = parseInt(ratersCount.textContent.match(/\d+/)[0]);
    const commentInput = document.getElementById('commentInput');
    const characterCount = document.querySelector('.character-count');
    const postCommentButton = document.getElementById('postCommentButton');
    const commentsContainer = document.getElementById('commentsContainer');

    rateButton.addEventListener('click', function () {
        modal.style.display = 'block';
    });

    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    stars.forEach((star, index) => {
        star.addEventListener('click', function () {
            const newRating = 5 - index;
            alert(`You rated this book ${newRating} stars!`);
            updateAverageRating(newRating);
            updateRatersCount();
            modal.style.display = 'none';
        });
    });

    function updateRatersCount() {
        totalRatings += 1;
        ratersCount.textContent = `(${totalRatings} מדרגים)`;
    }

    function updateAverageRating(newRating) {
        const ratingElement = document.getElementById('rating');
        let currentRating = parseFloat(ratingElement.textContent);
        let totalRatings = parseInt(document.querySelector('#ratersCount').textContent.match(/\d+/)[0]);
        let newAverageRating = ((currentRating * totalRatings) + newRating) / (totalRatings + 1);
        ratingElement.textContent = newAverageRating.toFixed(2);
    }

    loadComments();

    commentInput.addEventListener('input', () => {
        characterCount.textContent = `${commentInput.value.length}/300`;
    });

    postCommentButton.addEventListener('click', () => {
        const commentText = commentInput.value.trim();
        if (commentText) {
            const commentElement = createCommentElement(commentText);
            commentsContainer.appendChild(commentElement);
            saveComment(commentText);

            commentInput.value = '';
            characterCount.textContent = '0/300';
        }
    });

    function createCommentElement(commentText, timestamp = new Date()) {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');

        const commentContent = document.createElement('p');
        commentContent.textContent = commentText;
        commentElement.appendChild(commentContent);

        const date = timestamp.toLocaleDateString('he-IL'); // Format the date for Hebrew locale
        const timeOptions = {hour: '2-digit', minute: '2-digit', hour12: false}; // Options for time formatting
        const time = timestamp.toLocaleTimeString('he-IL', timeOptions); // Format the time for Hebrew locale without AM/PM
        const timestampElement = document.createElement('span');
        timestampElement.classList.add('timestamp');
        timestampElement.textContent = `תאריך: ${date} שעה: ${time}`;
        commentElement.appendChild(timestampElement);


        // const date = timestamp.toLocaleDateString();
        // const time = timestamp.toLocaleTimeString();
        // const timestampElement = document.createElement('span');
        // timestampElement.classList.add('timestamp');
        // timestampElement.textContent = `${date} ${time}`;
        // commentElement.appendChild(timestampElement);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button');
        commentElement.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        commentElement.appendChild(deleteButton);

        editButton.addEventListener('click', () => {
            commentInput.value = commentText;
            characterCount.textContent = `${commentText.length}/300`;
            commentsContainer.removeChild(commentElement);
            deleteComment(timestamp);
        });

        deleteButton.addEventListener('click', () => {
            commentsContainer.removeChild(commentElement);
            deleteComment(timestamp);
        });

        return commentElement;
    }

    function saveComment(commentText) {
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.push({text: commentText, timestamp: new Date()});
        localStorage.setItem('comments', JSON.stringify(comments));
    }

    function loadComments() {
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.forEach(comment => {
            const timestamp = new Date(comment.timestamp);
            const commentElement = createCommentElement(comment.text, timestamp);
            commentsContainer.appendChild(commentElement);
        });
    }

    function deleteComment(timestamp) {
        let comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments = comments.filter(comment => new Date(comment.timestamp).getTime() !== timestamp.getTime());
        localStorage.setItem('comments', JSON.stringify(comments));
    }

});

// postCommentButton.addEventListener('click', () => {
//     const commentText = commentInput.value.trim();
//     if (commentText) {
//         const commentElement = document.createElement('div');
//         commentElement.classList.add('comment');
//
//         const commentContent = document.createElement('p');
//         commentContent.textContent = commentText;
//         commentElement.appendChild(commentContent);
//
//         const editButton = document.createElement('button');
//         editButton.textContent = 'Edit';
//         editButton.classList.add('edit-button');
//         commentElement.appendChild(editButton);
//
//         const deleteButton = document.createElement('button');
//         deleteButton.textContent = 'Delete';
//         deleteButton.classList.add('delete-button');
//         commentElement.appendChild(deleteButton);
//
//         commentsContainer.appendChild(commentElement);
//
//         editButton.addEventListener('click', () => {
//             commentInput.value = commentText;
//             characterCount.textContent = `${commentText.length}/300`;
//             commentsContainer.removeChild(commentElement);
//         });
//
//         deleteButton.addEventListener('click', () => {
//             commentsContainer.removeChild(commentElement);
//         });
//
//         commentInput.value = '';
//         characterCount.textContent = '0/300';
//     }
// }
// );
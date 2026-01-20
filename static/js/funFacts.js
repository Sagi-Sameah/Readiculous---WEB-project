document.addEventListener("DOMContentLoaded", () => {
    const funFacts = [
        "הידעת? הרומן הראשון נכתב במאה ה-11.",
        "המשפט הארוך ביותר שהודפס אי פעם בספר מכיל 823 מילים.",
        "הספר היקר בעולם נמכר תמורת 30.8 מיליון דולר.",
        "ספרי הילדים הנמכרים ביותר הם: 'מעשה בחמישה בלונים' ו'מיץ פטל', שיצאו לאור בשנות ה-70.",
        "הספר הנגנב ביותר ברחבי העולם הוא ספר השיאים של גינס.",
        "הספר הארוך ביותר בעולם הוא 'מלחמה ושלום' של לב טולסטוי.",
        "לסופר צ'ארלס דיקנס היה עורב מחמד.",
        "אגתה כריסטי היא הסופרת שמכרה הכי הרבה ספרים בהיסטוריה, עם יותר מ-2 מיליארד מספריה שנמכרו.",
        "בממוצע, סטיבן קינג מפרסם ספר כל 20 שבועות. כמעט 3 ספרים בשנה!"
    ];

    const funFactText = document.getElementById('funFactText');
    let currentIndex = 0;

    function displayFunFact() {
        funFactText.style.opacity = 0;
        setTimeout(() => {
            funFactText.textContent = funFacts[currentIndex];
            currentIndex = (currentIndex + 1) % funFacts.length;
            funFactText.style.opacity = 1;
        }, 500);
    }

    displayFunFact();
    setInterval(displayFunFact, 5000);
});

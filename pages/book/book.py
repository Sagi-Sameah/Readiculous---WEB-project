from flask import Blueprint, render_template, request, session, redirect, url_for
from connector_db import get_book_by_id, update_book, add_comment

# Book blueprint definition
book_bp = Blueprint(
    'book_bp',
    __name__,
    static_folder='static',
    static_url_path='/book/static',
    template_folder='templates'
)

@book_bp.route('/<book_id>', methods=['GET', 'POST'])
def book_details(book_id):
    book = get_book_by_id(book_id)
    if not book:
        return redirect(url_for('homePage_bp.homePage'))  # Redirect to homepage if book not found

    if request.method == 'POST':
        if 'comment' in request.form:
            comment = {
                "user_id": session.get('user_id'),
                "comment": request.form['comment'],
                "timestamp": request.form.get('timestamp', '')  # Get timestamp or use an empty string
            }
            add_comment(book_id, comment)
        elif 'rating' in request.form:
            new_rating = float(request.form['rating'])
            updated_data = {
                "rating": (book['rating'] * book['raters_count'] + new_rating) / (book['raters_count'] + 1),
                "raters_count": book['raters_count'] + 1
            }
            update_book(book_id, updated_data)
        return redirect(url_for('book_bp.book_details', book_id=book_id))

    # Render the book details page
    return render_template('book.html', book=book)

from flask import Blueprint, render_template, session
from connector_db import get_all_books

# HomePage blueprint definition
homePage_bp = Blueprint(
    'homePage_bp',
    __name__,
    static_folder='static',
    static_url_path='/homePage/static',
    template_folder='templates'
)

@homePage_bp.route('/', methods=['GET'])
def index():
    return render_template('homePage.html')

@homePage_bp.route('/home', methods=['GET'])
def homePage():
    books = get_all_books()
    user_name = session.get('user_name', 'Guest')
    return render_template('homePage.html', books=books, user_name=user_name)


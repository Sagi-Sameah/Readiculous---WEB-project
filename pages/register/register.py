from flask import Blueprint, render_template, request, redirect, url_for, flash, session
from connector_db import add_user, get_user_by_email
from datetime import datetime

# Register blueprint definition
register_bp = Blueprint(
    'register_bp',
    __name__,
    static_folder='static',
    static_url_path='/register/static',
    template_folder='templates'
)

@register_bp.route('/', methods=['GET'])
def index():
    return render_template('register.html')

@register_bp.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        confirm_password = request.form['confirmPassword']
        first_name = request.form['firstName']
        last_name = request.form['lastName']
        birthdate = request.form['birthDate']

        # Debugging print statements
        print("Received form data:", email, password, confirm_password, first_name, last_name, birthdate)

        # Check if passwords match
        if password != confirm_password:
            print("Passwords do not match")
            return render_template('register.html', error="Passwords do not match")

        # Check if user already exists
        if get_user_by_email(email):
            print("User already exists")
            return render_template('register.html', error="A user with this email address already exists in the system")

        # Validate birthdate
        try:
            birth_date_obj = datetime.strptime(birthdate, "%d/%m/%Y")
            min_date = datetime(1900, 1, 1)
            max_date = datetime(2019, 12, 31)
            if not (min_date <= birth_date_obj <= max_date):
                print("Invalid birthdate range")
                return render_template('register.html', error="תאריך הלידה שהוזן לא נכון (אלא אם גילכם הוא 4 או מעל 120 😉)")
        except ValueError:
            print("Invalid birthdate format")
            return render_template('register.html', error="Invalid birthdate format")

        user_data = {
            "email": email,
            "password": password,
            "first_name": first_name,
            "last_name": last_name,
            "birthdate": birthdate,
            "selected_genres": [],
            "selected_authors": []
        }
        add_user(user_data)
        print("User registered successfully:", user_data)  # Debugging print statement
        session['user_id'] = email  # Set the session user_id here
        return redirect(url_for('profile_bp.profile'))
    return render_template('register.html')

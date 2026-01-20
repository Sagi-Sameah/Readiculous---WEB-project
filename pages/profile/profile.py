from flask import Blueprint, render_template, request, session, redirect, url_for
from connector_db import get_user_by_email, update_user

# profile blueprint definition
profile_bp = Blueprint(
    'profile_bp',
    __name__,
    static_folder='static',
    static_url_path='/profile',
    template_folder='templates'
)

@profile_bp.route('/profile', methods=['GET', 'POST'])
def profile():
    user_id = session.get('user_id')
    if not user_id:
        return redirect(url_for('login_bp.index'))  # Redirect to login if not logged in
    user = get_user_by_email(user_id)

    if request.method == 'POST':
        updated_data ={
            "first_name": request.form['first_name'],
            "last_name": request.form['last_name'],
            "phone": request.form['phone'],
            "birthdate": request.form['birthdate'],
            "password": request.form['password'],
            "gender": request.form['gender'],
            "selected_genres": request.form.getlist('selected_genres'),
            "selected_authors": request.form.getlist('selected_authors')
        }
        update_user(user_id, updated_data)
        return redirect(url_for('profile_bp.profile'))

    return render_template('profile.html', user=user)

@profile_bp.route('/update', methods=['POST'])
def update_profile():
    user_id = session.get('user_id')
    updated_data = {
        "first_name": request.form['first_name'],
        "last_name": request.form['last_name'],
        "phone": request.form['phone'],
        "birthdate": request.form['birthdate'],
        "password": request.form['password'],
        "gender": request.form['gender']
    }
    update_user(user_id, updated_data)
    return redirect(url_for('profile_bp.profile'))
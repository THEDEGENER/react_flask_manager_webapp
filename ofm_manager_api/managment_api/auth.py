import functools
from flask import (
    Blueprint, g, request, session
)
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash

from managment_api.db import get_db


bp_auth = Blueprint('auth', __name__, url_prefix='/auth')

@bp_auth.before_app_request
def load_logged_in_user():
    user_id = session.get('user_id')

    if user_id is None:
        g.user = None
    else:
        g.user = get_db().execute(
            'SELECT * FROM user WHERE id = ?', (user_id,)
        ).fetchone()


def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return {'error': 'user is not logged in'}

        return view(**kwargs)

    return wrapped_view


@bp_auth.route('/register', methods=('GET', 'POST'))
def register():
    if request.method == 'POST':
        email = request.form['email']
        username = request.form['username']
        password = request.form['password']
        db = get_db()
        error = None

        if not username:
            error = 'Username is required'
        elif not password:
            error = 'Password is required'

        if error is None:
            try:
                db.execute(
                    "INSERT INTO user (email, username, password) VALUES (?, ?, ?)",
                    (email, username, generate_password_hash(password)),
                )
                db.commit()
            except db.IntegrityError:
                error = f"User {username} is already registered."
                return {'success': False, 'errors': error}
            
            else:
                return {'success': True, 'errors': error}
            
        return {'success': False, 'errors': error}


@bp_auth.route('/login', methods=('GET', 'POST'))
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        db = get_db()
        error = None
        user = db.execute(
            'SELECT * FROM user WHERE username = ? or email = ?', (username, username)
        ).fetchone()

        if user is None:
            error = 'Incorrect username'
        elif not check_password_hash(user['password'], password):
            error = 'Incorrect password'

        if error is None:
            session.clear()
            session['user_id'] = user['id']
            return {'success': True}
        else:
            return {'success': False, 'errors': error}
        

    
@bp_auth.route('/logout')
def logout():
    session.clear()
    return {'success': True}



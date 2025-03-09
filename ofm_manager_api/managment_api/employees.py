from flask import (
    Blueprint, g, request, session, abort, jsonify
)
from flask_cors import CORS

from managment_api.db import get_db
from managment_api.auth import login_required

bp_employees = Blueprint('employees', __name__, url_prefix='/employees')


def get_employee(id, check_user=True):
    employee = get_db().execute(
        'SELECT * FROM employee WHERE id = ?',
        (id,)
    ).fetchone()

    if employee is None:
        abort(404, f"Employee id {id} doesn't exist.")

    if check_user and employee['user_id'] != g.user['id']:
        abort(403)

    return employee


@bp_employees.route('/get_employees')
@login_required
def get_employees():
    db = get_db()
    employees = db.execute(
        'SELECT * FROM employee WHERE user_id = ?', (g.user['id'],)
    ).fetchall()
    result = [dict(row) for row in employees]
    return {"employees": result}


@bp_employees.route('/add_employee', methods=('GET', 'POST'))
@login_required
def add_employee():
    if request.method == 'POST':
        employee_username = request.form['username']
        about = request.form['about']
        role = request.form['role']
        first_name = request.form['first-name']
        last_name = request.form['last-name']
        email = request.form['email']
        telegram = request.form['telegram']
        country = request.form['country']
        city = request.form['city']
        region = request.form['region']
        street_address = request.form['street-address']
        postal_code = request.form['postal-code']
        commission = request.form['commission']
        hourly = request.form['hourly']
        payment = request.form['payment']
        assigned_to = request.form['assigned-to']
        notify_account = request.form.get('account-creation')
        send_docs = request.form.get('send-docs')
        no_notify = request.form.get('no-notifications')


        db = get_db()
        db.execute(
            'INSERT INTO employee (user_id, employee_username, about, role,'
            'name, surname, email, telegram, country, city, region, zip, commission_rate, hour_rate, payment_method, assigned_to)'
            'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            (g.user['id'], employee_username, about, role, first_name, last_name, email, telegram, 
             country, city, region, postal_code, commission, hourly, payment, assigned_to)
        )
        db.commit()
        sesh = session['user_id']
        response = {'success': True, 'sesh': sesh}
        return response
    sesh = session.get('user_id')
    return {'session': sesh}
    

    



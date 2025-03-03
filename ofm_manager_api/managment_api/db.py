import sqlite3
from datetime import datetime

import click
from flask import current_app, g

from werkzeug.security import generate_password_hash


def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = sqlite3.Row

    return g.db


def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()

def init_db():
    db = get_db()

    with current_app.open_resource('schema.sql') as f:
        db.executescript(f.read().decode('utf8'))
    db.execute(
        'INSERT INTO user (email, username, password)'
        'VALUES (?, ?, ?)', ("luke.howe212@gmail.com", "admin", generate_password_hash('password'))
    )
    db.commit()


@click.command('init-db')
def init_db_command():
    """Clear the existing data and create new tables."""
    init_db()
    click.echo('Initialized the database.')

@click.command('modify-db')
def modify_db_command():
    """input SQL commands to modify database"""
    command = input("Please enter SQL command: ")
    db = get_db()
    try:
        db.execute(command)
        db.commit()
        click.echo("Database successfully modified")
    except ValueError:
        print("Please enter a valid SQL command")


sqlite3.register_converter(
    "timestamp", lambda v: datetime.fromisoformat(v.decode())
)

def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)
    app.cli.add_command(modify_db_command)
from flask import Flask, request, session, g, redirect, url_for, abort, render_template, flash, Response
import sqlite3
from contextlib import closing
import os
from configparser import ConfigParser

__author__ = 'kongaloosh'

config = ConfigParser()
config.read('config.ini')

DATABASE = config.get('Global', 'Database')
DEBUG = config.get('Global', 'Debug')
SECRET_KEY = config.get('Global', 'DevKey')
USERNAME = config.get('SiteAuthentication', "Username")
PASSWORD = config.get('SiteAuthentication', 'password')
DOMAIN_NAME = config.get('Global', 'DomainName')
GEONAMES = config.get('GeoNamesUsername', 'Username')
FULLNAME = config.get('PersonalInfo', 'FullName')
LOCATION_ID = config.get('OpenWeather', 'id')
OW_KEY = config.get('OpenWeather', 'key')

# create our little application :)
app = Flask(__name__)
app.config.from_object(__name__)
app.config['STATIC_FOLDER'] = os.getcwd()
cfg = None


def init_db():
    """Initializes a database. If there is an existing Database, this will overwrite it."""
    with closing(connect_db()) as db:
        with app.open_resource('schema.sql', mode='r') as f:
            db.cursor().executescript(f.read())
        db.commit()


def connect_db():
    """Connects to the databse listed in the config.ini file."""
    return sqlite3.connect(app.config['DATABASE'])


@app.before_request
def before_request():
    """Before each request, connects to the database."""
    g.db = connect_db()


@app.teardown_request
def teardown_request(exception):
    """After each request, the database is disconnected."""
    db = getattr(g, 'db', None)
    if db is not None:
        db.close()


@app.route('/')
def show_entries():
    """The index page; what is presented when the user lands at the site. This is where the dashboard will be setup."""
    return render_template('index.html', open_weather_key=OW_KEY, location=LOCATION_ID)


if __name__ == "__main__":
    # if the database does not exist, initialize it
    if not os.path.isfile(DATABASE):
        init_db()
    app.run()

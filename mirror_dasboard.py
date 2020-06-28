from flask import Flask, request, session, g, redirect, url_for, abort, render_template, flash, Response
import sqlite3
from contextlib import closing
import os
from configparser import ConfigParser
from requests import get
import json
import yfinance as yf
from urllib.error import HTTPError
import sqlite3
import requests
import newspaper as newspaper
from configparser import ConfigParser
import os
from contextlib import closing
import datetime
from newspaper.article import ArticleException
from nltk import word_tokenize, pos_tag, ne_chunk, sent_tokenize, ne_chunk_sents


def extract_entity_names(t):
    entity_names = []

    if hasattr(t, 'label') and t.label:
        if t.label() == 'NE':
            entity_names.append(' '.join([child[0].title() for child in t]))
        else:
            for child in t:
                entity_names.extend(extract_entity_names(child))

    return entity_names


def entity_extractor(sentence):
    sentences = sent_tokenize(sentence)
    tokenized_sentences = [word_tokenize(sentence) for sentence in sentences]
    tagged_sentences = [pos_tag(sentence) for sentence in tokenized_sentences]
    chunked_sentences = ne_chunk_sents(tagged_sentences, binary=True)

    entity_names = []
    for tree in chunked_sentences:
        # Print results per sentence
        # print extract_entity_names(tree)

        entity_names.extend(extract_entity_names(tree))
    return entity_names


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

OW_KEY = config.get('OpenWeather', 'key')
LOCATION_ID = config.get('OpenWeather', 'id')
LOCATION_NAME = config.get('OpenWeather', 'name')
COUNTRY = config.get('OpenWeather', 'country')
LAT = config.get('OpenWeather', 'lat')
LON = config.get('OpenWeather', 'lon')

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


@app.route('/weather')
def weather():
    """"""
    return get(f'https://api.openweathermap.org/data/2.5/weather?lat={LAT}&lon={LON}&appid={OW_KEY}&units=metric').json()

@app.route('/garden')
def garden():
    return get('http://192.168.1.12:80', headers={'Accept': 'application/json'}).json()


@app.route('/stocks')
def stocks():
    """"""
    with open('stocks.json') as f:
        stocks = json.load(f)
        data = []
        for ticker in stocks['tickers']:
            try:
                ticker = yf.Ticker(ticker)
                stock_info = ticker.info
                stock_info['history'] = {
                    'label': [i.strftime("%b %d") for i in ticker.history(period='1mo').index.tolist()],
                    'data': ticker.history(period="1mo")['Close'].values.tolist()
                }
                data.append(stock_info)
            except (IndexError, HTTPError):
                app.logger.info(ticker, yf.Ticker(ticker).info)

    return json.dumps(data)


@app.route("/news")
def news():
    source = 'https://www.economist.com/'
    paper = newspaper.build(source, memoize_articles=False)
    articles = []
    for article in paper.articles:
        authors = None

        article.download()
        article.parse()
        if len(article.authors) > 0:
            try:
                authors = article.authors[0] + ", ".join(authors[1:])
            except (IndexError, AttributeError,TypeError):
                authors = article.authors[0]

        title = article.title
        published = article.publish_date
        if published is None:
            published = datetime.datetime.now()

        try:
            image = article.images.pop()
        except IndexError:
            image = None

        article.nlp()
        summary = article.summary
        keywords = entity_extractor(article.text)
        url = article.url
        location = None

        articles.append({
            'title':title,
            'published':published.strftime("%b %d"),
            'image':image,
            'summary':summary.split("\n")[:4],
            'keywords':keywords
        })
        if len(articles) >= 10:
            break

    return json.dumps(articles)


if __name__ == "__main__":
    # if the database does not exist, initialize it
    if not os.path.isfile(DATABASE):
        init_db()
    app.run()

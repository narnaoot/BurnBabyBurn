# Dependencies for web scraping
from bs4 import BeautifulSoup as bs
from splinter import Browser # Use splinter to automate browser actions
import requests

import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

## Data scrape:  pull latest fire
## commenting out due to trouble with heroku loading beautiful soup
## note: in order to restore, also modify the "/" route & the index page

# url_incident = "https://inciweb.nwcg.gov/feeds/rss/incidents/"
   
# r = requests.get(url_incident)

# soup = bs(r.text, "lxml-xml")
# title = soup.find_all("title")
# date = soup.find_all("pubDate")

# print("Latest Fire Information")
# title = title[1].text
# date = date[0].text

  

## Setting up flask routes



@app.route("/")
def index():
    """Return the homepage."""
    ## Note: add title=title, date=date for scrape
    return render_template("index.html")

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/1993")
def nineteennintetythree():
    return render_template("1993.html")

@app.route("/2008")
def twothousandandeight():
    return render_template("2008.html")

@app.route("/risk")
def risk():
    return render_template("risk.html")


if __name__ == "__main__":
    app.run()

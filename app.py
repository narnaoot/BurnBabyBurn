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





@app.route("/")
def index():
    """Return the homepage."""
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

if __name__ == "__main__":
    app.run()

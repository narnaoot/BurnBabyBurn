# Dependencies for web scraping
from bs4 import BeautifulSoup as bs
from splinter import Browser # Use splinter to automate browser actions
import requests

# Dependencies for data processing
import pandas as pd
import numpy as np

    ## Incident data

    
url_incident = "https://inciweb.nwcg.gov/feeds/rss/incidents/"
   
r = requests.get(url_incident)

soup = bs(r.text, "lxml-xml")
title = soup.find_all("title")
date = soup.find_all("pubDate")

print("Latest Fire Information")
print(title[1].text)
print(date[0].text)
    
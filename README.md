# BurnBabyBurn

After the summer of 2018, many people in California and around the US have been spending a lot of time thinking about wildfires.  We have questions:  Are they getting worse, as it seems?  If they’re getting worse, what is causing it?  There have been competing— and politicized— arguments— Fires are worse because fewer controlled burns are clearing out built-up undergrowth.  Because of climate change.  Because people are moving to remote areas that weren’t previously developed.  Everyone has an opinion, but data has been scarce.

We decided to fix that.  Our team decided to look at wildfires, and look at a huge number of climate change and human footprint factors, and see which factors actually matter.

First: finding the data.  We worked with a database of 1.88 million US fires— with a record for each fire, this database provides an enormous amount of data about each one.  We then looked for data on climate change and human footprint.  This data relies on surveys:  unlike the fire data, with a record for each fire over a period of years, our climate change and human footprint data is only available for certain years, and is a summary of the entire year. Based on the availability of survey data, we decided to compare two years:  1993 and 2008. 

The large shape of the project was beginning to come into view.  We would compare fires to human footprint and climate change factors in two years, 1993 and 2008.  This would give us the ability to look in two different arenas:  are fires getting worse?  And which factors are most predictive of fires?

At this point, the work split into several directions,  We wanted a website with interactive leaflet map showing fires for the two years, so that visitors could see and explore all the fires happening at that time.  And we wanted a machine learning component, to determine which factors were correlated with fires, and how influential each one was.  Finally, we chose a very ambitious stretch goal: we wanted to show a map of California, color-coded based on the factors— a risk map with the likelihood of fire color-coded across the entire state.

Our interactive map was built with leaflet, showing the two fire maps side-by-side: fires in 1993 and 2008.  We showed all fires greater then 100 acres, and used opacity of markers to indicate the size of the fire, with pop-up text giving the number of acres for each fire.

For the machine learning component, we used the maxent package, which shows positive correlation only,  generally used to correlate species with the different factors that might impact their ability to thrive.  This allowed us to produce two risk maps: one with positive factors (increasing the likelihood of fires)  and one with protective factors (inversely correlated with fires.)

## Project Components

#### Flask app:  
Used flask to create different pages and to pull scrape information into index page.
#### Leaflet map:  
Index page shows two leaflet maps with fire data for 1993 and 2008.  Opacity of markers indicates size of fire; popup shows acres for each fire.  Note:  additional layers showing human footprint and climate factors did not play nicely with leaflet; we were not able to combine these multiple layers on the same graph.
#### Factor correlation:  
1993 and 2008.html pages show summary of how different factors affected fire risk.
#### Risk map:  
map of California showing fire risk (based on components and how they affect risk) were created for 1993, 2008, and the future.  Note: due to limitations of size that cabn be pushed to github, these maps are not available on the repo.
#### Web scrape: 
Data on most recent fire pulled from incident site and displayed on index.html
#### Live web page through Heroku:  
burnbabyburn.heroku.com  Note:  Due to conflicts with beautiful soup and heroku, scrape does not show up on live site.  Due to limitations on size that can be pushed to github and heroku, risk map and images for 1993 and 2008 pages do not show up.

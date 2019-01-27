# +++++++++++++++++++++++++++++
# Fire Data Exploration 
# Environmental Data Extraction
# +++++++++++++++++++++++++++++

# Packages and Dependencies ----
library("DBI")
library("RSQLite")
library("FedData")                                        # Package to get data from USGS national hydrography dataset
library("raster")                                         # Package to get data from worldclim
library("rgeos")                                          # Package to work with geospatial data

# Database ----
connection = dbConnect(RSQLite::SQLite(), 
                       dbname="FPA_FOD_20170508.sqlite")

# Checking the list of tables available
table.list = dbListTables(connection)

# Creating a query
df = dbGetQuery(connection, 'select * from Fires')
df = subset(df, df$STATE == "CA")

# Too lazy and just picked it manually
df_truncated = df[,c(10,20,22,24,25,29,31,32,34,39)]
dr_truncated = na.omit(df_truncated)

# Convert from decimal minutes to decimal degrees (if needed)----
library(measurements) # Package to convert measurements
data$Latitude = measurements::conv_unit(data$Latitude, from = 'deg_dec_min', to = 'dec_deg')
data$Longitude = measurements::conv_unit(data$Longitude, from = 'deg_dec_min', to = 'dec_deg')

x = data.frame(x=df_truncated$LONGITUDE,y=df_truncated$LATITUDE)   # We're converting the coordinates into a spatial information
sp = SpatialPointsDataFrame(coords = x, data = x,
                            proj4string=CRS("+proj=longlat +datum=WGS84 +ellps=WGS84 +towgs84=0,0,0"))

# NOTE: US Federal Agencies use ESGS 4269
# THE CRS HAS TO MATCH
# +init=epsg:4269 +proj=longlat +ellps=GRS80 +datum=NAD83 +no_defs +towgs84=0,0,0 

# Let's fetch WorldClim data ----
bio = getData("worldclim", var="bio", res=10)           # We used the function getData to fetch "bio" variables from worldclim                   
bio = bio[[c(1:19)]]                                    # We're fetching 19 bio variables for temperature and precipitation
colnames(x)=c("longitude", "latitude")
values = (extract(bio,x))                               # We're saving the values
data=cbind.data.frame(df_truncated, values)
write.csv(data, "raw_fuego_data.csv")

# Venter et al. data on anthropogenic effects ----
# Note that I excluded lights cause I don't think it's ever important for what we do
HFP=raster("/Users/hasansulaeman/Google Drive/Modeling & Stats/HumFootprint/Maps/HFP2009.tif")
crop=raster("/Users/hasansulaeman/Google Drive/Modeling & Stats/HumFootprint/Maps/Croplands2005.tif")
built=raster("/Users/hasansulaeman/Google Drive/Modeling & Stats/HumFootprint/Maps/Built2009.tif")
navwat=raster("/Users/hasansulaeman/Google Drive/Modeling & Stats/HumFootprint/Maps/Navwater2009.tif")
popden=raster("/Users/hasansulaeman/Google Drive/Modeling & Stats/HumFootprint/Maps/Popdensity2010.tif")
road=raster("/Users/hasansulaeman/Google Drive/Modeling & Stats/HumFootprint/Maps/Roads.tif")
rail=raster("/Users/hasansulaeman/Google Drive/Modeling & Stats/HumFootprint/Maps/Railways.tif")
pasture=raster("/Users/hasansulaeman/Google Drive/Modeling & Stats/HumFootprint/Maps/Pasture2009.tif")
anthro=stack(HFP, crop, built, navwat, popden, road, rail, pasture)
ay=extract(anthro, sp)
data=cbind.data.frame(data, ay) # Adding the retrieved data into the data frame
# Tackr ⛵

Tackr is an informative web app designed for people interested in boating or sailing on the Great Lakes of North America. It aggregates data from Open Meteo and National Oceanic & Atmospheric Association (NOAA) stations to help you plan nautical excursions.

There are several monitoring stations located around the coasts of the Great Lakes, but certain locations may not have perfectly accurate information due to the limited number of stations available.

## Disclaimers

NOAA Great Lakes stations do not yet have the capability to predict water levels for the future, so while this information would be relevant and helpful, it is not currently available. All historical data for water levels is marked as preliminary and is not certified by the NOAA, and should be used with caution. See [this page](https://tidesandcurrents.noaa.gov/waterlevels.html?id=9087031) for example details

## Data Sources

-   [NOAA](https://tidesandcurrents.noaa.gov/web_services_info.html) for stations list and Great Lakes marine data
-   [Open Meteo](https://open-meteo.com/) for atmospheric and air quality data
-   [stellasphere/descriptions.json](https://gist.github.com/stellasphere/9490c195ed2b53c707087c8c2db4ec0c) for WMO weather code images

## Notable Third-Party Libraries Used

-   [Leaflet](https://leafletjs.com/) for interactive maps
-   [tz-lookup](https://www.npmjs.com/package/tz-lookup) to retrieve timezones from latitude/longitude coordinates
-   [TanStack/react-charts](https://github.com/TanStack/react-chartshttps://github.com/TanStack/react-charts) for water level charts. Despite limitations in chart axis control in the v3 beta, I've still decided to use this due to its lightweight size and solid TypeScript/React support

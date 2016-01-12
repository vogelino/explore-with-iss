#### Installation
```
git clone https://github.com/vogelino/explore-with-iss.git
cd explore-with-iss
npm install
```

#### Use
Run `gulp` and open `http://localhost:3000`

---

# Explore with the International Space Station

This live data visualization was done at the course [“Input Output - Introduction to process-oriented design”]( https://fhp.incom.org/workspace/6176) supervised by [Fabian Morón Zirfas]( http://fabianmoronzirfas.me/).

This project based itself on the statement:

> The ISS travels fast around the globe, visiting numerous countries more often than you will never be able to.

The result is a web experiment offering the possibility to:

> Follow the ISS and learn about the countries it _flies_ over.

This web app shows the ISS at its live position mapped on earth. When the iss flies over a country:
- The **Borders** of this country are highlighted
- A sidebar appears with following informations
  - **Flag, Name and native name** of the country
  - **General country information**
    - Capital
    - Population
    - Area
    - Language(s)
    - Gini index
    - Currency(ies)
    - Timezone(s)
    - Calling prefix(es)
    - Top level domain(s)
  - **Pictures** taken of this country by the **ISS**
    -- The pictures are also geo-located on the map
  - **Hot news** related to this country

This allows the user to travel and explore countries side by side with the ISS.

The following (initially planned) feature and information-display could not be implemented yet:
– Showing the **Next overflight** that will happen over the country.
– Implementing a **_pause_ feature** that would allow the user to stay on the country and let the ISS fly further and then catch it up later on.

As additional fancy feature, the color of the links and borders are country-specific as they are based on the flag color.

## The tech part

This project is split in two repositories:
- The Front-end client (this one), which application's structure is build with Redux and react, allowing the use of a single and declarative App state.
- [The API Back-end](https://github.com/vogelino/explore-with-iss-api) was used to wrap other external APIs, to load and process file based datasets and GEOjson files.

## See it in movement
[<img src="http://demo.vogelino.com/explore-with-iss/play.png" alt="Looking for every country manually"/>](https://vimeo.com/148945877)

## Gallery
<img src="http://demo.vogelino.com/explore-with-iss/SearchForPhotosByCOuntry2.png" alt="Looking for every country manually"/>
To find all images concerning countries all around the world, I had to manually include all of the in the search field of the [_Gateway to Astronaut Photography of Earth_](http://eol.jsc.nasa.gov/) and then import the results with [import.io](https://www.import.io/)

<img src="http://demo.vogelino.com/explore-with-iss/state1.png" alt="First prototype"/>
First prototype

<img src="http://demo.vogelino.com/explore-with-iss/state2-australia.png" alt="Iss view of australia"/>
A view of Australia (I.e. There's no pictures available for this country)

<img src="http://demo.vogelino.com/explore-with-iss/state3-newzealand.png" alt="Iss view of New Zealand"/>
A view of New Zealand (As we see, the links and borders are always different, picking a vibrant color of the flag for it)

<img src="http://demo.vogelino.com/explore-with-iss/state4-russia.png" alt="Iss view of Russia"/>
A view of Russia, one of the most photographed country

<img src="http://demo.vogelino.com/explore-with-iss/state4-russia-slideshow.png" alt="Iss view of Russia - Image slideshow"/>
Open the slideshow to look at the pictures in large size

<img src="http://demo.vogelino.com/explore-with-iss/state5-brazil.png" alt="Iss view of Brazil"/>
Many time lapses were taken from Brazil

<img src="http://demo.vogelino.com/explore-with-iss/state6-turkey.png" alt="Iss view of Turkey"/>
Look at the correspondence between the dot on the map and the picture

<img src="http://demo.vogelino.com/explore-with-iss/state6-turkey-slideshow-loading.png" alt="Iss view of Turkey - Image slideshow - Loading"/>
When the image loads it appears blurry and a tiny animated loading icon is displayed

<img src="http://demo.vogelino.com/explore-with-iss/state6-turkey-slideshow.png" alt="Iss view of Turkey - Image slideshow"/>
Some pictures are really impressive


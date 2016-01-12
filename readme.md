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
    -- The pictures are also geolocated on the map
  - **Hot news** related to this country

This allows the user to travel and explore countries side by side with the ISS.

The following (initially planned) feature and information-display could not be implemented yet:
– Showing the **Next overflight** that will happen over the country.
– Implementing a **_pause_ feature** that would allow the user to stay on the country and let the ISS fly further and then catch it up later on.

As additional fancy feature, the color of the links and borders are country-specific as they are based on the flag color.

## The tech part

This project is splitted in two repositories:
- The Front-end client (this one), which application's structure is build with Redux and react, allowing the use of a signle and declarative app state.
- [The API Back-end](https://github.com/vogelino/explore-with-iss-api) was used to wrap other external APIs, to load and process file based datasets and GEOjson files.

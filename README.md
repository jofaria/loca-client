# LOCA: Slow Fashion

## Introduction

Welcome to LOCA, a website that helps you find sustainable and responsible fashion stores near you. 

From cruelty-free items, to recycled and organic materials, the stores featured in the website tick one or more boxes of ethical fashion.


**Live: [LOCA - Slow Fashion](https://loca-slow-fashion.netlify.app/)**


## Background 

This project was born of my personal interest and previous [academic research](https://journals.sagepub.com/doi/abs/10.1177/02761467211054836) in socially responsible consumption.

It aims to facilitate and promote local, slow fashion consumption, a more sustainable alternative to fast fashion.

## Features
- Discover stores by locations on a map.
- Browse a world map and view details of each store with pop-ups.
- Search for stores by location (e.g., city, street name).
- Signup and Login with password encryption.
- Register a store  (requires authentication and authorization):
    - Add store name, description and location;
    - Upload a store logo (or use default image);
    - Add links to the store's website and/or instagram.
- Profile page to manage your registered stores:
    - Edit current store information.
    - Delete store.
    - Logout.

## Routes
- Home: `https://loca-slow-fashion.netlify.app/`
- Store Details: `https://loca-slow-fashion.netlify.app/:store-id`
- Signup: `https://loca-slow-fashion.netlify.app/signup`
- Login: `https://loca-slow-fashion.netlify.app/login`
- Register Store: `https://loca-slow-fashion.netlify.app/register-store`
- Profile: `https://loca-slow-fashion.netlify.app/profile`
- Edit Store: `https://loca-slow-fashion.netlify.app/edit/:store-id`


## Tech Stack

- MERN stack:
    - MongoDB
    - ExpressJS
    - ReactJS
    - NodeJS
- Mongoose
- Mapbox API
- Geocoder API
- Axios
- React Bootstrap
- JavaScript
- CSS3
- JSX



## Future Iterations
- Implement a tag system to filter stores (e.g, recycled materials, cruelty-free materials, made locally, made ethically, etc.)
- Implement a photo gallery section to display store products.
- Add an ecommerce feature.

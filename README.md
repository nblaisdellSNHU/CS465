# CS465

## Travlr
This repository is a project that walks through using ExpressJS and Angular to create a front-facing website, a backend API, and a Single-Page application (SPA).
Each branch shows the work that was done that week to further the progress on the entire project. 

Select a particular branch (module) to see the code and code changes.

## Journal

For this project, there were two main elements which made up the "front-end" part of the full-stack project:
  1. The "front-facing" customer website, for visitors wanting to book trips through Travlr can visit
  2. The "administrative" SPA (single-page application) built in Angular, which is meant for employees of Travlr to utilize, so they can add/edit trips in their Travlr system

For the front-facing website, it was more of a traditional website build, in which we use HTML/CSS to build the UI, while also making use of a templating engine (Handlebars) in order to make rendering HTML based on certain data elements much simpler. We did also make use of NodeJS as the JavaScript runtime and ExpressJS as the library which allowed us to create a server and return HTML responses back to the user, creating the experience of a website.

For the SPA, we made use of Angular, which is a bit more heavy-weight, but also allows us to create the site experience using "components", which are re-usable parts of the UI that can be referenced throughout the rest of the application. This can make the "separation of concerns" issue much easier to work with, and allows us to make our changes for a particular element on our site, and have every section updated at the same time. There are also many different libraries that can be used in conjunction with Angular for working with data within the app much easier.

The backend also used ExpressJS, and all the endpoints were hosted on a separate URL "/api", to denote it from the rest of the site. For storing the data, we used MongoDB, a NoSQL database which is perfect for a JavaScript application, since the data format of MongoDB is the same as the data format that is used throughout JavaScript, making it a perfect fit. The backend API would be where the interaction with the database would take place, so the consumers of the API (the SPA, or any other app) wouldn't have to think about interacting with the database directly. There is also another benefit, which is that the database could be changed in the future and consumers of the API wouldn't have to make any changes, assuming that the functions defined didn't changed, only the implementation of those functions.

There were multiple instances where we were able to refactor our code to make it more re-usable, and also easier to use. When making the SPA, we were able to use components to achieve two main goals: Have a re-usable component for our "TripCard", so we could pass data into the component and render it conditionally based on those contents. The other goal was simplicity, allowing our main component to reference a navbar, rather than having all of the code for the navbar directly in the main module. 

As more layers are added to our applications, the difficulty in adding security at each of those layers increases, as well. As a result, we need to make sure that security is part of our design when creating these applications, to make sure that all bases are covered. The inclusion of automated testing also becomes vitally important as our applications become larger, too.

As somebody that is searching for a job in full stack development, this project and class was perfectly aligned with those goals. As I continue to progress my skills in Angular, other web frameworks, and web development in general, I will continue to be an asset in my field.

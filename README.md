# DANNY CARMEN - FINAL CAPSTONE PROJECT

[TASTABLE](https://ddc-tastable.herokuapp.com/)

My capstone project is a recipe site called Tastable, with a layout and flow inspired by Pinterest. A guest can view the recipes that have been uploaded by other users, or choose to register themselves as a user. Users can upload recipes to the site. Users can view just the recipes that they have uploaded, and can choose to edit or delete a recipe if desired.

The front end was developed in React, and styling done in SCSS. The backend was developed using Node.js and Express, with a MongoDB Atlas database. All of the data in the database (recipes, users, and sessions) is stored in JSON format, with the exception of the images, which are uploaded directly from the site to an Amazon S3 account. The frontend reaches the backend through API requests made with Axios.

I utilized Github for version control, and also push my code directly from Github to Heroku, where the site is hosted.

A requirement of the project was to apply a feature or language that was not taught in the course. I chose to develop my backend in Node.js, partially to fulfill this requirement, but also because it seems to be an incredibly popular backend language in the research that I have done. There were also several features that I implemented that were not taught in the course, namely user authentication (via sessions), and search functionality.

Please feel free to make an account on the site and upload a recipe if you wish. All of the images were taken from the copyright-free image site [Unsplash](https://unsplash.com/), so if you don't have a great image of the recipe you are uploading, you can look for one there. All the recipes are some of my family's favorites, so also feel free to try one out!

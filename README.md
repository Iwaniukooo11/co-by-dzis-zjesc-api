
# Co by dziś zjeśc API

Backend of my mobile-app called "Co by dziś zjeść"

Unfortunately, because of server costs and lack of time, I had to remove my app from Google Play. 

You may be interested in [Frontend of "Co by dziś zjeść" App](https://github.com/Iwaniukooo11/co-by-dzis-zjesc-app)

Used technologies:
 - admin-bro (as CMS)
 - express
 - bCrypt 
 - mongoose
 - MVC pattern


Note, that because of production problems: 
- app.js is an equalivment of server.js
- main.js is an equalivment of app.js 


 Run a server:
 ```
 npm start
 ```
 Develop
 ```
 npm run start:dev
 ```

 Features:
 - CRUD operations
 - Returning a proposition of meal which contains ingredients passed in the request
 - Basic authorization. Request must come centrainly from mobile app, because then it contains neccessary header
 - Saving stats of requested ingredients and given meal



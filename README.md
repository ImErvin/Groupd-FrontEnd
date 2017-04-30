# Groupd Web Application
##### By Ervin Mamutov

### Introduction
Groupd was developed as my end of year project for Third Year Software Development. The aim of this project was to combine the knowledge I gained over the three years of college and develop an application using new technologies. This is the design document for the web application. There are three parts to Groupd, the web application, the RESTful API and the mobile application. Groupd was developed by [Tara O'Kelly](https://github.com/taraokelly) and me. I was responsible for developing the web application, while Tara was responsible for the mobile application. We both designed a common RESTful API that both of our applications use to store and retrieve data.

The idea behind Groupd was to design a social network for start up projects, where users can list or join projects that have vacant positions.

## Architecture

### Planning Phase
I wanted to create a challenging single page webapplication. A webapplication that multiple users can use at once. The functional idea was to make efficient use of a RESTful API to store and represent data all while providing a very good user experience and user interface. Styling was very important to me too.

#### *Technologies Considered*
  * ##### LAMP Stack
    LAMP Stack stands for Linux, Apache, MySQL, PHP/Python/Perl. Stack basically refers to developing a full-stack application (back-end and front-end) using complimentary frameworks/libraries/databaes. LAMP stack showed to be very stable and popular but due to it's decreasing community I decided against it and decided to learn a more up and coming technology.
  * ##### MEAN Stack
    MEAN Stack stands for MongoDB, ExpressJS, Angular, Node.js. This stack is written completely in Javascript or Javascript preprocessors (Angular2 with TypeScript). MEAN stack showed to be very fast and has a rapidly increasing community. I decided to develop in the MEAN stack because I've enjoyed developing with Javascript and wanted to work with a noSQL database like mongodb.
  * ##### Bootstrap
    Bootstrap is a styling framework. I considered using Bootstrap 3.x but decided to use Bootstrap 4.x because it was newer and I wanted to experiment with it.
    
#### *Technologies Used*
##### *Back End*
The back end uses Mogoose, ExpressJS and MongoDB to provide a RESTful API to query the database. More information on the back end is found here.. [Groupd Back End](https://github.com/imervin/groupd-backend)

##### *Front End*
The front end uses ExpressJS and AngularJS with Bootstrap.

  * ##### Express JS
    Express.js, or simply Express, is a web application framework for Node.js, released as free and open-source software under the MIT License. It is designed for building web applications and APIs. It is the de facto standard server framework for Node.js.[1] I use express on the front end to serve a static index.html file. I previously used Python's Flask to serve my index page but decided that If I was going to use express throughout the project, I should keep the consistency and learn how to use express to serve files. My express file sets up a single root ('/') and serves my index.html file from it. I use Angular to take over from there and hande the routings using ngRoute.
    
  * ##### Angular JS
    AngularJS (commonly referred to as "Angular.js" or "AngularJS 1.X") is a JavaScript-based open-source front-end web application framework mainly maintained by Google and by a community of individuals and corporations to address many of the challenges encountered in developing single-page applications. The JavaScript components complement Apache Cordova, the framework used for developing cross-platform mobile apps. It aims to simplify both the development and the testing of such applications by providing a framework for client-side model–view–controller (MVC) and model–view–viewmodel (MVVM) architectures, along with components commonly used in rich Internet applications.[2]
    
    I used Angular to handle my whole front end. I decided to use Angular 1.X instead of the new Angular2 because though I've used angular before in previous projects ( [SecretMessage](https://github.com/ImErvin/SecretMessage) ), I didn't use it to it's full potential and felt I couldn't leave that book unfinished before proceeding to Angular2.
    
    I used ngRoute to handle all the routings for my application. ngRoute provides the $routeProvider function that let's you create routes and ties a view and a controller to that route, it also injects that view into the ng-view tags meaning you could have a static header/footer and a dynamically changing body (Single Page Webapplication). I have never worked with ngRoute before and once I got the hang of it, I was surprised at how quick navigation was between pages. 
    
    I followed a strict MVC design pattern, where I separated each view, controller and factory to do specific things i.e: the home page view had a home page controller and user page view had a user page controller that was using functions declared in my user page factory. I divided my factories into different logic layers, I tried to minimize the amount of replicated code into reusable functions in my factories that I could call from controllers. I found myself reusing API calls frequently within my factories, so I made a factory to handle all HTTP logic functions and referenced those functions in my other factories.
    
  * ##### Bootstrap
    Bootstrap is a free and open-source front-end web framework for designing websites and web applications. It contains HTML- and CSS-based design templates for typography, forms, buttons, navigation and other interface components, as well as optional JavaScript extensions. Unlike many web frameworks, it concerns itself with front-end development only. [3]
    
    I used Bootstrap as a CSS library. Previously I had worked with Bootstrap 3, but decided to use Bootstrap 4 for this project. I choose Bootstrap because it's a very popular styling framework and I really enjoyed using it before. Bootstrap 4 was a little difficult to get used to at the start because I assumed the class names were similar to that of bootstrap 3, but after some documentation research I got the hang of it.
    
### Design

#### MVC Design
AngularJS promotes the MVC design pattern and I made sure to make use of that. As I mentioned above I divided my controllers,views and factories into layers. I thought about *what kind of factories and controllers would I need?*

##### Factories
  * ##### API Factory
    The API factory is a set of HTTP requests that returned promise objects. Each HTTP request has a function that was called from other factories. As I mentioned before the reason for separating the HTTP requests from the other factories was so I could reuse code and maintain my front-end / back-end connectivity in one place i.e if the URL for the API changed, I would only have to change it in the API factory instead of locating my HTTP requests in other factories/controllers etc.
    
  * ##### Authentication Factory
    My authentication factory is used to store a cookie and provide getters and setters for that cookie. The reason for encapsulating the cookie was to save from importing ngCookies into every factory/controller that had to use the cookie and to ensure no other factory/controller could set the cookies value unless it calls the setCookie function.
    
  * ##### User and Project Factories
    These factories are used as a bridge between the API factory and controllers. I felt this was a logical move in encapsulating the API factory, I wanted the API factory to work as a service for services.
    
##### Controllers
There are 10 controllers on my front end. My logic behind each controller was to allocate a seperate controller to each view. The controllers act as a bridge between the factories and the views while adding extra error handling logic i.e you cannot edit a project to have 3 available positions, when there are already 4 members in the project. 

#### Visual Design
There are 10 views one for each route.


### References
[1] Wikipedia - [Express.js](https://en.wikipedia.org/wiki/Express.js)
[2] Wikpedia - [AngularJS](https://en.wikipedia.org/wiki/AngularJS)
[3] Wikipedia - [Bootstrap](https://en.wikipedia.org/wiki/Bootstrap_(front-end_framework))

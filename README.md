# Groupd Front End
##### By Ervin Mamutov

<p align="center">
  <img src="https://github.com/ImErvin/Groupd-FrontEnd/blob/master/static/images/mainLogo6.png?raw=true" />
</p>

### Introduction
Groupd was developed as my end of year project for Third Year Software Development. The aim of this project was to combine the knowledge I gained over the three years of college and develop an application using new technologies. This is the design document for the web application. There are three parts to Groupd, the web application, the RESTful API and the mobile application. Groupd was developed by [Tara O'Kelly](https://github.com/taraokelly) and me. I was responsible for developing the web application, while Tara was responsible for the mobile application. We both designed a common RESTful API that both of our applications use to store and retrieve data.

The idea behind Groupd was to design a social network for start up projects, where users can list or join projects that have vacant positions.

### System Requirements
###### *assuming you have the [back-end](https://github.com/imervin/groupd-backend) installed correctly*
To run this application you'll need any operating system with [Node.js](https://nodejs.org/en/download/) installed. You will need bower and a local clone of this repository.

### Installation
1. Install Node.js
2. Open your operating systems command prompt
3. Ensure the node.js is working, if there is an error, make sure that step 1 is installed correctly.
   ```Bash
   npm -v
   ```
4. Install bower through npm.
   ```Bash
   npm install -g bower
   ```
5. Clone this repository to any folder on your local machine.
   ```Bash
   mkdir groupd
   
   cd groupd
   
   git clone https://github.com/ImErvin/Groupd-FrontEnd.git
   ```
6. Install packages and componenets.
   ```Bash
   npm install
   
   bower install
   ```
7. Run the front end
   ```Bash
   node server.js
   ```
8. Connect to the server on localhost:5000 or http://127.0.0.1:5000
9. Run the back-end to allow login/signup functionality.

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

##### *Developing Enviroment*
  * ##### NPM
    NPM is a package manager that runs with node.js. It's a gateway to installing, updating and uninstalling packages available to node.js.
    
    I used NPM to install all necessary directives in my package.json, these include express.js to host my static index.html.
  * ##### Bower
    Bower is a component manager that runs with node.js to install components for front end such as AngularJS, Bootstrap etc.
    
    I used bower to install all necessary components in my bower.json, these include AngularJS, Bootstrap and jquery.
### Design

### Screen Layout
#### Prototypes
These prototypes are built in [Axure RP](https://www.axure.com/).
##### Main Page
![Main Page](http://image.prntscr.com/image/c2a8b3b6a7e748b19b3c51cf02d9ad55.png "Main Page")
##### Form Input Pages
![Input](http://image.prntscr.com/image/3c064c963e814c7786a8eadb8d3de378.png "Input")
##### Profile and Project Pages
![Page](http://image.prntscr.com/image/58b9f8c53d634f439b53fd3fbe17ddef.png "Page")
##### Search
![Search](http://image.prntscr.com/image/7776b0ab6ff74211a14f1c2f9c67f934.png "Search")

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

#### Views
There are 10 views one for each route. Each view represents a "template" for webpages, these templates are either populated with data from the API using ajax http requests or post data to the API that will be represented in another template. Each template has it's own controller as mentioned above, and each controller is responsible for providing functions to display or manipulate data. I use Angulars ngBind and ngModel directives to bind data to HTML elements.

### Functions
 * Login (With handling for incorrect password)
 * Signup (With handling for duplicated username and empty forms)
 * Cookie based authentication 
 * Create Project (With handling for empty forms)
 * View Projects
 * Edit Project (With handling for the project creator and cannot set available positions less than current member count)
 * Delete Project (With handling for the project creator)
 * Add a member to Project (With handling for if the user is already a member and if there are too many members in your project already)
   * Seperate search function to find a user by username
 * Remove a member (With handling for if you're trying to remove the project creator)
 * Comments section in projects
 * Bookmark a Project
 * Edit Profile (With handling for the owner of the profile)
 * Search Project (by name or project tags)
 * Search Users (by username, location, first name, surname, occupation, skills)

### Limitations and Known Bugs
The main limitation was time, there were a lot of other features that I would have loved to add but time was limited.

There are a couple of minor bugs.
 * After 30 minutes, the cookie expires.
 * After 30 minutes, the cookie expires and the header doesn't update untill you reload the page.
 * The email doesn't get verified.
 * Star rating on profiles does not work.
 * Message button on profiles does not work.

### Future Development
As I mentioned above, there are quite a few different features I would like to add in the future.

* A rating system, the front end currently displays 5 stars on each profile, but future development will allow users to rate each other out of 5 stars. The foundation for this is set out in the front end and back end, the schema is storing blank values for ratings.
* A messenger system, the front end currently displays a "message" button on users profiles but has no functionality. Future development will allow users to IM eachother.
* Implement githubs api to populate a users "github card".

### Conclusion
The technologies I used were very interesting and I learned a lot. After doing this project I confidently say I have a very good understanding of AngularJS and it's best practises. I improved my understanding of node.js and how packet managers work and will definitely be using packet managers for every project. Bootstrap 4 really helped out in making the website responsive and it was relitevely easy to use.

If I were to do this project again, I would consider using angular2 instead of angularjs because it's a newer technology. Because the project is heavy on the styling aspect, I would use SASS or LESS instead of CSS. All in all it was a great learning experience.

### Screenshots of the application
#### Main Page
![Main Page](http://image.prntscr.com/image/28780fd1f84549d48c69bd60cbd50403.png)
#### Home Page
![Home Page](http://image.prntscr.com/image/8fe3349203de43428ff4d97208a160a6.png)
#### Current user's - Profile Page
![Profile Page](http://image.prntscr.com/image/20932916782f4bd78ab591bd74b11552.png)
#### Not current user's - Profile Page
![Nonauth Profile Page](http://image.prntscr.com/image/570d58aa6b404f20a54e57be8e04f0a9.png)
#### Project creator - Project Page
![Creator](http://image.prntscr.com/image/3ede117c946d4d77b8ec655561ab7e92.png)
#### Not the project creator - Project Page
![Project page](http://image.prntscr.com/image/2cbbc6d653684bb48dd00518c0333713.png)
#### Edit Project - Form Page
![Edit Project](http://image.prntscr.com/image/373100010e5b4ab8b5b482b7e410ae04.png)

### References
[1] Wikipedia - [Express.js](https://en.wikipedia.org/wiki/Express.js) <br/>
[2] Wikpedia - [AngularJS](https://en.wikipedia.org/wiki/AngularJS) <br/>
[3] Wikipedia - [Bootstrap](https://en.wikipedia.org/wiki/Bootstrap_(front-end_framework))

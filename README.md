##  Coursework Template ##
### CM2040 Database Networks and the Web ###

#### Installation requirements ####

* NodeJS 
    - follow the install instructions at https://nodejs.org/en/
    - we recommend using the latest LTS version
* Sqlite3 
    - Windows users: follow instructions here https://www.sqlitetutorial.net/download-install-sqlite/
    - Mac users: it comes preinstalled
    - Linux users: use a package manager eg. apt install

To install all the node packages run ```npm install``` from the project directory

#### Help with node SQLite3 ####

A few aspects SQLite3 work a little differently to mySql but all of the key concepts are the same

Find the API documentation at:
https://github.com/TryGhost/node-sqlite3/wiki/API

Find node SQLite tutorials at:
https://www.sqlitetutorial.net/sqlite-nodejs/
This also a good resource to find examples and tutorials around SQLite queries


#### Using this template ####

This template sets you off in the right direction for your coursework. To get started:

Run ```npm run build-db``` to create the database (database.db)
Run ```npm run start``` to start serving the web app (Access via http://localhost:3000)

You can also run: 
```npm run clean-db``` to delete the database before rebuilding it for a fresh start

##### Next steps #####

* Explore the file structure and code
* Read all the comments
* Try accessing each of the routes via the browser - make sure you understand what they do
* Try creating ejs pages for each of the routes that retrieve and display the data
* Try enhancing the ```create-user-record``` page so that you can set the text in the record 
* Try adding new routes and pages to let the user create their own records

##### Creating database tables #####

* All database tables should created by modifying the db_schema.sql 
* This allows us to review and recreate your database simply by running ```npm run build-db```
* Do NOT create or alter database tables through other means


#### Preparing for submission ####

Make a copy of this folder
In your copy, delete the following files and folders:
    * node_modules
    * .git (the hidden folder with your git repository)
    * database.db (your database)

Make sure that your package.json file includes all of the dependencies for your project NB. you need to use the ```--save``` tag each time you use npm to install a dependency

#### Getting started with my project ####

Edit this section to include any settings that should be adjusted in configuration files and concise instructions for how to access the reader and author pages once the app is running.

NB. we will ONLY run ```npm install```, ```npm run build-db```, and ```npm run start``` . We will NOT install additional packages to run your code and will NOT run additional build scripts. Be careful with any additional node dependencies that you use.

--- 
##  How to access the reader and author pages <mark>(Updated)</mark> ##
####  Instructions for how to access the reader and author pages once the app is running ####
1. The website strucutre should be as include the following page.
    * Home
        * Reader Home page
        * Author Home page
    * Author Edit (or Create) page
    * Author Settings page
    * Reader Article page

2. The root page would be ```/reader/home/``` as demonstrated by Simon

3. The following are the instruction guide for browsing all pages:
    * Author Home page
        1. Click on the top left button 'Home', select and click 'Author Home'.
        2. It should display the blog title, subtitle, and author name
        3. Display 2 following list if more then one item exists, otherwise display no content provided.
            - Draft Articles
            - published articles
        4. both types of articles have slightly different actions provided.
            * Draft Articles
                - display useful information about the articles such as title, subtitle, when they were created and last modified
                - provided actions are edit, publish and remove.
            * published articles
                - display useful information about the articles such as title, subtitle, when they were created and last modified,
                - besides it also display the number of likes, published date.
                - provided actions are edit, share and remove.

    * Author Edit (or Create) page
        1. This is the page where author can edit existing or create new article
        2. User can input or amend the following input fields and controls:
            - Article title
            - Article subtitle
            - Article Content
        3. In edit mode, the form should be populated with the current article data
        4. The last modified date will be update every once article is updated.
        5. It has a back button to redirects Reader Home page

    * Author Settings page
        1. Click on the top left button 'Settings'.
        2. This is where the Author can change the blog title , subtitle and author name.
        3. On the top right hand corner, it indicates that this is the settings page
        4. User can input or amend the following input fields and controls:
            - Author name
            - Blog title
            - Blog subtitle
        5. In edit mode, the form should be populated with the current settings data
        6. The Form validation is implemented to check whether the field is empty
        7. Once submit, it will redirect to Author Home Page.
        8. It has a back button to redirects Author Home Page.

    * Reader Home page
        1. Click on the top left button 'Home', select and click 'Reader Home'.
        2. It should display the blog title, subtitle, and author name
        3. Display a list of published articles iF more then one exists, otherwise display no content provided.
        4. Articles are ordered by publication date with the latest publication appearing
        5. Click on the item in the list will take you to the article detail page.

    * Reader Article page
        1. This is the detail page of the Article
        2. It should display the blog title, subtitle, and author name
        3. It should display information about the article including: article title and subtitle, Content, publication date, number of likes, etc.
        4. User can click likes button to react with the article.
        5. User can also leave comment to the article, once submit it will reload the page.
        6. User can see the comments provided by others on the bottom of 'leave comment' form ordered by the created date.
        7. It has a back button to redirects Reader Home page








##  Blogging Tool ##
### <u>Introduction</u> ###
* This template is a project of my very first Node.js blogging tool.
* On the client side we have .ejs files, custom css, js files,
* On the server side we have express.js, sqlite3
* Pages you can interact with:
    * Home - display the draft / puiblished blog articles list,
        for author, they can create, edit or remove an article here.
    * Author Edit (or Create) page - this is where author actually update the article 
    * Author Settings page - provide a settings pages to update common components eg: blog title, sub title, etc>
    * Reader Article page - the detail page, display all the information of the article, other usering can interact this articles with like buttons and leaving a comments here.
* Operation Flow:
    * Reader (user) 
        *  Home (page) 
            * Article (publishded pages)
                * likes / Comments (action)
    * Author (user)
        * Home (page)
            * Create / Publish / Edit / Remove (action)
            * Article (publishded pages)
                * likes / Comments (action)
        * Setting (page)
---

### <u>Using this template </u> ###
1. Run ```npm install``` to install all dependencies we needed for this project.
2. Run ```npm run build-db``` to create the database (database.db) with sample data (you can remove it from db_schema.sql or by interacting with pages)
    * You can also run:  ```npm run clean-db``` to delete the database before rebuilding it for a fresh start
3. Run ```npm run start``` to start serving the web app (Access via http://localhost:3000)
--- 

### <u> How to access the reader and author page </u> ###
####  Instructions for how to access the reader and author pages once the app is running ####
1. The website strucutre should be as include the following page.
    * Home
        * Reader Home page
        * Author Home page
    * Author Edit (or Create) page
    * Author Settings page
    * Reader Article page

2. The root page would be ```/reader/home/```.

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

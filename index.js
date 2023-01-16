const express = require('express');
const app = express();
const port = 3000;
const sqlite3 = require('sqlite3').verbose();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

const NodeCache = require("node-cache");
global.myCache = new NodeCache();


//items in the global namespace are accessible throught out the node application
global.db = new sqlite3.Database('./database.db', function (err) {
  if (err) {
    console.error(err);
    process.exit(1); //Bail out we can't connect to the DB
  } else {
    console.log("Database connected");
    global.db.run("PRAGMA foreign_keys=ON"); //This tells SQLite to pay attention to foreign key constraints
  }
});
//set the app to use ejs for rendering
app.set('view engine', 'ejs');

//this adds all the userRoutes to the app under the path /user
app.use('/author', require('./routes/author'));
app.use('/reader', require('./routes/reader'));
app.use('/css', express.static('./assets/css'));
app.use('/js', express.static('./assets/js'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/', (req, res) => {
  res.redirect('/reader');
});

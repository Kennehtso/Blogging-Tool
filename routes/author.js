const express = require("express");
const router = express.Router();
const assert = require('assert');
const Helper = require('./helper.js');
const helper = new Helper();

router.get("/", (req, res) => {
  res.redirect("/author/home");
});

/**
 * Route serving Author Home page.
 * @name get/home
 * @function 
 * @inner 
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @returns {object} - Returns a render of the Author Home page
 */
router.get("/home", (req, res, next) => {
  if (!global.myCache.has('settings')) {
    helper.getSettings();
  }
  // DB Interaction : get all articles from the Articles table and order them by last modified date descending order
  let sqlquery = "SELECT * FROM Articles ORDER BY article_last_modified_date DESC";
  global.db.all(sqlquery, function (err, rows) {
    if (err) {
      next(err);
    } else {
      // console.log("Show Author Home page");
      let settings = global.myCache.get('settings');
      res.render("home", {
        user: { type: "Author", name: settings.author_name, blogTitle: settings.blog_title, subTitle: settings.blog_subtile },
        draft_articles: rows.filter(row => row.article_state <= 0),
        published_articles: rows.filter(row => row.article_state > 0)
      });
    }
  });
});

/**
 * Route serving Settings page.
 * @name get/settings
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @returns {object} - Returns a render of the Settings page
 */
router.get("/settings", (req, res, next) => {
  if (!global.myCache.has('settings')) {
    helper.getSettings();
  }
  // DB Interaction : get all data from the Settings table
  let sqlquery = "SELECT * FROM Settings";
  global.db.all(sqlquery, function (err, row) {
    if (err) {
      next(err);
    } else {
      // console.log("Show settings page");
      let settings = global.myCache.get('settings');
      res.render("settings", {
        user: { type: "Settings", name: settings.author_name, blogTitle: settings.blog_title, subTitle: settings.blog_subtile }
      });
    }
  });
});

/**
 * Route serving update settings form.
 * @name post/update-settings
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @returns {object} - Returns a render of the Author Home page
 */
router.post("/update-settings", (req, res, next) => {
  // DB Interaction : update the Settings table with the new values from the form
  let sqlquery =
    "UPDATE Settings SET 'blog_title' = ?, 'blog_subtile' = ?, 'author_name' = ?;";
  global.db.run(
    sqlquery, [req.body.blog_title, req.body.blog_subtile, req.body.author_name],
    function (err) {
      if (err) {
        next(err); //send the error on to the error handler
      } else {
        // console.log("Settings updated");
        helper.getSettings();
        res.redirect("/author/home");
      }
    }
  );
});

/**
 * Route serving Edit Article page.
 * @name get/edit
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @returns {object} - Returns a render of the Edit Article page
 */
router.get("/edit", (req, res, next) => {
  if (!global.myCache.has('settings')) {
    helper.getSettings();
  }
  // If no article id is provided, render a blank form
  if (!req.query.id) {
    // console.log("Show Edit page with New Article");
    let settings = global.myCache.get('settings');
    res.render("edit", {
      user: { type: "Author", name: settings.author_name, blogTitle: settings.blog_title, subTitle: settings.blog_subtile },
      article: { article_id: "", article_title: "", article_subtitle: "", article_text: "", article_state: 0 }
    });
  }
  // If an article id is provided, render the form with the article details
  else {
    // DB Interaction : get the article details from the Articles table
    let sqlquery =
      "SELECT * FROM Articles WHERE article_id = ?;"
    let params = [req.query.id];
    global.db.all(sqlquery, params, function (err, row) {
      if (err) {
        next(err);
      } else {
        // console.log("Show Edit page with Existing Article");
        let settings = global.myCache.get('settings');
        res.render("edit", {
          user: { type: "Author", name: settings.author_name, blogTitle: settings.blog_title, subTitle: settings.blog_subtile },
          article: row[0]
        });
      }
    });
  }
});

/**
 * Route serving Create or Update Article form.
 * @name post/create-or-update
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @returns {object} - Returns a render of the Author Home page
 */
router.post("/create-or-update", (req, res, next) => {
  // If no article id is provided, create a new article
  if (!req.body.article_id) {
    // DB Interaction : insert the new article into the Articles table
    let sqlquery =
      "INSERT INTO Articles ('article_title', 'article_subtitle', 'article_text', 'article_create_date', 'article_last_modified_date', 'article_state')" +
      "VALUES (?, ?, ?, datetime('now'), datetime('now'), 0);";
    global.db.run(
      sqlquery, [req.body.article_title, req.body.article_subtitle, req.body.article_text],
      function (err) {
        if (err) {
          next(err); //send the error on to the error handler
        } else {
          // console.log("Create Complete");
          res.redirect("/author/home");
        }
      }
    );
  }
  // If an article id is provided, update the article
  else {
    // DB Interaction : update the article in the Articles table
    let sqlquery =
      "UPDATE Articles SET 'article_title' = ?, 'article_subtitle' = ?, 'article_text' = ?, 'article_last_modified_date' = datetime('now') " +
      "WHERE article_id = ?;";
    global.db.run(
      sqlquery, [req.body.article_title, req.body.article_subtitle, req.body.article_text, req.body.article_id],
      function (err) {
        if (err) {
          next(err); //send the error on to the error handler
        } else {
          // console.log("update Complete");
          res.redirect("/author/home");
        }
      }
    );
  }
});

/**
 * Route serving Remove Article page.
 * @name get/remove
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @returns {object} - Returns a render of the Author Home page after removing the article
 */
router.get("/remove", (req, res, next) => {
  if (!req.query.id) {
    res.redirect("/author/home");
  }
  // DB Interaction : remove the comments from the Comments table for the article
  global.db.all("DELETE FROM Comments WHERE article_id = ?;", [req.query.id], function (err, row) {
    if (err) {
      next(err); //send the error on to the error handler
    } else {
      // console.log("Remove Comments Complete");
      // DB Interaction : remove the article from the Articles table
      global.db.all("DELETE FROM Articles WHERE article_id = ?;", [req.query.id], function (err, row) {
        if (err) {
          next(err); //send the error on to the error handler
        } else {
          // console.log("Remove Articles Complete");
          res.redirect("/author/home");
        }
      });
    }
  });
});

/**
 * Route serving Publish Article page.
 * @name get/publish
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @returns {object} - Returns a render of the Author Home page after publishing the article
 */
router.get("/publish", (req, res, next) => {
  if (!req.query.id) {
    res.redirect("/author/home");
  }
  // DB Interaction : publish the article in the Articles table
  let sqlquery =
    "UPDATE Articles SET 'article_state' = ?, 'article_publication_date' = datetime('now') " +
    "WHERE article_id = ?;";
  // If an article id is provided, publish the article
  global.db.all(sqlquery, [1, req.query.id], function (err, row) {
    if (err) {
      next(err);
    } else {
      // console.log("Publish Articles Complete");
      res.redirect("/author/home");
    }
  });
});

module.exports = router;

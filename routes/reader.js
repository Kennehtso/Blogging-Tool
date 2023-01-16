const express = require("express");
const router = express.Router();
const assert = require('assert');
const Helper = require('./helper.js');
const helper = new Helper();

/**
 * @desc This is the root route for the website. It redirects to the Reader home page.
 * @returns {object} - Returns a redirect to the Reader home page
 */
router.get("/", (req, res) => {
  res.redirect("/reader/home");
});

/**
 * Route serving Reader Home page.
 * @name get/home
 * @function 
 * @inner 
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @returns {object} - Returns a render of the Reader Home page
 */
router.get("/home", (req, res, next) => {
  if (!global.myCache.has('settings')) {
    helper.getSettings();
  }
  // DB Interaction : get all articles from the Articles table and order them by last modified date descending order
  let sqlquery = "SELECT * FROM Articles WHERE article_publication_date IS NOT NULL ORDER BY article_publication_date DESC;";
  global.db.all(sqlquery, function (err, rows) {
    if (err) {
      next(err);
    } else {
      // console.log("Show Reader Home page");
      let settings = global.myCache.get('settings');
      res.render("home", {
        user: { type: "Reader", name: settings.author_name, blogTitle: settings.blog_title, subTitle: settings.blog_subtile },
        articles: rows
      });
    }
  });
});

/**
 * Route serving Article page.
 * @name get/article
 * @function 
 * @inner 
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @returns {object} - Returns a render of the article page
 */
router.get("/article", (req, res, next) => {
  if (!global.myCache.has('settings')) {
    helper.getSettings();
  }
  // DB Interaction : get all articles and comments from the Articles and Comments tables and order them by last modified date descending order
  let sqlquery =
    "SELECT  Comments.*, Articles.* " +
    "FROM Articles LEFT JOIN Comments ON Comments.article_id = Articles.article_id " +
    "WHERE Articles.article_id = ? ORDER BY Comments.comment_create_date DESC;"
  let params = [req.query.id];
  global.db.all(sqlquery, params, function (err, rows) {
    if (err) {
      next(err);
    } else {
      // console.log("Show article page");
      console.log(rows);
      let settings = global.myCache.get('settings');
      res.render("article", {
        user: { type: "Reader", name: settings.author_name, blogTitle: settings.blog_title, subTitle: settings.blog_subtile },
        article: rows[0],
        comments: rows.filter(row => row.comment_id != null)
      });
    }
  });
});

/**
 * Route serving create comments form.
 * @name post/create-comments
 * @function 
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @returns {object} - Returns a redirect to the article page with the new comment
 */
router.post("/create-comments", (req, res, next) => {
  // DB Interaction : insert a new comment into the Comments table
  let sqlquery =
    "INSERT INTO Comments ('comment_content', 'comment_create_date', 'article_id') VALUES (?, datetime('now'), ?);";
  global.db.run(
    sqlquery, [req.body.comment_text, Number(req.body.article_id)],
    function (err) {
      if (err) {
        next(err);
      } else {
        // console.log("Added comment to article");
        res.redirect("/reader/article?id=" + req.body.article_id);
      }
    }
  );
});

/**
 * Route serving Add Likes form.
 * @name post/add-likes
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @returns {object} - Returns a redirect to the article page with the new number of likes
 */
router.post("/add-likes", (req, res, next) => {
  // DB Interaction : update the number of likes for an article in the Articles table
  let sqlquery =
    "UPDATE Articles SET article_likes = article_likes + 1 WHERE article_id = ?;";
  global.db.run(
    sqlquery, [Number(req.body.article_id)],
    function (err) {
      if (err) {
        next(err);
      } else {
        // console.log("Added like to article");
        res.redirect("/reader/article?id=" + req.body.article_id);
      }
    }
  );
});

/**
 * Route serving article comments removal form.
 * @name get/comments/remove
 * @function
 * @inner
 * @param {string} path - Express path
 * @param  {callback} middleware - Express middleware.
 * @returns  {object} - Returns a redirect to the article page with the comment removed.
 */
router.get("/comments/remove", (req, res, next) => {
  if (!req.query.article_id || !req.query.comment_id) {
    res.redirect("/reader/home");
  }
  // DB Interaction : delete a comment from the Comments table
  let sqlquery =
    "DELETE FROM Comments WHERE article_id = ? AND comment_id =? ;";
  global.db.all(sqlquery, [req.query.article_id, req.query.comment_id], function (err, row) {
    if (err) {
      next(err);
    } else {
      // console.log("Publish Articles Complete");
      res.redirect("/reader/article?id=" + req.query.article_id);
    }
  });
});

module.exports = router;

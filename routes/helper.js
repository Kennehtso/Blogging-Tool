module.exports = class Helper {
  /**
   * @desc retrieves the current users Settings from the database
   * @name get/home
   * @function
   * @inner
   * @param {string} path - Express path
   * @param {callback} middleware - Express middleware.
   */
  getSettings() {
    // DB Interaction : get all data from the Settings table
    let sqlquery_Settings = "SELECT * FROM Settings;";
    global.db.all(sqlquery_Settings, function (err, row) {
      if (err) {
        next(err); //send the error on to the error handler
      } else {
        // console.log("Settings updated to cache");
        global.myCache.set('settings', row[0]);
      }
    });
  }
};

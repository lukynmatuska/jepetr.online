/**
 * The partials methods for routers
 * @author Lukas Matuska (lukynmatuska@gmail.com)
 * @version 1.0
 * @see https://lukasmatuska.cz/
 */

/**
 * Express router API
 */
const router = require('express').Router();

/**
 * Libs
 */
const moment = require('../libs/moment');

/**
 * Controllers
 */

module.exports.setLocalVariables = (req, res, next) => {
  res.locals = {
    currentPath: req.originalUrl,
    moment,
  };
  next();
};
router.all('*', this.setLocalVariables);

/**
 * Export the router
 */
module.exports.router = router;

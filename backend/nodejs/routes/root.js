/**
 * The Root of the API router
 * @author Lukas Matuska (lukynmatuska@gmail.com)
 * @version 1.0
 * @see https://lukasmatuska.cz/
 */

/**
 * Express router API
 */
const router = require('express').Router();
const partials = require('./partials');

/**
 * Libraries
 */

/**
 * Controllers
 */
const pingController = require('../controllers/ping');
const cronController = require('../controllers/cron');

/**
 * Routes
 */

// Home
router.get('/', (req, res) => {
  res.status(200).send('hello world!');
});

/**
 * Error pages for test
 */
router.get('/403', (req, res) => {
  res.status(403).send('403');
});

router.get('/404', (req, res) => {
  res.status(404).send('404');
});

router.get('/500', (req, res) => {
  res.status(500).send('500');
});

/**
 * Common
 */
router.get('/ping/single/:host', pingController.getSinglePing);
router.post('/ping/single', pingController.postSinglePing);

router.get('/ping/all', pingController.getAll);
router.get('/ping', pingController.getWithFilter);
router.get('/chart/ping', pingController.getDataForChart);

/**
 * Not found route
 */
router.all('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    error: 'not-found'
  });
});

module.exports = router;

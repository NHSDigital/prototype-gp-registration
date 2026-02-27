// /app/routes.js
const express = require('express');
const router = express.Router();
const packageInfo = require('../package.json')

// Make available in all templates
router.use((req, res, next) => {
  res.locals.prototypeKitVersion = packageInfo.version
  res.locals.nhsFrontendVersion = packageInfo.dependencies['nhsuk-frontend']
  res.locals.nodeVersion = process.version
  next()
})


// Import sprint routes
const addressUpdateRoutes = require('./views/address-update/routes');
const gpRegistrationRoutes = require('./views/gp-registration/routes');

// Mount sprint routes
router.use('/address-update', addressUpdateRoutes);
router.use('/gp-registration', gpRegistrationRoutes);

// Example: Dev / utility routes
router.get('/clear-data', (req, res) => {
  res.render('clear-data'); // page with a button to clear session
});

router.post('/clear-data', (req, res) => {
  req.session.data = {}; // wipe session data
  res.redirect('/data-cleared'); // confirmation page
});

module.exports = router;
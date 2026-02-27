// /app/views/address-update/sprint-2/routes.js
const express = require('express');
const router = express.Router();

// Sprint variable — change this for future sprints
const sprint = 'sprint-2';
const basePath = `/address-update/${sprint}`;

// Make basePath available in templates
router.use((req, res, next) => {
  res.locals.basePath = basePath;
  next();
});

// Helper for redirects within this sprint
const sprintRedirect = (res, page) => res.redirect(`${basePath}/${page}`);

// ------------------------------------------------
// Route: Do you live in the UK or the Isle of Man?
// ------------------------------------------------

// GET: show the form
router.get('/is-address-uk', (req, res) => {
  res.render('address-update/sprint-2/is-address-uk', {
    data: req.session.data || {}
  });
});

// POST: handle radio selection
router.post('/is-address-uk-answer', (req, res) => {
  if (req.session.data['is-address-uk'] === "yes") {
    sprintRedirect(res, 'what-is-your-current-address');
  } else {
    sprintRedirect(res, 'what-is-your-current-address-abroad');
  }
});

// --------------------------------------------------------------
// Are you going to be absent from the UK for 3 months or longer?
// --------------------------------------------------------------

// GET: show the form
router.get('/absent-three-months', (req, res) => {
  res.render('address-update/sprint-2/absent-three-months', {
    data: req.session.data || {}
  });
});

// POST: handle radio selection
router.post('/absent-three-months-answer', (req, res) => {
  if (req.session.data['absent-three-months'] === "yes") {
    sprintRedirect(res, 'success-abroad');
  } else {
    sprintRedirect(res, 'cancel');
  }
});


// ------------------------
// ROUTE: Select an address
// ------------------------

// GET: show the form
router.get('/select-new-address', (req, res) => {
  res.render('address-update/sprint-2/select-new-address', {
    data: req.session.data || {}
  });
});

// POST: handle radio selection
router.post('/select-new-address-answer', (req, res) => {
  if (req.session.data['select-new-address'] === "not listed") {
    sprintRedirect(res, 'what-is-your-current-address-selection-extended');
  } else {
    sprintRedirect(res, 'confirm-address');
  }
});

module.exports = router;
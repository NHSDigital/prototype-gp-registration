// /app/views/address-update/routes.js
const express = require('express');
const router = express.Router();

// --------------------------
// Dynamic sprint routing
// --------------------------

// Middleware to extract sprint from URL and set basePath
router.use('/:sprint', (req, res, next) => {
  const sprint = req.params.sprint;
  res.locals.basePath = `/address-update/${sprint}`;
  res.locals.sprint = sprint; // optional: in case templates need the sprint name
  next();
});

// Helper to redirect within the current sprint
const sprintRedirect = (res, sprint, page) => res.redirect(`/address-update/${sprint}/${page}`);


// -------
//
// ROUTES 
//
// -------


// --------------------------
// Route: Is your address in the UK?
// URL example: /address-update/sprint-2/is-address-uk
// --------------------------

// GET: show the form
router.get('/:sprint/is-address-uk', (req, res) => {
  res.render('address-update/' + req.params.sprint + '/is-address-uk', {
    data: req.session.data || {}
  });
});

// POST: handle radio selection
router.post('/:sprint/is-address-uk-answer', (req, res) => {
  const sprint = req.params.sprint;
  const isAddressUK = req.session.data['is-address-uk'];

  if (isAddressUK === 'yes') {
    res.redirect(`/address-update/${sprint}/what-is-your-current-address`);
  } else {
    res.redirect(`/address-update/${sprint}/what-is-your-current-address-abroad`);
  }
});





// --------------------------------------------------------------
// Are you going to be absent from the UK for 3 months or longer?
// --------------------------------------------------------------

// GET: show the form
router.get('/:sprint/absent-three-months', (req, res) => {
  res.render('address-update/' + req.params.sprint + '/absent-three-months', {
    data: req.session.data || {}
  });
});

// POST: handle radio selection
router.post('/:sprint/absent-three-months-answer', (req, res) => {
  const sprint = req.params.sprint;
  const isAddressUK = req.session.data['absent-three-months'];

  if (isAddressUK === 'yes') {
    res.redirect(`/address-update/${sprint}/success-abroad`);
  } else {
    res.redirect(`/address-update/${sprint}/cancel`);
  }
});

// ------------------------
// ROUTE: Select an address
// ------------------------

// GET: show the form
router.get('/:sprint/select-new-address', (req, res) => {
  res.render('address-update/' + req.params.sprint + '/select-new-address', {
    data: req.session.data || {}
  });
});

// POST: handle radio selection
router.post('/:sprint/select-new-address-answer', (req, res) => {
  const sprint = req.params.sprint;
  const isAddressUK = req.session.data['select-new-address'];

  if (isAddressUK === 'not listed') {
    res.redirect(`/address-update/${sprint}/what-is-your-current-address-selection-extended`);
  } else {
    res.redirect(`/address-update/${sprint}/confirm-address`);
  }
});



module.exports = router;
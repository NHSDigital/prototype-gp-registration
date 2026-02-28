// /app/views/address-update/routes.js
const express = require('express');
const router = express.Router();

// --------------------------
// Sprint middleware
// --------------------------

router.use('/:sprint', (req, res, next) => {
  const sprint = req.params.sprint;
  res.locals.basePath = `/address-update/${sprint}`;
  res.locals.sprint = sprint;
  next();
});

// Helper redirect
const sprintRedirect = (res, sprint, page) => {
  res.redirect(`/address-update/${sprint}/${page}`);
};

// ==========================
// IS YOUR ADDRESS IN THE UK
// ==========================

// GET
router.get('/:sprint/is-address-uk', (req, res) => {
  res.render(`address-update/${req.params.sprint}/is-address-uk`, {
    data: req.session.data || {}
  });
});

// POST
router.post('/:sprint/is-address-uk-answer', (req, res) => {

  const sprint = req.params.sprint;

  const answer = req.body['is-address-uk'];
  req.session.data['is-address-uk'] = answer;

  if (answer === 'yes') {
    sprintRedirect(res, sprint, 'what-is-your-current-address');
  } else {
    sprintRedirect(res, sprint, 'what-is-your-current-address-abroad');
  }

});

// ======================================
// ABSENT FROM UK FOR 3 MONTHS OR LONGER 
// // ===================================

// GET
router.get('/:sprint/absent-three-months', (req, res) => {
  res.render(`address-update/${req.params.sprint}/absent-three-months`, {
    data: req.session.data || {}
  });
});

// POST
router.post('/:sprint/absent-three-months-answer', (req, res) => {

  const sprint = req.params.sprint;

  const answer = req.body['absent-three-months'];
  req.session.data['absent-three-months'] = answer;

  if (answer === 'yes') {
    sprintRedirect(res, sprint, 'success-abroad');
  } else {
    sprintRedirect(res, sprint, 'cancel');
  }

});

// ===================
// SELECT NEW ADDRESS
// ===================

// GET
router.get('/:sprint/select-new-address', (req, res) => {
  res.render(`address-update/${req.params.sprint}/select-new-address`, {
    data: req.session.data || {}
  });
});

// POST
router.post('/:sprint/select-new-address-answer', (req, res) => {

  const sprint = req.params.sprint;

  const answer = req.body['select-new-address'];
  req.session.data['select-new-address'] = answer;

  if (answer === 'not listed') {
    sprintRedirect(res, sprint, 'what-is-your-current-address-selection-extended');
  } else {
    sprintRedirect(res, sprint, 'confirm-address');
  }

});



// ==================================
// WHERE DO YOU LIVE? (FOR FIND A GP)
// ==================================

// GET
router.get('/:sprint/new-address-country', (req, res) => {
  res.render(`address-update/${req.params.sprint}/new-address-country`, {
    data: req.session.data || {}
  });
});

// POST
router.post('/:sprint/new-address-country-answer', (req, res) => {

  const sprint = req.params.sprint;

  const answer = req.body['new-address-country'];
  req.session.data['new-address-country'] = answer;

  if (answer === 'England') {
    return res.redirect('https://www.nhs.uk/service-search/find-a-gp');
  }

  if (answer === 'Isle of Man') {
    return res.redirect('https://www.gov.im/categories/health-and-wellbeing/doctors/');
  }

  if (answer === 'Northern Ireland') {
    return res.redirect('https://www.nidirect.gov.uk/services/gp-practices');
  }

  if (answer === 'Scotland') {
    return res.redirect('https://www.nhsinform.scot/scotlands-service-directory/gp-practices/');
  }

  if (answer === 'Wales') {
    return res.redirect('https://111.wales.nhs.uk/localservices/gpinformation/');
  }

  // None of these
  sprintRedirect(res, sprint, 'what-is-your-current-address-abroad');

});




module.exports = router;

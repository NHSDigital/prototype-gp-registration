// /app/views/gp-registration/routes.js
const express = require('express');
const router = express.Router();

// --------------------------
// Sprint middleware
// --------------------------

router.use('/:sprint', (req, res, next) => {
  const sprint = req.params.sprint;
  res.locals.basePath = `/gp-registration/${sprint}`;
  res.locals.sprint = sprint;
  next();
});

// Helper redirect
const sprintRedirect = (res, sprint, page) => {
  res.redirect(`/gp-registration/${sprint}/${page}`);
};

// =====================================================
// WHO IS REGISTERING
// =====================================================

// GET
router.get('/:sprint/who-is-registering', (req, res) => {
  res.render(`gp-registration/${req.params.sprint}/who-is-registering`, {
    data: req.session.data || {}
  });
});

// POST
router.post('/:sprint/who-is-registering-answer', (req, res) => {
  const sprint = req.params.sprint;

  // Save answer
  const answer = req.body['who-is-registering'];
  req.session.data['who-is-registering'] = answer;

  if (answer === 'myself') {
    sprintRedirect(res, sprint, 'continue-with-nhs-login');
  } else {
    sprintRedirect(res, sprint, 'relation-of-dependant');
  }
});


// =====================================================
// WHAT IS YOUR NAME
// =====================================================

// GET
router.get('/:sprint/what-is-your-name', (req, res) => {
  res.render(`gp-registration/${req.params.sprint}/what-is-your-name`, {
    data: req.session.data || {}
  });
});

// POST
router.post('/:sprint/what-is-your-name-post', (req, res) => {
  const sprint = req.params.sprint;

  // Save form fields
  req.session.data['name-title'] = req.body['name-title'];
  req.session.data['name-title-other'] = req.body['name-title-other'];
  req.session.data['name-first-name'] = req.body['name-first-name'];
  req.session.data['name-middle-name'] = req.body['name-middle-name'];
  req.session.data['name-last-name'] = req.body['name-last-name'];
  req.session.data['name-previous-last-name'] = req.body['name-previous-last-name'];

  // Key logic
  if (req.session.data['return'] === 'true') {
    req.session.data['return'] = ''; // clear flag
    sprintRedirect(res, sprint, 'check-answers-1');
  } else {
    sprintRedirect(res, sprint, 'what-is-your-date-of-birth');
  }
});









module.exports = router;

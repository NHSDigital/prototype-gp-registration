// /app/views/gp-registration/routes.js
const express = require('express');
const router = express.Router();

// -----------------------
// Dynamic sprint routing
// -----------------------

// Middleware to extract sprint from URL and set basePath
router.use('/:sprint', (req, res, next) => {
  const sprint = req.params.sprint;
  res.locals.basePath = `/gp-registration/${sprint}`;
  res.locals.sprint = sprint; // optional: in case templates need the sprint name
  next();
});

// Helper to redirect within the current sprint
const sprintRedirect = (res, sprint, page) => res.redirect(`/gp-registration/${sprint}/${page}`);


// --------------------------
// Route factory helper
// --------------------------

// Generic GET route renderer
function getPage(pageName) {
  return (req, res) => {
    res.render(`gp-registration/${req.params.sprint}/${pageName}`, {
      data: req.session.data || {}
    });
  };
}

// Generic POST route handler
function postPage(pageName, fields = [], defaultNext) {
  return (req, res) => {
    const sprint = req.params.sprint;

    // Save form fields to session
    fields.forEach(f => {
      if (req.body[f] !== undefined) req.session.data[f] = req.body[f];
    });

    // Determine next page
    let nextPage = req.body.nextPage || defaultNext;

    if (req.session.data['return'] === 'true') {
      nextPage = req.body.nextPage || `check-answers-${pageName.split('-')[0]}`;
      req.session.data['return'] = ''; // clear flag
    }

    sprintRedirect(res, sprint, nextPage);
  };
}



// -------
//
// ROUTES 
//
// -------


// --------------------------
// Route: Who is registering with a GP
// URL example: /gp-registration/sprint-00/who-is-registering
// --------------------------

// GET: show the form
router.get('/:sprint/who-is-registering', (req, res) => {
  res.render('gp-registration/' + req.params.sprint + '/who-is-registering', {
    data: req.session.data || {}
  });
});

// POST: handle radio selection
router.post('/:sprint/who-is-registering-answer', (req, res) => {
  const sprint = req.params.sprint;
  const isAddressUK = req.session.data['who-is-registering'];

  if (isAddressUK === 'myself') {
    res.redirect(`/gp-registration/${sprint}/continue-with-nhs-login`);
  } else {
    res.redirect(`/gp-registration/${sprint}/relation-of-dependant`);
  }
});



// --------------------------
// Route: What is your name?
// --------------------------

// GET: show the form
router.get('/:sprint/what-is-your-name', (req, res) => {
  res.render('gp-registration/' + req.params.sprint + '/what-is-your-name', {
    data: req.session.data || {}
  });
});

// POST: handle radio selection
router.post('/:sprint/what-is-your-name-post', (req, res) => {
  const sprint = req.params.sprint;
  const isAddressUK = req.session.data['what-is-your-name'];

  if (req.session.data['return'] === 'true') {
      req.session.data['return'] = ''  // clear session flag
      sprintRedirect(res, 'check-answers-1')
    } else {
      sprintRedirect(res, 'what-is-your-date-of-birth')
    }
  })



module.exports = router;
// /app/views/gp-registration/routes.js
const express = require('express');
const router = express.Router();
const moment = require('moment');

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


// =====================================================
// NHS LOGIN
// =====================================================

// GET
router.get('/:sprint/nhs-login', (req, res) => {
  res.render(`gp-registration/${req.params.sprint}/nhs-login`, {
    data: req.session.data || {}
  });
});

// POST
router.post('/:sprint/nhs-login-answer', (req, res) => {
  const sprint = req.params.sprint;

  const hasLogin = req.body['nhs-login'];
  req.session.data['nhs-login'] = hasLogin;

  if (hasLogin === "Yes") {
    sprintRedirect(res, sprint, 'nhs-login-email-address');
  } else {
    sprintRedirect(res, sprint, 'do-you-know-nhs-number');
  }
});


// =====================================================
// NHS LOGIN SHARE (USER AUTH)
// =====================================================

router.post('/:sprint/nhs-login-share-answer', (req, res) => {
  const sprint = req.params.sprint;

  const nhsLogin = req.session.data['user-auth'];
  const loginLevel = req.session.data['login-level'];
  const alreadyRegistered = req.session.data['alreadyregistered'];

  if (nhsLogin === "p9") {

    if (alreadyRegistered === "true") {
      sprintRedirect(res, sprint, 'already-registered');
    } else {
      sprintRedirect(res, sprint, 'registered-for-the-first-time');
    }

  } else if (loginLevel === "parent-same-gp") {

    sprintRedirect(res, sprint, 'carer-details');

  } else if (loginLevel === "parent-same-gp-no-nhs") {

    sprintRedirect(res, sprint, 'do-you-know-nhs-number-parent');

  } else if (loginLevel === "parent-diff-gp") {

    sprintRedirect(res, sprint, 'are-you-planning-register');

  } else {

    sprintRedirect(res, sprint, 'what-is-your-name');

  }
});


// =====================================================
// RELATION OF DEPENDANT
// =====================================================

// GET
router.get('/:sprint/relation-of-dependant', (req, res) => {
  res.render(`gp-registration/${req.params.sprint}/relation-of-dependant`, {
    data: req.session.data || {}
  });
});

// POST
router.post('/:sprint/relation-answer', (req, res) => {
  const sprint = req.params.sprint;

  const relationship = req.body['relation'];
  req.session.data['relation'] = relationship;

  if (req.session.data['return'] === 'true') {
    req.session.data['return'] = '';
    sprintRedirect(res, sprint, 'check-answers-1');
    return;
  }

  if (relationship === "Carer") {
    sprintRedirect(res, sprint, 'carer-type');
  } else if (relationship === "Parent") {
    sprintRedirect(res, sprint, 'continue-with-nhs-login-parent');
  } else {
    sprintRedirect(res, sprint, 'carer-details');
  }
});


// =====================================================
// CARER DETAILS
// =====================================================

router.post('/:sprint/carer-details-answer', (req, res) => {
  const sprint = req.params.sprint;

  if (req.session.data['return'] === 'true') {
    req.session.data['return'] = '';
    sprintRedirect(res, sprint, 'check-answers-1');
  } else {
    sprintRedirect(res, sprint, 'what-is-your-name');
  }
});


// =====================================================
// WHAT IS YOUR DATE OF BIRTH
// =====================================================

router.post('/:sprint/what-is-your-date-of-birth-answer', (req, res) => {

  const sprint = req.params.sprint

  const dobArray = req.body['date-of-birth'] || []

  const day = dobArray[0]
  const month = dobArray[1]
  const year = dobArray[2]

  // Store back into session for check answers
  req.session.data['date-of-birth'] = [day, month, year]

  // Build ISO date string
  const dobString = `${year}-${month}-${day}`

  const years = moment().diff(dobString, 'years')

  // Store age
  req.session.data['years-old'] = years

  // Reset flags
  req.session.data['under-12-months'] = 'false'
  req.session.data['under-13-years'] = 'false'
  req.session.data['under-16-years'] = 'false'
  req.session.data['under-18-years'] = 'false'

  if (years < 1) {
    req.session.data['under-12-months'] = 'true'
  }
  if (years < 13) {
    req.session.data['under-13-years'] = 'true'
  }
  if (years < 16) {
    req.session.data['under-16-years'] = 'true'
  }
  if (years < 18) {
    req.session.data['under-18-years'] = 'true'
  }

  // If returning from check answers
  if (req.session.data['return'] === 'true') {
    req.session.data['return'] = ''
    return sprintRedirect(res, sprint, 'check-answers-1')
  }

  // Normal journey
  sprintRedirect(res, sprint, 'do-you-know-nhs-number')

})


// =====================================================
// DO YOU KNOW NHS NUMBER
// =====================================================

// GET
router.get('/:sprint/do-you-know-nhs-number', (req, res) => {
  res.render(`gp-registration/${req.params.sprint}/do-you-know-nhs-number`, {
    data: req.session.data || {}
  })
})


// POST
router.post('/:sprint/do-you-know-nhs-number-answer', (req, res) => {

  const sprint = req.params.sprint

  const answer = req.body['do-you-know-nhs-number']
  req.session.data['do-you-know-nhs-number'] = answer

  // If returning from check answers
  if (req.session.data['return'] === 'true') {
    req.session.data['return'] = ''
    return sprintRedirect(res, sprint, 'check-answers-1')
  }

  if (answer === 'Yes') {
    sprintRedirect(res, sprint, 'what-is-your-nhs-number')
  } else {
    sprintRedirect(res, sprint, 'registered-for-the-first-time')
  }

})

// =====================================================
// REGISTERED FOR THE FIRST TIME
// =====================================================

router.post('/:sprint/registered-for-the-first-time-answer', (req, res) => {

  const sprint = req.params.sprint

  const choice = req.body['registered-for-the-first-time']
  const auth = req.session.data['user-auth']

  // Save answer
  req.session.data['registered-for-the-first-time'] = choice

  // If returning from check answers
  if (req.session.data['return'] === 'true') {
    req.session.data['return'] = ''
    return sprintRedirect(res, sprint, 'check-answers-1')
  }

  // P9 authenticated users go straight to address confirmation
  if (auth === 'p9') {
    return sprintRedirect(res, sprint, 'is-this-your-current-address')
  }

  // Standard routing
  if (choice === 'Yes') {
    sprintRedirect(res, sprint, 'check-answers-1')
  } else {
    sprintRedirect(res, sprint, 'what-is-your-gp-address')
  }

})


// =====================================================
// DO YOU KNOW PREVIOUS POSTCODE GP HAS
// =====================================================

router.get('/:sprint/do-you-know-previous-postcode-gp-has', (req, res) => {
  res.render(`gp-registration/${req.params.sprint}/do-you-know-previous-postcode-gp-has`, {
    data: req.session.data || {}
  })
})

router.post('/:sprint/do-you-know-previous-postcode-gp-has-answer', (req, res) => {

  const sprint = req.params.sprint

  const answer = req.body['do-you-know-previous-postcode-gp-has']
  req.session.data['do-you-know-previous-postcode-gp-has'] = answer

  if (answer === 'Yes') {
    sprintRedirect(res, sprint, 'what-is-previous-postcode-gp-has')
  } else {
    sprintRedirect(res, sprint, 'check-answers-1')
  }

})

// ================================
// DO YOU HAVE AN ADDRESS IN THE UK
// ================================

router.get('/:sprint/do-you-current-address', (req, res) => {
  res.render(`gp-registration/${req.params.sprint}/do-you-current-address`, {
    data: req.session.data || {}
  })
})


router.post('/:sprint/do-you-current-address-answer', (req, res) => {

  const sprint = req.params.sprint

  const answer = req.body['do-you-current-address']
  req.session.data['do-you-current-address'] = answer

  // If returning from check answers, always go back there
  if (req.session.data['return'] === 'true') {
    req.session.data['return'] = ''
    return sprintRedirect(res, sprint, 'check-answers-b')
  }

  if (answer === 'Yes') {
    sprintRedirect(res, sprint, 'what-is-your-current-address')
  } else {
    sprintRedirect(res, sprint, 'how-can-we-contact-inputs')
  }

})

// =======================
// WHAT IS YOUR ETHNICITY
// =======================

router.get('/:sprint/what-is-your-ethnicity', (req, res) => {
  res.render(`gp-registration/${req.params.sprint}/what-is-your-ethnicity`, {
    data: req.session.data || {}
  })
})


router.post('/:sprint/what-is-your-ethnicity-answer', (req, res) => {

  const sprint = req.params.sprint

  const answer = req.body['what-is-your-ethnicity']
  req.session.data['what-is-your-ethnicity'] = answer

  // If returning from check answers, always go back there
  if (req.session.data['return'] === 'true') {
    req.session.data['return'] = ''
    return sprintRedirect(res, sprint, 'check-answers-b')
  }

  if (answer === 'Asian or Asian British') {
    sprintRedirect(res, sprint, 'what-is-your-ethnicity-background-asian')

  } else if (answer === 'Black African, Black British or Caribbean') {
    sprintRedirect(res, sprint, 'what-is-your-ethnicity-background-black')

  } else if (answer === 'Mixed or multiple ethnic groups') {
    sprintRedirect(res, sprint, 'what-is-your-ethnicity-background-mixed')

  } else if (answer === 'White') {
    sprintRedirect(res, sprint, 'what-is-your-ethnicity-background-white')

  } else if (answer === 'Another ethnic group') {
    sprintRedirect(res, sprint, 'what-is-your-ethnicity-background-another')

  } else {
    // Prefer not to say
    sprintRedirect(res, sprint, 'nominate-pharmacy')
  }

})

// ==================
// NOMINATE PHARMACY
// ==================

router.get('/:sprint/nominate-pharmacy', (req, res) => {
  res.render(`gp-registration/${req.params.sprint}/nominate-pharmacy`, {
    data: req.session.data || {}
  })
})


router.post('/:sprint/nominate-pharmacy-answer', (req, res) => {

  const sprint = req.params.sprint

  const answer = req.body['nominate-pharmacy']
  req.session.data['nominate-pharmacy'] = answer

  // If returning from check answers, always go back there
  if (req.session.data['return'] === 'true') {
    req.session.data['return'] = ''
    return sprintRedirect(res, sprint, 'check-answers-b')
  }

  if (answer === 'Yes') {
    sprintRedirect(res, sprint, 'nominate-online-or-street')
  } else {
    sprintRedirect(res, sprint, 'are-you-a-member-of-armed-forces')
  }

})

// ==================================
// NOMINATE ONLINE OR STREET PHARMACY
// ==================================

router.get('/:sprint/nominate-online-or-street', (req, res) => {
  res.render(`gp-registration/${req.params.sprint}/nominate-online-or-street`, {
    data: req.session.data || {}
  })
})


router.post('/:sprint/nominate-online-or-street-answer', (req, res) => {

  const sprint = req.params.sprint

  const answer = req.body['nominate-online-or-street']
  req.session.data['nominate-online-or-street'] = answer

  // If returning from check answers, always go back there
  if (req.session.data['return'] === 'true') {
    req.session.data['return'] = ''
    return sprintRedirect(res, sprint, 'check-answers-b')
  }

  if (answer === 'Yes') {
    sprintRedirect(res, sprint, 'nominate-pharmacy-search')
  } else {
    sprintRedirect(res, sprint, 'online-pharmacy')
  }

})


// =====================================================
// ARE YOU A MEMBER OF ARMED FORCES
// =====================================================

router.get('/:sprint/are-you-a-member-of-armed-forces', (req, res) => {
  res.render(`gp-registration/${req.params.sprint}/are-you-a-member-of-armed-forces`, {
    data: req.session.data || {}
  })
})


router.post('/:sprint/are-you-a-member-of-armed-forces-answer', (req, res) => {

  const sprint = req.params.sprint

  const answer = req.body['are-you-a-member-of-armed-forces']
  req.session.data['are-you-a-member-of-armed-forces'] = answer

  // If returning from check answers, always go back there
  if (req.session.data['return'] === 'true') {
    req.session.data['return'] = ''
    return sprintRedirect(res, sprint, 'check-answers-b')
  }

  if (answer === 'Yes') {
    sprintRedirect(res, sprint, 'are-you-a-member-of-armed-forces-details')
  } else {
    sprintRedirect(res, sprint, 'do-you-have-emergency-contact')
  }

})


// ==============================
// DO YOU HAVE EMERGENCY CONTACT
// ==============================

router.get('/:sprint/do-you-have-emergency-contact', (req, res) => {
  res.render(`gp-registration/${req.params.sprint}/do-you-have-emergency-contact`, {
    data: req.session.data || {}
  })
})


router.post('/:sprint/do-you-have-emergency-contact-answer', (req, res) => {

  const sprint = req.params.sprint

  const answer = req.body['do-you-have-emergency-contact']
  req.session.data['do-you-have-emergency-contact'] = answer

  const firstTime = req.session.data['registered-for-the-first-time']

  // If returning from check answers, always go back there
  if (req.session.data['return'] === 'true') {
    req.session.data['return'] = ''
    return sprintRedirect(res, sprint, 'check-answers-b')
  }

  // FIRST TIME REGISTRATION
  if (firstTime === 'Yes') {

    if (answer === 'Yes') {
      sprintRedirect(res, sprint, 'emergency-contact-details')
    } else {
      sprintRedirect(res, sprint, 'recently-move-to-the-uk')
    }

  } else {

    // NOT FIRST TIME REGISTRATION
    if (answer === 'Yes') {
      sprintRedirect(res, sprint, 'emergency-contact-details')
    } else {
      sprintRedirect(res, sprint, 'are-you-returning-from-overseas')
    }

  }

})


// =====================================================
// RECENTLY MOVED TO THE UK
// =====================================================

// POST
router.post('/:sprint/recently-move-to-the-uk-answer', (req, res) => {
  const sprint = req.params.sprint;

  // Save answer
  const answer = req.body['recently-move-to-the-uk'];
  req.session.data['recently-move-to-the-uk'] = answer;

  // Return from check answers page
  if (req.session.data['return'] === 'true') {
    req.session.data['return'] = ''; // clear flag
    sprintRedirect(res, sprint, 'check-answers-b');
    return;
  }

  // Routing logic
  if (answer === 'Yes') {
    sprintRedirect(res, sprint, 'where-were-you-born-place-outside-uk');
  } else {
    sprintRedirect(res, sprint, 'where-were-you-born');
  }
})


// =====================================================
// WHERE WERE YOU BORN
// =====================================================

// POST
router.post('/:sprint/where-were-you-born-answer', (req, res) => {
  const sprint = req.params.sprint;

  // Save answer
  const answer = req.body['where-were-you-born'];
  req.session.data['where-were-you-born'] = answer;

  // Return path if coming from check answers
  if (req.session.data['return'] === 'true') {
    req.session.data['return'] = ''; // clear flag
    sprintRedirect(res, sprint, 'check-answers-b');
    return;
  }

  // Routing based on selected option
  const ukCountries = [
    'England',
    'Wales',
    'Scotland',
    'Northern Ireland',
    'Isle of Man'
  ];

  if (ukCountries.includes(answer)) {
    sprintRedirect(res, sprint, 'where-were-you-born-place-uk');
  } else {
    sprintRedirect(res, sprint, 'where-were-you-born-place-outside-uk');
  }
})

// =========================
// WHERE WERE YOU BORN – UK
// =========================

// GET
router.get('/:sprint/where-were-you-born-place-uk', (req, res) => {
  res.render(`gp-registration/${req.params.sprint}/where-were-you-born-place-uk`, {
    data: req.session.data || {}
  });
});

// POST
router.post('/:sprint/where-were-you-born-place-uk-answer', (req, res) => {
  const sprint = req.params.sprint;

  // If coming from a check answers page, always go back there
  if (req.session.data['return'] === 'true') {
    req.session.data['return'] = '';
    return sprintRedirect(res, sprint, 'check-answers-b');
  }

  // Determine next page based on session variables
  const under18 = req.session.data['under-18-years'] === 'true';
  const firstTime = req.session.data['registered-for-the-first-time'] === 'Yes';

  if (under18 || !firstTime) {
    sprintRedirect(res, sprint, 'do-you-have-existing-conditions');
  } else {
    sprintRedirect(res, sprint, 'do-you-previous-address');
  }
})

// ==============================
// DO YOU HAVE A PREVIOUS ADDRESS
// ==============================
 
// GET
router.get('/:sprint/do-you-previous-address', (req, res) => {
  res.render(`gp-registration/${req.params.sprint}/do-you-previous-address`, {
    data: req.session.data || {}
  });
});
 
// POST
router.post('/:sprint/do-you-previous-address-answer', (req, res) => {
  const sprint = req.params.sprint;
 
  // If coming from a check answers page, always go back there
  if (req.session.data['return'] === 'true') {
    req.session.data['return'] = '';
    return sprintRedirect(res, sprint, 'check-answers-b');
  }
 
  const answer = req.session.data['do-you-previous-address'];
  const under18 = req.session.data['under-18-years'] === 'true';
 
  if (answer === 'Yes') {
    sprintRedirect(res, sprint, 'what-is-your-previous-address-manual');
  } else if (under18) {
    sprintRedirect(res, sprint, 'are-you-immunised');
  } else {
    sprintRedirect(res, sprint, 'do-you-have-existing-conditions');
  }
})

// =====================================================
// RETURNING FROM OVERSEAS
// =====================================================

// GET
router.get('/:sprint/are-you-returning-from-overseas', (req, res) => {
  res.render(`gp-registration/${req.params.sprint}/are-you-returning-from-overseas`, {
    data: req.session.data || {}
  });
});

// POST
router.post('/:sprint/are-you-returning-from-overseas-answer', (req, res) => {
  const sprint = req.params.sprint;

  // Save answer
  const answer = req.body['are-you-returning-from-overseas'];
  req.session.data['are-you-returning-from-overseas'] = answer;

  // If coming back from check answers
  if (req.session.data['return'] === 'true') {
    sprintRedirect(res, sprint, 'check-answers-b');
    return;
  }

  if (answer === 'Yes') {
    sprintRedirect(res, sprint, 'date-left-uk');
  } else {
    sprintRedirect(res, sprint, 'where-were-you-born');
  }
});

// ====================
// RECENTLY MOVED DATE
// ====================

// GET
router.get('/:sprint/recently-moved-date', (req, res) => {
  res.render(`gp-registration/${req.params.sprint}/recently-moved-date`, {
    data: req.session.data || {}
  });
});

// POST
router.post('/:sprint/recently-moved-date-answer', (req, res) => {
  const sprint = req.params.sprint;

  // Save date fields (if you're collecting them separately)
  req.session.data['recently-moved-date-day'] = req.body['recently-moved-date-day'];
  req.session.data['recently-moved-date-month'] = req.body['recently-moved-date-month'];
  req.session.data['recently-moved-date-year'] = req.body['recently-moved-date-year'];

  const recentlyMoved = req.session.data['recently-move-to-the-uk'];

  if (recentlyMoved === 'Yes') {
    sprintRedirect(res, sprint, 'recently-moved-eea');
  } else {
    sprintRedirect(res, sprint, 'do-you-previous-address');
  }
});



module.exports = router;

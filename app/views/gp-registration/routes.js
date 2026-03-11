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

// Helper: check if age is within a range
function isAgeBetween(data, min, max) {
  const age = parseInt(data['years-old'], 10)
  return age >= min && age <= max
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

  const sprint = req.params.sprint

  // Get carer DOB fields from form
  const day = req.body['carer-dob-day'] || ''
  const month = req.body['carer-dob-month'] || ''
  const year = req.body['carer-dob-year'] || ''

  // Store as array for summary pages
  req.session.data['carer-date-of-birth'] = [day, month, year]

  // If returning from check answers
  if (req.session.data['return'] === 'true') {
    req.session.data['return'] = ''
    return sprintRedirect(res, sprint, 'check-answers-1')
  }

  // Normal journey
  sprintRedirect(res, sprint, 'what-is-your-name')

})



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


// =====================================================
// RECENTLY MOVED FROM EU / EEA
// =====================================================

// GET
router.get('/:sprint/recently-moved-eea', (req, res) => {
  res.render(`gp-registration/${req.params.sprint}/recently-moved-eea`, {
    data: req.session.data || {}
  })
})

// POST
router.post('/:sprint/recently-moved-eea-answer', (req, res) => {

  const sprint = req.params.sprint
  const answer = req.body['recently-moved-eea']
  req.session.data['recently-moved-eea'] = answer

  // Return to check answers if coming from there
  if (req.session.data['return'] === 'true') {
    req.session.data['return'] = ''
    return sprintRedirect(res, sprint, 'check-answers-b')
  }

  // Use helper to decide next page
  if (answer === 'Yes') {
    sprintRedirect(res, sprint, 'recently-moved-documents')
  } else if (answer === 'No' && isAgeBetween(req.session.data, 16, 34)) {
    sprintRedirect(res, sprint, 'visited-tb-country')
  } else {
    sprintRedirect(res, sprint, 'do-you-have-existing-conditions')
  }

})


// =====================================================
// RECENTLY MOVED DOCUMENTS
// =====================================================

// GET
router.get('/:sprint/recently-moved-documents', (req, res) => {
  res.render(`gp-registration/${req.params.sprint}/recently-moved-documents`, {
    data: req.session.data || {}
  })
})

// POST
router.post('/:sprint/recently-moved-documents-answer', (req, res) => {

  const sprint = req.params.sprint
  const answer = req.body['recently-moved-documents']
  req.session.data['recently-moved-documents'] = answer

  // If returning from check answers
  if (req.session.data['return'] === 'true') {
    req.session.data['return'] = ''
    return sprintRedirect(res, sprint, 'check-answers-b')
  }

  if (answer === 'ehic') {
    sprintRedirect(res, sprint, 'document-details-ehic')
  } else if (answer === 'S1') {
    sprintRedirect(res, sprint, 'recently-moved-s1-details')
  } else if (answer === 'No') {
    sprintRedirect(res, sprint, 'do-you-have-existing-conditions')
  }

})


// ================================
// DO YOU HAVE EXISTING CONDITIONS
// ================================

// GET
router.get('/:sprint/do-you-have-existing-conditions', (req, res) => {
  res.render(`gp-registration/${req.params.sprint}/do-you-have-existing-conditions`, {
    data: req.session.data || {}
  })
})

// POST
router.post('/:sprint/do-you-have-existing-conditions-answer', (req, res) => {

  const sprint = req.params.sprint
  const answer = req.body['has-existing-conditions']
  req.session.data['has-existing-conditions'] = answer

  // If returning from check answers
  if (req.session.data['return'] === 'true') {
    req.session.data['return'] = ''
    return sprintRedirect(res, sprint, 'check-answers-b')
  }

  if (answer === 'Yes') {
    sprintRedirect(res, sprint, 'what-existing-conditions-do-you-have')
  } else if (answer === 'No') {
    sprintRedirect(res, sprint, 'do-you-have-allergies')
  } else if (answer === 'Prefer not to say') {
    sprintRedirect(res, sprint, 'do-you-have-allergies')
  }

})

// ======================
// DO YOU HAVE ALLERGIES
// ======================

// GET
router.get('/:sprint/do-you-have-allergies', (req, res) => {
  res.render(`gp-registration/${req.params.sprint}/do-you-have-allergies`, {
    data: req.session.data || {}
  })
})

// POST
router.post('/:sprint/do-you-have-allergies-answer', (req, res) => {

  const sprint = req.params.sprint
  const answer = req.body['has-allergies']
  req.session.data['has-allergies'] = answer

  // If returning from check answers
  if (req.session.data['return'] === 'true') {
    req.session.data['return'] = ''
    return sprintRedirect(res, sprint, 'check-answers-b')
  }

  if (answer === 'Yes') {
    sprintRedirect(res, sprint, 'allergies-details')
  } else if (answer === 'No') {
    sprintRedirect(res, sprint, 'do-you-have-any-mental-health-conditions')
  } else if (answer === 'Prefer not to say') {
    sprintRedirect(res, sprint, 'do-you-have-any-mental-health-conditions')
  }

})


// =========================================
// DO YOU HAVE ANY MENTAL HEALTH CONDITIONS 
// =========================================

// GET
router.get('/:sprint/do-you-have-any-mental-health-conditions', (req, res) => {
  res.render(`gp-registration/${req.params.sprint}/do-you-have-any-mental-health-conditions`, {
    data: req.session.data || {}
  })
})

// POST
router.post('/:sprint/do-you-have-any-mental-health-conditions-answer', (req, res) => {

  const sprint = req.params.sprint
  const answer = req.body['has-mental-health-conditions']
  req.session.data['has-mental-health-conditions'] = answer

  // If returning from check answers
  if (req.session.data['return'] === 'true') {
    req.session.data['return'] = ''
    return sprintRedirect(res, sprint, 'check-answers-b')
  }

  if (answer === 'Yes') {
    sprintRedirect(res, sprint, 'mental-health-conditions-details')
  } else if (answer === 'No') {
    sprintRedirect(res, sprint, 'do-you-have-any-disabilities')
  } else if (answer === 'Prefer not to say') {
    sprintRedirect(res, sprint, 'do-you-have-any-disabilities')
  }

})


// =============================
// DO YOU HAVE ANY DISABILITIES
// =============================

// GET
router.get('/:sprint/do-you-have-any-disabilities', (req, res) => {
  res.render(`gp-registration/${req.params.sprint}/do-you-have-any-disabilities`, {
    data: req.session.data || {}
  })
})

// POST
router.post('/:sprint/do-you-have-any-disabilities-answer', (req, res) => {

  const sprint = req.params.sprint
  const answer = req.body['has-disabilities']
  req.session.data['has-disabilities'] = answer

  // If returning from check answers
  if (req.session.data['return'] === 'true') {
    req.session.data['return'] = ''
    return sprintRedirect(res, sprint, 'check-answers-b')
  }

  if (answer === 'Yes') {
    sprintRedirect(res, sprint, 'disabilities-details')
  } else if (answer === 'No') {
    sprintRedirect(res, sprint, 'do-you-have-a-carer')
  } else if (answer === 'Prefer not to say') {
    sprintRedirect(res, sprint, 'do-you-have-a-carer')
  }

})


// ====================
// DO YOU HAVE A CARER
// ====================

// GET
router.get('/:sprint/do-you-have-a-carer', (req, res) => {
  res.render(`gp-registration/${req.params.sprint}/do-you-have-a-carer`, {
    data: req.session.data || {}
  })
})

// POST
router.post('/:sprint/do-you-have-a-carer-answer', (req, res) => {

  const sprint = req.params.sprint
  const answer = req.body['need-carer']
  req.session.data['need-carer'] = answer

  // If returning from check answers
  if (req.session.data['return'] === 'true') {
    req.session.data['return'] = ''
    return sprintRedirect(res, sprint, 'check-answers-b')
  }

  if (answer === 'Yes') {
    sprintRedirect(res, sprint, 'carer-type-1')
  } else if (answer === 'No') {
    sprintRedirect(res, sprint, 'are-you-a-carer')
  } else if (answer === 'Prefer not to say') {
    sprintRedirect(res, sprint, 'are-you-a-carer')
  }

})


// ================
// ARE YOU A CARER
// ================

// GET
router.get('/:sprint/are-you-a-carer', (req, res) => {
  res.render(`gp-registration/${req.params.sprint}/are-you-a-carer`, {
    data: req.session.data || {}
  })
})

// POST
router.post('/:sprint/are-you-a-carer-answer', (req, res) => {

  const sprint = req.params.sprint
  const answer = req.body['are-carer']
  req.session.data['are-carer'] = answer

  // If returning from check answers
  if (req.session.data['return'] === 'true') {
    req.session.data['return'] = ''
    return sprintRedirect(res, sprint, 'check-answers-b')
  }

  if (answer === 'Yes') {
    sprintRedirect(res, sprint, 'type-of-carer')
  } else if (answer === 'No') {
    sprintRedirect(res, sprint, 'do-you-need-accessible-format')
  } else if (answer === 'Prefer not to say') {
    sprintRedirect(res, sprint, 'do-you-need-accessible-format')
  }

})


// ==============================
// DO YOU NEED ACCESSIBLE FORMAT
// ==============================

// GET
router.get('/:sprint/do-you-need-accessible-format', (req, res) => {
  res.render(`gp-registration/${req.params.sprint}/do-you-need-accessible-format`, {
    data: req.session.data || {}
  })
})

// POST
router.post('/:sprint/do-you-need-accessible-format-answer', (req, res) => {

  const sprint = req.params.sprint
  const answer = req.body['accessible-needs']
  req.session.data['accessible-needs'] = answer

  // If returning from check answers
  if (req.session.data['return'] === 'true') {
    req.session.data['return'] = ''
    return sprintRedirect(res, sprint, 'check-answers-b')
  }

  if (answer === 'Yes') {
    sprintRedirect(res, sprint, 'do-you-need-accessible-format-details')
  } else if (answer === 'No') {
    sprintRedirect(res, sprint, 'do-you-need-reasonable-adjustments')
  } else if (answer === 'Prefer not to say') {
    sprintRedirect(res, sprint, 'do-you-need-reasonable-adjustments')
  }

})


// ===================================
// DO YOU NEED REASONABLE ADJUSTMENTS
// ===================================

// GET
router.get('/:sprint/do-you-need-reasonable-adjustments', (req, res) => {
  res.render(`gp-registration/${req.params.sprint}/do-you-need-reasonable-adjustments`, {
    data: req.session.data || {}
  })
})

// POST
router.post('/:sprint/do-you-need-reasonable-adjustments-answer', (req, res) => {

  const sprint = req.params.sprint
  const answer = req.body['reasonable-adjustments']
  req.session.data['reasonable-adjustments'] = answer

  // If returning from check answers
  if (req.session.data['return'] === 'true') {
    req.session.data['return'] = ''
    return sprintRedirect(res, sprint, 'check-answers-b')
  }

  if (answer === 'Yes') {
    sprintRedirect(res, sprint, 'do-you-need-reasonable-adjustments-details')
  } else if (answer === 'No') {
    sprintRedirect(res, sprint, 'do-you-take-prescription-medication')
  } else if (answer === 'Prefer not to say') {
    sprintRedirect(res, sprint, 'do-you-take-prescription-medication')
  }

})


// =====================================================
// DO YOU TAKE PRESCRIPTION MEDICATION
// =====================================================

// GET
router.get('/:sprint/do-you-take-prescription-medication', (req, res) => {
  res.render(`gp-registration/${req.params.sprint}/do-you-take-prescription-medication`, {
    data: req.session.data || {}
  })
})

// POST
router.post('/:sprint/do-you-take-prescription-medication-answer', (req, res) => {

  const sprint = req.params.sprint
  const answer = req.body['takes-prescription-meds']
  req.session.data['takes-prescription-meds'] = answer

  // If returning from check answers
  if (req.session.data['return'] === 'true') {
    req.session.data['return'] = ''
    return sprintRedirect(res, sprint, 'check-answers-b')
  }

  if (answer === 'Yes') {
    sprintRedirect(res, sprint, 'medication-details')
  } else if (answer === 'No') {
    sprintRedirect(res, sprint, 'height')
  } else if (answer === 'Prefer not to say') {
    sprintRedirect(res, sprint, 'height')
  }

})


// =====================================================
// HOW OFTEN DO YOU DRINK ALCOHOL
// =====================================================

// GET
router.get('/:sprint/how-often-do-you-drink-alcohol', (req, res) => {
  res.render(`gp-registration/${req.params.sprint}/how-often-do-you-drink-alcohol`, {
    data: req.session.data || {}
  })
})

// POST
router.post('/:sprint/how-often-do-you-drink-alcohol-answer', (req, res) => {
  const sprint = req.params.sprint
  const answer = req.body['alcohol-consumption']
  req.session.data['alcohol-consumption'] = answer

  // Returning from check answers
  if (req.session.data['return'] === 'true') {
    req.session.data['return'] = ''
    return sprintRedirect(res, sprint, 'check-answers-b')
  }

  if (answer === 'Never' || answer === 'Prefer not to say') {
    sprintRedirect(res, sprint, 'do-you-smoke')
  } else {
    sprintRedirect(res, sprint, 'how-many-units-of-alcohol')
  }
})


// =============
// DO YOU SMOKE
// =============

// GET
router.get('/:sprint/do-you-smoke', (req, res) => {
  res.render(`gp-registration/${req.params.sprint}/do-you-smoke`, {
    data: req.session.data || {}
  })
})

// POST
router.post('/:sprint/do-you-smoke-answer', (req, res) => {
  const sprint = req.params.sprint
  const answer = req.body['smokes']
  req.session.data['smokes'] = answer

  // If returning from check answers
  if (req.session.data['return'] === 'true') {
    req.session.data['return'] = ''
    return sprintRedirect(res, sprint, 'check-answers-b')
  }

  if (answer === 'Yes') {
    sprintRedirect(res, sprint, 'do-you-smoke-type')
  } else {
    sprintRedirect(res, sprint, 'scr')
  }
})


// ==================
// DO YOU SMOKE TYPE
// ==================

// GET
router.get('/:sprint/do-you-smoke-type', (req, res) => {
  res.render(`gp-registration/${req.params.sprint}/do-you-smoke-type`, {
    data: req.session.data || {}
  })
})

// POST
router.post('/:sprint/do-you-smoke-type-answer', (req, res) => {
  const sprint = req.params.sprint
  const answer = req.body['smokes-type']
  req.session.data['smokes-type'] = answer

  // If returning from check answers
  if (req.session.data['return'] === 'true') {
    req.session.data['return'] = ''
    return sprintRedirect(res, sprint, 'check-answers-b')
  }

  if (answer === 'I smoke') {
    sprintRedirect(res, sprint, 'do-you-smoke-amount')
  } else if (answer === 'I used to smoke') {
    sprintRedirect(res, sprint, 'do-you-smoke-date')
  } else {
    sprintRedirect(res, sprint, 'scr')
  }
})


// ==============
// BLOOD TESTING
// ==============

// GET
router.get('/:sprint/blood-testing', (req, res) => {
  res.render(`gp-registration/${req.params.sprint}/blood-testing`, {
    data: req.session.data || {}
  })
})

// POST
router.post('/:sprint/blood-testing-answer', (req, res) => {
  const sprint = req.params.sprint
  const answer = req.body['blood-test']
  req.session.data['blood-test'] = answer

  // If returning from check answers
  if (req.session.data['return'] === 'true') {
    req.session.data['return'] = ''
    return sprintRedirect(res, sprint, 'check-answers-b')
  }

  if (answer === 'No') {
    sprintRedirect(res, sprint, 'scr')
  } else {
    sprintRedirect(res, sprint, 'blood-inquiry')
  }
})


// ===================
// ARE YOU REGISTERED
// ===================

// GET
router.get('/:sprint/are-you-registered', (req, res) => {
  res.render(`gp-registration/${req.params.sprint}/are-you-registered`, {
    data: req.session.data || {}
  })
})

// POST
router.post('/:sprint/are-you-registered-answer', (req, res) => {
  const sprint = req.params.sprint
  const answer = req.body['are-you-registered']
  req.session.data['are-you-registered'] = answer

  // If returning from check answers
  if (req.session.data['return'] === 'true') {
    req.session.data['return'] = ''
    return sprintRedirect(res, sprint, 'check-answers-1')
  }

  if (answer === 'Yes') {
    sprintRedirect(res, sprint, 'do-you-know-nhs-number-parent')
  } else {
    sprintRedirect(res, sprint, 'are-you-planning-register')
  }
})


// =====================================================
// DO YOU KNOW NHS NUMBER (PARENT)
// =====================================================

// GET
router.get('/:sprint/do-you-know-nhs-number-parent', (req, res) => {
  res.render(`gp-registration/${req.params.sprint}/do-you-know-nhs-number-parent`, {
    data: req.session.data || {}
  })
})

// POST
router.post('/:sprint/do-you-know-nhs-number-parent-answer', (req, res) => {
  const sprint = req.params.sprint
  const answer = req.body['know-nhs-number-parent']
  req.session.data['know-nhs-number-parent'] = answer

  // If returning from check answers
  if (req.session.data['return'] === 'true') {
    req.session.data['return'] = ''
    return sprintRedirect(res, sprint, 'check-answers-1')
  }

  if (answer === 'Yes') {
    sprintRedirect(res, sprint, 'what-is-your-nhs-number-parent')
  } else {
    sprintRedirect(res, sprint, 'are-you-planning-register')
  }
})


// =====================================================
// ARE YOU PLANNING TO REGISTER
// =====================================================

// GET
router.get('/:sprint/are-you-planning-register', (req, res) => {
  res.render(`gp-registration/${req.params.sprint}/are-you-planning-register`, {
    data: req.session.data || {}
  })
})

// POST
router.post('/:sprint/are-you-planning-register-answer', (req, res) => {
  const sprint = req.params.sprint
  const answer = req.body['are-you-planning-register']
  req.session.data['are-you-planning-register'] = answer

  // If returning from check answers
  if (req.session.data['return'] === 'true') {
    req.session.data['return'] = ''
    return sprintRedirect(res, sprint, 'check-answers-1')
  }

  if (answer === 'Yes') {
    sprintRedirect(res, sprint, 'apply-self-first')
  } else {
    sprintRedirect(res, sprint, 'carer-details')
  }
})


// =================
// APPLY SELF FIRST
// =================

// GET
router.get('/:sprint/apply-self-first', (req, res) => {
  res.render(`gp-registration/${req.params.sprint}/apply-self-first`, {
    data: req.session.data || {}
  })
})

// POST
router.post('/:sprint/apply-self-first-answer', (req, res) => {
  const sprint = req.params.sprint
  const answer = req.body['apply-self']
  req.session.data['apply-self'] = answer

  // If returning from check answers
  if (req.session.data['return'] === 'true') {
    req.session.data['return'] = ''
    return sprintRedirect(res, sprint, 'check-answers-1')
  }

  if (answer === 'registerSelf') {
    sprintRedirect(res, sprint, 'start')
  } else if (answer === 'continue') {
    sprintRedirect(res, sprint, 'carer-details')
  }
})



// ===========================
// WHAT SCHOOLING DO YOU HAVE
// ===========================

// GET
router.get('/:sprint/what-schooling-do-you-have', (req, res) => {
  res.render(`gp-registration/${req.params.sprint}/what-schooling-do-you-have`, {
    data: req.session.data || {}
  })
})

// POST
router.post('/:sprint/what-schooling-do-you-have-answer', (req, res) => {
  const sprint = req.params.sprint
  let schooling = req.body['schooling']

  // Ensure schooling is always an array
  if (!Array.isArray(schooling)) {
    schooling = [schooling]
  }

  req.session.data['schooling'] = schooling

  // If returning from check answers
  if (req.session.data['return'] === 'true') {
    req.session.data['return'] = ''
    return sprintRedirect(res, sprint, 'check-answers-1')
  }

  // Routing logic
  if (schooling.includes('None')) {
    sprintRedirect(res, sprint, 'professional-involvement')
  } else {
    sprintRedirect(res, sprint, 'schooling-details')
  }
})


// ============================
// STUDENT - ARE YOU A STUDENT
// ============================

// GET
router.get('/:sprint/student-are-you-student', (req, res) => {
  res.render(`gp-registration/${req.params.sprint}/student-are-you-student`, {
    data: req.session.data || {}
  })
})

// POST
router.post('/:sprint/student-are-you-student-answer', (req, res) => {
  const sprint = req.params.sprint
  const answer = req.body['are-you-student']
  req.session.data['are-you-student'] = answer

  // If returning from check answers
  if (req.session.data['return'] === 'true') {
    req.session.data['return'] = ''
    return sprintRedirect(res, sprint, 'check-answers-b')
  }

  if (answer === 'Yes') {
    sprintRedirect(res, sprint, 'student-do-you-know-student-number')
  } else {
    sprintRedirect(res, sprint, 'do-you-current-address')
  }
})


// =====================================
// STUDENT - DO YOU KNOW STUDENT NUMBER
// =====================================

// GET
router.get('/:sprint/student-do-you-know-student-number', (req, res) => {
  res.render(`gp-registration/${req.params.sprint}/student-do-you-know-student-number`, {
    data: req.session.data || {}
  })
})

// POST
router.post('/:sprint/student-do-you-know-student-number-answer', (req, res) => {
  const sprint = req.params.sprint
  const answer = req.body['do-you-student-id']
  req.session.data['do-you-student-id'] = answer

  // If returning from check answers
  if (req.session.data['return'] === 'true') {
    req.session.data['return'] = ''
    return sprintRedirect(res, sprint, 'check-answers-b')
  }

  if (answer === 'Yes') {
    sprintRedirect(res, sprint, 'student-what-is-your-student-number')
  } else {
    sprintRedirect(res, sprint, 'student-course-end-date')
  }
})


// =================================================
// STUDENT - WHAT IS YOUR CURRENT ADDRESS SELECTION 
// =================================================

// GET
router.get('/:sprint/student-what-is-your-current-address-selection', (req, res) => {
  res.render(`gp-registration/${req.params.sprint}/student-what-is-your-current-address-selection`, {
    data: req.session.data || {}
  })
})

// POST
router.post('/:sprint/student-what-is-your-current-address-selection-answer', (req, res) => {
  const sprint = req.params.sprint
  const answer = req.body['student-select-current-address']
  req.session.data['student-select-current-address'] = answer

  // If returning from check answers
  if (req.session.data['return'] === 'true') {
    req.session.data['return'] = ''
    return sprintRedirect(res, sprint, 'check-answers-b')
  }

  if (answer === 'I cannot find the address on the list') {
    sprintRedirect(res, sprint, 'student-what-is-your-current-address-manual')
  } else {
    sprintRedirect(res, sprint, 'student-do-you-room-number')
  }
})


// ======================================
// STUDENT - WHAT IS YOUR ADDRESS MANUAL 
// ======================================

// GET
router.get('/:sprint/student-what-is-your-current-address-manual', (req, res) => {
  res.render(`gp-registration/${req.params.sprint}/student-what-is-your-current-address-manual`, {
    data: req.session.data || {}
  })
})

// POST
router.post('/:sprint/student-what-is-your-current-address-manual-answer', (req, res) => {
  const sprint = req.params.sprint

  // Save the manually entered address fields to session
  req.session.data['manual-address-line-1'] = req.body['manual-address-line-1']
  req.session.data['manual-address-line-2'] = req.body['manual-address-line-2']
  req.session.data['manual-address-town'] = req.body['manual-address-town']
  req.session.data['manual-address-postcode'] = req.body['manual-address-postcode']
  req.session.data['manual-address-country'] = req.body['manual-address-country']

  // If returning from check answers
  if (req.session.data['return'] === 'true') {
    req.session.data['return'] = ''
    return sprintRedirect(res, sprint, 'check-answers-b')
  }

  // Conditional routing based on previous answers
  let nextPage = ''
  if (req.session.data['out-of-area'] === 'out-of-area') {
    nextPage = 'current-address-out-of-area'
  } else if (req.session.data['user-auth'] === 'p9') {
    nextPage = 'confirm-contact-details'
  } else {
    nextPage = 'how-can-we-contact-inputs'
  }

  sprintRedirect(res, sprint, nextPage)
})


// ====================================
// STUDENT - DO YOU HAVE A ROOM NUMBER
// ====================================

// GET
router.get('/:sprint/student-do-you-room-number', (req, res) => {
  res.render(`gp-registration/${req.params.sprint}/student-do-you-room-number`, {
    data: req.session.data || {}
  })
})

// POST
router.post('/:sprint/student-do-you-room-number-answer', (req, res) => {
  const sprint = req.params.sprint
  const answer = req.body['student-do-you-room-number']

  req.session.data['student-do-you-room-number'] = answer

  // If returning from check answers
  if (req.session.data['return'] === 'true') {
    req.session.data['return'] = ''
    return sprintRedirect(res, sprint, 'check-answers-b')
  }

  if (answer === 'Yes') {
    sprintRedirect(res, sprint, 'student-what-is-your-room-number')
  } else {
    sprintRedirect(res, sprint, 'how-can-we-contact-inputs')
  }
})



module.exports = router;

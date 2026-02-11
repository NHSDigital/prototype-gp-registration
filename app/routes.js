// External dependencies
const express = require('express');
const router = express.Router();
const radioButtonRedirect = require('radio-button-redirect')
const moment=require('moment')
moment.locale("en-gb")
router.use(radioButtonRedirect)

// Add your routes here - above the module.exports line

require("./views/live/routes.js")(router);
require("./views/design/routes.js")(router);
require("./views/gp-registration/sprint-21/routes.js")(router);


router.use((req, res, next) => {
  const log = {
    method: req.method,
    url: req.originalUrl,
    data: req.session.data
  }
  // you can enable this in your .env file
  if (process.env.LOGGING === 'TRUE') {
    console.log(JSON.stringify(log, null, 2))
  }
  next()
})



// Who is registering branch
// router.post('*/who-is-registering-answer/', function (req, res) {

  // Make a variable and give it the value from 'juggling-balls'
  // var registee = req.session.data['who-is-registering']

  // Check whether the variable matches a condition
  // if (registee == "You"){
    // Send user to next page
   // res.redirect('continue-with-nhs-login')
  // } else {
    // Send user to ineligible page
   // res.redirect('continue-with-nhs-login')
  // }

 // })



 
// Does user have NHS login acc
router.post('*/nhs-login-found-answer/', function (req, res) {

  // Make a variable and give it the value from 'juggling-balls'
  var nhsAcc = req.session.data['nhs-acc']

  // Check whether the variable matches a condition
  if (nhsAcc == "yes"){
    // Send user to next page
    res.redirect('nhs-login-password')
  } else {
    // Send user to ineligible page
    res.redirect('do-you-know-nhs-number')
  }

})


// // Does user have no Address
// router.post('*/what-is-your-current-address/', function (req, res) {
//
//   // Make a variable and give it the value from 'juggling-balls'
//   var noAddress = req.session.data['what-is-your-current-address']
//
//   // Check whether the variable matches a condition
//   if (noAddress == "no-current-address"){
//     // Send user to next page
//     res.redirect('do-you-know-nhs-number')
//   } else {
//     // Send user to ineligible page
//     res.redirect('what-is-your-gp-address')
//
//   }
//
// })

// Does user have NHS login
router.post('*/nhs-login-answer/', function (req, res) {

  // Make a variable and give it the value from 'juggling-balls'
  var hasLogin = req.session.data['nhs-login']

  // Check whether the variable matches a condition
  if (hasLogin == "Yes"){
    // Send user to next page
    res.redirect('nhs-login-email-address')
  } else {
    // Send user to ineligible page
    res.redirect('do-you-know-nhs-number')
  }

})

// // Does user know NHS Number branch
// router.post('*/what-is-your-nhs-number-answer/', function (req, res) {
//
//   // Make a variable and give it the value from 'juggling-balls'
//   var nhsNumKnown = req.session.data['know-nhs-number']
//
//   // Check whether the variable matches a condition
//   if (nhsNumKnown == "Yes"){
//     // Send user to next page
//     res.redirect('what-is-your-nhs-number')
//   } else {
//     // Send user to next page they can answer
//     res.redirect('what-is-your-gender')
//   }
//
// })

// // Does user know Current address
// router.post('*/current-address-answer/', function (req, res) {
//
//   // Make a variable and give it the value from 'juggling-balls'
//   var currAddress = req.session.data['current-address']
//
//   // Check whether the variable matches a condition
//   if (currAddress == "Yes"){
//     // Send user to next page
//     res.redirect('is-your-current-address-different')
//   } else {
//     // Send user to next page they can answer
//     res.redirect('what-is-your-current-address')
//   }
//
// })

// // Does user know Current GP
// router.post('*/current-gp-answer/', function (req, res) {
//
//   // Make a variable and give it the value from 'juggling-balls'
//   var currGP = req.session.data['current-gp']
//
//   // Check whether the variable matches a condition
//   if (currGP == "yes"){
//     // Send user to next page
//     res.redirect('how-do-you-normally-collect-your-prescriptions')
//   } else {
//     // Send user to next page they can answer
//     res.redirect('what-is-your-gp-address')
//   }
//
// })

// // Is your current address differet to the one held?
// router.post('*/different-current-address-answer/', function (req, res) {
//
//   // Make a variable and give it the value from 'juggling-balls'
//   var diffAddress = req.session.data['different-current-address']
//
//   // Check whether the variable matches a condition
//   if (diffAddress == "Yes"){
//     // Send user to next page
//     res.redirect('what-is-your-phone-number')
//   } else {
//     // Send user to next page they can answer
//     res.redirect('what-is-your-previous-address')
//   }
//
// })

// Does user have communication needs
router.post('*/do-you-have-communication-needs-answer/', function (req, res) {

  // Make a variable and give it the value from 'juggling-balls'
  var communicationNeeds = req.session.data['has-communication-needs']

  // Check whether the variable matches a condition
  if (communicationNeeds == "Yes"){
    // Send user to next page
    res.redirect('what-are-your-communication-needs')
  } else {
    // Send user to next page they can answer
    res.redirect('previous-gp-details')
  }

})

// Does user need a dispensing doctor
router.post('*/how-do-you-collect-prescriptions-answer/', function (req, res) {

  // Make a variable and give it the value from 'juggling-balls'
  var dispensingMethod = req.session.data['how-do-you-collect-prescriptions']

  // Check whether the variable matches a condition
  if (dispensingMethod == "GP"){
    // Send user to next page
    res.redirect('distance-from-nearest-pharmacy')
  } else {
    // Send user to next page they can answer
    res.redirect('emergency-contact-details')
  }

})

// Does user have existing medical conditions

router.post('*/do-you-have-existing-conditions-answer/', function (req, res) {

  // Make a variable and give it the value from 'juggling-balls'
  var existingCondition = req.session.data['has-existing-conditions']

  // Check whether the variable matches a condition
  if (existingCondition == "Yes"){
    // Send user to next page
    res.redirect('what-existing-conditions-do-you-have')
  } else {
    // Send user to next page they can answer
    res.redirect('do-you-have-allergies')
  }

})



// Does user have allergies

router.post('*/do-you-have-allergies-answer/', function (req, res) {

  // Make a variable and give it the value from 'juggling-balls'
  var existingCondition = req.session.data['has-allergies']

  // Check whether the variable matches a condition
  if (existingCondition == "Yes"){
    // Send user to next page
    res.redirect('allergies-details')
  } else {
    // Send user to next page they can answer
    res.redirect('do-you-have-any-mental-health-conditions')
  }

})

// Does user have mental health conditions

router.post('*/do-you-have-mental-health-conditions-answer/', function (req, res) {

  // Make a variable and give it the value from 'juggling-balls'
  var existingCondition = req.session.data['has-mental-health-conditions']

  // Check whether the variable matches a condition
  if (existingCondition == "Yes"){
    // Send user to next page
    res.redirect('mental-health-conditions-details')
  } else {
    // Send user to next page they can answer
    res.redirect('do-you-have-any-disabilities')
  }

})

// Does user have disabilities

router.post('*/do-you-have-disabilities-answer/', function (req, res) {

  // Make a variable and give it the value from 'juggling-balls'
  var hasDisabilities = req.session.data['has-disabilities']

  // Check whether the variable matches a condition
  if (hasDisabilities == "Yes"){
    // Send user to next page
    res.redirect('disabilities-details')
  } else {
    // Send user to next page they can answer
    res.redirect('do-you-take-prescription-medication')
  }

})

// Does user take medication

router.post('*/do-you-take-prescription-medication-answer/', function (req, res) {

  // Make a variable and give it the value from 'juggling-balls'
  var takesMeds = req.session.data['takes-prescription-meds']

  // Check whether the variable matches a condition
  if (takesMeds == "Yes"){
    // Send user to next page
    res.redirect('medication-details')
  } else {
    // Send user to next page they can answer
    res.redirect('do-you-have-a-preferred-pharmacy')
  }

})

// Does user have family history of medications

router.post('*/do-you-have-family-history-of-conditions-answer/', function (req, res) {

  // Make a variable and give it the value from 'juggling-balls'
  var hasFamilyHistory = req.session.data['has-family-medical-history']

  // Check whether the variable matches a condition
  if (hasFamilyHistory == "Yes"){
    // Send user to next page
    res.redirect('what-family-conditions-do-you-have')
  } else {
    // Send user to next page they can answer
    res.redirect('what-is-your-ethnicity')
  }

})


router.post("*/check-schooling", function(req,res) {
  var schooling = req.session.data["schooling"];
  console.log('check-schooling')
  // Check whether the variable matches a condition
  if (schooling == "None"){
    // Send user to next page
    res.redirect("professional-involvement");
  }
  if (
    schooling == "School" ||
    schooling == "Nursery" ||
    schooling == "Homeschool" ||
    schooling == "School","Nursery" ||
    schooling == "School","Nursery","Homeschool" ||
    schooling == "School","Homeschool" ||
    schooling == "Nursery","Homeschool"
  ) {
    // Send user to add details page
    res.redirect("schooling-details");
  }
})




// //console.log('looking up age!')
// router.post('*/check-age', function (req, res) {
//
//   // Make
//   var emergencyContact = req.session.data['emergency-contact']
//   if (emergencyContact == 'Yes'){
//     res.redirect('../section-2/emergency-contact-details')
//   }
//   var dob = req.session.data['dob-year']+ '-'+ req.session.data['dob-month']+ '-'+ req.session.data['dob-day']
//   var years = moment().diff(dob, 'years');
//   console.log(`number of years ${years}`)
//   console.log('looking up age')
//   // Check whether the variable matches a condition
//   if (years <= 18) {
//     // Send user to immunisation page
//     res.redirect('../section-3/are-you-immunised')
//   } else {
//     // Send user to next page
//     res.redirect('../section-3/do-you-have-existing-conditions')
//   }
//
// });




// //console.log('looking up age!')
// router.post('*/check-age-2', function (req, res) {
//
//   // Make
//   var dob = req.session.data['dob-year']+ '-'+ req.session.data['dob-month']+ '-'+ req.session.data['dob-day']
//   var emergencyContact = req.session.data['emergency-contact']
//   var years = moment().diff(dob, 'years');
//   console.log(`number of years ${years}`)
//   console.log('looking up age')
//   // Check whether the variable matches a condition
//   if (years <= 18) {
//     // Send user to immunisation page
//     res.redirect('../section-3/are-you-immunised')
//   } else {
//     // Send user to next page
//     res.redirect('../section-2/are-you-returning-from-overseas')
//   }
//
// });


// EHIC Dec

//console.log('looking up age!')
router.post('*/check-age-3', function (req, res) {

  // Make
  var dob = req.session.data['dob-year']+ '-'+ req.session.data['dob-month']+ '-'+ req.session.data['dob-day']
  var overseasDecehic = req.session.data['overseas-declaration-ehic']
  var years = moment().diff(dob, 'years');
  console.log(`number of years ${years}`)
  console.log('looking up age')
  // Check whether the variable matches a condition
  if (years <= 18) {
    // Send user to immunisation page
    res.redirect('/sprint-12/section-3/are-you-immunised')
  } else {
    // Send user to next page
    res.redirect('/sprint-12/section-3/do-you-have-existing-conditions')
  }

});

// Nodocs Dec

//console.log('looking up age!')
router.post('*/check-age-3', function (req, res) {

  // Make
  var dob = req.session.data['dob-year']+ '-'+ req.session.data['dob-month']+ '-'+ req.session.data['dob-day']
  var overseasDecehic = req.session.data['overseas-declaration-nodocs']
  var years = moment().diff(dob, 'years');
  console.log(`number of years ${years}`)
console.log('looking up age')
  // Check whether the variable matches a condition
  if (years <= 18) {
    // Send user to immunisation page
    res.redirect('/sprint-12/section-3/are-you-immunised')
  } else {
    // Send user to next page
    res.redirect('/sprint-12/section-3/do-you-have-existing-conditions')
  }

});

// None eu Dec

//console.log('looking up age!')
router.post('*/check-age-3', function (req, res) {

  // Make
  var dob = req.session.data['dob-year']+ '-'+ req.session.data['dob-month']+ '-'+ req.session.data['dob-day']
  var overseasDecehic = req.session.data['overseas-declaration-none-eu']
  var years = moment().diff(dob, 'years');
  console.log(`number of years ${years}`)
console.log('looking up age')
  // Check whether the variable matches a condition
  if (years <= 18) {
    // Send user to immunisation page
    res.redirect('/sprint-12/section-3/are-you-immunised')
  } else {
    // Send user to next page
    res.redirect('/sprint-12/section-3/do-you-have-existing-conditions')
  }

});

// S1 Dec

//console.log('looking up age!')
router.post('*/check-age-3', function (req, res) {

  // Make
  var dob = req.session.data['dob-year']+ '-'+ req.session.data['dob-month']+ '-'+ req.session.data['dob-day']
  var overseasDecehic = req.session.data['overseas-declaration-s1']
  var years = moment().diff(dob, 'years');
  console.log(`number of years ${years}`)
  console.log('looking up age')
  // Check whether the variable matches a condition
  if (years <= 18) {
    // Send user to immunisation page
    res.redirect('/sprint-12/section-3/are-you-immunised')
  } else {
    // Send user to next page
    res.redirect('/sprint-12/section-3/do-you-have-existing-conditions')
  }

});

// Schooling

//console.log('looking up age!')
router.post('*/check-age-4', function (req, res) {

  // Make
  var dob = req.session.data['dob-year']+ '-'+ req.session.data['dob-month']+ '-'+ req.session.data['dob-day']
  var contactInfo = req.session.data['how-can-we-contact-inputs']
  var years = moment().diff(dob, 'years');
  console.log(`number of years ${years}`)
  console.log('looking up age')
  // Check whether the variable matches a condition
  if (years <= 18) {
    // Send user to schooling
    res.redirect('/sprint-12/section-2/what-schooling-do-you-have')
  } else {
    // Send user to next page
    res.redirect('/sprint-12/section-2/what-is-your-gender')
  }

});

router.post("/*/check-postcode", function (req, res) {
  var postcode = (req.session.data["find-current-address"]);
  console.log("postcode check " + postcode)
  if(postcod.toUpperCase()=="LS28 7FG"){
    res.redirect("/sprint-12/section-2/dispencing-surgery")
  }
  res.redirect("/sprint-12/section-2/nominate-pharmacy")
});

router.post("/gp-reg-integration/section-2/check-postcode-integration", function (req, res) {
  var postcode = (req.session.data["find-current-address"]);
  console.log("postcode check " + postcode)
  if(postcod.toUpperCase()=="LS28 7FG"){
    res.redirect("/gp-reg-integration/section-2/dispencing-surgery")
  }
  res.redirect("/gp-reg-integration/section-2/nominate-pharmacy")
});

router.post("/*/check-postcode-2", function (req, res) {
  var interpreterNeed = req.session.data['interpreter']
  console.log("interpreter " + interpreterNeed)
  if (interpreterNeed == 'yes'){
    res.redirect('../section-2/do-you-need-a-interpreter-language')

  }
 else {
    var postcode = (req.session.data["find-current-address"]);
    if (postcode == undefined){
    res.redirect("/sprint-12/section-2/nominate-pharmacy")
   }

    console.log("postcode check2 " + postcode)
     if (postcode.toUpperCase()== "LS28 7FG"){
     res.redirect("/sprint-12/section-2/dispencing-surgery")
     }
     res.redirect("/sprint-12/section-2/nominate-pharmacy")
  }
});

router.post("/gp/design/gp-patient-access-post", function (req, res) {
  let access = req.session.data['access']
  // if a user swiches of the notifications
  if (access === 'Off' || access === 'Unique url only'){
    // set a data item to use to conditionally show the modal
    res.redirect('/gp/design/gp-patient-access-info')
  } else {
    // return the user to the branch page
    res.redirect('/gp/design/gp-branch')
  }
});

router.post("/gp/design/gp-patient-access-info-post", function (req, res) {
  req.session.data['notifyModal'] = "show"
  // then return the user to the branch page
  res.redirect('/gp/design/gp-branch')
});

router.post("/gp/gp-notify-patient-post", function (req, res) {
  let notify = req.session.data['use-nap']

  // if a user swiches of the notifications
  if (notify === 'No'){
    // set a data item to use to conditionally show the modal
    req.session.data['notifyModal'] = "show"
  }
  // then return the user to the branch page
  res.redirect('/gp/gp-branch')
});

router.post("/gp/design/gp-notify-patient-post", function (req, res) {
  let notify = req.session.data['use-nap']

  // if a user swiches of the notifications
  if (notify === 'No'){
    // set a data item to use to conditionally show the modal
    req.session.data['notifyModal'] = "show"
  }
  // then return the user to the branch page
  res.redirect('/gp/design/gp-branch')
});

// decide to show the modal only when Off has been selected
router.get('/gp/design/gp-branch', function (req, res) {
  let modal = "show"
  if (req.session.data['notifyModal'] === "show") {
    modal = 'true'
  } else {
    // do nothing
    modal = 'false'
  }
  req.session.data['notifyModal'] = "hide"
  return res.render('gp/design/gp-branch', {
    'modal': modal
  })
})

// decide to show the modal only when Off has been selected
router.get('/gp/gp-branch', function (req, res) {
  let modal = "show"
  if (req.session.data['notifyModal'] === "show") {
    modal = 'true'
  } else {
    // do nothing
    modal = 'false'
  }
  req.session.data['notifyModal'] = "hide"
  return res.render('gp/gp-branch', {
    'modal': modal
  })
})




router.post("/gp/gp-auto-accept-patient-post", function (req, res) {
  let autoAccept = req.session.data['use-auto-accept']

  // if a user swiches of the notifications
  if (autoAccept === 'No'){
    // set a data item to use to conditionally show the modal
    req.session.data['autoAcceptModal'] = "show"
  }
  // then return the user to the branch page
  res.redirect('/gp/gp-branch')
});

router.post("/gp/design/gp-auto-accept-patient-post", function (req, res) {
  let autoAccept = req.session.data['use-auto-accept']

  // if a user swiches of the notifications
  if (autoAccept === 'No'){
    // set a data item to use to conditionally show the modal
    req.session.data['notifyModal'] = "show"
  }
  // then return the user to the branch page
  res.redirect('/gp/design/gp-branch')
});

// decide to show the modal only when Off has been selected
router.get('/gp/design/gp-branch', function (req, res) {
  let modal = "show"
  if (req.session.data['notifyModal'] === "show") {
    modal = 'true'
  } else {
    // do nothing
    modal = 'false'
  }
  req.session.data['notifyModal'] = "hide"
  return res.render('gp/design/gp-branch', {
    'modal': modal
  })
})

// decide to show the modal only when Off has been selected
router.get('/gp/gp-branch', function (req, res) {
  let modal = "show"
  if (req.session.data['autoAcceptModal'] === "show") {
    modal = 'true'
  } else {
    // do nothing
    modal = 'false'
  }
  req.session.data['autoAcceptModal'] = "hide"
  return res.render('gp/gp-branch', {
    'modal': modal
  })
})


// Dev Mode - Used to show routing by scenario other than user driven

function devModeRoute(req, res, next) {
  if (!req.session.data["devMode"]) {
    console.log("no data found");
    var devMode = req.query.devMode;
    if (devMode === "true") {
      console.log("devmode detected");
      req.session.data["devMode"] = "true";
      console.log("local storage updated");
    } else {
      console.log("devmode not detected");
    }
  } else {
    console.log("data found and set to " + req.session.data["devMode"]);
  }
  next();
}

router.get("/*", devModeRoute);

module.exports = router;

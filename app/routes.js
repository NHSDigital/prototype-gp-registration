// External dependencies
const express = require('express');
const router = express.Router();
const radioButtonRedirect = require('radio-button-redirect')
const moment=require('moment')
router.use(radioButtonRedirect)

// Add your routes here - above the module.exports line

// Who is registering branch
router.post('*/who-is-registering-answer/', function (req, res) {

  // Make a variable and give it the value from 'juggling-balls'
  var registee = req.session.data['who-is-registering']

  // Check whether the variable matches a condition
  if (registee == "You"){
    // Send user to next page
    res.redirect('continue-with-nhs-login')
  } else {
    // Send user to ineligible page
    res.redirect('continue-with-nhs-login')
  }

})

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

// Does user have an emergency contact

router.post('*/emergency-contact-details/', function (req, res) {

  // Make a variable and give it the value from 'juggling-balls'
  var emergencyContact = req.session.data['emergency-contact']

  // Check whether the variable matches a condition
  if (emergencyContact == "Yes"){
    // Send user to next page
    res.redirect('emergency-contact-details')
  } else {
    // Send user to next page they can answer
    res.redirect('review-about-you-answers')
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


router.post("*/check-schooling", function(req, res) {
  var schooling = req.session.data["schooling"];
  console.log('check-schooling')
  // Check whether the variable matches a condition
  if (
    schooling == "school" ||
    schooling == "nursery" ||
    schooling == "homeschool" ||
    schooling == "school","nursery" ||
    schooling == "school","nursery","homeschool" ||
    schooling == "school","homeschool" ||
    schooling == "nursery","homeschool" 
  ) {
    // Send user to add details page
    res.redirect("schooling-details");
  } else {
    // Send user to next page
    res.redirect("professional-involvement");
  }
})
//console.log('looking up age!')
router.post('*/check-age', function (req, res) {

  // Make 
  var dob = req.session.data['dob-year']+ '-'+ req.session.data['dob-month']+ '-'+ req.session.data['dob-day']
  var youngEnough = req.session.data['dob-year']
  var emergencyContact = req.session.data['yes']
  var years = moment().diff(dob, 'years');
  console.log(`number of years ${years}`)
console.log('looking up age')
  // Check whether the variable matches a condition
  if (years <= 18) {
    // Send user to immunisation page
    res.redirect('../section-3/are-you-immunised')
  } else {
    // Send user to next page 
    res.redirect('../section-3/do-you-have-existing-conditions')
  }

});

module.exports = router;

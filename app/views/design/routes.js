// External dependencies
const moment=require('moment')
moment.locale("en-gb")

// Add your routes here - above the module.exports line

module.exports = (router) => {

  // Who is registering branch
  router.post('/design/who-is-registering-answer/', function (req, res) {

    // Make a variable and give it the value from 'juggling-balls'
    var registee = req.session.data['who-is-being-registered']

    // Check whether the variable matches a condition
    if (registee === "myself"){
      // Send user to next page
      res.redirect('/design/what-is-your-email')
    } else {
      // Send user to ineligible page
      res.redirect('/design/relation-of-dependant')
    }

  })

// Does user have NHS login acc
  router.post('/design/nhs-login-found-answer/', function (req, res) {

    // Make a variable and give it the value from 'juggling-balls'
    var nhsAcc = req.session.data['nhs-acc']

    // Check whether the variable matches a condition
    if (nhsAcc === "yes"){
      // Send user to next page
      res.redirect('/design/nhs-login-password')
    } else {
      // Send user to ineligible page
      res.redirect('/design/do-you-know-nhs-number')
    }

  })


// // Does user have no Address
// router.post('/design/what-is-your-current-address/', function (req, res) {
//
//   // Make a variable and give it the value from 'juggling-balls'
//   var noAddress = req.session.data['what-is-your-current-address']
//
//   // Check whether the variable matches a condition
//   if (noAddress == "no-current-address"){
//     // Send user to next page
//     res.redirect('/design/do-you-know-nhs-number')
//   } else {
//     // Send user to ineligible page
//     res.redirect('/design/what-is-your-gp-address')
//
//   }
//
// })

// Does user have NHS login
  router.post('/design/nhs-login-answer/', function (req, res) {

    // Make a variable and give it the value from 'juggling-balls'
    var hasLogin = req.session.data['nhs-login']

    // Check whether the variable matches a condition
    if (hasLogin == "Yes"){
      // Send user to next page
      res.redirect('/design/nhs-login-email-address')
    } else {
      // Send user to ineligible page
      res.redirect('/design/do-you-know-nhs-number')
    }

  })

// // Does user know NHS Number branch
// router.post('/design/what-is-your-nhs-number-answer/', function (req, res) {
//
//   // Make a variable and give it the value from 'juggling-balls'
//   var nhsNumKnown = req.session.data['know-nhs-number']
//
//   // Check whether the variable matches a condition
//   if (nhsNumKnown == "Yes"){
//     // Send user to next page
//     res.redirect('/design/what-is-your-nhs-number')
//   } else {
//     // Send user to next page they can answer
//     res.redirect('/design/what-is-your-gender')
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
//     res.redirect('/design/is-your-current-address-different')
//   } else {
//     // Send user to next page they can answer
//     res.redirect('/design/what-is-your-current-address')
//   }
//
// })

// // Does user know Current GP
// router.post('/design/current-gp-answer/', function (req, res) {
//
//   // Make a variable and give it the value from 'juggling-balls'
//   var currGP = req.session.data['current-gp']
//
//   // Check whether the variable matches a condition
//   if (currGP == "yes"){
//     // Send user to next page
//     res.redirect('/design/how-do-you-normally-collect-your-prescriptions')
//   } else {
//     // Send user to next page they can answer
//     res.redirect('/design/what-is-your-gp-address')
//   }
//
// })

// // Is your current address differet to the one held?
// router.post('/design/different-current-address-answer/', function (req, res) {
//
//   // Make a variable and give it the value from 'juggling-balls'
//   var diffAddress = req.session.data['different-current-address']
//
//   // Check whether the variable matches a condition
//   if (diffAddress == "Yes"){
//     // Send user to next page
//     res.redirect('/design/what-is-your-phone-number')
//   } else {
//     // Send user to next page they can answer
//     res.redirect('/design/what-is-your-previous-address')
//   }
//
// })

// Does user have communication needs
  router.post('/design/do-you-have-communication-needs-answer/', function (req, res) {

    // Make a variable and give it the value from 'juggling-balls'
    var communicationNeeds = req.session.data['has-communication-needs']

    // Check whether the variable matches a condition
    if (communicationNeeds == "Yes"){
      // Send user to next page
      res.redirect('/design/what-are-your-communication-needs')
    } else {
      // Send user to next page they can answer
      res.redirect('/design/previous-gp-details')
    }

  })

// Does user need a dispensing doctor
  router.post('/design/how-do-you-collect-prescriptions-answer/', function (req, res) {

    // Make a variable and give it the value from 'juggling-balls'
    var dispensingMethod = req.session.data['how-do-you-collect-prescriptions']

    // Check whether the variable matches a condition
    if (dispensingMethod == "GP"){
      // Send user to next page
      res.redirect('/design/distance-from-nearest-pharmacy')
    } else {
      // Send user to next page they can answer
      res.redirect('/design/emergency-contact-details')
    }

  })

// Does user have existing medical conditions

  router.post('/design/do-you-have-existing-conditions-answer/', function (req, res) {

    // Make a variable and give it the value from 'juggling-balls'
    var existingCondition = req.session.data['has-existing-conditions']

    // Check whether the variable matches a condition
    if (existingCondition == "Yes"){
      // Send user to next page
      res.redirect('/design/what-existing-conditions-do-you-have')
    } else {
      // Send user to next page they can answer
      res.redirect('/design/do-you-have-allergies')
    }

  })



// Does user have allergies

  router.post('/design/do-you-have-allergies-answer/', function (req, res) {

    // Make a variable and give it the value from 'juggling-balls'
    var existingCondition = req.session.data['has-allergies']

    // Check whether the variable matches a condition
    if (existingCondition == "Yes"){
      // Send user to next page
      res.redirect('/design/allergies-details')
    } else {
      // Send user to next page they can answer
      res.redirect('/design/do-you-have-any-mental-health-conditions')
    }

  })

// Does user have mental health conditions

  router.post('/design/do-you-have-mental-health-conditions-answer/', function (req, res) {

    // Make a variable and give it the value from 'juggling-balls'
    var existingCondition = req.session.data['has-mental-health-conditions']

    // Check whether the variable matches a condition
    if (existingCondition == "Yes"){
      // Send user to next page
      res.redirect('/design/mental-health-conditions-details')
    } else {
      // Send user to next page they can answer
      res.redirect('/design/do-you-have-any-disabilities')
    }

  })

// Does user have disabilities

  router.post('/design/do-you-have-disabilities-answer/', function (req, res) {
    // Make a variable and give it the value from 'juggling-balls'
    var hasDisabilities = req.session.data['has-disabilities']

    // Check whether the variable matches a condition
    if (hasDisabilities == "Yes"){
      // Send user to next page
      res.redirect('/design/disabilities-details')
    } else {
      // Send user to next page they can answer
      res.redirect('/design/do-you-take-prescription-medication')
    }
  })

// Does user take medication

  router.post('/design/do-you-take-prescription-medication-answer/', function (req, res) {
    // Make a variable and give it the value from 'juggling-balls'
    var takesMeds = req.session.data['takes-prescription-meds']

    // Check whether the variable matches a condition
    if (takesMeds == "Yes"){
      // Send user to next page
      res.redirect('/design/medication-details')
    } else {
      // Send user to next page they can answer
      res.redirect('/design/do-you-have-a-preferred-pharmacy')
    }
  })

// Does user have family history of medications

  router.post('/design/do-you-have-family-history-of-conditions-answer/', function (req, res) {
    // Make a variable and give it the value from 'juggling-balls'
    var hasFamilyHistory = req.session.data['has-family-medical-history']

    // Check whether the variable matches a condition
    if (hasFamilyHistory == "Yes"){
      // Send user to next page
      res.redirect('/design/what-family-conditions-do-you-have')
    } else {
      // Send user to next page they can answer
      res.redirect('/design/what-is-your-ethnicity')
    }
  })

  router.post("/design/check-schooling", function(req,res) {
    var schooling = req.session.data["schooling"];
    console.log('check-schooling')
    // Check whether the variable matches a condition
    if (schooling == "None"){
      // Send user to next page
      res.redirect("/design/professional-involvement");
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
      res.redirect("/design/schooling-details");
    }
  })

// EHIC Dec

  router.post('/design/check-age-3', function (req, res) {
    var dob = req.session.data['dob-year']+ '-'+ req.session.data['dob-month']+ '-'+ req.session.data['dob-day']
    var overseasDecehic = req.session.data['overseas-declaration-ehic']
    var years = moment().diff(dob, 'years');
    console.log(`number of years ${years}`)
    console.log('looking up age')
    // Check whether the variable matches a condition
    if (years <= 18) {
      // Send user to immunisation page
      res.redirect('/design/are-you-immunised')
    } else {
      // Send user to next page
      res.redirect('/design/do-you-have-existing-conditions')
    }
  });

// Nodocs Dec

  router.post('/design/check-age-3', function (req, res) {
    var dob = req.session.data['dob-year']+ '-'+ req.session.data['dob-month']+ '-'+ req.session.data['dob-day']
    var overseasDecehic = req.session.data['overseas-declaration-nodocs']
    var years = moment().diff(dob, 'years');
    console.log(`number of years ${years}`)
    console.log('looking up age')
    // Check whether the variable matches a condition
    if (years <= 18) {
      // Send user to immunisation page
      res.redirect('/design/are-you-immunised')
    } else {
      // Send user to next page
      res.redirect('/design/do-you-have-existing-conditions')
    }
  });

// None eu Dec

  router.post('/design/check-age-3', function (req, res) {
    var dob = req.session.data['dob-year']+ '-'+ req.session.data['dob-month']+ '-'+ req.session.data['dob-day']
    var overseasDecehic = req.session.data['overseas-declaration-none-eu']
    var years = moment().diff(dob, 'years');
    console.log(`number of years ${years}`)
    console.log('looking up age')
    // Check whether the variable matches a condition
    if (years <= 18) {
      // Send user to immunisation page
      res.redirect('/design/are-you-immunised')
    } else {
      // Send user to next page
      res.redirect('/design/do-you-have-existing-conditions')
    }

  });

// S1 Dec

  router.post('/design/check-age-3', function (req, res) {
    var dob = req.session.data['dob-year']+ '-'+ req.session.data['dob-month']+ '-'+ req.session.data['dob-day']
    var overseasDecehic = req.session.data['overseas-declaration-s1']
    var years = moment().diff(dob, 'years');
    console.log(`number of years ${years}`)
    console.log('looking up age')
    // Check whether the variable matches a condition
    if (years <= 18) {
      // Send user to immunisation page
      res.redirect('/design/are-you-immunised')
    } else {
      // Send user to next page
      res.redirect('/design/do-you-have-existing-conditions')
    }
  });

// Schooling

//console.log('looking up age!')
  router.post('/design/check-age-4', function (req, res) {
    var dob = req.session.data['dob-year']+ '-'+ req.session.data['dob-month']+ '-'+ req.session.data['dob-day']
    var contactInfo = req.session.data['how-can-we-contact-inputs']
    var years = moment().diff(dob, 'years');
    console.log(`number of years ${years}`)
    console.log('looking up age')
    // Check whether the variable matches a condition
    if (years <= 18) {
      // Send user to schooling
      res.redirect('/design/what-schooling-do-you-have')
    } else {
      // Send user to next page
      res.redirect('/design/what-is-your-gender')
    }
  });

  router.post("/*/check-postcode", function (req, res) {
    var postcode = (req.session.data["find-current-address"]);
    console.log("postcode check " + postcode)
    if(postcod.toUpperCase()=="LS28 7FG"){
      res.redirect("/design/dispencing-surgery")
    }
    res.redirect("/design/nominate-pharmacy")
  });

};
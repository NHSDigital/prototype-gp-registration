// External dependencies
const moment=require('moment')
moment.locale("en-gb")

// Add your routes here - above the module.exports line

module.exports = (router) => {

  // Who is registering branch
  router.post('/live/who-is-registering-answer/', function (req, res) {
    var registee = req.session.data['who-is-being-registered']
    if (registee === "myself"){
      res.redirect('/live/continue-with-nhs-login')
    } else {
      res.redirect('/live/relation-of-dependant')
    }
  })

// Does user have NHS login acc
  router.post('/live/nhs-login-found-answer/', function (req, res) {
    var nhsAcc = req.session.data['nhs-acc']
    if (nhsAcc === "yes"){
      res.redirect('/live/nhs-login-password')
    } else {
      res.redirect('/live/do-you-know-nhs-number')
    }
  })

  // relationship to dependant
  router.post('/live/relation-of-dependant-answer/', function (req, res) {
    var relationship = req.session.data['relation']
    if (req.session.data['return'] === 'true') {
      res.redirect('/live/check-answers-1')
      req.session.data['return'] = ''
    } else {
      if (relationship === "Carer"){
        res.redirect('/live/carer-type')
      } else {
        res.redirect('/live/carer-details')
      }
    }
  })

  // carer details
  router.post('/live/carer-details-answer/', function (req, res) {
    if (req.session.data['return'] === 'true') {
      res.redirect('/live/check-answers-1')
      req.session.data['return'] = ''
    } else {
      res.redirect('/live/what-is-your-name')
    }
  })

// name
  router.post('/live/what-is-your-name-post/', function (req, res) {
    if (req.session.data['return'] === 'true') {
      res.redirect('/live/check-answers-1')
      req.session.data['return'] = ''
    } else {
      res.redirect('/live/what-is-your-date-of-birth')
    }
  })

// Who is registering branch
  router.post('/live/error-too-young-post/', function (req, res) {

    // Make a variable and give it the value from 'juggling-balls'
    var choice = req.session.data['error-age-next']

    // Check whether the variable matches a condition
    if (choice === "dependant"){
      // Send user to next page
      res.redirect('/live/dependant-interuption')
    } else {
      // Send user to ineligible page
      res.redirect('/live/what-is-your-date-of-birth')
    }
  })

// populate data for display later
  router.post('/live/what-is-your-current-address-selection-post', function (req, res) {
    const address = req.session.data['select-current-address']
    if (address === 'address1') {
      req.session.data['address-flat-number-current'] = ''
      req.session.data['address-house-number-current'] = '1'
      req.session.data['address-house-name-current'] = ''
      req.session.data['address-street-current'] = 'Town Street'
      req.session.data['address-city-current'] = 'London'
    } else if (address === 'address2') {
      req.session.data['address-flat-number-current'] = ''
      req.session.data['address-house-number-current'] = '2'
      req.session.data['address-house-name-current'] = ''
      req.session.data['address-street-current'] = 'Town Street'
      req.session.data['address-city-current'] = 'London'
    } else if (address === 'address3') {
      req.session.data['address-flat-number-current'] = ''
      req.session.data['address-house-number-current'] = '3'
      req.session.data['address-house-name-current'] = ''
      req.session.data['address-street-current'] = 'Town Street'
      req.session.data['address-city-current'] = 'London'
    } else if (address === 'address4') {
      req.session.data['address-flat-number-current'] = ''
      req.session.data['address-house-number-current'] = '4'
      req.session.data['address-house-name-current'] = ''
      req.session.data['address-street-current'] = 'Town Street'
      req.session.data['address-city-current'] = 'Leeds'
    } else if (address === 'address5') {
      req.session.data['address-flat-number-current'] = ''
      req.session.data['address-house-number-current'] = '5'
      req.session.data['address-house-name-current'] = ''
      req.session.data['address-street-current'] = 'Town Street'
      req.session.data['address-city-current'] = 'London'
    }
    // where to route to next
    if (req.session.data['out-of-area'] === "out-of-area") {
      res.redirect('current-address-out-of-area')
    } else if (req.session.data['user-auth'] === "p9") {
      res.redirect('confirm-contact-details')
    } else {
      res.redirect('how-can-we-contact-inputs')
    }
  })

// Does user have NHS login
  router.post('/live/nhs-login-answer/', function (req, res) {
    var hasLogin = req.session.data['nhs-login']
    if (hasLogin === "Yes"){
      res.redirect('/live/nhs-login-email-address')
    } else {
      res.redirect('/live/do-you-know-nhs-number')
    }
  })

// routing for dependents
  router.post('/live/how-can-we-contact-inputs-prompt-answer/', function (req, res) {
    var nocontact = req.session.data['no-contact']
    var under18 = req.session.data['under-18-years']
    if (nocontact === "Yes"){
      if (under18 === "true"){
        res.redirect('/live/what-schooling-do-you-have')
      } else {
        res.redirect('/live/what-is-your-sex')
      }
    } else {
      res.redirect('/live/how-can-we-contact-inputs')
    }
  })

// school routing
  router.post("/live/check-schooling", function(req,res) {
    let schooling = req.session.data["schooling"]
    if (schooling[0] === "None" || schooling[0] === undefined){
      res.redirect("/live/professional-involvement")
    } else {
      res.redirect("/live/schooling-details")
    }
  })

// Does user have communication needs
  router.post('/live/do-you-have-communication-needs-answer/', function (req, res) {
    var communicationNeeds = req.session.data['has-communication-needs']
    if (communicationNeeds === "Yes"){
      res.redirect('/live/what-are-your-communication-needs')
    } else {
      res.redirect('/live/previous-gp-details')
    }
  })

// Does user need a dispensing doctor
  router.post('/live/how-do-you-collect-prescriptions-answer/', function (req, res) {
    var dispensingMethod = req.session.data['how-do-you-collect-prescriptions']
    if (dispensingMethod === "GP"){
      res.redirect('/live/distance-from-nearest-pharmacy')
    } else {
      res.redirect('/live/emergency-contact-details')
    }
  })

// Does user have existing medical conditions

  router.post('/live/do-you-have-existing-conditions-answer/', function (req, res) {
    var existingCondition = req.session.data['has-existing-conditions']
    if (existingCondition === "Yes"){
      res.redirect('/live/what-existing-conditions-do-you-have')
    } else {
      res.redirect('/live/do-you-have-allergies')
    }
  })

// Does user have allergies
  router.post('/live/do-you-have-allergies-answer/', function (req, res) {
    var existingCondition = req.session.data['has-allergies']
    if (existingCondition === "Yes"){
      res.redirect('/live/allergies-details')
    } else {
      res.redirect('/live/do-you-have-any-mental-health-conditions')
    }
  })

// Does user have mental health conditions
  router.post('/live/do-you-have-mental-health-conditions-answer/', function (req, res) {
    var existingCondition = req.session.data['has-mental-health-conditions']
    if (existingCondition === "Yes"){
      res.redirect('/live/mental-health-conditions-details')
    } else {
      res.redirect('/live/do-you-have-any-disabilities')
    }
  })

// Does user have disabilities
  router.post('/live/do-you-have-disabilities-answer/', function (req, res) {
    var hasDisabilities = req.session.data['has-disabilities']
    if (hasDisabilities === "Yes"){
      res.redirect('/live/disabilities-details')
    } else {
      res.redirect('/live/do-you-take-prescription-medication')
    }
  })

// Does user take medication
  router.post('/live/do-you-take-prescription-medication-answer/', function (req, res) {
    var takesMeds = req.session.data['takes-prescription-meds']
    if (takesMeds === "Yes"){
      res.redirect('/live/medication-details')
    } else {
      res.redirect('/live/do-you-have-a-preferred-pharmacy')
    }
  })

// Does user have family history of medications
  router.post('/live/do-you-have-family-history-of-conditions-answer/', function (req, res) {
    var hasFamilyHistory = req.session.data['has-family-medical-history']
    if (hasFamilyHistory === "Yes"){
      res.redirect('/live/what-family-conditions-do-you-have')
    } else {
      res.redirect('/live/what-is-your-ethnicity')
    }
  })



// EHIC Dec
  router.post('/live/check-age-3', function (req, res) {
    var dob = req.session.data['dob-year']+ '-'+ req.session.data['dob-month']+ '-'+ req.session.data['dob-day']
    var overseasDecehic = req.session.data['overseas-declaration-ehic']
    var years = moment().diff(dob, 'years');
    console.log(`number of years ${years}`)
    console.log('looking up age')
    if (years <= 18) {
      res.redirect('/live/are-you-immunised')
    } else {
      res.redirect('/live/do-you-have-existing-conditions')
    }
  });

// Nodocs Dec

  router.post('/live/check-age-3', function (req, res) {
    var dob = req.session.data['dob-year']+ '-'+ req.session.data['dob-month']+ '-'+ req.session.data['dob-day']
    var overseasDecehic = req.session.data['overseas-declaration-nodocs']
    var years = moment().diff(dob, 'years');
    // console.log(`number of years ${years}`)
    // console.log('looking up age')
    if (years <= 18) {
      res.redirect('/live/are-you-immunised')
    } else {
      res.redirect('/live/do-you-have-existing-conditions')
    }
  });

// None eu Dec

  router.post('/live/check-age-3', function (req, res) {
    var dob = req.session.data['dob-year']+ '-'+ req.session.data['dob-month']+ '-'+ req.session.data['dob-day']
    var overseasDecehic = req.session.data['overseas-declaration-none-eu']
    var years = moment().diff(dob, 'years');
    console.log(`number of years ${years}`)
    console.log('looking up age')
    if (years <= 18) {
      res.redirect('/live/are-you-immunised')
    } else {
      res.redirect('/live/do-you-have-existing-conditions')
    }

  });

// S1 Dec
  router.post('/live/check-age-3', function (req, res) {
    var dob = req.session.data['dob-year']+ '-'+ req.session.data['dob-month']+ '-'+ req.session.data['dob-day']
    var overseasDecehic = req.session.data['overseas-declaration-s1']
    var years = moment().diff(dob, 'years');
    // console.log(`number of years ${years}`)
    // console.log('looking up age')
    if (years <= 18) {
      res.redirect('/live/are-you-immunised')
    } else {
      res.redirect('/live/do-you-have-existing-conditions')
    }
  });

// Schooling
  router.post('/live/check-age-4', function (req, res) {
    var dob = req.session.data['dob-year']+ '-'+ req.session.data['dob-month']+ '-'+ req.session.data['dob-day']
    var contactInfo = req.session.data['how-can-we-contact-inputs']
    var years = moment().diff(dob, 'years');
    console.log(`number of years ${years}`)
    console.log('looking up age')
    // Check whether the variable matches a condition
    if (years <= 18) {
      res.redirect('/live/what-schooling-do-you-have')
    } else {
      res.redirect('/live/what-is-your-gender')
    }
  });

  router.post("/*/check-postcode", function (req, res) {
    var postcode = (req.session.data["find-current-address"]);
    console.log("postcode check " + postcode)
    if(postcod.toUpperCase()=="LS28 7FG"){
      res.redirect("/live/dispencing-surgery")
    }
    res.redirect("/live/nominate-pharmacy")
  });

};
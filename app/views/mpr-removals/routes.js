const express = require('express');
const router = express.Router();

router.post('/main/8-day/warning-answer', function(req, res) {

	const country = req.session.data['8dayWarning'];
	if (country == "yes"){
		res.redirect("/mpr-removals/main/8-day/warning-date")
	} else {
		res.redirect("/mpr-removals/main/8-day/warning-reasons")
	}
})

module.exports = router;
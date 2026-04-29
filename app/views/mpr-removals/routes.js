const express = require('express');
const router = express.Router();

const formatNhsNumber = require('./routes-helpers-js/formatNhsNumber');
const formatLongDate = require('./routes-helpers-js/formatLongDate');
const formatDateForDisplay = require('./routes-helpers-js/formatDateForDisplay');

router.get('/main/set-nhs-number', (req, res) => {
	req.session.data = req.session.data || {};
	req.session.data.nhsNumberSearch = '987 654 3210';

	return res.redirect('/mpr-removals/main/confirm-patient');
});

router.get('/main/patient-advanced-search/clear', (req, res) => {
	req.session.data = req.session.data || {};

	const patientAdvancedSearchKeys = [
		'searchGivenName',
		'searchFamilyName',
		'searchDob',
		'searchDob-day',
		'searchDob-month',
		'searchDob-year'
	];

	patientAdvancedSearchKeys.forEach((key) => {
		delete req.session.data[key];
	});

	return res.redirect('/mpr-removals/main/patient-advanced-search');
});


router.post('/main/confirm-patient', (req, res) => {
	const formattedNhsNumberSearch = formatNhsNumber(req.body.nhsNumberSearch);

	req.session.data = req.session.data || {};
	req.session.data.nhsNumberSearch = formattedNhsNumberSearch;

	return res.redirect('/mpr-removals/main/confirm-patient');
});

router.post('/main/check-answers', (req, res) => {
	const day = req.body.eightDayWarningDate['day'];
	const month = req.body.eightDayWarningDate['month'];
	const year = req.body.eightDayWarningDate['year'];
	const formattedWarningDate = formatLongDate(day, month, year);

	req.session.data = req.session.data || {};
	req.session.data.eightDayWarningDateFormatted = formattedWarningDate;

	return res.redirect('/mpr-removals/main/check-answers');
});

router.post('/main/confirmation', (req, res) => {
	const removalDate = new Date();
	removalDate.setDate(removalDate.getDate() + 8);

	req.session.data = req.session.data || {};
	req.session.data.removalDate = formatDateForDisplay(removalDate);

	return res.redirect('/mpr-removals/main/confirmation');
});

router.get('/main/reset', (req, res) => {
	req.session.data = req.session.data || {};

	const mprRemovalsKeys = [
		'nhsNumberSearch',
		'removalReason',
		'eightDayWarning',
		'eightDayWarningReasons',
		'eightDayWarningDate',
		'eightDayWarningDate-day',
		'eightDayWarningDate-month',
		'eightDayWarningDate-year',
		'eightDayWarningDateFormatted'
	];

	mprRemovalsKeys.forEach((key) => {
		delete req.session.data[key];
	});

	return res.redirect('/mpr-removals/main/dashboard');
});



module.exports = router;
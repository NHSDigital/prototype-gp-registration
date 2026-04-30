const express = require('express');
const router = express.Router();

const formatNhsNumber = require('./routes-helpers-js/formatNhsNumber');
const formatLongDate = require('./routes-helpers-js/formatLongDate');
const formatDateForDisplay = require('./routes-helpers-js/formatDateForDisplay');

router.get('/main/set-nhs-number', (req, res) => {
	req.session.data = req.session.data || {};
	req.session.data.search = req.session.data.search || {};
	req.session.data.search.nhsNumber = '987 654 3210';

	return res.redirect('/mpr-removals/main/confirm-patient');
});

router.get('/main/patient-advanced-search/clear', (req, res) => {
	req.session.data = req.session.data || {};
	req.session.data.search = req.session.data.search || {};

	const patientAdvancedSearchKeys = ['givenName', 'familyName', 'dob'];

	patientAdvancedSearchKeys.forEach((key) => {
		delete req.session.data.search[key];
	});

	return res.redirect('/mpr-removals/main/patient-advanced-search');
});


router.post('/main/confirm-patient', (req, res) => {
	const nhsNumberSearch = req.body.search.nhsNumber;
	const formattedNhsNumberSearch = formatNhsNumber(nhsNumberSearch);

	req.session.data = req.session.data || {};
	req.session.data.search = req.session.data.search || {};
	req.session.data.search.nhsNumber = formattedNhsNumberSearch;
	delete req.session.data.nhsNumberSearch;

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

	delete req.session.data.search;

	return res.redirect('/mpr-removals/main/dashboard');
});



module.exports = router;
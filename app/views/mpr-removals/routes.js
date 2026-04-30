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
	const warningDate = (req.body.newRemoval && req.body.newRemoval.eightDayWarningDate) || {};
	const day = warningDate['day'];
	const month = warningDate['month'];
	const year = warningDate['year'];
	const formattedWarningDate = formatLongDate(day, month, year);

	req.session.data = req.session.data || {};
	req.session.data.newRemoval = req.session.data.newRemoval || {};
	req.session.data.newRemoval.eightDayWarningDateFormatted = formattedWarningDate;

	return res.redirect('/mpr-removals/main/check-answers');
});

router.post('/main/confirmation', (req, res) => {
	const removalDate = new Date();
	removalDate.setDate(removalDate.getDate() + 8);
	const createdDate = new Date();
	const pendingRemovalReference = 'RMR-574820';

	req.session.data = req.session.data || {};
	req.session.data.newRemoval = req.session.data.newRemoval || {};
	req.session.data.newRemoval.removalDate = formatDateForDisplay(removalDate);
	req.session.data.pendingRemovals = req.session.data.pendingRemovals || {};

	req.session.data.pendingRemovals[pendingRemovalReference] = {
		firstName: 'Karen',
		lastName: 'Francis',
		nhsNumber: req.session.data.search && req.session.data.search.nhsNumber,
		deductionReason: req.session.data.newRemoval.deductionReason,
		createdDate: formatDateForDisplay(createdDate),
		deductionDate: req.session.data.newRemoval.removalDate
	};

	req.session.data.pendingRemovals = Object.fromEntries(
		Object.entries(req.session.data.pendingRemovals).sort(([, a], [, b]) => {
			return new Date(a.deductionDate) - new Date(b.deductionDate);
		})
	);

	return res.redirect('/mpr-removals/main/confirmation');
});

router.get('/main/reset', (req, res) => {
	req.session.data = req.session.data || {};

	

	delete req.session.data.search;
	delete req.session.data.newRemoval;

	return res.redirect('/mpr-removals/main/dashboard');
});



module.exports = router;
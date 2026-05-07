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

router.post('/main/removal-reason-routing', (req, res) => {
	const deductionReason = req.body.newRemoval && req.body.newRemoval.deductionReason;
	req.session.data = req.session.data || {};
	req.session.data.newRemoval = req.session.data.newRemoval || {};

	if (deductionReason === 'Police incident requiring urgent removal') {
		req.session.data.newRemoval.type = 'Immediate removal (Special allocation scheme)';
		return res.redirect('/mpr-removals/main/sas/declaration');
	}

	req.session.data.newRemoval.type = '8-day removal';
	return res.redirect('/mpr-removals/main/8-day/declarations');
});

router.post('/main/sas/police-report-routing', (req, res) => {
	const reportedToPolice = req.body.newRemoval && req.body.newRemoval.reportedToPolice;

	if (reportedToPolice === 'Yes') {
		return res.redirect('/mpr-removals/main/sas/police-details');
	}

	return res.redirect('/mpr-removals/main/sas/incident-details');
});

router.post('/main/check-answers', (req, res) => {
	const newRemoval = req.body.newRemoval || {};

	const warningDate = newRemoval.eightDayWarningDate || {};
	const formattedWarningDate = formatLongDate(warningDate.day, warningDate.month, warningDate.year);

	const policeReportDate = (newRemoval.policeReport && newRemoval.policeReport.date) || {};
	const formattedPoliceReportDate = formatLongDate(policeReportDate.day, policeReportDate.month, policeReportDate.year);

	const incidentDate = (newRemoval.incident && newRemoval.incident.date) || {};
	const formattedIncidentDate = formatLongDate(incidentDate.day, incidentDate.month, incidentDate.year);

	req.session.data = req.session.data || {};
	req.session.data.newRemoval = req.session.data.newRemoval || {};
	req.session.data.newRemoval.eightDayWarningDateFormatted = formattedWarningDate;
	req.session.data.newRemoval.policeReportDateFormatted = formattedPoliceReportDate;
	req.session.data.newRemoval.incidentDateFormatted = formattedIncidentDate;

	return res.redirect('/mpr-removals/main/check-answers');
});

router.post('/main/confirmation', (req, res) => {
	const removalDate = new Date();
	const createdDate = new Date();
	const pendingRemovalReference = 'RMR-574820';
	
	req.session.data = req.session.data || {};
	req.session.data.newRemoval = req.session.data.newRemoval || {};

	if (req.session.data.newRemoval.type === 'Immediate removal (Special allocation scheme)') {
		removalDate.setDate(createdDate.getDate() + 1);
	}
	else {
		removalDate.setDate(createdDate.getDate() + 8);
	}

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
const express = require('express');
const router = express.Router();

const formatNhsNumber = (input = '') => {
	const digits = String(input).replace(/\D/g, '').slice(0, 10);

	if (digits.length <= 3) {
		return digits;
	}

	if (digits.length <= 6) {
		return `${digits.slice(0, 3)} ${digits.slice(3)}`;
	}

	return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
};

const formatLongDate = (dayInput = '', monthInput = '', yearInput = '') => {
	const day = Number.parseInt(String(dayInput), 10);
	const month = Number.parseInt(String(monthInput), 10);
	const year = Number.parseInt(String(yearInput), 10);
	const defaultDate = '2 Feb 2026';

	if (!Number.isInteger(day) || !Number.isInteger(month) || !Number.isInteger(year)) {
		return defaultDate; // Default date for testing purposes
	}

	if (month < 1 || month > 12 || day < 1 || year < 1000) {
		return defaultDate;
	}

	const date = new Date(year, month - 1, day);
	const isValidDate =
		date.getFullYear() === year &&
		date.getMonth() === month - 1 &&
		date.getDate() === day;

	if (!isValidDate) {
		return defaultDate;
	}

	const monthName = date.toLocaleString('en-GB', { month: 'long' });
	return `${day} ${monthName} ${year}`;
};

const formatDateForDisplay = (date) => {
	const day = date.getDate();
	const monthName = date.toLocaleString('en-GB', { month: 'long' });
	const year = date.getFullYear();
	return `${day} ${monthName} ${year}`;
};

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
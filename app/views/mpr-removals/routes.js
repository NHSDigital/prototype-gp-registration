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

router.post('/main/confirm-patient', (req, res) => {
	const formattedNhsNumberSearch = formatNhsNumber(req.body.nhsNumberSearch);

	req.session.data = req.session.data || {};
	req.session.data.nhsNumberSearch = formattedNhsNumberSearch;

	return res.redirect('/mpr-removals/main/confirm-patient');
});

module.exports = router;
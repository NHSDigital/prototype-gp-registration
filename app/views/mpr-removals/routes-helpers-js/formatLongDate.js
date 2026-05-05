module.exports = (dayInput = '', monthInput = '', yearInput = '') => {
	const day = Number.parseInt(String(dayInput), 10);
	const month = Number.parseInt(String(monthInput), 10);
	const year = Number.parseInt(String(yearInput), 10);
	const defaultDate = '2 Feb 2026';

	if (!Number.isInteger(day) || !Number.isInteger(month) || !Number.isInteger(year)) {
		return defaultDate;
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
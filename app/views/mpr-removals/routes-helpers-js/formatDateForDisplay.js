module.exports = (date) => {
	const day = date.getDate();
	const monthName = date.toLocaleString('en-GB', { month: 'long' });
	const year = date.getFullYear();
	return `${day} ${monthName} ${year}`;
};
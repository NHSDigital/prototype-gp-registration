document.addEventListener('click', function (event) {
	var button = event.target.closest('th[aria-sort] button')
	if (!button) return

	var heading = button.closest('th')
	var table = heading.closest('table')
	var tableBody = table && table.tBodies[0]
	if (!tableBody) return

	event.preventDefault()

	var direction = heading.getAttribute('aria-sort') === 'ascending' ? 'descending' : 'ascending'
	table.querySelectorAll('thead th[aria-sort]').forEach(function (sortableHeading) {
		sortableHeading.setAttribute('aria-sort', 'none')
	})
	heading.setAttribute('aria-sort', direction)

	var columnIndex = heading.cellIndex
	var rows = Array.from(tableBody.rows)
	var groups = []

	function getCellText(row) {
		var cell = row.cells[columnIndex]
		if (!cell) return ''

		var cellClone = cell.cloneNode(true)
		cellClone.querySelectorAll('.nhsuk-table-responsive__heading').forEach(function (label) {
			label.remove()
		})
		return cellClone.textContent.trim()
	}

	for (var rowIndex = 0; rowIndex < rows.length;) {
		var firstCellText = rows[rowIndex].cells[0] ? rows[rowIndex].cells[0].textContent.trim() : ''
		var household = firstCellText.match(/Household\s*\(\s*(\d+)\s+patients?\s*\)/i)
		var groupLength = household ? Number(household[1]) + 1 : 1
		groups.push(rows.slice(rowIndex, rowIndex + groupLength))
		rowIndex += groupLength
	}

	function sortValue(groupRows) {
		for (var groupIndex = 0; groupIndex < groupRows.length; groupIndex++) {
			var value = getCellText(groupRows[groupIndex])
			if (value) return value
		}
		return ''
	}

	function numericValue(value) {
		var age = value.match(/^(\d+(?:\.\d+)?)\s*(days?|weeks?|months?|years?)$/i)
		if (age) {
			var unit = age[2].toLowerCase()
			var unitInDays = unit.startsWith('year') ? 365 : unit.startsWith('month') ? 30 : unit.startsWith('week') ? 7 : 1
			return Number(age[1]) * unitInDays
		}

		var compact = value.replace(/[\s,]/g, '')
		return /^\d+(?:\.\d+)?$/.test(compact) ? Number(compact) : null
	}

	var collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' })
	groups.sort(function (leftGroup, rightGroup) {
		var leftValue = sortValue(leftGroup)
		var rightValue = sortValue(rightGroup)
		var leftNumeric = numericValue(leftValue)
		var rightNumeric = numericValue(rightValue)
		var comparison = leftNumeric !== null && rightNumeric !== null
			? leftNumeric - rightNumeric
			: collator.compare(leftValue, rightValue)

		return direction === 'ascending' ? comparison : -comparison
	})

	groups.forEach(function (groupRows) {
		groupRows.forEach(function (row) {
			tableBody.appendChild(row)
		})
	})
})

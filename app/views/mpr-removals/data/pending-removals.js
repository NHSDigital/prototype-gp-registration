const pendingRemovals = {
  'RMR-739410': {
    firstName: "Amy",
    lastName: "Taylor",
    nhsNumber: "567 385 3513",
    deductionReason: "Moved outside practice boundary",
    createdDate: "1 May 2026",
    deductionDate: "31 May 2026"
  },
  'RMR-550474': {
    firstName: "Olivia",
    lastName: "Smith",
    nhsNumber: "949 371 2346",
    deductionReason: "Moved outside practice boundary",
    createdDate: "3 May 2026",
    deductionDate: "2 June 2026"
  },
  'RMR-635957': {
    firstName: "Noah",
    lastName: "Brown",
    nhsNumber: "439 696 6210",
    deductionReason: "Repeated, unjustified non-attendance of appointments",
    createdDate: "3 May 2026",
    deductionDate: "11 May 2026"
  }
};

module.exports = Object.fromEntries(
  Object.entries(pendingRemovals).sort(([, a], [, b]) => {
    return new Date(a.deductionDate) - new Date(b.deductionDate);
  })
);
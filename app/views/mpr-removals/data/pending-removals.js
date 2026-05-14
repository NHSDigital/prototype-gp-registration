const pendingRemovals = {
  'RMR-739410': {
    firstName: "Amy",
    lastName: "Taylor",
    nhsNumber: "567 385 3513",
    deductionReason: "Breakdown of relationship",
    createdDate: "15 May 2026",
    deductionDate: "23 May 2026"
  }
};

module.exports = Object.fromEntries(
  Object.entries(pendingRemovals).sort(([, a], [, b]) => {
    return new Date(a.deductionDate) - new Date(b.deductionDate);
  })
);
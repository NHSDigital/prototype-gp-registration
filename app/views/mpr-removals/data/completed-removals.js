const completedRemovals = {
  'RMR-739410': {
    firstName: "Amy",
    lastName: "Taylor",
    nhsNumber: "567 385 3513",
    deductionReason: "Death",
    createdDate: "15 April 2026",
    deductionDate: "15 April 2026"
  },
  'RMR-550474': {
    firstName: "Olivia",
    lastName: "Smith",
    nhsNumber: "949 371 2346",
    deductionReason: "Moved outside practice boundary",
    createdDate: "8 February 2026",
    deductionDate: "10 March 2026"
  },
  'RMR-635957': {
    firstName: "Noah",
    lastName: "Brown",
    nhsNumber: "439 696 6210",
    deductionReason: "Left education establishment",
    createdDate: "4 March 2026",
    deductionDate: "4 March 2026"
  },
  'RMR-981538': {
    firstName: "Amelia",
    lastName: "Johnson",
    nhsNumber: "337 636 2084",
    deductionReason: "Moved abroad (embarkation)",
    createdDate: "25 March 2026",
    deductionDate: "25 March 2026"
  },
  'RMR-370852': {
    firstName: "George",
    lastName: "Wright",
    nhsNumber: "494 877 1716",
    deductionReason: "Death",
    createdDate: "19 March 2026",
    deductionDate: "19 March 2026"
  },
  'RMR-224637': {
    firstName: "Isla",
    lastName: "Thompson",
    nhsNumber: "817 307 8777",
    deductionReason: "Police incident requiring urgent removal",
    createdDate: "29 March 2026",
    deductionDate: "29 March 2026"
  },
  'RMR-143362': {
    firstName: "Harry",
    lastName: "Edwards",
    nhsNumber: "284 607 7568",
    deductionReason: "Breakdown of relationship",
    createdDate: "10 April 2026",
    deductionDate: "18 April 2026"
  },
  'RMR-677820': {
    firstName: "Ava",
    lastName: "Thomas",
    nhsNumber: "545 750 3887",
    deductionReason: "Repeated, unjustified non-attendance of appointments",
    createdDate: "22 February 2026",
    deductionDate: "2 March 2026"
  },
  'RMR-963425': {
    firstName: "Leo",
    lastName: "Wood",
    nhsNumber: "230 927 8483",
    deductionReason: "Moved outside practice boundary",
    createdDate: "14 February 2026",
    deductionDate: "16 March 2026"
  },
  'RMR-862374': {
    firstName: "Mia",
    lastName: "Cooper",
    nhsNumber: "855 440 8438",
    deductionReason: "Moved outside practice boundary",
    createdDate: "3 January 2026",
    deductionDate: "2 February 2026"
  },
  'RMR-804998': {
    firstName: "Arthur",
    lastName: "Morris",
    nhsNumber: "385 374 9151",
    deductionReason: "Left education establishment",
    createdDate: "14 February 2026",
    deductionDate: "14 February 2026"
  },
  'RMR-186692': {
    firstName: "Lily",
    lastName: "Baker",
    nhsNumber: "292 358 0524",
    deductionReason: "Moved abroad (embarkation)",
    createdDate: "21 February 2026",
    deductionDate: "21 February 2026"
  },
  'RMR-332087': {
    firstName: "Oscar",
    lastName: "Parker",
    nhsNumber: "484 515 9058",
    deductionReason: "Death",
    createdDate: "6 February 2026",
    deductionDate: "6 February 2026"
  },
  'RMR-767386': {
    firstName: "Freya",
    lastName: "Kelly",
    nhsNumber: "182 714 6052",
    deductionReason: "Police incident requiring urgent removal",
    createdDate: "28 March 2026",
    deductionDate: "28 March 2026"
  },
  'RMR-608093': {
    firstName: "Theo",
    lastName: "Dixon",
    nhsNumber: "400 951 0390",
    deductionReason: "Breakdown of relationship",
    createdDate: "17 March 2026",
    deductionDate: "25 March 2026"
  },
  'RMR-443686': {
    firstName: "Grace",
    lastName: "Bell",
    nhsNumber: "668 716 6093",
    deductionReason: "Repeated, unjustified non-attendance of appointments",
    createdDate: "9 April 2026",
    deductionDate: "17 April 2026"
  },
  'RMR-794737': {
    firstName: "Jack",
    lastName: "Turner",
    nhsNumber: "202 497 6409",
    deductionReason: "Moved outside practice boundary",
    createdDate: "20 February 2026",
    deductionDate: "22 March 2026"
  },
  'RMR-650469': {
    firstName: "Evie",
    lastName: "Richards",
    nhsNumber: "923 069 9535",
    deductionReason: "Moved outside practice boundary",
    createdDate: "21 January 2026",
    deductionDate: "20 February 2026"
  },
  'RMR-760781': {
    firstName: "Charlie",
    lastName: "Taylor",
    nhsNumber: "655 870 4374",
    deductionReason: "Left education establishment",
    createdDate: "1 April 2026",
    deductionDate: "1 April 2026"
  },
  'RMR-102715': {
    firstName: "Poppy",
    lastName: "Wilson",
    nhsNumber: "876 937 6751",
    deductionReason: "Moved abroad (embarkation)",
    createdDate: "22 April 2026",
    deductionDate: "22 April 2026"
  },
  'RMR-866217': {
    firstName: "Jacob",
    lastName: "Patel",
    nhsNumber: "487 871 2953",
    deductionReason: "Death",
    createdDate: "22 April 2026",
    deductionDate: "22 April 2026"
  },
  'RMR-334764': {
    firstName: "Ella",
    lastName: "Robinson",
    nhsNumber: "934 586 9573",
    deductionReason: "Police incident requiring urgent removal",
    createdDate: "15 February 2026",
    deductionDate: "15 February 2026"
  },
  'RMR-646277': {
    firstName: "Alfie",
    lastName: "Hughes",
    nhsNumber: "834 990 1799",
    deductionReason: "Breakdown of relationship",
    createdDate: "30 January 2026",
    deductionDate: "7 February 2026"
  },
  'RMR-637238': {
    firstName: "Ruby",
    lastName: "Hall",
    nhsNumber: "198 331 1774",
    deductionReason: "Repeated, unjustified non-attendance of appointments",
    createdDate: "6 February 2026",
    deductionDate: "14 February 2026"
  },
  'RMR-985498': {
    firstName: "Thomas",
    lastName: "Jackson",
    nhsNumber: "178 954 3622",
    deductionReason: "Moved outside practice boundary",
    createdDate: "6 February 2026",
    deductionDate: "8 March 2026"
  },
  'RMR-146969': {
    firstName: "Sophie",
    lastName: "Martin",
    nhsNumber: "535 489 4638",
    deductionReason: "Moved outside practice boundary",
    createdDate: "4 March 2026",
    deductionDate: "3 April 2026"
  },
  'RMR-615120': {
    firstName: "Finley",
    lastName: "Ward",
    nhsNumber: "292 258 9188",
    deductionReason: "Left education establishment",
    createdDate: "2 February 2026",
    deductionDate: "2 February 2026"
  },
  'RMR-825811': {
    firstName: "Ivy",
    lastName: "King",
    nhsNumber: "551 612 1140",
    deductionReason: "Moved abroad (embarkation)",
    createdDate: "3 February 2026",
    deductionDate: "3 February 2026"
  },
  'RMR-643111': {
    firstName: "William",
    lastName: "Gray",
    nhsNumber: "281 938 0999",
    deductionReason: "Death",
    createdDate: "31 March 2026",
    deductionDate: "31 March 2026"
  },
  'RMR-314772': {
    firstName: "Rosie",
    lastName: "Webb",
    nhsNumber: "655 935 7767",
    deductionReason: "Police incident requiring urgent removal",
    createdDate: "3 February 2026",
    deductionDate: "3 February 2026"
  },
  'RMR-407543': {
    firstName: "Henry",
    lastName: "Miller",
    nhsNumber: "985 872 2680",
    deductionReason: "Breakdown of relationship",
    createdDate: "20 March 2026",
    deductionDate: "28 March 2026"
  },
  'RMR-432278': {
    firstName: "Daisy",
    lastName: "Shaw",
    nhsNumber: "335 394 0960",
    deductionReason: "Repeated, unjustified non-attendance of appointments",
    createdDate: "1 February 2026",
    deductionDate: "9 February 2026"
  },
  'RMR-702811': {
    firstName: "James",
    lastName: "Reid",
    nhsNumber: "897 868 3479",
    deductionReason: "Moved outside practice boundary",
    createdDate: "2 February 2026",
    deductionDate: "4 March 2026"
  },
  'RMR-202715': {
    firstName: "Florence",
    lastName: "Cox",
    nhsNumber: "328 949 9286",
    deductionReason: "Moved outside practice boundary",
    createdDate: "27 February 2026",
    deductionDate: "29 March 2026"
  },
  'RMR-717707': {
    firstName: "Lucas",
    lastName: "Jones",
    nhsNumber: "660 137 4032",
    deductionReason: "Left education establishment",
    createdDate: "8 February 2026",
    deductionDate: "8 February 2026"
  },
  'RMR-541895': {
    firstName: "Phoebe",
    lastName: "Williams",
    nhsNumber: "790 237 4148",
    deductionReason: "Moved abroad (embarkation)",
    createdDate: "10 April 2026",
    deductionDate: "10 April 2026"
  },
  'RMR-270015': {
    firstName: "Ethan",
    lastName: "Davies",
    nhsNumber: "388 583 7226",
    deductionReason: "Death",
    createdDate: "15 March 2026",
    deductionDate: "15 March 2026"
  },
  'RMR-286493': {
    firstName: "Alice",
    lastName: "Walker",
    nhsNumber: "367 231 8108",
    deductionReason: "Police incident requiring urgent removal",
    createdDate: "13 April 2026",
    deductionDate: "13 April 2026"
  },
  'RMR-734649': {
    firstName: "Mason",
    lastName: "White",
    nhsNumber: "695 347 0283",
    deductionReason: "Breakdown of relationship",
    createdDate: "2 April 2026",
    deductionDate: "10 April 2026"
  },
  'RMR-820640': {
    firstName: "Matilda",
    lastName: "Green",
    nhsNumber: "916 265 5388",
    deductionReason: "Repeated, unjustified non-attendance of appointments",
    createdDate: "3 February 2026",
    deductionDate: "11 February 2026"
  },
  'RMR-693846': {
    firstName: "Archie",
    lastName: "Clarke",
    nhsNumber: "783 071 1968",
    deductionReason: "Moved outside practice boundary",
    createdDate: "2 March 2026",
    deductionDate: "1 April 2026"
  },
  'RMR-389625': {
    firstName: "Jessica",
    lastName: "Harris",
    nhsNumber: "231 659 2333",
    deductionReason: "Moved outside practice boundary",
    createdDate: "24 February 2026",
    deductionDate: "26 March 2026"
  },
  'RMR-838843': {
    firstName: "Logan",
    lastName: "Hill",
    nhsNumber: "461 527 8721",
    deductionReason: "Left education establishment",
    createdDate: "26 March 2026",
    deductionDate: "26 March 2026"
  },
  'RMR-261332': {
    firstName: "Emily",
    lastName: "Moore",
    nhsNumber: "327 151 3465",
    deductionReason: "Moved abroad (embarkation)",
    createdDate: "23 March 2026",
    deductionDate: "23 March 2026"
  },
  'RMR-880381': {
    firstName: "Harrison",
    lastName: "Allen",
    nhsNumber: "988 060 8437",
    deductionReason: "Death",
    createdDate: "14 March 2026",
    deductionDate: "14 March 2026"
  },
  'RMR-691344': {
    firstName: "Chloe",
    lastName: "Price",
    nhsNumber: "915 173 9593",
    deductionReason: "Police incident requiring urgent removal",
    createdDate: "27 April 2026",
    deductionDate: "27 April 2026"
  },
  'RMR-379498': {
    firstName: "Edward",
    lastName: "Bailey",
    nhsNumber: "723 912 3103",
    deductionReason: "Breakdown of relationship",
    createdDate: "8 February 2026",
    deductionDate: "16 February 2026"
  },
  'RMR-540407': {
    firstName: "Millie",
    lastName: "Murphy",
    nhsNumber: "273 288 2976",
    deductionReason: "Repeated, unjustified non-attendance of appointments",
    createdDate: "3 April 2026",
    deductionDate: "11 April 2026"
  },
  'RMR-403316': {
    firstName: "Benjamin",
    lastName: "Cook",
    nhsNumber: "912 953 4399",
    deductionReason: "Removal at patient's request",
    createdDate: "21 March 2026",
    deductionDate: "4 April 2026"
  },
  'RMR-884266': {
    firstName: "Erin",
    lastName: "Morgan",
    nhsNumber: "564 037 8239",
    deductionReason: "Moved outside practice boundary",
    createdDate: "1 March 2026",
    deductionDate: "31 March 2026"
  }
};

module.exports = Object.fromEntries(
  Object.entries(completedRemovals).sort(([, a], [, b]) => {
    return new Date(b.deductionDate) - new Date(a.deductionDate);
  })
);
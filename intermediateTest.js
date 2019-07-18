const ea = require('eventassigner-js');

const groups = [
  { id: "27527", size: 3, pref: ["79551", "84595"] },
  { id: "32976", size: 3, pref: ["84595", "26044"] },
  { id: "77998", size: 3, pref: ["98011"] },
  { id: "80485", size: 3, pref: ["84595"] },
  { id: "97457", size: 3, pref: ["84595", "26044"] }
];
 
const events = [
  { id: "84595", min: 3, max: 6, groups: [] },
  { id: "26044", min: 3, max: 6, groups: [] },
  { id: "98011", min: 3, max: 6, groups: [] },
  { id: "79551", min: 3, max: 6, groups: [] }
];
 
const list = [
  { id: "97457", size: 3, event: "26044", gain: 0.33 },
  { id: "80485", size: 3, event: "84595", gain: 0.33 },
  { id: "32976", size: 3, event: "26044", gain: 0.33 },
  { id: "32976", size: 3, event: "84595", gain: 0.5 },
  { id: "27527", size: 3, event: "84595", gain: 0.5 },
  { id: "97457", size: 3, event: "84595", gain: 1 },
  { id: "77998", size: 3, event: "98011", gain: 1 },
  { id: "27527", size: 3, event: "79551", gain: 1 }
];


const updateL = input => input.list

const input = {groups, events, list, updateL}

const assignmnet = ea.eventAssignment(input)

console.log(assignmnet)
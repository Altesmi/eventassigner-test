const ea = require('../eventassigner-js/lib/eventAssignment')
const allEvents = require('./games2018')
const allUsers = require('./users2018')
const getGroupsAndEvents = require('./getGroupsAndEventsFromOneGameTime')
const calculateList = require('./calculateList')
const calculateHappiness = require('./calculateHappiness')

selectedGameTime = "2018-07-28T11:00:00.000Z" // start time of the games

const input = getGroupsAndEvents(allUsers,allEvents,selectedGameTime)

const alpha = 1

input.list = calculateList(input.groups,input.events,alpha)

input.updateL = input => input.list

const assignment = ea.eventAssignment(input)

console.log(assignment)
console.log(assignment.filter(ele => ele.assignment === -1).length)
console.log(Math.round(calculateHappiness(assignment,input.groups)/input.groups.length * 10000)/100)
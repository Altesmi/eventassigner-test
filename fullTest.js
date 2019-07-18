const ea = require('../eventassigner-js/lib/eventAssignment')
const allEvents = require('./games2018')
const allUsers = require('./users2018')
const getGroupsAndEvents = require('./getGroupsAndEventsFromOneGameTime')
const calculateList = require('./calculateList')
const calculateHappiness = require('./calculateHappiness')

selectedGameTime = "2018-07-28T13:00:00.000Z" // start time of the games

const input = getGroupsAndEvents(allUsers,allEvents,selectedGameTime)

const alpha = 1

input.list = calculateList(input.groups,input.events,alpha)

input.list = input.list.sort((a,b) => 0.5 - Math.random()) // sort list randomly this has sometimes effect to the final result

input.updateL = inputParams => {
  /*Updates the list so that gain increases as possibilities for 
   assignment decrease */
  //console.log(inputParams.listElement)
  const gInd = inputParams.groups.findIndex(g => g.id === inputParams.groupId)
  inputParams.list.forEach(ele => {
    if (ele.id === inputParams.groups[gInd].id) {
      //calculate the number of preferences
      let numPref = inputParams.groups[gInd].pref.length
      let numPossibilities = inputParams.list.filter(g => g.gain > 0)
      .filter(g => g.id === ele.id)
      .length
      if (numPossibilities < numPref && numPossibilities > 1 && numPref > 1) {
        ele.gain =
          ele.gain +
          (((1.0 - alpha) / (numPossibilities - 1)) *
            (numPref - numPossibilities)) /
            (numPref - 1)
      }
    }
  })

  return inputParams.list.sort((a, b) => {
    if (a.gain >= b.gain) {
      return 1
    } else {
      return -1
    }
  })
}


const assignment = ea.eventAssignment(input)

console.log(assignment)
console.log(assignment.filter(ele => ele.assignment === -1).length)
console.log(Math.round(calculateHappiness(assignment,input.groups)/input.groups.length * 10000)/100)
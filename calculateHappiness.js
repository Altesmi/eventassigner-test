const calculateHappiness = function (assignment,groups) {
  let happiness = 0
  assignment.forEach(m => {
    let grpInd = groups.findIndex(g=>g.id === m.id)
    let ind = groups[grpInd].pref.findIndex(ele => {
      return ele === m.assignment
    })
    ind = ind +1
    if(ind > 0) {
      
      happiness = happiness + 1/ind
    }
  })
  return happiness
}

module.exports = calculateHappiness
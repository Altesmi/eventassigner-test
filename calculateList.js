const calculateList = function(groups,events,alpha) {
  let L = []
  for(let i=0;i<groups.length;i++) {
    for(let j=0;j<events.length;j++) {
      let ind = groups[i].pref.indexOf(events[j].id)
      let gain = 0
      if(ind!== -1) {
        gain = alpha*1/(ind+1)
        if(groups[i].pref.length>1) {
          gain = gain*(1/groups[i].pref.length)
        }
      }
      L.push({
        id: groups[i].id,
        event: events[j].id,
        size: groups[i].size,
        gain: gain    
      })
    }
  }
  L = L.filter(ele=>ele.gain>0).sort((a,b) => {
    if(a.gain >= b.gain) {
      return 1;
    } else {
      return -1
    } 
  })

  return L
}

module.exports = calculateList
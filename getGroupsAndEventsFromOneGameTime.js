const getGroupsAndEventsFromOneGameTime = function(allUsers, allEvents, gametime)  {

const events = allEvents.filter(ele => ele.startTime === selectedGameTime)
    .map(ele => {
  return {
    id: ele.id,
    min: Number(ele.minAttendance),
    max: Number(ele.maxAttendance),
    groups: []
  }
    
})

  //let u = JSON.parse(JSON.stringify(users))
  let gr = allUsers.filter(ele => {
     let isAttending = false
     for (let signedGame in ele.signedGames) {
       //include the time for 2017 data
       if(!ele.signedGames[signedGame].hasOwnProperty('time')) {
         ele.signedGames[signedGame].time = games
           .filter(game => game.id === ele.signedGames[signedGame].id)[0].startTime
       }
       if (ele.signedGames[signedGame].time === selectedGameTime) {
         isAttending = true
       }
     }
     return isAttending
   })
   .map(ele => {
     // map only the event that we are searching for
     let signedGame = ele.signedGames.filter(elesigned => {    
       return elesigned.time === selectedGameTime
     })      
     let prefArr = []
     signedGame.forEach(elesigned => {
       prefArr.push(events.find(ele => {
         
         return ele.id === elesigned.id
       
       }))
     })
     prefArr = prefArr.map(ele => {
       if(typeof(ele) === 'undefined') {
         return -1
       } else {
         return ele.id
       }
     })
     return {
       name: ele.username,
       playerGroup: ele.hasOwnProperty('playerGroup') ? ele.playerGroup : "0",
       pref: prefArr,              
     }
   })
  
     //calculate size of the group
     let sizes = {};
     gr.forEach(ele => {
       sizes[ele.playerGroup] = (sizes[ele.playerGroup] || 0) +1
     })
     // add size to every group
     gr = gr.map(ele => {
       return {
         ... ele,
         size: ele.playerGroup === "0" ? 1 : sizes[ele.playerGroup]
         
       }
       
       
     })
   
   // take only unique playergroups
   let groups = [];
   const map = new Map();
   for (const group of gr) {
       if(!map.has(group.playerGroup) || group.playerGroup === "0"){
           map.set(group.playerGroup, true);    // set any value to Map
           groups.push({
               id: group.name,
               playerGroup: group.playerGroup,
               pref: group.pref,
               size: group.size
           });
       }
   }
   
   // filter groups that do not have a real preference
   groups = groups.filter(ele => ele.pref[0]!==-1)

   return {events, groups}
}

module.exports = getGroupsAndEventsFromOneGameTime
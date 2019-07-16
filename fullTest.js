d3 = require('d3')

const url =  `https://raw.githubusercontent.com/Archinowsk/konsti-server/master/src/statistics/datafiles/2018/games.json`

data = d3.json(url)

console.log(data)
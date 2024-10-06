const System = require('./system.js')

global.system = new System()
global.system.build()
global.system.start()

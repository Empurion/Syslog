const Logger = require('./logger.js');
const Syslog = require("syslog-server")
require('dotenv').config()
const port = process.env['SYSLOG_PORT']
module.exports = class System {

    name = "System";
    ready = false

    constructor(){
    }

    build(){
        console.log('Building system.')
        this.logger = new Logger()
        this.syslogServer = new Syslog()
        this.syslogServer.on("message", (value) => {
            try{
                this.logger.handleLog( value )
            } catch (error) {
                console.error(error)
            }
        })

    }
    async start(){
        console.log(`Starting sys-log system on port: ${port}`)
        this.syslogServer.start({ port: port })
    }
}

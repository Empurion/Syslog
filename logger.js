const parser = require("nsyslog-parser");
const fs = require('node:fs');
require('dotenv').config()

module.exports = class logger {
    constructor(){
    }
    async saveToDisk(folder, formatA,  message){
        fs.appendFile(`./logs/${folder}/${formatA}.log`, message, (err) => {
            fs.mkdir(`./logs/${folder}`, { recursive: true }, (err) => {
                fs.appendFile(`./logs/${folder}/${formatA}.log`, message, (err) => {
                    console.error(err)
                })
            })
        })
    }
    async handleLog(value){
        let host = value.host

        let date_ob = new Date();
        let date = ("0" + (date_ob.getDate())).slice(-2);
        let month = ("0" + (date_ob.getMonth())).slice(-2);
        let year = date_ob.getFullYear();
        let formatA = year + "-" + month + "-" + date 

        var newMessage = host + ' :' + value.message;
        this.saveToDisk(host, formatA, newMessage)
    }
}

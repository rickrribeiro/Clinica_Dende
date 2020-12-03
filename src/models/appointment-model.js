const fs=require("fs");
const path = require("path")
//get all appointments
getAll = async () => {
    try{
        var obj =  JSON.parse(fs.readFileSync( path.resolve(__dirname,'../repository/db.json'), 'utf8')); //read the file
        return obj.appointments //return appointments
        
    }catch(err){
        console.log(err)
    }
    
}

module.exports ={getAll}
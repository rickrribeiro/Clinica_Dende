const { create } = require("domain");
const fs=require("fs");
const path = require("path")

//return rules list
getObj = async () => { 
    var obj =  JSON.parse(fs.readFileSync( path.resolve(__dirname,'../repository/db.json'), 'utf8')); //read the file
    return obj
}

//Write changes to the json file
writeObj = async (data) => {
    try{
        await fs.writeFile(path.resolve(__dirname,'../repository/db.json'), JSON.stringify(data), function (err) {
            if (err) return console.log(err);
            console.log("Regra inserida")
          });
          return data.appointments
    }catch(err){
        console.log(err)
        return err
    }
}
//delete by id
removeObjbyId = async (rules, id) => {
    return rules.filter(function(rule) { 
      return rule.id != id; 
    });
  }
//get all appointments
getAll = async () => {
    try{
        return getObj().appointments
    }catch(err){
        console.log(err)
    }
}

//create a new rule
createRule = async (day, hour) => {
    try{
        
        var obj = await getObj()
        obj.appointments.push(
            {
                "id":obj.appointments[obj.appointments.length-1]?obj.appointments[obj.appointments.length-1].id+1:1, //verify if there is any rules and set the id
                "day":day,
                "intervals":hour
            })
        writeObj(obj)
        return obj.appointments //return appointments
        
    }catch(err){
        console.log(err)
        return err
    }
    
}

//delete rule
deleteRule = async(id) => {
    console.log(id)
    var obj = await getObj()
    console.log(obj.appointments)
    console.log("space")
    obj.appointments = await removeObjbyId(obj.appointments,id);
    console.log(obj.appointments)
    await writeObj(obj)
}

module.exports ={getAll, createRule, deleteRule}

const fs=require("fs");
const path = require("path")
const dateConvert = require('../util/dateConvert')
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
          return data.rules
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
//get all rules
getAll = async () => {
    try{
        data = await getObj()
        return data.rules
    }catch(err){
        console.log(err)
    }
}
// Get rules by interval
getRulesByInterval = async (data) => {
   
    var dt = dateConvert.dateConvert( data.interval.start)
    console.log(dt)
    console.log(dt.getDay())
    return []
}
//create a new rule
createRule = async (day, hour) => {
    try{
        
        var obj = await getObj()
        console.log(obj)
        obj.rules.push(
            {
                "id":obj.rules[obj.rules.length-1]?obj.rules[obj.rules.length-1].id+1:1, //verify if there is any rules and set the id
                "day":day,
                "intervals":hour
            })
        writeObj(obj)
        return obj.rules //return rules
        
    }catch(err){
        console.log(err)
        return err
    }
    
}

//delete rule
deleteRule = async(id) => {
    console.log(id)
    var obj = await getObj()
    console.log(obj.rules)
    console.log("space")
    obj.rules = await removeObjbyId(obj.rules,id);
    console.log(obj.rules)
    await writeObj(obj)
}

module.exports ={getAll, createRule, deleteRule, getRulesByInterval}
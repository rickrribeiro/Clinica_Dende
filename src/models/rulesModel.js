
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
    var dtStart = dateConvert.dateConvert( data.interval.start) // converter string para date
    var dtEnd =  dateConvert.dateConvert( data.interval.end) // converter string para date
    var diffDays = Math.ceil(Math.abs(dtStart.getTime() - dtEnd.getTime()) / (1000 * 3600 * 24)); //diferença entre os dias
    var dias = [];//vetor duas posições para saber o dia da semana de inicio e o dia da semana de final
    if(diffDays>=6){//caso tenha mais de 1 semana, logo pega todos os dias
        dias[0]= 0;
        dias[1]= 6;
    }else{
        dias[0]= dtStart.getDay()
        dias[1]= dtEnd.getDay()
    }
    var rulesList = await getObj()
    var filteredRules = []
    if(dias[0] > dias[1]){// verifica se vai ter que voltar de sabado(6) para domingo(0)

    }else{
        rulesList.rules.forEach(rule => {
            if(rule.day=="daily"){ // verifica se é uma regra diaria
                filteredRules.push(rule)
            }else if(rule.day >= data.interval.start && rule.day <= data.interval.end){ // verifica se a data ta no intervalo
                filteredRules.push(rule)
            }else if(false){
                //colocar as semanais aq
            }
        });
    }
    return filteredRules
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
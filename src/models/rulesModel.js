
const { throws } = require("assert");
const fs=require("fs");
const path = require("path")
const dateConvert = require('../util/dateUtil')
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
        return err
    }
}

// Get rules by interval
getRulesByInterval = async (data) => {
    var dtStart = dateConvert.dateConvert( data.interval.start) // convert string to date
    var dtEnd =  dateConvert.dateConvert( data.interval.end) // convert string to date
    var diffDays = Math.ceil(Math.abs(dtStart.getTime() - dtEnd.getTime()) / (1000 * 3600 * 24)); //difference beetween days
    var dias = [];//array with the weekdays
    if(diffDays>=6){//if there is more than a week, get all week days
        dias[0]= 0;
        dias[1]= 6;
    }else{
        dias[0]= dtStart.getDay()
        dias[1]= dtEnd.getDay()
    }
    var rulesList = await getObj()
    //Get all rules of each type in the interval
    var dailyRules = []
    var weeklyRules = []
    var dayRules = []
    if(dias[0] > dias[1]){// verify if it has to return to the begining of the week ex: saturday(6) to sunday(0)
        rulesList.rules.forEach(rule => {
            if(rule.day=="daily"){ // verify if its a daily rule
                dailyRules.push(rule)
            }else if(rule.day >= data.interval.start && rule.day <= data.interval.end){ // verifica se a data ta no intervalo
                dayRules.push(rule)
            }else{ // verify if its a weekly rule
                var weekDays = rule.day.split(" ") // create an array with all week days in the rule
                
                weekDays.some(day =>{
                    if(day <= dias[0] && day >= dias[1]){
                        weeklyRules.push(rule)
                        return true;
                    }
                })
                
            }
        });
    }else{
        rulesList.rules.forEach(rule => {
            if(rule.day=="daily"){ // verify if its a daily rule
                dailyRules.push(rule)
            }else if(rule.day >= data.interval.start && rule.day <= data.interval.end){ // verifica se a data ta no intervalo
                dayRules.push(rule)
            }else{ // verify if its a weekly rule
                var weekDays = rule.day.split(" ") // create an array with all week days in the rule
                
                weekDays.some(day =>{
                    if(day >= dias[0] && day <= dias[1]){
                        weeklyRules.push(rule)
                        return true;
                    }
                })
                
            }
        });
    }

    var dayList = dateConvert.getDaysArray(dtStart,dtEnd); //all days in the range
    var filteredRules = []
    dayList.forEach( element =>{//loop to search for rules for each day
       
        var day ={
            day:`${("0"+element.getDate()).slice(-2)}-${("0"+(element.getMonth()+1)).slice(-2)}-${element.getFullYear()}`,
            intervals:[]
        }
        //daily rules
        dailyRules.forEach(rule =>{
            day.intervals = day.intervals.concat(rule.intervals)
           
        })
        //specific day rules
        dayRules.forEach(rule =>{
            if(rule.day == day.day){
                day.intervals = day.intervals.concat(rule.intervals)
            }
        })
        //weekly rules
        weeklyRules.forEach(rule => {
            var weekDays = rule.day.split(" ") // create an array with all week days in the rule
                
                weekDays.some(days =>{
                    if(days == element.getDay()){
                        day.intervals = day.intervals.concat(rule.intervals)
                        return true;
                    }
                })
        })


        filteredRules.push(day)//add the day to the array
    })


    return filteredRules
}

//create a new rule
createRule = async (day, hour) => {
    try{
        
        var obj = await getObj()
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
    var obj = await getObj() 
    obj.rules = await removeObjbyId(obj.rules,id);
    await writeObj(obj)
    return obj.rules
}

module.exports ={getAll, createRule, deleteRule, getRulesByInterval}
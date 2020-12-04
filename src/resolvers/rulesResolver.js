const rulesModel = require('../models/rulesModel')
const teste =[{"id":1,"day":"weekly","intervals":[{"start":"22","end":"23"}]}]

const rulesResolver = {
    Query:{
       rules: () =>  rulesModel.getAll(), //get all ruless rules
       rulesByInterval: (_,interval) => rulesModel.getRulesByInterval(interval)//get all rules in an interval
    },
    Mutation: {
        createRule: (_,{day,intervals}) => rulesModel.createRule(day,intervals), //create rule
        deleteRule: (_,{id}) => rulesModel.deleteRule(id) // delete rule
    }

}

module.exports = rulesResolver
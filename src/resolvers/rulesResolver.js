const rulesModel = require('../models/rulesModel')
const teste =[{"id":1,"day":"weekly","intervals":[{"start":"22","end":"23"}]}]

const rulesResolver = {
    Query:{
       rules: () =>  rulesModel.getAll() //get all ruless rules
    },
    Mutation: {
        createRule: (_,{day,intervals}) => rulesModel.createRule(day,intervals),
        deleteRule: (_,{id}) => rulesModel.deleteRule(id)
    }

}

module.exports = rulesResolver
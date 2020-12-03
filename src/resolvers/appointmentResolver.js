const appointmentModel = require('../models/appointment-model')
const teste =[{"id":1,"day":"weekly","intervals":[{"start":"22","end":"23"}]}]

const appointmentsResolver = {
    Query:{
       appointments: () =>  appointmentModel.getAll() //get all appointments rules
    },
    Mutation: {
        createAppointment: (_,{day,intervals}) => appointmentModel.createRule(day,intervals),
        deleteAppointment: (_,{id}) => appointmentModel.deleteRule(id)
    }

}

module.exports = appointmentsResolver
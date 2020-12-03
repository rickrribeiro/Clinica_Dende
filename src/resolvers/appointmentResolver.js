const appointmentModel = require('../models/appointment-model')


const appointmentsResolver = {
    Query:{
       appointments: () =>  appointmentModel.getAll() //get all appointments rules
    },
    Mutation: {
        createAppointment: (_,{day,hour}) => appointmentModel.createRule(day,hour)
    }

}

module.exports = appointmentsResolver
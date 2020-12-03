const appointmentModel = require('../models/appointment-model')


const appointmentsResolver = {
    Query:{
       appointments:  async() => await appointmentModel.getAll() //get all appointments rules
    },
    Mutation: {
        createAppointment: () =>{}
    }

}

module.exports = appointmentsResolver
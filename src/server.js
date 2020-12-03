const {GraphQLServer} = require("graphql-yoga")
const resolvers = require("./resolvers/appointmentResolver")
const path = require("path")

//criando o graphql server
const server = new GraphQLServer({
    typeDefs: path.resolve(__dirname,'typedefs/appointmentSchema.graphql'),
    resolvers
})

// server configuration
const options = { 
    port: 8000
}

//start the server
server.start(options, ({ port }) =>
  console.log(
    `Servidor iniciado na porta ${port}`,
  ),
)
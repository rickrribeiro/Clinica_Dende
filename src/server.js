const {GraphQLServer} = require("graphql-yoga")
const resolvers = require("./resolvers/rulesResolver")
const path = require("path")

//creating the graphql server
const server = new GraphQLServer({
    typeDefs: path.resolve(__dirname,'typedefs/rulesSchema.graphql'),
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
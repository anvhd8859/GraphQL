const {ApolloServer} = require("apollo-server");
const {typeDefs} = require("./schema/typeDefs")
const {resolvers} = require("./schema/resolvers")

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => {
        return {req} // can use some user model
    }
});

server.listen().then(({url}) => console.log(`Server is running on ${url}`));

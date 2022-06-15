const { ApolloServer } = require("apollo-server");

const fs = require("fs");
const path = require("path");

const typeDefs = fs.readFileSync(
    path.join(__dirname, "schema.graphql"),
    "utf8"
);

let links = [
    {
        id: "link-0",
        url: "www.howtographql.com",
        description: "Fullstack tutorial for GraphQL",
    },
];

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
        link: (parent, args) => {
            for (const iterator of links) {
                if (args.id == iterator.id) return iterator;
            }
            return "Not found link!";
        },
    },
    Mutation: {
        postLink: (parent, args) => {
            let idCount = links.length;
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            };
            links.push(link);
            return link;
        },
        updateLink: (parent, args) => {
            let link = null;
            for (const iterator of links) {
                if (iterator.id == args.id) {
                    link = iterator;
                    break
                }
            }
            if (link) {
                link.url = args.url;
                link.description = args.description;
                return link;
            }
        },
        deleteLink: (parent, args) => {
            for (const idx in links) {
                if (Object.hasOwnProperty.call(links, idx)) {
                    if (links[idx].id == args.id) {
                        links .splice(idx, 1);
                        break;
                    }
                }
            }
        }
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));

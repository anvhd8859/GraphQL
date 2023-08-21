const {
    UserList,
    MovieList
} = require("../sample_data/SampleData")
const worker = require("lodash");

const resolvers = {
    Query: {
        // User resolver
        users(_parent, args, _context, _info) {
            if (UserList) return {users: UserList};
            return {message: "Yo, error"};
        },
        user: (_, args) => {
            const id = Number(args.id);
            return worker.find(UserList, {id: id});
        },

        // Movie resolver
        movies() {
            return MovieList;
        },
        movie(_, args) {
            const name = args.name;
            return worker.find(MovieList, (movie) => movie.name === name);
        }
    },
    User: {
        favoriteMovies() {
            return worker.filter(MovieList, (movie) => movie.yearOfPublic >= 2000 && movie.yearOfPublic <= 2010)
        }
    },
    Mutation: {
        createUser: (_, args) => {
            const user = args.input
            const lastUser = UserList[UserList.length - 1];
            user.id = lastUser.id + 1;
            UserList.push(user);
            return user;
        },
        updateUsername: (_, args) => {
            const {id, newUsername} = args.input;
            let userUpdated;
            UserList.forEach((user) => {
                if (user.id === Number(id)) {
                    user.username = newUsername
                    userUpdated = user;
                }
            });
            return userUpdated;
        },
        deleteUser(_, args) {
            const id = Number(args.id);
            worker.remove(UserList, (user) => user.id === id);
            return null;
        }
    },
    UsersResult: {
        __resolveType(obj) {
            if (obj.users) {
                return "UsersSuccessfulResult";
            }
            if (obj.message) {
                return "UsersErrorResult";
            }
            return null;
        }
    }
}

module.exports = {resolvers};
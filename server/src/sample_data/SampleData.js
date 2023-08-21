const UserList = [
    {
        id: 1,
        name: "John",
        username: "john",
        age: 20,
        nationality: "CANADA",
        friends: [
            {
                id: 2,
                name: "Pedro",
                username: "pedro",
                age: 21,
                nationality: "BRAZIL",
            },
            {
                id: 4,
                name: "Rafe",
                username: "rare31",
                age: 31,
                nationality: "ENGLAND",
            }
        ],
    },
    {
        id: 2,
        name: "Pedro",
        username: "pedro",
        age: 21,
        nationality: "BRAZIL",
    },
    {
        id: 3,
        name: "Sarah",
        username: "cameron",
        age: 25,
        nationality: "INDIA",
    },
    {
        id: 4,
        name: "Rafe",
        username: "rare31",
        age: 31,
        nationality: "ENGLAND",
        friends: [
            {
                id: 3,
                name: "Sarah",
                username: "cameron",
                age: 25,
                nationality: "INDIA",
            },
        ]
    },
    {
        id: 5,
        name: "Kelly",
        username: "kel12",
        age: 26,
        nationality: "CHILE",
    }
]

const MovieList = [
    {
        id: 1,
        name: "Avengers Endgame",
        yearOfPublic: 2019,
        isInTheater: true,
    },
    {
        id: 2,
        name: "Interstella",
        yearOfPublic: 2007,
        isInTheater: true,
    },
    {
        id: 3,
        name: "Super bad",
        yearOfPublic: 2009,
        isInTheater: false,
    },
    {
        id: 4,
        name: "Blue beetle",
        yearOfPublic: 2023,
        isInTheater: true,
    },
]

module.exports = {UserList, MovieList};
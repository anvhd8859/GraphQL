import React, {useState} from "react";
import {useQuery, useLazyQuery, gql, useMutation} from '@apollo/client'

const GET_ALL_USERS = gql`
    query getAllUsers {
        users {
            id
            name
            username
            age
            nationality
        }
    }
`;

const GET_ALL_MOVIES = gql`
    query getAllMovies {
        movies {
            id
            name
            yearOfPublic
        }
    }
`;

const GET_MOVIE_BY_NAME = gql`
    query getMovieByName($movieName: String!){
        movie(name: $movieName) {
            name
            yearOfPublic
            isInTheater
        }
    }
`;

const CREATE_USER_MUTATION = gql`
    mutation createUser($input: CreateUserInput!) {
        createUser(input: $input) {
            id
            name
            username
            age
            nationality
        }
    }
`;

function DisplayData() {
    const [movieSearched, setMovieSearched] = useState("");
    // create user state
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [age, setAge] = useState(18);
    const [nationality, setNationality] = useState("");

    const {data, loading, refetch} = useQuery(GET_ALL_USERS);
    const {data: movieData} = useQuery(GET_ALL_MOVIES);

    const [
        fetchMovie,
        {data: movieSearchedData, error: movieError}
    ] = useLazyQuery(GET_MOVIE_BY_NAME);
    const [createUser] = useMutation(CREATE_USER_MUTATION);

    if (loading) {
        return <div>Data is loading</div>
    }
    if (data) {
        console.log(data)
    }

    if (movieSearchedData) {
        console.log(movieSearchedData)
    }
    if (movieError) {
        console.log(movieError)
    }

    return (
        <div>
            <div>
                <input type={"text"} placeholder={"Name..."}
                       onChange={(e) => {
                           setName(e.target.value);
                       }}
                />
                <input type={"text"} placeholder={"Username..."}
                       onChange={(e) => {
                           setUsername(e.target.value);
                       }}
                />
                <input type={"number"} placeholder={"Age..."}
                       onChange={(e) => {
                           setAge(Number(e.target.value));
                       }}
                />
                <input type={"text"} placeholder={"Nationality..."}
                       onChange={(e) => {
                           setNationality(e.target.value.toUpperCase());
                       }}
                />
                <button onClick={() => {
                    createUser({
                        variables: {
                            input: {name, username, age, nationality}
                        }
                    }).then(() => refetch());
                }}>Create user
                </button>
            </div>
            {data && data.users.map((user) => {
                return (
                    <div key={user.id}>
                        <h1>Name: {user.name}</h1>
                        <h1>Username: {user.username}</h1>
                        <h1>Age: {user.age}</h1>
                        <h1>Nationality: {user.nationality}</h1>
                    </div>
                );
            })}

            {movieData && movieData.movies.map((movie) => {
                return (
                    <div>
                        <h1>Movie: {movie.name}</h1>
                    </div>
                );
            })}

            <div>
                <input type={"text"} placeholder={"Interstesllar..."}
                       onChange={(e) => setMovieSearched(e.target.value)}/>
                <button onClick={() => {
                    fetchMovie({
                        variables: {
                            movieName: movieSearched
                        }
                    })
                }}>Fetch data
                </button>
                <div>
                    {movieSearchedData && (
                        <div>
                            <h1>MovieName: {movieSearchedData.movie.name}</h1>
                            <h1>Year of publication: {movieSearchedData.movie.yearOfPublic}</h1>
                        </div>
                    )}
                    {movieError && <h1>Error when fetch data</h1>}
                </div>
            </div>
        </div>
    );
}

export default DisplayData;
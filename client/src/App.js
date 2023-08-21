import './App.css';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import DisplayData from "./DisplayData";

function App() {
    const client = new ApolloClient({
        cache: new InMemoryCache(),
        uri: 'http://localhost:4000/graphql',
    });
    return (
        <ApolloProvider client={client}>
            <div className="App">
                <header className="App-header">
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
                <div>List of user</div>
                <DisplayData />
            </div>
        </ApolloProvider>
    );
}

export default App;

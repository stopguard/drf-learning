import React from "react";
import {HashRouter, Redirect, Route, Switch} from "react-router-dom";
import Cookies from "universal-cookie/lib";
import './App.css';
import UsersList from "./components/Users";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import ToDosList from "./components/ToDos";
import ProjectsList, {ProjectDetail} from "./components/Projects";
import LoginForm from "./components/Auth";

const apiIpAddress = '192.168.0.103'
const apiUrl = `http://${apiIpAddress}:8000`;

const page404 = ({path}) => {
    return (
        <h1>Page '{path.pathname}' not found</h1>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            username: '',
            isAuthenticated: false,
            previousUsersUrl: null,
            nextUsersUrl: null,
            usersList: [],
            previousProjectsUrl: null,
            nextProjectsUrl: null,
            projectsList: [],
            previousToDosUrl: null,
            nextToDosUrl: null,
            toDoList: [],
        };
    }

    setToken(token, username = '') {
        const cookies = new Cookies();
        cookies.set('token', token);
        cookies.set('username', username);
        if (token !== '') {
            this.setState({token: token, isAuthenticated: true});
        } else {
            this.setState({token: token, isAuthenticated: false});
        }
    }

    logout() {
        this.setToken('');
    }

    getStorageToken() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        const username = cookies.get('username')
        if (token !== '') {
            this.setState({token: token, 'username': username, isAuthenticated: true}, () => {
                this.loadProjects(`${apiUrl}/api/projects`);
                this.loadUsers(`${apiUrl}/api/users`);
                this.loadToDo(`${apiUrl}/api/todo`);
            });
        } else {
            this.setState({token: token, 'username': '', isAuthenticated: false});
        }
    }

    getToken(username, password) {
        fetch(`${apiUrl}/api/jwt/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    "X-Requested-With": "XMLHttpRequest",
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            })
            .then(response => {
                return response.json();
            })
            .then(response => {
                this.setToken(response.access, username)
            })
            .catch(error => console.log(error));
    }

    getHeaders() {
        let headers = {
            "Content-Type": "application/json;charset=utf-8",
            "X-Requested-With": "XMLHttpRequest",
        };
        if (this.state.isAuthenticated) {
            headers.Authorization = `Bearer ${this.state.token}`;
        }
        return headers;
    }

    loadUsers(url) {
        const headers = this.getHeaders();
        fetch(`${url}`,
            {
                method: "GET",
                headers: headers,
            })
            .then((response) => {
                return response.json();
            })
            .then((request) => {
                if (request.results) {
                    const users = request.results;
                    const previous = request.previous;
                    const next = request.next;
                    this.setState(
                        {
                            previousUsersUrl: previous,
                            nextUsersUrl: next,
                            usersList: users,
                        }
                    );
                }
            })
            .catch(error => console.log(error));
    };

    loadToDo(url) {
        const headers = this.getHeaders();
        fetch(`${url}`,
            {
                method: "GET",
                headers: headers,
            })
            .then((response) => {
                return response.json();
            })
            .then((request) => {
                if (request.results) {
                    const toDos = request.results;
                    const previous = request.previous;
                    const next = request.next;
                    this.setState(
                        {
                            previousToDosUrl: previous,
                            nextToDosUrl: next,
                            toDoList: toDos,
                        }
                    );
                }
            })
            .catch(error => console.log(error));
    };

    loadProjects(url) {
        const headers = this.getHeaders();
        fetch(`${url}`,
            {
                method: "GET",
                headers: headers,
            })
            .then((response) => {
                return response.json();
            })
            .then((request) => {
                if (request.results) {
                    const projectsList = request.results;
                    const previous = request.previous;
                    const next = request.next;
                    this.setState(
                        {
                            previousProjectsUrl: previous,
                            nextProjectsUrl: next,
                            projectsList: projectsList,
                        }
                    );
                }
            })
            .catch(error => console.log(error));
    };

    componentDidMount() {
        this.getStorageToken();
    }

    render() {
        return (
            <div className={'App'}>
                <HashRouter>
                    <Menu username={this.state.username}
                          isAuthenticated={this.state.isAuthenticated}
                          logout={this.logout.bind(this)}
                    />
                    <Switch>
                        <Route exact path={'/'}>
                            <UsersList usersList={this.state.usersList}
                                       nextPage={this.state.nextUsersUrl}
                                       previousPage={this.state.previousUsersUrl}
                                       load={this.loadUsers.bind(this)}
                            />
                        </Route>
                        <Route exact path={'/login'}>
                            <LoginForm
                                getToken={this.getToken.bind(this)}
                            />
                        </Route>
                        <Route exact path={'/todos'}>
                            <ToDosList toDosList={this.state.toDoList}
                                       nextPage={this.state.nextToDosUrl}
                                       previousPage={this.state.previousToDosUrl}
                                       load={this.loadToDo.bind(this)}
                            />
                        </Route>
                        <Route exact path={'/projects'}>
                            <ProjectsList projectsList={this.state.projectsList}
                                          nextPage={this.state.nextProjectsUrl}
                                          previousPage={this.state.previousProjectsUrl}
                                          load={this.loadProjects.bind(this)}
                            />
                        </Route>
                        <Route exact path={'/projects/:id'}>
                            <ProjectDetail projectsList={this.state.projectsList}/>
                        </Route>
                        <Redirect from={'/users'} to={'/'}/>
                        <Route component={page404}/>
                    </Switch>
                    <Footer/>
                </HashRouter>
            </div>
        );
    }

}

export default App;

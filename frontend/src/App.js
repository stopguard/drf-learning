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
import ToDoForm from "./components/ToDoForm";
import ProjectForm from "./components/ProjectForm";

const apiIpAddress = '127.0.0.1'
const apiUrl = `http://${apiIpAddress}:8000/api`;

const page404 = ({path}) => {
    return (
        <h1>Page '{path.pathname}' not found</h1>
    );
};

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
            filteredProjectsList: [],
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
        this.getStorageToken();
    }

    logout() {
        this.setToken('');
    }

    getStorageToken() {
        const cookies = new Cookies();
        const token = cookies.get('token');
        const username = cookies.get('username');
        if (token !== '') {
            this.setState({token: token, 'username': username, isAuthenticated: true}, () => {
                this.loadProjects(`${apiUrl}/projects/`);
                this.loadUsers(`${apiUrl}/users/`);
                this.loadToDo(`${apiUrl}/todo/`);
            });
        } else {
            this.setState({token: token, 'username': '', isAuthenticated: false});
        }
    }

    getToken(username, password) {
        fetch(`${apiUrl}/jwt/`,
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
                this.setToken(response.access, username);
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
                'headers': headers,
            })
            .then((response) => {
                return response.json();
            })
            .then((request) => {
                if (!request.detail) {
                    // const users = request;
                    // const previous = request.previous;
                    // const next = request.next;
                    this.setState(
                        {
                            // previousUsersUrl: previous,
                            // nextUsersUrl: next,
                            usersList: request,
                        }
                    );
                } else {
                    this.logout()
                }
            })
            .catch(error => console.log(error));
    }

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
                } else {
                    this.logout()
                }
            })
            .catch(error => console.log(error));
    }

    createUpdateToDo(id, creator, project, body) {
        const headers = this.getHeaders();
        let method = 'POST';
        let toDo = '';
        if (id) {
            method = 'PUT';
            toDo = `${id}/`
        }
        fetch(`${apiUrl}/todo/${toDo}`,
            {
                method: method,
                headers: headers,
                body: JSON.stringify({creator: creator, project: project, body: body})
            })
            .then(() => this.getStorageToken())
            .catch(error => console.log(error))
    }

    deactivateToDo(id) {
        const headers = this.getHeaders();
        fetch(`${apiUrl}/todo/${id}/`,
            {
                method: 'DELETE',
                'headers': headers
            })
            .then(() => {
                let toDoList = this.state.toDoList;
                toDoList = toDoList.map(toDo => {
                    if (toDo.id === +id) {
                        toDo.isActive = false;
                    }
                    return toDo;
                })
                this.setState({'toDoList': toDoList});
            })
            .catch(error => console.log(error));
    }

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
                if (!request.detail) {
                    // const projectsList = request.results;
                    // const previous = request.previous;
                    // const next = request.next;
                    this.setState(
                        {
                            // previousProjectsUrl: previous,
                            // nextProjectsUrl: next,
                            // projectsList: projectsList, // если пагинация то запрашиваем искомые проекты у апи
                            projectsList: request,
                            filteredProjectsList: request,
                        }
                    );
                } else {
                    this.logout()
                }
            })
            .catch(error => console.log(error));
    }

    projectFilter(searchLine) {
        let re = new RegExp(searchLine, 'i')
        let filteredList = searchLine === '' ?
            this.state.projectsList :
            this.state.projectsList.filter(project => project.name.match(re))
        this.setState({filteredProjectsList: filteredList})
    }

    createUpdateProject(id, name, gitLink, users) {
        const headers = this.getHeaders();
        let method = 'POST';
        let project = '';
        if (id) {
            method = 'PUT';
            project = `${id}/`
        }
        fetch(`${apiUrl}/projects/${project}`,
            {
                method: method,
                headers: headers,
                body: JSON.stringify({name: name, gitLink: gitLink, users: users})
            })
            .then(() => this.getStorageToken())
            .catch(error => console.log(error))
    }

    deleteProject(id) {
        const headers = this.getHeaders();
        fetch(`${apiUrl}/projects/${id}/`,
            {
                method: 'DELETE',
                'headers': headers,
            })
            .then(() => {
                this.setState({projectsList: this.state.projectsList.filter(project => project.id !== id)});
            })
            .catch(error => console.log(error));
    }

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
                                       deactivate={this.deactivateToDo.bind(this)}
                            />
                        </Route>
                        <Route exact path={'/projects/:id/edit'}>
                            <ProjectForm allUsers={this.state.usersList}
                                         allProjects={this.state.projectsList}
                                         createUpdateProject={this.createUpdateProject.bind(this)}/>
                        </Route>
                        <Route exact path='/todos/create'>
                            <ToDoForm allProjects={this.state.projectsList}
                                      allUsers={this.state.usersList}
                                      username={this.state.username}
                                      createUpdateToDo={this.createUpdateToDo.bind(this)}/>
                        </Route>
                        <Route exact path={'/todos/:id/edit'}>
                            <ToDoForm allUsers={this.state.usersList}
                                      allToDos={this.state.toDoList}
                                      allProjects={this.state.projectsList}
                                      username={this.state.username}
                                      createUpdateToDo={this.createUpdateToDo.bind(this)}/>
                        </Route>
                        <Route exact path={'/projects'}>
                            <ProjectsList projectsList={this.state.filteredProjectsList}
                                          nextPage={this.state.nextProjectsUrl}
                                          previousPage={this.state.previousProjectsUrl}
                                          load={this.loadProjects.bind(this)}
                                          deleteProject={this.deleteProject.bind(this)}
                                          projectFilter={this.projectFilter.bind(this)}
                            />
                        </Route>
                        <Route exact path='/projects/create'>
                            <ProjectForm allUsers={this.state.usersList}
                                         createUpdateProject={this.createUpdateProject.bind(this)}/>
                        </Route>
                        <Route exact path={'/projects/:id/edit'}>
                            <ProjectForm allUsers={this.state.usersList}
                                         allProjects={this.state.projectsList}
                                         createUpdateProject={this.createUpdateProject.bind(this)}/>
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

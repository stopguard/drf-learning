import React from "react";
import './App.css';
import UsersList from "./components/Users";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import {HashRouter, Redirect, Route, Switch} from "react-router-dom";
import ToDosList from "./components/ToDos";
import ProjectsList, {ProjectDetail} from "./components/Projects";

const apiIpAddress = '192.168.0.103'
const apiUrl = `http://${apiIpAddress}:8000/api/`;

const page404 = ({path}) => {
    return (
        <h1>Page '{path.pathname}' not found</h1>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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

    loadUsers(url) {
        fetch(`${url}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    "X-Requested-With": "XMLHttpRequest",
                },
            })
            .then((response) => {
                return response.json();
            })
            .then((request) => {
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
            })
            .catch(error => console.log(error));
    };

    loadToDo(url) {
        fetch(`${url}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    "X-Requested-With": "XMLHttpRequest",
                },
            })
            .then((response) => {
                return response.json();
            })
            .then((request) => {
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
            })
            .catch(error => console.log(error));
    };

    loadProjects(url) {
        fetch(`${url}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    "X-Requested-With": "XMLHttpRequest",
                },
            })
            .then((response) => {
                return response.json();
            })
            .then((request) => {
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
            })
            .catch(error => console.log(error));
    };

    componentDidMount() {
        this.loadUsers(`${apiUrl}users/`);
        this.loadToDo(`${apiUrl}todo/`);
        this.loadProjects(`${apiUrl}projects/`);
    }

    render() {
        return (
            <div className={'App'}>
                <HashRouter>
                    <Menu/>
                    <Switch>
                        <Route exact path={'/'}>
                            <UsersList usersList={this.state.usersList}
                                       nextPage={this.state.nextUsersUrl}
                                       previousPage={this.state.previousUsersUrl}
                                       load={this.loadUsers.bind(this)}
                            />
                        </Route>
                        <Route exact path={'/todos/'}>
                            <ToDosList toDosList={this.state.toDoList}
                                       nextPage={this.state.nextToDosUrl}
                                       previousPage={this.state.previousToDosUrl}
                                       load={this.loadToDo.bind(this)}
                            />
                        </Route>
                        <Route exact path={'/projects/'}>
                            <ProjectsList projectsList={this.state.projectsList}
                                          nextPage={this.state.nextProjectsUrl}
                                          previousPage={this.state.previousProjectsUrl}
                                          load={this.loadProjects.bind(this)}
                            />
                        </Route>
                        <Route exact path={'/projects/:id/'}>
                            <ProjectDetail projectsList={this.state.projectsList}/>
                        </Route>
                        <Redirect from={'/users/'} to={'/'}/>
                        <Route component={page404}/>
                    </Switch>
                    <Footer/>
                </HashRouter>
            </div>
        );
    }

}

export default App;

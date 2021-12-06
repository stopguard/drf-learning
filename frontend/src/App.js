import logo from './logo.svg';
import React from "react";
import './App.css';
import UsersList from "./components/Users";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import axios from "axios";

const apiUrl = 'http://192.168.43.12:8000/api/';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'usersList': [],
        };
    }

    componentDidMount() {
        axios.get(`${apiUrl}users/`)
            .then(response => {
                const users = response.data;
                this.setState(
                    {
                        'usersList': users,
                    }
                );
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div>
                <Menu/>
                <UsersList usersList={this.state.usersList}/>
                <Footer/>
            </div>
        );
    }

}

export default App;

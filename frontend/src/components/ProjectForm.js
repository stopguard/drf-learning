import React from "react";
import {withRouter} from "react-router-dom";

class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        let projectId = +props.match.params.id
        if(projectId) {
            let projects = props.allProjects.filter(project => project.id === projectId)
            let project = projects.length > 0 ? projects[0] : {users: []}
            let users = project.users.map(user => user.id)
            console.log(users)
            this.state = {
                id: project.id,
                name: project.name,
                gitLink: project.gitLink,
                users: users,
            };
        } else {
            this.state = {
                id: null,
                name: '',
                gitLink: '',
                users: [],
            };
        }
    }

    handleChange(e) {
        this.setState({
                [e.target.name]: e.target.value,
            });
    }

    handleUsersChange(e) {
        let selectedOptions = e.target.selectedOptions
        if(selectedOptions) {
            let users = [];
            for(let i = 0; i < selectedOptions.length; i++) {
                users.push(+selectedOptions.item(i).value);
            }

            this.setState({
                users: users
            });
        }
    }


    handleSubmit(e) {
        e.preventDefault();
        this.props.createUpdateProject(
            this.state.id,
            this.state.name,
            this.state.gitLink,
            this.state.users
        )
    }

    render() {
        return (
            <form onSubmit={e => this.handleSubmit(e)}>
                <div>
                    <label>Name</label>
                    <input
                        required
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={e => this.handleChange(e)}
                    />
                </div>
                <div>
                    <label>Git link</label>
                    <input
                        type="url"
                        name="gitLink"
                        value={this.state.gitLink}
                        onChange={e => this.handleChange(e)}
                    />
                </div>
                <div>
                    <label>Users</label>
                    <select
                        multiple
                        required
                        name="users"
                        onChange={e => this.handleUsersChange(e)}
                    >
                        {this.props.allUsers.map(user => {
                            if (this.state.users.length > 0 && this.state.users.includes(user.id)){
                                return <option selected key={user.id} value={user.id}>
                                    {`${user.firstName} ${user.lastName}`}
                                </option>
                            }
                            return <option key={user.id} value={user.id}>
                                {`${user.firstName} ${user.lastName}`}
                            </option>
                        } )}
                    </select>
                </div>
                <input type="submit" value="Save"/>
            </form>
        )
    }
}

export default withRouter(ProjectForm)

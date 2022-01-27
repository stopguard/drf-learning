import React from "react";

class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        let project = props.project
        if(project) {
            let users = project.users.map(user => user.id)
            this.state = {
                id: project.id,
                name: project.name,
                gitLink: project.gitLink,
                users: users,
            };
        } else {
            this.state = {
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
        console.log(this.state.name);
        console.log(this.state.gitLink);
        console.log(this.state.users);
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
                            if (this.state.users.length > 0 && user.id in this.state.users){
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

export default ProjectForm

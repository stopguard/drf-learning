import React from "react";

class ToDoForm extends React.Component {
    constructor(props) {
        super(props);
        let toDo = props.toDo
        if(toDo) {
            this.state = {
                id: toDo.id,
                creator: toDo.creator,
                project: toDo.project.id,
                body: toDo.body,
            };
        } else {
            let creator = props.allUsers.filter(user => user.username === props.username)[0] || '';
            this.state = {
                'creator': creator,
                project: props.allProjects.length > 0 ? props.allProjects[0].id : 0,
                body: "",
            };
        }
    }

    handleChange(e) {
        this.setState({
                [e.target.name]: e.target.value,
            });
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state.creator.username);
        console.log(this.state.project);
        console.log(this.state.body);
    }

    render() {
        return (
            <form onSubmit={e => this.handleSubmit(e)}>
                <div>
                    <label>Creator: </label>
                    <span>{this.state.creator.firstName} {this.state.creator.lastName}</span>
                </div>
                <div>
                    <label>Project</label>
                    <select
                        name="project"
                        onChange={e => this.handleChange(e)}
                    >
                        {this.props.allProjects.map(project => {
                            if(this.state.project.id === project.id){
                                return <option key={project.id} selected value={project.id}>
                                    {project.name}
                                </option>
                            }
                            return <option key={project.id} value={project.id}>
                                {project.name}
                            </option>
                        } )}
                    </select>
                </div>
                <div>
                    <label>Body</label>
                    <input
                        required
                        type="text"
                        name="body"
                        value={this.state.body}
                        onChange={e => this.handleChange(e)}
                    />
                </div>
                <input type="submit" value="Save"/>
            </form>
        );
    }
}

export default ToDoForm

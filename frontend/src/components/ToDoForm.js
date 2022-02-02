import React from "react";
import {withRouter} from "react-router-dom";

class ToDoForm extends React.Component {
    constructor(props) {
        super(props);
        let toDoId = +props.match.params.id
        if(toDoId) {
            let toDos = props.allToDos.filter(toDo => toDo.id === toDoId)
            let toDo = toDos.length > 0 ? toDos[0] : {}
            this.state = {
                id: toDo.id,
                creator: toDo.creator,
                project: toDo.project.id,
                body: toDo.body,
            };
        } else {
            // при обновлении страницы не подтягивается юзер. работает только если перейти на создание задачи по ссылке
            // как решить проблему пока не придумал
            let creator = props.allUsers.filter(user => user.username === props.username)[0] || {};
            this.state = {
                id: null,
                'creator': creator,
                project: props.allProjects.length > 0 ? props.allProjects[0].id : null,
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
        this.props.createUpdateToDo(
            this.state.id,
            this.state.creator.id,
            +this.state.project,
            this.state.body
        )
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
                            if(+this.state.project === +project.id){
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

export default withRouter(ToDoForm)

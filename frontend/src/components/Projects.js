import React from "react";
import {Link, useParams} from "react-router-dom";

const ProjectItem = ({project, deleteProject}) => {
    return (
        <tr>
            <td>{project.id}</td>
            <td><Link to={`/projects/${project.id}/`}>{project.name}</Link></td>
            <td>
                <button onClick={() => deleteProject(project.id)} type='button'>Delete</button>
            </td>
        </tr>
    );
};

const ProjectDetail = ({projectsList}) => {
    let {id} = useParams();
    let project = projectsList.filter(project => project.id === +id);
    if (project.length) {
        project = project[0];
        let users = [];
        project.users.forEach(
            user => users.push(`${user.firstName} ${user.lastName}`)
        );
        return (<div>
            <table>
                <thead>
                <tr>
                    <th>Field</th>
                    <th>Value</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>ID</td>
                    <td>{project.id}</td>
                </tr>
                <tr>
                    <td>Name</td>
                    <td>{project.name}</td>
                </tr>
                <tr>
                    <td>Git</td>
                    <td>{project.gitLink}</td>
                </tr>
                <tr>
                    <td>Users</td>
                    <td>{users.join(', ')}</td>
                </tr>
                </tbody>
            </table>
            <Link to={`/projects/${project.id}/edit`}>Edit</Link>
        </div>)
    }
    return (<h1>Page {`/projects/${id}/`} not found</h1>)
}

const ProjectsList = ({projectsList, previousPage, nextPage, load, deleteProject, projectFilter}) => {
    return (
        <div>
            <p>Искать: <input type="text" onChange={e => projectFilter(e.target.value)}/></p>
            <p>
                {previousPage && <button onClick={() => load(previousPage)}>previous page</button>}
                {nextPage && <button onClick={() => load(nextPage)}>next page</button>}
            </p>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {projectsList.map((project) => <ProjectItem key={project.id}
                                                            project={project}
                                                            deleteProject={deleteProject}/>)}
                </tbody>
            </table>
            <Link to='/projects/create/'>Create</Link>
        </div>
    );
};

export default ProjectsList;
export {ProjectDetail};

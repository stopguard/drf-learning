import React from "react";
import {Link, useParams} from "react-router-dom";

const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
                {project.id}
            </td>
            <td>
                <Link to={`/projects/${project.id}/`}>{project.name}</Link>
            </td>
        </tr>
    );
};

const ProjectDetail = ({projectsList}) => {
    let {id} = useParams();
    let project = projectsList.filter(project => project.id === +id);
    if (project.length) {
        project = project[0];
        return (<table>
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
                <td>Git</td>
                <td>{project.gitLink}</td>
            </tr>
            <tr>
                <td>Users</td>
                <td>{project.users.join(', ')}</td>
            </tr>
            </tbody>
        </table>)
    }
    return (<h1>Page {`/projects/${id}/`} not found</h1>)
}

const ProjectsList = ({projectsList, previousPage, nextPage, load}) => {
    return (
        <div>
            <p>
                {previousPage && <button onClick={() => load(previousPage)}>previous page</button>}
                {nextPage && <button onClick={() => load(nextPage)}>next page</button>}
            </p>
            <table>
                <thead>
                <tr>
                    <th>
                        ID
                    </th>
                    <th>
                        Name
                    </th>
                </tr>
                </thead>
                <tbody>
                {projectsList.map((project) => <ProjectItem key={project.id} project={project}/>)}
                </tbody>
            </table>
        </div>
    );
};

export default ProjectsList;
export {ProjectDetail};

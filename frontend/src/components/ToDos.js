import React from "react";
import {Link} from "react-router-dom";

const ToDoItem = ({toDo, deactivate}) => {
    return (
        <tr>
            <td>{toDo.id}</td>
            <td>{`${toDo.creator.firstName} ${toDo.creator.lastName}`}</td>
            <td>{toDo.project.name}</td>
            <td>{toDo.body}</td>
            <td>{`${toDo.isActive}`}</td>
            <td>{toDo.isActive && <button onClick={() => deactivate(toDo.id)} type='button'>Deactivate</button>}</td>
        </tr>
    );
};

const ToDosList = ({toDosList, previousPage, nextPage, load, deactivate}) => {
    return (
        <div>
            <p>
                {previousPage && <button onClick={() => load(previousPage)}>previous page</button>}
                {nextPage && <button onClick={() => load(nextPage)}>next page</button>}
            </p>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Creator</th>
                    <th>Project</th>
                    <th>Text</th>
                    <th>Active</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                    {toDosList.map((toDo) => <ToDoItem key={toDo.id}
                                                       deactivate={deactivate}
                                                       toDo={toDo}/>)}
                </tbody>
            </table>
            <Link to='/todos/create/'>Create</Link>
        </div>
    );
};

export default ToDosList;

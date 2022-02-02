import React from "react";

const ToDoItem = ({toDo}) => {
    return (
        <tr>
            <td>
                {toDo.id}
            </td>
            <td>
                {toDo.creator}
            </td>
            <td>
                {toDo.project}
            </td>
            <td>
                {toDo.body}
            </td>
        </tr>
    );
};

const ToDosList = ({toDosList, previousPage, nextPage, load}) => {
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
                        Creator
                    </th>
                    <th>
                        Project
                    </th>
                    <th>
                        Text
                    </th>
                </tr>
                </thead>
                <tbody>
                {toDosList.map((toDo) => <ToDoItem key={toDo.id} toDo={toDo}/>)}
                </tbody>
            </table>
        </div>
    );
};

export default ToDosList;

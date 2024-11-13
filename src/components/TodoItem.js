import React from "react";

const TodoItem = ({ todo, onDelete, onEdit }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-white border rounded-md shadow-sm hover:shadow-lg transition duration-200">
      <div>
        <h3 className="text-lg font-semibold">{todo.title}</h3>
        <p className="text-sm text-gray-500">Status: {todo.status}</p>
      </div>
      <div className="flex gap-2">
        <button onClick={onEdit} className="text-blue-500 hover:text-blue-600">
          Edit
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="text-red-500 hover:text-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;

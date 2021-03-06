import { ReactNode } from "react";
import { Todo } from "../models/todo";
import "./TodoList.css";

export type TodoListProps = {
  todos: Todo[];
  renderTodo: (todo: Todo) => ReactNode;
};

export function TodoList(props: TodoListProps) {
  const { todos, renderTodo } = props;

  if (todos.length === 0) {
    return null;
  }

  return (
    <div className="todo__list">
      <ol>
        {todos.map((todo) => {
          return <li key={todo.id}>{renderTodo(todo)}</li>;
        })}
      </ol>
    </div>
  );
}

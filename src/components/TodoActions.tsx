import { Todo, TodoStatus } from "../models/todo";
import "./TodoActions.css";

export type Filter = {
  status: TodoStatus | "All";
  label: string;
};

export const filters: Filter[] = [
  {
    status: "All",
    label: "All",
  },
  {
    status: TodoStatus.Active,
    label: "Active",
  },
  {
    status: TodoStatus.Completed,
    label: "Completed",
  },
];

export type TodoActionsProps = {
  todos: Todo[];
  filterStatus: Filter["status"];
  onChangeFilter: (filter: Filter) => void;
  onClearCompleted: () => void;
};

export function TodoActions(props: TodoActionsProps) {
  const { todos, filterStatus, onChangeFilter, onClearCompleted } = props;

  const activeTodos = todos.filter((todo) => {
    return todo.status === TodoStatus.Active;
  });

  return (
    <div className="todo__actions">
      <div>
        <span>{`${activeTodos.length} items`}</span>
      </div>
      <div className="filters">
        {filters.map((filter) => {
          const isActive = filter.status === filterStatus;
          return (
            <button
              className={`button button--filter button--${
                isActive ? "active" : "inactive"
              }`}
              key={filter.status}
              onClick={() => {
                onChangeFilter(filter);
              }}
            >
              {filter.label}
            </button>
          );
        })}
      </div>
      {todos.length !== activeTodos.length ? (
        <div>
          <button
            onClick={() => {
              onClearCompleted();
            }}
            className="button"
          >
            Clear Completed
          </button>
        </div>
      ) : null}
    </div>
  );
}

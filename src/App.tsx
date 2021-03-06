import React, { useEffect, useState } from "react";
import "./App.css";
import { Container } from "./components/Container";
import { Header } from "./components/Header";
import { Filter, TodoActions } from "./components/TodoActions";
import { TodoForm } from "./components/TodoForm";
import { TodoItem } from "./components/TodoItem";
import { TodoList } from "./components/TodoList";
import { Todo, TodoStatus } from "./models/todo";
import { storage } from "./storage/todo";

function App() {
  const [filterStatus, setFilterStatus] = useState<Filter["status"]>("All");
  const [todos, setTodos] = useState<Todo[]>([]);

  const filteredItems = todos.filter((todo) => {
    if (filterStatus === "All") {
      return true;
    } else {
      return todo.status === filterStatus;
    }
  });

  useEffect(() => {
    const data = storage.read();
    setTodos(data.todos);
  }, []);

  return (
    <div className="app">
      <Header></Header>
      <section>
        <Container>
          <TodoForm
            onSubmit={(params: { title: string }) => {
              const newTodos = todos.concat({
                id: Date.now(),
                title: params.title,
                createdDate: new Date(),
                status: TodoStatus.Active,
              });
              setTodos(newTodos);
              storage.persistent({ todos: newTodos });
            }}
          />
          <TodoList
            todos={filteredItems}
            renderTodo={(todo: Todo) => {
              return (
                <TodoItem
                  todo={todo}
                  onStatusChange={(todo: Todo) => {
                    const newTodos = todos.map((_todo) => {
                      if (_todo.id === todo.id) {
                        const status =
                          _todo.status === TodoStatus.Active
                            ? TodoStatus.Completed
                            : TodoStatus.Active;
                        return {
                          ..._todo,
                          completedDate:
                            status === TodoStatus.Completed
                              ? new Date()
                              : undefined,
                          status,
                        };
                      } else {
                        return _todo;
                      }
                    });
                    setTodos(newTodos);
                    storage.persistent({ todos: newTodos });
                  }}
                  onRemove={(todo: Todo) => {
                    const newTodos = todos.filter((_todo) => {
                      return _todo.id !== todo.id;
                    });
                    setTodos(newTodos);
                    storage.persistent({ todos: newTodos });
                  }}
                />
              );
            }}
          />
          {todos.length > 0 ? (
            <TodoActions
              todos={todos}
              filterStatus={filterStatus}
              onChangeFilter={(filter: Filter) => {
                setFilterStatus(filter.status);
              }}
              onClearCompleted={() => {
                const newTodos = todos.filter((todo) => {
                  return todo.status === TodoStatus.Active;
                });
                setTodos(newTodos);
                storage.persistent({ todos: newTodos });
              }}
            />
          ) : null}
        </Container>
      </section>
    </div>
  );
}

export default App;

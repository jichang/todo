import React, { useState } from "react";
import "./App.css";
import { Container } from "./components/Container";
import { Header } from "./components/Header";
import { TodoForm } from "./components/TodoForm";
import { TodoItem } from "./components/TodoItem";
import { TodoList } from "./components/TodoList";
import { Todo, TodoStatus } from "./models/todo";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <div className="app">
      <Header></Header>
      <section>
        <Container>
          <TodoForm
            onSubmit={(params: { title: string }) => {
              setTodos(
                todos.concat({
                  id: Date.now(),
                  title: params.title,
                  createdDate: new Date(),
                  status: TodoStatus.Active,
                })
              );
            }}
          />
          <TodoList
            todos={todos}
            renderTodo={(todo: Todo) => {
              return (
                <TodoItem
                  todo={todo}
                  onStatusChange={(todo: Todo) => {
                    setTodos(
                      todos.map((_todo) => {
                        if (_todo.id === todo.id) {
                          return {
                            ..._todo,
                            status:
                              _todo.status === TodoStatus.Active
                                ? TodoStatus.Completed
                                : TodoStatus.Active,
                          };
                        } else {
                          return _todo;
                        }
                      })
                    );
                  }}
                  onRemove={(todo: Todo) => {
                    setTodos(
                      todos.filter((_todo) => {
                        return _todo.id !== todo.id;
                      })
                    );
                  }}
                />
              );
            }}
          />
        </Container>
      </section>
    </div>
  );
}

export default App;

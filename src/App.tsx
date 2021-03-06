import React from "react";
import "./App.css";
import { Container } from "./components/Container";
import { Header } from "./components/Header";
import { TodoForm } from "./components/TodoForm";

function App() {
  return (
    <div className="app">
      <Header></Header>
      <section>
        <Container>
          <TodoForm
            onSubmit={(params) => {
              console.log(params);
            }}
          />
        </Container>
      </section>
    </div>
  );
}

export default App;

import { Container } from "./Container";
import "./Header.css";

export function Header() {
  return (
    <header className="app__header">
      <Container>
        <h1 className="app__header__title">Todo</h1>
      </Container>
    </header>
  );
}

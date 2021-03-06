import { useState } from "react";
import "./TodoForm.css";

export interface TodoFormProps {
  onSubmit: (params: { title: string }) => void;
}

export function TodoForm(props: TodoFormProps) {
  const { onSubmit } = props;
  const [title, setTitle] = useState("");

  return (
    <form
      className="form"
      onSubmit={(evt) => {
        evt.preventDefault();

        if (title) {
          onSubmit({ title });
        }
      }}
    >
      <div className="form__field">
        <input
          aria-label="What need to be done"
          className="form__control"
          value={title}
          onChange={(evt) => setTitle(evt.target.value)}
          placeholder="What need to be done"
        />
      </div>
    </form>
  );
}

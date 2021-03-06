import { Todo } from "../models/todo";

const key = "todos";

export type TodoStorage = {
  todos: Todo[];
};

function read(): TodoStorage {
  try {
    const str = window.localStorage.getItem(key);
    if (str) {
      return JSON.parse(str);
    }

    return { todos: [] };
  } catch (e) {
    console.log("can not load from local storage");
    return { todos: [] };
  }
}

function persistent(storage: TodoStorage) {
  try {
    const str = JSON.stringify(storage);
    window.localStorage.setItem(key, str);
  } catch (e) {
    console.log("can not load from local storage");
  }
}

export const storage = {
  read,
  persistent,
};

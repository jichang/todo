export enum TodoStatus {
  Active,
  Completed,
}

export interface Todo {
  id: number;
  createdDate: Date;
  completedDate: Date | undefined;
  status: TodoStatus;
}

export enum TodoStatus {
  Active,
  Completed,
}

export interface Todo {
  id: number;
  title: string;
  createdDate: Date;
  completedDate?: Date;
  status: TodoStatus;
}

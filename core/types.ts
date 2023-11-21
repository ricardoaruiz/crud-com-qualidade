/**
 * The UUID type.
 */
export type UUID = string;

/**
 * An interface representing a todo.
 */
export interface Todo {
  id: string;
  date: string;
  content: string;
  done: boolean;
}
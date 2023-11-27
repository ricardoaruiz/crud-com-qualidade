/**
 * Filters todos by content.
 *
 * @param {string} search - The search string to filter todos by.
 * @param {Array<Todo & { content: string }>} todos - The array of todos to filter.
 * @return {Array<Todo>} - The filtered array of todos.
 */
export default function <Todo>(
  search: string,
  todos: Array<Todo & { content: string }>,
): Array<Todo> {
  return todos.filter(({ content }) =>
    content.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
  );
}

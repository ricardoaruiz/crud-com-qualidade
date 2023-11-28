import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { GlobalStyles } from "@ui/theme/GlobalStyles";
import { todoController } from "@ui/controller";
import { useDebounce } from "@ui/hooks/useDebounce";
import { UIControllerException } from "@ui/controller/exceptions/UIControllerException";

type HomeTodo = {
  id: string;
  content: string;
  done: boolean;
};

const bg = "/bg.jpeg"; // inside public folder
const PAGE_LIMIT = 5;

/**
 * load todos function params type
 */
type LoadTodosParams = {
  page: number;
  limit: number;
  search?: string;
  isAppendMode?: boolean;
};

const CreateTodoFormSchema = z.object({
  content: z.string().min(1, { message: "O conteúdo deve ser informado" }),
});

type CreateTodoFormData = z.infer<typeof CreateTodoFormSchema>;

function HomePage() {
  const firstRender = React.useRef(true);

  const [todos, setTodos] = React.useState<HomeTodo[]>([]);
  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isCreating, setIsCreating] = React.useState(false);

  /**
   * Search state
   */
  const [search, setSearch] = React.useState("");
  const debouncedSearch = useDebounce(search, 500);

  /**
   * Filters todos by content.
   */
  const homeTodos = todoController.filterTodosByContent<HomeTodo>(
    debouncedSearch,
    todos,
  );
  const hasMorePages = page + 1 <= pages;
  const noDataFound = homeTodos.length === 0;

  const {
    register: registerCreateTodo,
    handleSubmit: handleCreateTodoSubmit,
    formState: { errors: errorsCreateTodo },
    setValue: setValueCreateTodo,
  } = useForm<CreateTodoFormData>({
    resolver: zodResolver(CreateTodoFormSchema),
  });

  /**
   * Loads todos from the API.
   */
  const loadTodos = React.useCallback(
    ({ page, limit, search, isAppendMode = false }: LoadTodosParams) => {
      setIsLoading(true);

      todoController
        .get({ page, limit, search })
        .then(({ todos, pages }) => {
          setTodos((currentTodos) =>
            isAppendMode ? [...currentTodos, ...todos] : todos,
          );
          setPages(pages);
        })
        .catch(() => {
          alert("Something went wrong. Please try again.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [],
  );

  /**
   * Creates a new todo.
   */
  const createTodo = React.useCallback(
    async (content: string) => {
      setIsCreating(true);

      todoController
        .create(content)
        .then(() => {
          setValueCreateTodo("content", "");
          loadTodos({ page, limit: PAGE_LIMIT * page });
        })
        .catch((error) => {
          const errorController = error as UIControllerException;
          // TODO: improve error
          alert(errorController.toString());
        })
        .finally(() => {
          setIsCreating(false);
        });
    },
    [loadTodos, page, setValueCreateTodo],
  );

  /**
   * Toggles the done state of a todo.
   */
  const toggleDone = React.useCallback((id: string) => {
    todoController
      .toggleDone({ id })
      .then((data) => {
        setTodos((currentTodos) => {
          return currentTodos.map((todo) =>
            todo.id === id ? { ...todo, done: data.done } : todo,
          );
        });
      })
      .catch((error) => {
        const errorController = error as UIControllerException;
        // TODO: improve error
        alert(errorController.toString());
      });
  }, []);

  /**
   * Handles the next page.
   */
  const handleNextPage = React.useCallback(() => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadTodos({ page: nextPage, limit: PAGE_LIMIT, isAppendMode: true });
  }, [loadTodos, page]);

  /**
   * Handles search change.
   */
  const handleSearchChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    },
    [],
  );

  /**
   * Handles the submit event for creating a new todo.
   *
   * @param {CreateTodoFormData} data - The form data containing the todo content.
   * @return {void} This function does not return anything.
   */
  const onSubmitCreateTodo: SubmitHandler<CreateTodoFormData> = (
    data: CreateTodoFormData,
  ): void => {
    createTodo(data.content);
  };

  /**
   * Handles first load.
   */
  React.useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      loadTodos({ page: 1, limit: PAGE_LIMIT });
    }
  }, [loadTodos]);

  return (
    <main>
      <GlobalStyles themeName="devsoutinho" />
      <header
        style={{
          backgroundImage: `url('${bg}')`,
        }}
      >
        <div className="typewriter">
          <h1>O que fazer hoje?</h1>
        </div>
        <form onSubmit={handleCreateTodoSubmit(onSubmitCreateTodo)}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ position: "relative" }}>
              <input
                type="text"
                placeholder="Correr, Estudar..."
                {...registerCreateTodo("content")}
              />
              <button
                type="submit"
                aria-label="Adicionar novo item"
                disabled={isCreating}
              >
                +
              </button>
            </div>
            <div style={{ height: "20px" }}>
              {errorsCreateTodo.content && (
                <p role="alert" style={{ color: "red", fontWeight: "bold" }}>
                  {errorsCreateTodo.content.message}
                </p>
              )}
            </div>
          </div>
        </form>
      </header>

      <section>
        <form>
          <input
            type="text"
            placeholder="Filtrar lista atual, ex: Dentista"
            onChange={handleSearchChange}
          />
        </form>

        <table border={1}>
          <thead>
            <tr>
              <th align="left">
                <input type="checkbox" disabled />
              </th>
              <th align="left">Id</th>
              <th align="left">Conteúdo</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={4} align="center" style={{ textAlign: "center" }}>
                  Carregando...
                </td>
              </tr>
            )}

            {!isLoading && noDataFound && (
              <tr>
                <td colSpan={4} align="center">
                  Nenhum item encontrado
                </td>
              </tr>
            )}

            {!isLoading &&
              !!homeTodos.length &&
              homeTodos.map(({ id, content, done }) => (
                <tr key={id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={done}
                      onChange={() => toggleDone(id)}
                    />
                  </td>
                  <td>{id.substring(0, 4)}</td>
                  <td style={{ textDecoration: done ? "line-through" : "" }}>
                    {done ? <s>{content}</s> : content}
                  </td>
                  <td align="right">
                    <button data-type="delete">Apagar</button>
                  </td>
                </tr>
              ))}

            {hasMorePages && (
              <tr>
                <td colSpan={4} align="center" style={{ textAlign: "center" }}>
                  <button
                    data-type="load-more"
                    onClick={handleNextPage}
                    disabled={!hasMorePages}
                  >
                    Página {page} de {pages} - Carregar mais{" "}
                    <span
                      style={{
                        display: "inline-block",
                        marginLeft: "4px",
                        fontSize: "1.2em",
                      }}
                    >
                      ↓
                    </span>
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default HomePage;

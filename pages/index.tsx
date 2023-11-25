import React from "react";
import { GlobalStyles } from "@ui/theme/GlobalStyles";
import { todoController } from "@ui/controller/todo";
import { useDebounce } from "@ui/hooks/useDebounce";

type HomeTodo = {
  id: string;
  content: string;
};

const bg = "/bg.jpeg"; // inside public folder
const PAGE_LIMIT = 2;

/**
 * load todos function params type
 */
type LoadTodosParams = {
  page: number;
  limit: number;
  search?: string;
};

function HomePage() {
  const firstRender = React.useRef(true);

  const [todos, setTodos] = React.useState<HomeTodo[]>([]);
  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);

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

  /**
   * Loads todos from the API.
   */
  const loadTodos = React.useCallback(
    ({ page, limit, search }: LoadTodosParams) => {
      setIsLoading(true);

      todoController
        .get({ page, limit, search })
        .then(({ todos, pages }) => {
          setTodos((currentTodos) => [...currentTodos, ...todos]);
          setPages(pages);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [],
  );

  /**
   * Handles the next page.
   */
  const handleNextPage = React.useCallback(() => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadTodos({ page: nextPage, limit: PAGE_LIMIT });
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
        <form>
          <input type="text" placeholder="Correr, Estudar..." />
          <button type="submit" aria-label="Adicionar novo item">
            +
          </button>
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
              homeTodos.map(({ id, content }) => (
                <tr key={id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{id.substring(0, 4)}</td>
                  <td>{content}</td>
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
